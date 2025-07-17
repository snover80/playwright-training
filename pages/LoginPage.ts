import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{

    private readonly usernameTextField: Locator;
    private readonly passwordTextField: Locator;
    private readonly loginButton: Locator;
    private readonly loginLink: Locator;
    private readonly emailTextField: Locator;

    constructor(page: Page){
        super(page);
        this.usernameTextField = page.getByRole("textbox", {name: "Username"});
        this.passwordTextField = page.getByRole("textbox", {name: "Password"});
        this.loginButton = page.getByRole("button", {name: "Login"});
        this.loginLink = page.getByRole("link", {name: " Signup / Login"});
        this.emailTextField = page.locator("[data-qa='login-email']");
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

    async clickLoginLink(): Promise<void> {
        await this.loginLink.click();
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailTextField.fill(email);
    }
}