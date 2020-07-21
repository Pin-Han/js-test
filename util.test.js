const puppeteer = require('puppeteer')
const { generateText ,checkAndGenerate } =require('./util')

test('should output name and age',()=>{
    const text = generateText('Max',29)
    expect(text).toBe('Max (29 years old)')
    const text2 = generateText('Anna',30)
    expect(text2).toBe('Anna (30 years old)')
})

test('should output data-less text',()=>{
    const text = generateText('',null);
    expect(text).toBe(' (null years old)')
})

test('should generate a valid text output',()=>{
    const text = checkAndGenerate('Max',29)
    expect(text).toBe('Max (29 years old)')
})
test('should create an element with text and correct class',async ()=>{
    const browser = await puppeteer.launch({
        headless:false,
        slowMo:50, //減慢自動化操作速度
        args:['--window-size=1440,780']
    })
    const page = await browser.newPage()
    await page.goto('http://127.0.0.1:5500/')
    await page.click('input#name')
    await page.type('input#name','Anna')
    await page.click('#age')
    await page.type('#age','30')
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item',el=>el.textContent)
    expect(finalText).toBe('Anna (30 years old)')
},10000)
//測試function 可運行的時間