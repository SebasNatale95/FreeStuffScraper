const puppeteer = require('puppeteer');
const fs = require('fs');

const freeRegex = /(?:^|\W)free(?:$|\W)/i;

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.setJavaScriptEnabled(false);
  page.setDefaultTimeout(500000);
  /* setTimeout(() => page.evaluate(() => window.stop()), 15000); */

  await page.goto('https://www.mtlblog.com/things-to-do/');
/*   try {
    await page.click('onesignal-slidedown-cancel-button');
  } catch(e) {
    console.log(e);
  } */

  // THIS FUNCTION IS WORKING FINE, DON'T TOUCH IT
  const crawl = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.widget__headline-text'), (e) => ({
      title: e.innerText,
      link: e.href
    }))
  );

  let results = [];
  crawl.map((element, index) => {
    if(freeRegex.exec(element.title) != null) {
      results.push(element);
    }
  })
  console.log("results: " + JSON.stringify(results));
  // -------------------------------------------------










  // TEST JSON IS USED FOR TEST                       heh.
/*   fs.readFile('testData.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }
    const crawl = JSON.parse(data)
    
    let results = [];
    crawl.map((element, index) => {
      if(freeRegex.exec(element.title) != null) {
        results.push(element);
      }
    })
    console.log(results)
  }); */

  // Closing the browser immediately can cause a timeout error.
  /* setTimeout(async () => await browser.close(), 1000) */
  /* await browser.close(); */
})();










/*   // Type into search box
  await page.type('.search-box__input', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.search-box__link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  //  Get a screenshot of the page
  // await page.screenshot({ path: 'example.png', fullPage: true });

  //  Get a PDF of the page
  // await page.pdf({ path: 'example.pdf', format: 'A4' });

  //  Get HTML of the page
  // const html = await page.content();

  //  Get text of the page
  // const title = await page.evaluate(() => document.title);

  //  Get text of the page
  // const text = await page.evaluate(() => document.body.innerText);

  //  Get all links
  // const links = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll('a'), (e) => e.href)
  // );

  //  Get courses
  // const courses = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll('#courses .card'), (e) => ({
  //     title: e.querySelector('.card-body h3').innerText,
  //     level: e.querySelector('.card-body .level').innerText,
  //     url: e.querySelector('.card-footer a').href,
  //     promo: e.querySelector('.card-footer .promo-code .promo').innerText,
  //   }))
  // );

  // Get courses using $$eval
  const courses = await page.$$eval('#courses .card', (elements) =>
    elements.map((e) => ({
      title: e.querySelector('.card-body h3').innerText,
      level: e.querySelector('.card-body .level').innerText,
      url: e.querySelector('.card-footer a').href,
      promo: e.querySelector('.card-footer .promo-code .promo').innerText,
    }))
  );

  console.log(courses);

  // Save data to JSON file
  fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
    if (err) throw err;
    console.log('File saved');
  });   */

  // Closing the browser immediately can cause a timeout error.
  /* setTimeout(async () => await browser.close(), 1000) */

