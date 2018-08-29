const puppeteer = require('puppeteer')
const {get} = require('https');
const {appendFile} = require('fs');

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

start()
