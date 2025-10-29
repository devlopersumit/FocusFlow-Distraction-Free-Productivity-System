const FocusSession = require('../models/FocusSession');
const Task = require('../models/Task');

// Helper to get start of day/week
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const startOfWeek = (d) => {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  const s = new Date(d.setDate(diff));
  return new Date(s.getFullYear(), s.getMonth(), s.getDate());
};

// Attempt to get fetch (Node >=18), or polyfill
async function getFetch() {
  if (typeof fetch !== 'undefined') return fetch;
  const mod = await import('node-fetch');
  return mod.default;
}

// Build a concise prompt for OpenAI
function buildSummaryPrompt({ totalTodaySec, totalWeekSec, byTag, last7Days }) {
  const toH = (sec) => (sec / 3600).toFixed(1);
  const todayH = toH(totalTodaySec);
  const weekH = toH(totalWeekSec);
  const tags = Object.entries(byTag)
    .sort((a,b) => b[1]-a[1])
    .slice(0,5)
    .map(([tag, sec]) => `${tag || 'untagged'}: ${toH(sec)}h`)
    .join(', ');
  const last = last7Days.map(d => `${d.date}: ${(d.seconds/3600).toFixed(1)}h`).join('; ');

  return `You are an assistant that writes one-line, friendly productivity summaries.
Data:
- Today total: ${todayH}h
- This week total: ${weekH}h
- By tag (top): ${tags || 'n/a'}
- Last 7 days: ${last}

Write 1-2 short sentences. Example tone: "You focused 3h today. Keep it up!" Avoid emojis. Base numbers strictly on provided data.`;
}

exports.getInsights = async (req, res) => {
  try {
    const userId = req.user._id;

    const now = new Date();
    const dayStart = startOfDay(new Date());
    const weekStart = startOfWeek(new Date());
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // include today => 7 entries
    const sevenStart = startOfDay(sevenDaysAgo);

    // 1) Aggregate totals for today and this week
    const [todayAgg, weekAgg] = await Promise.all([
      FocusSession.aggregate([
        { $match: { userId, startTime: { $gte: dayStart } } },
        { $group: { _id: null, total: { $sum: '$duration' } } }
      ]),
      FocusSession.aggregate([
        { $match: { userId, startTime: { $gte: weekStart } } },
        { $group: { _id: null, total: { $sum: '$duration' } } }
      ])
    ]);

    const totalTodaySec = todayAgg[0]?.total || 0;
    const totalWeekSec = weekAgg[0]?.total || 0;

    // 2) Last 7 days by date (local midnight boundaries)
    const last7Agg = await FocusSession.aggregate([
      { $match: { userId, startTime: { $gte: sevenStart } } },
      { $group: { 
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$startTime' } },
          seconds: { $sum: '$duration' }
        } 
      },
      { $sort: { _id: 1 } }
    ]);

    // fill missing days
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenStart);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0,10);
      const found = last7Agg.find(x => x._id === key);
      last7Days.push({ date: key, seconds: found?.seconds || 0 });
    }

    // 3) By tag (join with tasks)
    const byTagAgg = await FocusSession.aggregate([
      { $match: { userId, startTime: { $gte: weekStart } } },
      { $lookup: { from: 'tasks', localField: 'taskId', foreignField: '_id', as: 'task' } },
      { $unwind: '$task' },
      { $group: { _id: '$task.tag', seconds: { $sum: '$duration' } } },
      { $sort: { seconds: -1 } }
    ]);
    const byTag = {};
    for (const row of byTagAgg) {
      byTag[row._id || ''] = row.seconds;
    }

    // 4) Optional OpenAI summary
    let aiSummary = '';
    try {
      const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
      if (OPENAI_API_KEY) {
        const prompt = buildSummaryPrompt({ totalTodaySec, totalWeekSec, byTag, last7Days });
        const _fetch = await getFetch();
        const resp = await _fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are a concise productivity coach.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.2,
            max_tokens: 80
          })
        });
        if (resp.ok) {
          const data = await resp.json();
          aiSummary = data.choices?.[0]?.message?.content?.trim() || '';
        }
      }
    } catch (e) {
      // Silently ignore AI errors and return data-only
      console.error('OpenAI summary error:', e.message);
    }

    res.json({
      success: true,
      data: {
        totals: {
          todaySeconds: totalTodaySec,
          weekSeconds: totalWeekSec
        },
        last7Days,
        byTag,
        aiSummary
      }
    });
  } catch (e) {
    console.error('Insights error:', e);
    res.status(500).json({ success: false, message: 'Failed to generate insights' });
  }
};


