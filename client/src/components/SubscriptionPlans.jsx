import React, { useState } from 'react';

const SubscriptionPlans = () => {
  const [currentPlan, setCurrentPlan] = useState('Pro');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for individuals getting started',
      features: [
        '5 focus sessions per day',
        'Basic analytics',
        'Mobile app access',
        'Email support',
        '1 team member'
      ],
      limitations: [
        'Limited to 5 sessions per day',
        'Basic reporting only',
        'No team collaboration'
      ],
      cta: 'Current Plan',
      popular: false,
      current: currentPlan === 'Free'
    },
    {
      name: 'Pro',
      price: { monthly: 12, yearly: 120 },
      description: 'For professionals and small teams',
      features: [
        'Unlimited focus sessions',
        'Advanced analytics & AI insights',
        'Team collaboration (up to 10 members)',
        'Custom integrations',
        'Priority support',
        'Export data',
        'Custom themes',
        'Advanced reporting'
      ],
      limitations: [],
      cta: 'Upgrade Now',
      popular: true,
      current: currentPlan === 'Pro'
    },
    {
      name: 'Enterprise',
      price: { monthly: 25, yearly: 250 },
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'Advanced security & SSO',
        'Custom integrations',
        'Dedicated support',
        'On-premise deployment',
        'Custom branding',
        'API access',
        'Advanced compliance'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      current: currentPlan === 'Enterprise'
    }
  ];

  const handleUpgrade = (planName) => {
    if (planName === 'Enterprise') {
      // Open contact sales modal or redirect
      alert('Contact sales for Enterprise pricing');
    } else {
      setCurrentPlan(planName);
      // Here you would integrate with payment processing
      alert(`Upgraded to ${planName} plan!`);
    }
  };

  const getPrice = (plan) => {
    const price = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly;
    return price === 0 ? 'Free' : `$${price}`;
  };

  const getPeriod = (plan) => {
    if (plan.price.monthly === 0) return '';
    return billingCycle === 'yearly' ? '/year' : '/month';
  };

  const getSavings = (plan) => {
    if (plan.price.monthly === 0) return null;
    const monthlyCost = plan.price.monthly * 12;
    const yearlyCost = plan.price.yearly;
    const savings = monthlyCost - yearlyCost;
    return savings > 0 ? `Save $${savings}/year` : null;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your Plan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Select the perfect plan for your productivity needs
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-dark-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
            Yearly
          </span>
          {billingCycle === 'yearly' && (
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2 py-1 rounded-full">
              Save 17%
            </span>
          )}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-8 ${
              plan.popular
                ? 'bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-500 dark:border-indigo-400'
                : 'bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            {plan.current && (
              <div className="absolute -top-4 right-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Current Plan
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {getPrice(plan)}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">
                  {getPeriod(plan)}
                </span>
              </div>
              {getSavings(plan) && (
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {getSavings(plan)}
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-300 mt-2">{plan.description}</p>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="font-semibold text-gray-900 dark:text-white">Features:</h4>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.limitations.length > 0 && (
                <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Limitations:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <li key={limitationIndex} className="flex items-start">
                        <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => handleUpgrade(plan.name)}
              disabled={plan.current}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                plan.current
                  ? 'bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'
              }`}
            >
              {plan.current ? 'Current Plan' : plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Can I change plans anytime?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Is there a free trial?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, all paid plans come with a 14-day free trial. No credit card required.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Can I cancel anytime?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
