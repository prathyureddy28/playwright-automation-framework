import { Given, setDefaultTimeout, Then } from "@cucumber/cucumber";
import { LoginPage } from "../Pages/LoginPage"
import { papajohns, PJICreds, Automation } from "../Files/TestData.json"
import { pageFixture } from "../hooks/pageFixture";
import { HomePage } from "../Pages/HomePage";

setDefaultTimeout(60000)

let lp: LoginPage
let hp:HomePage

Given("i launch the application Automation", async function () {

    lp = new LoginPage(pageFixture.page)
    await lp.navigateToApplication(Automation.url)
  
})

Then("i click on dropdown", async function () {

    lp = new LoginPage(pageFixture.page)
    hp = new HomePage(pageFixture.page)
    await pageFixture.page.locator("#country").scrollIntoViewIfNeeded()
    await pageFixture.page.locator("#country").selectOption("Canada")
    console.log('Element clicked successfully');
})
Then ("i enable checkbox", async function (){
    lp = new LoginPage(pageFixture.page)
    hp = new HomePage(pageFixture.page)
await pageFixture.page.locator('#sunday').check()

})