// @ts-check
const { test, expect } = require('@playwright/test');
const baseUrl = 'http://localhost:3001/api'
const json = {
  "status": "success",
  "data": {
    "token": "token",
    "loginUser": {
      "id": 1,
      "isSeller": 0,
      "account": "buyer000"
    }
  }
}

test('try to login', async ({ page }) => {
  await page.route(`${baseUrl}/users/login`, async route => {
    await route.fulfill({ json })
  })
  await page.goto('http://localhost:3003/shop-frontend/login');

  const submit = page.locator('#submit')
  const password = page.locator('#password')
  await page.locator('#account').fill('buyer000')

  // 若密碼長度低於限制
  await password.fill('aaa')
  await submit.click()
  await expect(page.locator('#custom-target')).toHaveText(/密碼/)


  // 成功登入
  await password.fill('12345678')
  await submit.click()
  await page.waitForURL('http://localhost:3003/shop-frontend/')
  await expect(page.locator('ul.nav-list-wrapper')).toContainText(/buyer000/)

  //成功登出
  await page.locator('button.btn-logout').click()
  await expect(page.locator('ul.nav-list-wrapper')).toContainText(/login/)
});

