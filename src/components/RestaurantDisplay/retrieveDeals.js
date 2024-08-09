import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

import * as fs from "fs";

puppeteer.use(StealthPlugin())

// TODO: Add the link to the item / food item to the data / deal item, so when pressed it directly goes to item's page to add to card


// TODO: Fix Error where deals are still retrieved despite the next retrieve Date has not passed
// TODO: Add console log messages showing which of the Fast Food Restaurants were successfully retrieved
async function getDeals() {
    
    const deals = {}; // Empty object that will be populated with all the fast food restaurants deals

    const retrievedDate = new Date();

    try {

        // Read the deals.ts file
        const lastDealsInfo = fs.readFileSync("deals.ts", 'utf-8')

        // If file exists, attempt to extract the last retrieved date
        console.log('File Read');
        let firstLine = lastDealsInfo.toString().split('\n')[0];
        let lastDate = firstLine.split(":")[1].trim()
        console.log(lastDate)

        const lastRetrievedDate = new Date(lastDate);

        // Check if the last retrieved date does not equal to today's date
        if(lastRetrievedDate.toDateString() !== retrievedDate.toDateString()){

            // Check a date object containing next week's date based on last retrieved date
            const nextRetrieveDate = new Date();
            nextRetrieveDate.setDate(lastRetrievedDate.getDate() + 7);
            console.log(`Last Retrieved: ${lastRetrievedDate.toDateString()} : Next Scheduled ${nextRetrieveDate.toDateString()}`)

            // Check if a week has passed in order to retrieve the deals again else do not run and return;
            if (retrievedDate.getDate() > nextRetrieveDate.getDate()){
                console.log("A Week has not passed. No retrieval needed.")
                return;
            }

            // else we continue with the program
            console.log("Retrieving this week's deals............")
        } else {
            console.log("The deals are still update. No Need for new retrieval");
            return;
        }

    } catch (err) {
        console.log("No Deal file has been created yet or file' data was changed...")
        console.log("\nStart deal retrieval.....")
    }

    const date = retrievedDate.toDateString().split(" ").splice(1);
    date[1] = Number.parseInt(date[1]) + ',';

    const formattedDate = date.join(" ");

    try {
        
        // Extract all Little Caesar's Deals
        await getLittleCaesarsDeals(deals);
       
        // Extract all Burger King's Offer Deals
        // Has Mobile Exclusives will implement at a later time
        await getBurgerKingDeals(deals);

        // Extract all Jack in the Box's Deals
        // Currently Unable due to Cloudflare bot protection
        await getJackInTheBoxDeals(deals);

        // Extract all Wendy's Deals
        await getWendysDeals(deals);

        // Extract all KFC's Deals
        await getKFCDeals(deals);

        // Extract all Wingstop's Deals
        await getWingstopDeals(deals);

        // Extract all Carl's Jr Deals
        await getCarlsjrDeals(deals)

        fs.writeFileSync('deals.ts', `//Last Retrieved: ${retrievedDate.toDateString()}\n\nimport { Deals } from "../../interfaces/Deal";\n\nexport const dateRetrieved = "${formattedDate}";\n\n`)


        // Write all the deals to deals.ts in a json format to be imported
        fs.appendFile('deals.ts', `const deals: Deals = ${JSON.stringify(deals, null, 2)}\nexport default deals;`, (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('Deals written to file successfully');
            }
        });
    } 
    catch (error) {
        console.log(error.message);
        return "Error";
    }

};


