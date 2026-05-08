import { expect, Page } from "playwright/test";
import { pageFixture } from "../hooks/pageFixture";
import { setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60000) // Set the default timeout to 60 seconds for all steps

export class LoginPage {

    constructor(public page: Page) {

        this.page = page;
    }

    private Elements = {


        usernameTextbox: "#Fname",
        passwordTextbox: "#pwrd",
        CreateAccountButton: ".pj-create-btn",
        SignUp: ".sign-up",
        MobileNumSignIn: "#mobileNumber",
        MobileNumLogin: "#mobile_number",
        emailID: "#email-id",
        TnC: "#terms-and-conditions",
        Back: ".arrow-left.hover",
        Hamburger: ".menu-icon.desktop-menu-icon",
        LoginBtn: ".login-btn",
        SendOTPBtn: ".create-btn.send-otp-btn",
        SignInBtn:"//button[@type='submit']"
    }

    async verifyWebElementsOnLoginPage() {

        await expect(pageFixture.page.locator(this.Elements.usernameTextbox)).toBeVisible();
        await expect(pageFixture.page.locator(this.Elements.passwordTextbox)).toBeVisible();
        await expect(pageFixture.page.locator(this.Elements.CreateAccountButton)).toBeVisible();

    }

    async navigateToApplication(url: string) {

        // //1st way: static way

        // await pageFixture.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        //2nd way: dynamic way

        await pageFixture.page.goto(url);

        await pageFixture.page.waitForLoadState('load', { timeout: 120000 });

        console.log(pageFixture.page.url());

        console.log(pageFixture.page.title());
    }
    async clickSignUp() {
        await pageFixture.page.locator(this.Elements.SignUp).click();
        await pageFixture.page.screenshot({ path: './Screenshot/screenshot.png' });

    }
    async enterUsername(username: string) {
        await pageFixture.page.locator(this.Elements.usernameTextbox).fill(username)
    }
    async enterMobNumSignin(MobileNum: string) {

        await pageFixture.page.locator(this.Elements.MobileNumSignIn).fill(MobileNum);
    }
    async enterMobNumLogin(MobileNum: string) {

        await pageFixture.page.locator(this.Elements.MobileNumLogin).fill(MobileNum);
    }

    async enterEmailId(email: string) {

        await pageFixture.page.locator(this.Elements.emailID).fill(email);
    }
    async enterPassword(password: string) {

        await pageFixture.page.locator(this.Elements.passwordTextbox).fill(password);
    }
    async TncRadio() {

        await pageFixture.page.locator(this.Elements.TnC).click();
    }

    async clickCreateAccountButton() {

        await pageFixture.page.locator(this.Elements.CreateAccountButton).click();
    }
    async clickBackIcon() {

        await pageFixture.page.locator(this.Elements.Back).click();
    }
    async clickHamburgerIcon() {

        await pageFixture.page.locator(this.Elements.Hamburger).click();
    }
    async clickLoginBtn() {

        await pageFixture.page.locator(this.Elements.LoginBtn).click();
    }
    async clickSendOTPBtn() {

        await pageFixture.page.locator(this.Elements.SendOTPBtn).click();
    }

    async enterOTP() {

        const otpInputs = pageFixture.page.locator("//input[@type='tel' and @ng-reflect-pattern='\\d*']");

      for (let i = 1; i <= 6; i++) {
        await otpInputs.nth(i - 1).fill(i.toString());
        }
    }
     async clickSignInBtn() {

        await pageFixture.page.locator(this.Elements.SignInBtn).click();
    }
}

