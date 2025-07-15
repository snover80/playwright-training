import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{

    private readonly usernameTextField: Locator;
    private readonly passwordTextField: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page){
        super(page);
        this.usernameTextField = page.getByRole("textbox", {name: "Username"});
        this.passwordTextField = page.getByRole("textbox", {name: "Password"});
        this.loginButton = page.getByRole("button", {name: "Login"});
    }

    async fillUsername(username: string): Promise<void> {
        await this.usernameTextField.fill(username);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordTextField.fill(password);
    }

    async clickLoginButton() : Promise<void> {
        await this.loginButton.click();
    }
}