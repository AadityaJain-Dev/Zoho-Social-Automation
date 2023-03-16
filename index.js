const puppeteer = require('puppeteer');
require('dotenv').config();

// const strings
const zohoLoginUrl = 'https://accounts.zoho.in/signin?servicename=ZohoSocial';
const zohoLogout = 'https://social.zoho.in/Logout.do';
const zohoHomePage = 'https://social.zoho.in/Home.do';
const zohoUsername = process.env.ZOHO_USERNAME; // your zoho username
const zohoPassword = process.env.ZOHO_PASSWORD; // your zoho password
const textToPublishWithPost = () => 'TEXT-TO-PUBLISH-HERE';

const waitForTimeout = (milliseconds = 1000) => new Promise(resolveInner => setTimeout(resolveInner, milliseconds));

(async () => {
  const browser = await puppeteer.launch({
    // for debugging
    headless: false,
    slowMo: 250,
  });
  const page = await browser.newPage();
  await page.goto(zohoLoginUrl, {
    waitUntil: 'networkidle0',
    timeout: 0,
  });
  await page.waitForSelector('#nextbtn');

  // fill username in login form
  await page.type('input#login_id', zohoUsername, { delay: 50 });
  await page.click('button#nextbtn');

    // fill password in login form
  await page.waitForSelector('input#password');
  await page.type('input#password', zohoPassword), { delay: 50 };
  await page.click('button#nextbtn');

  // go to Home page to publish new post
  await page.goto(zohoHomePage, {
    waitUntil: 'networkidle0',
    timeout: 0,
  });

  await page.waitForSelector('#pconnect');
  await page.click(
    '#top_header_container div.newPostBtn > a.newPostBtn-primary',
  );
  await page.waitForSelector('div#status-dialog-textarea');
  await waitForTimeout(500); //you can remove this if you want
  await page.type('#status-dialog-textarea', textToPublishWithPost, {
    delay: 50,
  });
  await waitForTimeout(500); //you can remove this if you want
  await page.evaluate(() => {
    document.querySelector('#publish_postnow').click();
  });


  // // starting logout process
  // await page.evaluate(() => {
  //   document.querySelector('#user_setup > div').click();
  // });
  // await page.waitForSelector('a.colorRed');
  // await page.evaluate(() => {
  //   // click on logout button
  //   document.querySelector('a.colorRed').click();
  // });

  // go to this URL to end session
  await page.goto(zohoLogout, {
    waitUntil: 'networkidle0',
    timeout: 0,
  });
})();
