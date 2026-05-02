import { expect, Page } from "playwright/test";
import { pageFixture } from "../hooks/pageFixture";
import { setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60000) // Set the default timeout to 60 seconds for all steps

export class HomePage {

    constructor(public page: Page) {

        this.page = page;
    }

    private Elements = {

        DrinkCat: "//*[text()=' Beverages ']"


    }

async clickDrinkCat(){
    await pageFixture.page.locator(this.Elements.DrinkCat).click();
}

}
