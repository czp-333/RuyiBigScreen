import { test } from '@playwright/test'

test('radar chart detailed error', async ({ page }) => {
  page.on('console', (msg) => {
    console.log(`[${msg.type()}] ${msg.text()}`)
  })

  page.on('pageerror', (err) => {
    console.log('[pageerror]', err.message)
    console.log(err.stack)
  })

  await page.goto('/')
  await page.waitForTimeout(3000)
})
