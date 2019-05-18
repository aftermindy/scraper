const express = require('express');
var bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const app = express()
app.use(bodyParser.json())

app.post('/api/checkjobs', function (req, res) {

(async () => {
  const{email,password} = req.body
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.pracuj.pl');
  await Promise.all([
    page.waitForNavigation({waitUntil: 'networkidle0'}),
    page.click('.header__items_account_btn_ico'),
  ])
  
  await page.type('input[data-test="input-email"]', email);
  await page.type('input[data-test="input-password"]', password);
  await Promise.all([
    page.waitForNavigation({waitUntil: 'networkidle0'}),
   page.click('button[type="submit"]')
  ])
  await page.click('button[ga="konto.pracuj.pl##rekomendowane_oferty##pokaz_kolejne_oferty"]')
  await page.waitFor(2000)

  var jobs = await page.evaluate(()=>{
    var titlelist = document.querySelectorAll('.offer-title')
    var companylist = document.querySelectorAll('.offer-company')
    var locationlist = document.querySelectorAll('.offer-location')
    var expiration = document.querySelectorAll('div[data-test="offerExpiration"]')
    var hreflist = document.querySelectorAll('a[class="details-btn"]')

    

    var jobobjc={}
    for(let x=0;x<titlelist.length;x++){
      jobobjc[x]={
        title:titlelist[x].innerText.trim(),
        company:companylist[x].innerText,
        location:locationlist[x].innerText,
        expirate:expiration[x].innerText,
        href:hreflist[x].href

      }
    }
    return jobobjc
    
  })

  


 

  await browser.close();
  res.send(jobs)
})();

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
