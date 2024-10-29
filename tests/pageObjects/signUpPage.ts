import { expect } from "playwright/test";
import { BasePage } from "./basePage";

export class SignUpPage extends BasePage {
    async hasPresidentQuote() {
        await expect(this.page.locator('blockquote')).toBeVisible();
    }
}