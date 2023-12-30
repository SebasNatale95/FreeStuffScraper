const puppeteer = require('puppeteer');
const fs = require('fs');

async function frontend() {
  const browser = await puppeteer.launch({headless: false});

  const template = fs.readFile('index.html', 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
    }
    console.log("template: " + data);
    const pagetest = await browser.newPage();
    await pagetest.setContent(data);
  });
};

export default frontend;