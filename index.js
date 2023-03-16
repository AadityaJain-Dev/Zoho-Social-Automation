const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
	  // for debugging
			//  headless: false,
			//  slowMo: 250,
});
  const page = await browser.newPage();
  let fullUrl="https://accounts.zoho.in/signin?servicename=ZohoSocial&signupurl=https://www.zoho.com/social/signup.html"
    await page.goto(fullUrl, {
      waitUntil: 'networkidle0',
      timeout: 0
      });
    let _u="YOUR-ZOHO-USERNAME"; // your zoho username
    let _p="YOUR-ZOHO-PASSWORD"; // your zoho password
    let textt="TEXT-TO-PUBLISH-HERE";
  	await page.waitForSelector("#nextbtn");
  	await page.type("input#login_id",_u,{delay:50}); // you can remove this delay if you want
  	await page.click("button#nextbtn");
  	await page.waitForSelector("input#password");
  	await page.type("input#password",_p),{delay:50}; // you can remove this delay if you want
  	await page.click("button#nextbtn");
  	await page.waitForSelector("#pconnect");
  	await page.click("#top_header_container > ul > li:nth-child(1) > div.newPostBtn > a.newPostBtn-primary");
  	await page.waitForSelector("div#status-dialog-textarea");
  	await page.waitFor(500); //you can remove this if you want
  	await page.type("#status-dialog-textarea",textt,{delay:50});
    await page.waitFor(500);  //you can remove this if you want
    await page.evaluate(() => {document.querySelector('#publish_postnow').click();});
    await page.evaluate(() => {document.querySelector("#user_setup > div").click();});
    await page.waitForSelector("a.colorRed");
    await page.evaluate(() => {document.querySelector("a.colorRed").click();});
})();
