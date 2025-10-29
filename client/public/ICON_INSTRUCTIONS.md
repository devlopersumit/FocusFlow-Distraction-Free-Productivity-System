# PWA Icon Instructions

To complete the PWA setup, create these PNG icon files:

1. **icon-192.png** (192x192 pixels)
2. **icon-512.png** (512x512 pixels)

You can:
- Use the existing favicon.svg as a base
- Convert it to PNG format
- Resize to the required dimensions
- Place them in the `client/public/` directory

The manifest.json already references these files, so once you add them, the PWA will be fully functional.

For now, the app will work with just the SVG favicon, but PNG icons provide better PWA support across all devices.
