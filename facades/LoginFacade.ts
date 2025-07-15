import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage"; 
import { ItemsPage } from "../pages/ItemsPage";


export class LoginFacade{

    private readonly loginPage: LoginPage
    private readonly page: Page;

    constructor(page: Page){
        this.loginPage = new LoginPage(page);
        this.page = page;
    }

    async loginUser(username: string, password: string){
        await this.loginPage.fillUsername(username);
        await this.loginPage.fillPassword(password)
        await this.loginPage.clickLoginButton();
        return new ItemsPage(this.page);
    }
}