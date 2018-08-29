const puppeteer = require('puppeteer')
const {get} = require('https');
const {appendFile} = require('fs');

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

function getInfo(cb) {
    get('https://name-fake.com', resp => {
        let data
        resp.on('data', chunk => {
            data += chunk;
        })
    
        resp.on('end', () => {
            let username = data.split('id="copy3">')[1].split('</div>')[0]
            let email = data.split('id="copy4">')[1].split('</div>')[0]
            let password = data.split('id="copy5">')[1].split('</div>')[0]
            cb({
                username,
                email,
                password
            })

        })
    }).on("error", err => {
        console.log("Error: " + err.message);
    })
}

async function start (){
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
    getInfo(async info  => {
        await page.goto('https://discordapp.com/register');
        await page.waitFor('input[name="email"]');
        await page.type('input[name="email"]', info.email);
        await page.type('input[name="username"]', info.username);
        await page.type('input[name="password"]', info.password);
        await page.click('input[class="inputDefault-3JxKJ2 input-3ITkQf"]')
        await page.click('button[type="submit"]')
        try {
            await page.waitForSelector('iframe[sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"]', { timeout: 10000, visible: true })
        } catch (error) {
            console.log('change ur ip cuz u got ip banned 3-4 min')
            browser.close()
        }
        await mail.bringToFront()
        await mail.goto(`https://emailfake.com/${info.email.split('@')[1]}/${info.email.split('@')[0]}/`)
        await page.bringToFront()
        await mail.waitForSelector('a[style="text-decoration: none; line-height: 100%; background: #7289DA; color: white; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: normal; text-transform: none; margin: 0px"]', { timeout: 10000000, visible: true })
        await mail.bringToFront()
        await mail.click('a[style="text-decoration: none; line-height: 100%; background: #7289DA; color: white; font-family: Ubuntu, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: normal; text-transform: none; margin: 0px"]')
        await mail.close()
        await client.send('DOMStorage.enable')
        let localStorage = await client.send('DOMStorage.getDOMStorageItems', {
            storageId: {
                isLocalStorage: true,
                securityOrigin: 'https://discordapp.com'
            }
        })
        localStorage.entries.forEach(item => {
            if (item[0] === 'token') {
                appendFile('tokens.txt', item[1] + '\n', (err) => {
                    if (err) throw err;
                });
                console.log('new token in tokens.txt')
            }
        })
    })
}

start()
