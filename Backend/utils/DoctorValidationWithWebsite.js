
const puppeteer = require('puppeteer-extra');
const puppeteerStealth = require('puppeteer-extra-plugin-stealth');


puppeteer.use(puppeteerStealth);

const { executablePath } = require('puppeteer');
// process.env.MEDICAL_VARIFICATION
const ValidateDoctorWithWebsit = async ({ Doctorname, RegistrtionNumber, userYear, userStateCouncil }) => {

    try {

        //create the browser like chrome
        const browser = await puppeteer.launch({ headless: false, executablePath: executablePath() });
        //create the new bage in the browser which is created
        const page = await browser.newPage()
        //going to the page on the created page in browser
        await page.goto(process.env.MEDICAL_VARIFICATION, { timeout: 80000 });

        await page.locator('#doctorName').fill(Doctorname);
        await page.locator('#doctorRegdNo').fill(RegistrtionNumber);


        const elementsForyear = await page.$$(
            '#advance_form > div > div > div > ul > li > a > label > input[type=radio]'
        );


        userStateCouncil.trim();
        //evaluate() have capability to het the two arguments in which one is passed to the browser arrgument and get the passed argument as the evaluate funtion 
        await Promise.all(elementsForyear.map(async (element) => {

            return await element.evaluate((e, year) => {

                if (e.value.trim() === year.trim()) {
                    e.click();
                }

            }, userYear);
        }));

        //selecting the state councile slector and seclting the state council and pressing the button in which the search is correct with user input
        const elemntsForStateCouncil = await page.$$('#advance_form > div > div > div > ul > li > a > label');

        await Promise.all(elemntsForStateCouncil.map(async (elementConusil) => {
            return await elementConusil.evaluate((e, stateConcil) => {
                if (e.textContent.trim() === stateConcil) {
                    const buttonToClick = e.querySelector('input[type=radio]');
                    buttonToClick.click();

                }
            }, userStateCouncil)
        }));


        await page.evaluate(() => {
            document.getElementById('doctor_advance_Details').click();
        });



        const elementRgistrion = await page.waitForSelector('#doct_info5 > tbody > tr:nth-child(1) ');


        //It will evaluate about the single row which is first in the table and row is nothig but first row which is selected and in the row all the td are selected and which converted into the array which is nothing but the array of the elemnts and maping the array with the returning the textContent for each td element
        const texts = await elementRgistrion.evaluate((rows) => {

            const ArrayOftd = Array.from(rows.querySelectorAll('td'));

            return ArrayOftd.map(e => e.textContent.trim().toLowerCase());
        });



        if (texts.includes(Doctorname.toLowerCase()) && texts.includes(RegistrtionNumber.toLowerCase())) {
            await page.close()
            await browser.close()
            console.log("The doctor is valid");
            return await true;
        }


        // await page.close()
        // await browser.close()
        return await false;


    } catch (e) {

        console.log(e);
        // if (e.message) {

        // }
        // next({ status: s405, message: "Server side error" });
    }
}



module.exports = ValidateDoctorWithWebsit;



