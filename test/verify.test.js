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

describe('the class task-form-left', () => {
  it('should be renamed to left-side', async () => {
    const leftSideElements = await page.$$('.left-side');
    expect(leftSideElements.length).toBeGreaterThan(0);

    const innerHtml = await page.$eval('style', (style) => {
      return style.innerHTML;
    });
    
    expect(innerHtml).toContain('.left-side');
  });
});

describe('the class task-form-right', () => {
  it('should be renamed to right-side', async () => {
    const rightSideElements = await page.$$('.right-side');
    expect(rightSideElements.length).toBeGreaterThan(0);

    const innerHtml = await page.$eval('style', (style) => {
      return style.innerHTML;
    });
    expect(innerHtml).toContain('.right-side');
  });
});

describe('the left-side class', () => {
  it('should be added to each of the task description elements', async () => {
      const leftSideElements = await page.$$('[id^="task-row-"] > .left-side');
      
      expect(leftSideElements.length).toBe(3);
  });
});

describe('the right-side class', () => {
  it('should be added to each of the task status elements', async () => {
      const leftSideElements = await page.$$('[id^="task-row-"] > .right-side');
      
      expect(leftSideElements.length).toBe(3);
  });
});

describe('the CSS property .task-status', () => {
  it('should not contain flex:10%', async () => {
    const variableDefinitionCount = await page.$eval('style', (style) => {
      return style.innerHTML.match(/flex.*:.*10%/g).length;
    });
    
    expect(variableDefinitionCount).toEqual(1);
  });
});

describe('the CSS property .task-description', () => {
  it('should be removed along with its flex:90% property definition', async () => {
    const containsTaskDescription = await page.$eval('style', (style) => {
      return style.innerHTML.includes(".task-description");
    });
    expect(containsTaskDescription).toBe(false);

    const flexCount = await page.$eval('style', (style) => {
      return style.innerHTML.match(/flex.*:.*90%/g).length;
    });
    expect(flexCount).toEqual(1);
  });
});

describe('the task-descriptions', () => {
  it('should not have the task-description class', async () => {
    const taskDescriptionElements = await page.$$('.task-description');

    expect(taskDescriptionElements.length).toBe(0);
  });
});