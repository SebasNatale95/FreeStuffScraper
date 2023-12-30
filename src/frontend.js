const puppeteer = require('puppeteer');
const fs = require('fs');

const frontend = async (results) => {
    const browser = await puppeteer.launch({headless: false});

    const pagetest = await browser.newPage();
    pagetest.setJavaScriptEnabled(true);
    // THIS DOESNT ALLOW TO SHARE CONTENT WITH THE HTML FILE
    // Create a server?
    await pagetest.setContent(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                h1 {
                    border-bottom: 3px solid black;
                }
            </style>
            <title>Crawler frontend</title>
        </head>
        <body>
            <main>
                <h1>crawler thing</h1>
                <h3 id="title"></h3>
                <p id="link"></p>
            </main>
        </body>
        <script>
                document.getElementById('link').innerHTML = '${JSON.stringify(results)}'
        </script>
        </html>
    `);
};

module.exports = frontend;