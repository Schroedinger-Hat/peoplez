import { expect, Page } from '@playwright/test'
export class BasePage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async goto(path = '') {
        await this.page.goto(path)
    }

    async hasH1() {
        await expect(this.page.locator('h1')).toBeVisible()
    }
}