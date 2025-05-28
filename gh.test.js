let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});


describe("Github page tests", () => {
  
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 10000);
  
  test("The h1 header content'", async () => {    
    const firstLink = await page.$("header div a");
    await firstLink.click();
    await page.goto("https://github.com/");
    await page.waitForSelector("h1", 10000);
    const title2 = await page.title();
    expect(title2).toEqual("GitHub · Build and ship software on a single, collaborative platform · GitHub")
  }, 40000);

  test("The first link attribute", async () => {
    
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content")
  }, 30000);

  test("The page contains Sign in button", async () => {
    
    const btnSelector = "a[class='btn-mktg btn-large-mktg btn-muted-mktg']";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 30000);
});

describe("Testing GitHub Copilot page", () => {
  
  beforeEach(async () => {    
    await page.goto("https://github.com/features/copilot");
  }, 10000);
  
    
  test("Page header test", async () => {
    
    await page.waitForSelector('h1', 15000);
    const titleCoPilot = await page.title();
    
    expect(titleCoPilot).toContain("GitHub Copilot · Your AI pair programmer · GitHub")
  }, 30000);

  test("The page contains Get started button", async () => {    
    
    const bttnSelector = "a.Primer_Brand__Button-module__Button___lDruK";
    await page.waitForSelector(bttnSelector, {
      visible: true,
    });
    const actual = await page.$eval(bttnSelector, link => link.textContent);
    expect(actual).toContain("Get started for free")
  }, 30000);  

  test("The Tutorial link test", async () => {
   
    const tutorialLink = await page.$(".Primer_Brand__SubNav-module__SubNav__link___VBkrZ[href='https://github.com/features/copilot/tutorials']");
    await tutorialLink.click();
    await page.goto("https://github.com/features/copilot/tutorials");
    await page.waitForSelector('h1');
    const titleTutorial = await page.title();
    expect(titleTutorial).toContain("Getting started with GitHub Copilot · GitHub")
  }, 70000);
});
