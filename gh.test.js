let page;



describe("Github page tests", () => {
  
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });
  
  afterEach(() => {
    page.close();
  });
  
  test("The h1 header content'", async () => {
    jest.setTimeout(70000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.goto('https://github.com');
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub')
  });

  test("The first link attribute", async () => {
    jest.setTimeout(30000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content")
  });

  test("The page contains Sign in button", async () => {
    jest.setTimeout(30000);
    const btnSelector = "a[class='btn-mktg btn-large-mktg btn-muted-mktg']";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  });
});

describe("Testing GitHub Copilot page", () => {
  
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/features/copilot");
  });
  
  afterEach(() => {
    page.close();
  });
  
  test("Page header test", async () => {
    jest.setTimeout(30000);
    await page.waitForSelector('h1');
    const titleCoPilot = await page.title();
    
    expect(titleCoPilot).toContain("GitHub Copilot · Your AI pair programmer · GitHub")
  });

  test("The page contains Get started button", async () => {
    jest.setTimeout(30000);
    const bttnSelector = "a.Primer_Brand__Button-module__Button___lDruK";
    await page.waitForSelector(bttnSelector, {
      visible: true,
    });
    const actual = await page.$eval(bttnSelector, link => link.textContent);
    expect(actual).toContain("Get started for free")
  });  

  test("The Tutorial link test", async () => {
    jest.setTimeout(60000);
    const tutorialLink = await page.$(".Primer_Brand__SubNav-module__SubNav__link___VBkrZ[href='https://github.com/features/copilot/tutorials']");
    await tutorialLink.click();
    await page.goto("https://github.com/features/copilot/tutorials");
    await page.waitForSelector('h1');
    const titleTutorial = await page.title();
    expect(titleTutorial).toContain("Getting started with GitHub Copilot · GitHub")
  });
});
