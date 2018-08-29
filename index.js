const puppeteer = require('puppeteer')
const {get} = require('https');
const {appendFile} = require('fs');

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

async function startBrowser (){
    const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox', '--proxy-server=138.201.101.33:443']});
    const mail = await browser.newPage()
    const flamepage = await browser.newPage()
    const page = await browser.newPage();
    const client = page._client;
    await flamepage.goto('https://flamecoin.co');
    await sleep(10000)
    async function stop() {
        browser.close()
}



startBrowser()
