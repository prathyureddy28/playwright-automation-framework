import { Given, setDefaultTimeout, Then } from "@cucumber/cucumber";
import { LoginPage } from "../Pages/LoginPage"
import { papajohns, PJICreds } from "../Files/TestData.json"
import { pageFixture } from "../hooks/pageFixture";
import { HomePage } from "../Pages/HomePage";

setDefaultTimeout(60000)

let lp: LoginPage
let hp:HomePage

Given("i launch the application orangeHRM", async function () {

    lp = new LoginPage(pageFixture.page)
    await lp.navigateToApplication(papajohns.url) 
  
})

Then("i provide the credentials", async function () {

    lp = new LoginPage(pageFixture.page)
    hp = new HomePage(pageFixture.page)


    
    await lp.clickSignUp()
    await lp.enterUsername(PJICreds.Username) 
    await lp.enterEmailId(PJICreds.email)
    await lp.enterMobNumSignin(PJICreds.MobileNum) 
    await lp.enterPassword(PJICreds.Password)
   // await lp.TncRadio()
   // await lp.clickCreateAccountButton() 
    await lp.clickBackIcon()
    await lp.clickHamburgerIcon()
    await lp.clickLoginBtn()
    await lp.enterMobNumLogin(PJICreds.MobileNum)
    await lp.clickSendOTPBtn()
   await lp.enterOTP();
   await lp.clickSignInBtn();
   await hp.clickDrinkCat();
})

