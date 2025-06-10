const { favicons } = require('favicons');
const fs = require('fs').promises;
const path = require('path');

const SOURCE = './public/images/new-logo/site-icon.svg'; // Source image
const OUTPUT = './public/icons'; // Output directory

// Configuration for favicons
const configuration = {
  path: '/icons', // Path for generated icons
  appName: 'Stanford American School',
  appShortName: 'Stanford School',
  appDescription: 'Exists for The Best Education',
  background: '#ffffff',
  theme_color: '#000000',
  display: 'standalone',
  start_url: '/',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    favicons: true,
    windows: true,
    yandex: false,
  },
};

async function generateIcons() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT, { recursive: true });
    
    console.log('Generating favicon assets...');
    const response = await favicons(SOURCE, configuration);

    // Save all files
    await Promise.all([
      ...response.images.map(image => 
        fs.writeFile(path.join(OUTPUT, image.name), image.contents)
      ),
      ...response.files.map(file => 
        fs.writeFile(path.join(OUTPUT, file.name), file.contents)
      ),
    ]);

    console.log('Favicon generation complete! ✨');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

generateIcons();