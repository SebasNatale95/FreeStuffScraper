const puppeteer = require('puppeteer');
const frontend = require('./frontend.js');

(async () => {

  let results = {
    mtlBlog: [],
    cultMtl: []
  };

  async function waitingFront(value) {
    const waitFront = await browser.newPage();
    if(value === true) {
      const browser = await puppeteer.launch({headless: false});
        waitFront.setContent(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
                    <style>
                        main {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            padding: 15px;
                        }
                    </style>
                    <title>Crawler frontend</title>
                </head>
                <body>
                    <main>
                        <h1>WAITING FOR CRAWLER TO FINISH</h1>
                        <p><i>Closing the browser in 10 seconds if no data is collected</i></p>
                    </main>
                </body>
            </html>
        `);
        setTimeout(async () => await browser.close(), 10000);
    } else {
      waitFront.close();
      frontend(results);
    }
  };
  await waitingFront(true);

  const browser = await puppeteer.launch({headless: 'new'});

  const page = await browser.newPage();
  page.setJavaScriptEnabled(false);
  page.setDefaultTimeout(15000);

  // In case of pop-ups. TODO: Change to an IF
  /* setTimeout(() => page.evaluate(() => window.stop()), 15000); */

  async function mtlBlogCrawl() {
    await page.goto('https://www.mtlblog.com/things-to-do/');
    const crawl = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.widget__headline-text'), (e) => ({
        title: e.innerText,
        link: e.href
      }))
    );
    const freeRegex = /(?:^|\W)free(?:$|\W)/i;
    crawl.map((element, index) => {
      if(freeRegex.exec(element.title) != null) {
        results.mtlBlog.push(element);
      }
    });
  };

  async function cultMtlCrawl() {
    const currentYear = new Date;
    await page.goto(`https://cultmtl.com/${currentYear.getFullYear()}/01/what-to-do-today-in-montreal-to-do-list/`);
    const crawl = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.post-200920 .entry-content p > a'), (e) => ({
        title: e.textContent,
        link: e.href
      }))
    );
    const regex = new RegExp('A post shared by*', 'g');
    crawl.map((element, index) => {
      if(element.title.length > 0 && regex.test(element.title) == false) {
        results.cultMtl.push(element);
      }
    });
  };

  async function executeFrontEnd() {
    await mtlBlogCrawl();
    await cultMtlCrawl();
    console.log("Results sent to frontend: \n", results)
    await waitingFront(false);
  }

  await executeFrontEnd();

})();

























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

