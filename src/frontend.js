const puppeteer = require('puppeteer');

const frontend = async (results) => {
    const browser = await puppeteer.launch({headless: false});
    const resFront = await browser.newPage();
    resFront.setJavaScriptEnabled(true);

    let mtlBlogData = []
    results.mtlBlog.forEach((e, i) => {
        mtlBlogData += 
            `<li>
                <a target='_blank' href='${e.link}'>
                    ${e.title}
                </a>
            </li>`
    });

    let cultMtlData = []
    results.cultMtl.forEach((e, i) => {
        cultMtlData += 
            `<li>
                <a target='_blank' href='${e.link}'>
                    ${e.title}
                </a>
            </li>`
    });

    resFront.setContent(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
                <style>
                    main {
                        padding: 15px;
                    }
                    h1 {
                        border-bottom: 3px solid black;
                    }
                </style>
                <title>Crawler frontend</title>
            </head>
            <body>
                <main>
                    <h1>CRAWLER THING</h1>
                    <article>
                        <h4>From MTL Blog:</h4>
                        <ul id="mtl-blog-data">
                            ${mtlBlogData}
                        </ul>
                    </article>
                    <article>
                        <h4>From CultMTL (not all free):</h4>
                        <ul id="cult-mtl-data">
                            ${cultMtlData}
                        </ul>
                    </article>
                </main>
            </body>
            <script>
                console.log("js working");
            </script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        </html>
    `);
};

module.exports = frontend;