async function getLittleCaesarsDeals(deals) {
    let fastFoodName = "Little Caesars"
    deals[fastFoodName] = []

    let url = "https://littlecaesars.com/en-us/deals/";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();


    try {
        // Navigate to the webpage
        await page.goto(url);

        // Wait for dynamic content to load (adjust wait time as needed)
        await page.waitForSelector('div.css-1k7xuet', { visible: true, timeout: 10000 });
        
        const currentDeals = await page.$$eval("div.css-1k7xuet", (divs) => {
            let i = 0;

           return divs.map(div => {
            
                let item = {};

                const textContent = div.textContent;
                const trimmed = textContent.trim();
                const withoutCode = trimmed.split("ADD ITEMS")
                item.text = withoutCode[0]

                const img = div.querySelector("img")
                if (img){
                    item.image = img.src;
                }
                else{
                    item.image = "No Image Found";  
                }
                item.id = i++;
                
                return item;
            })
        });

        console.log(currentDeals);
        deals[fastFoodName] = currentDeals;
    } 
    catch (error) {
        console.log(error.message);
        return "Error";
    }
    finally {
        await browser.close();
    }

}


// TODO: Retrieve Digitial Exclusive Deals and Add a DigitExclusive type to the Deal Interface
async function getBurgerKingDeals(deals) {

    let fastFoodName = "Burger King"
    deals[fastFoodName] = []

    // Works when headless = false
    const browser = await puppeteer.launch({
        //headless: false, // Launch browser in non-headless mode
        defaultViewport: null, // Set default viewport
        args: ['--start-maximized'] // Optionally start maximized
    });

    //const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let url = "https://www.bk.com/store-locator" //"https://www.bk.com/rewards/offers";

    let store_location = "https://www.bk.com/store-locator/store/restaurant_3413"


    try {
        // Navigate to the webpage, local store location
        // May include zip code input if able to fetch

        await page.goto(url);

        await page.waitForSelector("input", { visible:  true, timeout: 10000 });

        await page.click("input")

        await page.type("input", "Pomona, CA 91768, USA")

        const list = "div.css-175oi2r.r-1otgn73.r-14lw9ot.r-1jie2fr.r-rs99b7.r-1loqt21.r-h3s6tt.r-1777fci.r-1mdbw0j.r-1qhn6m8.r-i023vh.r-wk8lta.r-13qz1uu"

        await page.waitForSelector(list, { visible:  true, timeout: 10000 });

        // TODO: Sometimes causes Node detached errors. Find a solution to better reduce the error rate
        const listItem = await page.$(`${list} div:nth-child(1)`); // replace with the appropriate selector or index of the list item you want to click

        console.log( await listItem.evaluate((item) => {return item.textContent}))
        
        await listItem.click();


        await page.waitForSelector('button[data-testid="store-card"]', { visible:  true, timeout: 10000 });

        const button = await page.$('button[data-testid="store-card"]')

        const choice = await button.evaluate((button) => {return button.textContent})

        console.log(choice)

        await button.click();


        await page.waitForSelector('button[data-testid="store-modal-order-here"]', { visible:  true, timeout: 10000 });

        const orderHere = await page.$eval('button[data-testid="store-modal-order-here"]', button => button.textContent);
        console.log(orderHere)


        await Promise.all([
            page.waitForNavigation({timeout: 10000}),
            page.click('button[data-testid="store-modal-order-here"]'),
        ]);


        // Wait for dynamic content to load (adjust wait time as needed)
        await page.waitForSelector('a[data-testid="nav-with-picture-icon-Offers"]', { visible:  true, timeout: 10000 });

        // CLick on Offers
        await Promise.all([
            page.waitForNavigation({timeout: 10000}),
            page.click('a[data-testid="nav-with-picture-icon-Offers"]'),
        ]);

        await page.waitForSelector('div.css-175oi2r.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-11yh6sk.r-1rnoaur.r-agouwx button', { visible:  true, timeout: 10000 });

        const currentDeals = await page.$$eval("div.css-175oi2r.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-11yh6sk.r-1rnoaur.r-agouwx button", (buttons) => {

            let dealCount = 0;
            return buttons.map(button => {
                let item = {}
                item.id = dealCount++;

                let formattedText = button.innerText.split("\n").join(" ")

                item.text = formattedText;
                
                let image = button.querySelector("img");
                if (image) {
                    item.image = image.src;
                }
                else {
                    item.image = "No Image Found"
                }

                return item;
            })

        });

        const getDealURLS = await page.$$("div.css-175oi2r.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-11yh6sk.r-1rnoaur.r-agouwx button")

        let urlsReceived = 0

        for(let i = 0; i < getDealURLS.length; i++) {

            await page.waitForSelector('div.css-175oi2r.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-11yh6sk.r-1rnoaur.r-agouwx button', { visible:  true, timeout: 10000 });

            const getDealURLS = await page.$$("div.css-175oi2r.r-150rngu.r-eqz5dr.r-16y2uox.r-1wbh5a2.r-11yh6sk.r-1rnoaur.r-agouwx button")

            if(getDealURLS[i]){
                // console.log("Deal: ", await getDealURLS[i].evaluate((button) => {
                //     return button.textContent;
                // }), "\n")

                await getDealURLS[i].click();

                const url = page.url();
                
                //console.log(url);

                currentDeals[i].url = url;

                urlsReceived += 1

                await page.goBack();
            } 
        }

        //console.log("Got:", urlsReceived, "All Collected? ", urlsReceived === 12)
        //console.log(currentDeals);
        deals[fastFoodName] = currentDeals;
        console.log(`Retrieving Deals from ${fastFoodName} Succeeded....`)
        
    } 
    catch (error) {
        console.log("Error: ", error.message);
        console.log(`Retrieving Deals from ${fastFoodName} failed....`)
        return "Error";
    } 
    finally {
        await browser.close();
    }

}

