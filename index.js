const puppeteer = require('puppeteer');
require('dotenv').config();

// const strings
const fullUrl = 'https://accounts.zoho.in/signin?servicename=ZohoSocial&signupurl=https://www.zoho.com/social/signup.html';
const zohoUsername = process.env.ZOHO_USERNAME; // your zoho username
const zohoPassword = process.env.ZOHO_PASSWORD; // your zoho password
const textToPublishWithPost = () => 'TEXT-TO-PUBLISH-HERE';




(async () => {
  const browser = await puppeteer.launch({
    // for debugging
     headless: false,
     slowMo: 250,
  });
  const page = await browser.newPage();
  await page.goto(fullUrl, {
    waitUntil: 'networkidle0',
    timeout: 0,
  });
  await page.waitForSelector('#nextbtn');
  await page.type('input#login_id', zohoUsername, { delay: 50 }); 
  await page.click('button#nextbtn');
  await page.waitForSelector('input#password');
  await page.type('input#password', zohoPassword), { delay: 50 };
  await page.click('button#nextbtn');
  await page.waitForSelector('#pconnect');
  await page.click(
    '#top_header_container > ul > li:nth-child(1) > div.newPostBtn > a.newPostBtn-primary',
  );
  await page.waitForSelector('div#status-dialog-textarea');
  await page.waitFor(500); //you can remove this if you want
  await page.type('#status-dialog-textarea', textToPublishWithPost, { delay: 50 });
  await page.waitFor(500); //you can remove this if you want
  await page.evaluate(() => {
    document.querySelector('#publish_postnow').click();
  });
  await page.evaluate(() => {
    document.querySelector('#user_setup > div').click();
  });
  await page.waitForSelector('a.colorRed');
  await page.evaluate(() => {
    document.querySelector('a.colorRed').click();
  });
})();
