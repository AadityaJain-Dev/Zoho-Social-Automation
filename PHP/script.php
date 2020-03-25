<?php
/*
error_reporting(E_ALL);
ini_set('display_errors', 1);
*/


// Ignore user aborts and allow the script to run in background
ignore_user_abort(true);

ob_start();
header("Connection: close\r\n");
header('Content-Encoding: none\r\n');
$size = ob_get_length();
header("Content-Length: ". $size . "\r\n");
// send info immediately and close connection
ob_end_flush();
flush();

// run other process without the client attached.

// source: https://stackoverflow.com/questions/12982964/php-mod-fcgi-with-fastcgi-finish-request/21344393

$key=$_GET['mykey'];
$text=$_GET['text'];

// Your Secret Key
$secret_key="";
// Your PhantomJSCloud Key
$pjs_key="";
//Your Zoho Username
$zoho_uname="";
//Your Zoho Password
$zoho_pwd="";


// login page for your zoho social profile
$zoho_url="https://accounts.zoho.in/signin?servicename=ZohoSocial&signupurl=https://www.zoho.com/social/signup.html";
// you can choose any useragent of your liking
$useragent="Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Raspbian Chromium/74.0.3729.157 Chrome/74.0.3729.157 Safari/537.36";

if(empty($key)){die("<h1>Please provide the secret key.</h1>");}
if(empty($text)){die("<h1>Please provide the text you want to post.</h1>");}
if(empty($secret_key)){die("<h1>Please set the secret key.</h1>");}
if(empty($pjs_key)){die("<h1>Please register on <a href='https://phantomjscloud.com' alt='PhantomJScloud Website'>PhantomJScloud Website</a> and paste the API key.</h1>");}
if(empty($zoho_uname)){die("<h1>Please provide your zoho social username.</h1>");}
if(empty($zoho_pwd)){die("<h1>Please provide your zoho social password.</h1>");}
if($key != $secret_key){die("<h1>Wrong secret key</h1>");}


$payload="{	'url':'$zoho_url',	'requestSettings':{		'userAgent':'$useragent', 'maxWait': '70000',	},	'renderType':'jpeg',	'overseerScript':'let _u=\"$zoho_uname\"; let _p=\"$zoho_pwd\"; let textt=\"$text\"; await page.waitForSelector(\"#nextbtn\"); await page.type(\"input#login_id\",_u,{delay:50}); await page.click(\"button#nextbtn\"); await page.waitForSelector(\"input#password\"); await page.type(\"input#password\",_p),{delay:50}; await page.click(\"button#nextbtn\"); await page.waitForSelector(\"#pconnect\"); await page.click(\"#top_header_container > ul > li:nth-child(1) > div.newPostBtn > a.newPostBtn-primary\"); await page.waitForSelector(\"div#status-dialog-textarea\"); \ await page.waitForDelay(500); await page.type(\"#status-dialog-textarea\",textt,{delay:50}); await page.evaluate(() => {    document.querySelector(\"#publish_postnow\").click();    });    await page.evaluate(() => {document.querySelector(\"#user_setup > div\").click();});  	await page.waitForSelector(\"a.colorRed\");    await page.evaluate(() => {document.querySelector(\"a.colorRed\").click();}); await page.waitForDelay(2000);',}";


$url = "http://phantomjscloud.com/api/browser/v2/$pjs_key";

$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => "$payload"
		)
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
file_put_contents('result.jpg',$result);

?>