// Currently unable to get the Jack in the Box Deals due to web scraping protections 
// cloudflare bot detection
async function getJackInTheBoxDeals(deals) {

    let fastFoodName = "Jack In The Box"
    deals[fastFoodName] = []

    return;

    let url = "https://www.jackinthebox.com/" //location?type=carryout";

    //const browser = await puppeteer.launch();

    const browser = await puppeteer.launch({
        headless: false, // Launch browser in non-headless mode
        defaultViewport: null, // Set default viewport
        args: ['--start-maximized'] // Optionally start maximized
    });

    const page = await browser.newPage();

    try {

        //await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0');

        // Navigate to the webpage
        await page.goto(url);

        // Wait for dynamic content to load (adjust wait time as needed)
        await page.waitForSelector('div#kNIq7', { visible: true, timeout: 10000 });

        const inputElement = await page.$eval("div#kNIq7", (el => {
            let content = "";

            let label = el.querySelector("label");

            if (label){
                content = label.textContent;
            }
            

            return content;
        }));
        console.log(inputElement);

        // await Promise.all([
        //     page.waitForNavigation({timeout: 10000}),
        //     page.click("div#kNIq7 input"),
        // ]);

        
        // const currentDeals = await page.$$eval("div.css-1k7xuet", (divs) => {
        //     let i = 0;

        //    return divs.map(div => {
            
        //         let item = {};

        //         const textContent = div.textContent;
        //         item.text = textContent.trim();

        //         const img = div.querySelector("img")
        //         if (img){
        //             item.image = img.src;
        //         }
        //         else{
        //             item.image = "No Image Found";  
        //         }
        //         item.key = i++;
                
        //         return item;
        //     })
        // });

        // console.log(currentDeals);
        // deals[fastFoodName] = currentDeals;
        
    } 
    catch (error) {
        console.log(error.message);
        return "Error";
    }      
    finally {
        //await browser.close();
    }

}

async function getWendysDeals(deals) {

    let fastFoodName = "Wendy's"
    deals[fastFoodName] = []

    
}

