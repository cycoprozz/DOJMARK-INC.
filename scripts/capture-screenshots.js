const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const websites = [
  {
    url: 'https://secrettouchspa.netlify.app',
    filename: 'secret-touch-spa.jpg'
  },
  {
    url: 'https://the-morris-team.netlify.app',
    filename: 'morris-team.jpg'
  },
  {
    url: 'https://cariblifeatl.netlify.app',
    filename: 'cariblife-media.jpg'
  },
  {
    url: 'https://tmor-lifestyle-1754690506.netlify.app',
    filename: 'tmor-lifestyle.jpg'
  },
  {
    url: 'https://www.cyco.pro/client',
    filename: 'cyco-professional-gallery.jpg'
  }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch();
  
  // Ensure portfolio directory exists
  const portfolioDir = path.join(__dirname, '../public/images/portfolio');
  if (!fs.existsSync(portfolioDir)) {
    fs.mkdirSync(portfolioDir, { recursive: true });
  }

  for (const site of websites) {
    try {
      console.log(`Capturing screenshot of ${site.url}...`);
      
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      
      // Navigate to the website
      await page.goto(site.url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait a bit for any animations
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Take screenshot
      const screenshotPath = path.join(portfolioDir, site.filename);
      await page.screenshot({ 
        path: screenshotPath,
        quality: 90,
        type: 'jpeg'
      });
      
      console.log(`✅ Screenshot saved: ${site.filename}`);
      await page.close();
      
    } catch (error) {
      console.error(`❌ Error capturing ${site.url}:`, error.message);
    }
  }
  
  await browser.close();
  console.log('🎉 All screenshots captured!');
}

captureScreenshots().catch(console.error);
