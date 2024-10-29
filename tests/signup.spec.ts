import { test } from '@playwright/test'
import { SignUpPage } from './pageObjects/signUpPage'

test.describe('Signup page', () => {
  let signUpPage: SignUpPage

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page)
  })

  test('Signup page is loading and has the basic elements', async ({ page }) => {
    await signUpPage.goto('http://localhost:3000/signup')
  
    await signUpPage.hasH1()
    await signUpPage.hasPresidentQuote()
  })
})