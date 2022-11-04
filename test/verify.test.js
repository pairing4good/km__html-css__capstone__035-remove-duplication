const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the description text input', () => {
  it('should take up the left 90% of the row', async () => {
      const displayFlex = await page.$eval('style', (style) => {
        return style.innerHTML.match(/\.task-form-row.*{[\s\S][^}]*display.*:.*flex.*;/g).length;
      });
      expect(displayFlex).toEqual(1);

      const leftNinty = await page.$eval('style', (style) => {
        return style.innerHTML.match(/\.task-form-left.*{[\s\S][^}]*flex.*:.*90%.*;/g).length;
      });
      expect(leftNinty).toEqual(1);
  });
});

describe('the status dropdown', () => {
  it('should take up the right 10% of the row', async () => {
      const displayFlex = await page.$eval('style', (style) => {
        return style.innerHTML.match(/\.task-form-row.*{[\s\S][^}]*display.*:.*flex.*;/g).length;
      });
      expect(displayFlex).toEqual(1);

      var rightTen = await page.$eval('style', (style) => {
        return style.innerHTML.match(/\.task-form-right.*{[\s\S][^}]*flex.*:.*10%.*;/g).length;
      });
      expect(rightTen).toEqual(1);
  });
});