async function getKFCDeals(deals) {

    let fastFoodName = "KFC"
    deals[fastFoodName] = []

    let location = "Pomona, CA, USA"

    let url = "https://www.kfc.com/menu#featured"///menu#deals";

    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();


    const browser = await puppeteer.launch({
        //headless: false, // Launch browser in non-headless mode
        defaultViewport: null, // Set default viewport
        args: ['--disable-features=PrivacySandbox','--disable-http2', '--start-maximized']//,'--start-maximized', '--disable-http2', '--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure'] // Optionally start maximized
    });

    const page = await browser.newPage();

    let text = [];

    try {
        // Navigate to the webpage
        await page.goto(url);

        for(let i = 0; i < 2; i++) {

            // Wait for dynamic content to load (adjust wait time as needed)
            await page.waitForSelector('button.PreOrderBar_pre-order-bar__n50bM', { visible:  true, timeout: 10000 });

            await page.click('button.PreOrderBar_pre-order-bar__n50bM'),

            await page.waitForSelector('button.PreOrderBar_pre-order-bar__n50bM', { visible:  true, timeout: 10000 });

            await page.click("input.react-autosuggest__input")

            await page.type("input.react-autosuggest__input", location)

            await page.waitForSelector('ul.react-autosuggest__suggestions-list', { visible:  true, timeout: 10000 });

            // Click on the desired list element
            let listItem = await page.$('ul.react-autosuggest__suggestions-list li:nth-child(1)'); // replace with the appropriate selector or index of the list item you want to click
            await listItem.click();

            await page.waitForSelector("div.DaasStoreCard_daas-store-card__ctas__v2gSX");

            let orderNowButton = await page.$("div.DaasStoreCard_daas-store-card__ctas__v2gSX button:nth-child(2)")

            if(i < 1) {
                await Promise.all([
                    page.waitForNavigation({timeout: 10000}),
                    orderNowButton.click()
                ])
            }
            else {
                await orderNowButton.click();
            }
            
        }

        await page.waitForSelector("div.AdditionalDeliveryFeeModal_modal-delivery-fee-confirmation__content-button__p37x_ button")

        const agreeDeliveryFeeButton = await page.$("div.AdditionalDeliveryFeeModal_modal-delivery-fee-confirmation__content-button__p37x_ button")

        await agreeDeliveryFeeButton.click();

        console.log("I agree button clicked...")

        console.log("Wait for Featured Selector")

        await page.waitForSelector("button.PreOrderBar_pre-order-bar__change__SfDGJ", { visible: true, timeout: 15000 });

        await page.reload();

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        await sleep(2000);
        
        await page.waitForSelector("div.PlpMenuPage_category-group-items__p0pb8",{ visible:  true, timeout: 10000 });
        // Div: PlpMenuPage_category-group-items__p0pb8
        const buttons = await page.$$eval("div.PlpMenuPage_category-group-items__p0pb8 button", (buttons) => {
            
            return buttons.map((button) => {
                return button.textContent
            })
        })

        console.log(buttons)
        
        const featuredButton = await page.$$("div.PlpMenuPage_category-group-items__p0pb8 button")

        //await featuredButton[0].click()

        const desiredButton = await featuredButton[1].evaluate((button) => {
            return button.textContent
        })

        console.log("Pressing ", desiredButton)

        // await page.goto(url)

        await Promise.all([
            page.waitForNavigation({timeout: 10000}),
            featuredButton[1].click(),
        ])



        await page.waitForSelector('a.ProductCard_product-card__qdw_a', { visible: true, timeout: 15000 });

        const currentDeals = await page.$$eval("div.PlpProductGroup_plp-product-group__items__BTMAi a.ProductCard_product-card__qdw_a", (anchors) => {

            let dealCount = 0;
            return anchors.map(anchor => {
                let item = {}
                item.id = dealCount++;

                let allText = anchor.innerText;

                let finalText = allText.split("\n")

                item.text = finalText.join(" ")

                item.url = anchor.href;

                let image = anchor.querySelector("img");
                if (image) {
                    item.image = image.src;
                }
                else {
                    item.image = "No Image Found"
                }

                return item;
            })

        }, text);
        console.log(currentDeals);
        deals[fastFoodName] = currentDeals;
    } 
    catch (error) {
        console.log(error.message);
    } finally {
        await browser.close()
    }
}

async function getWingstopDeals(deals) {

    let fastFoodName = "Wingstop"
    deals[fastFoodName] = []
}


async function getCarlsjrDeals(deals) {

    let fastFoodName = "Carl's Jr"
    deals[fastFoodName] = []
}


// Function Call
getDeals()
