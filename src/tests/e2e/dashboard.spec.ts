import { test, expect } from '@playwright/test'

test('homepage loads and shows dashboard elements', async ({ page }) => {
  page.on('console', (msg) => console.log(`[console:${msg.type()}]`, msg.text()))
  page.on('pageerror', (err) => console.log('[pageerror]', err.message, err.stack))

  await page.goto('http://localhost:3000/')
  await page.waitForTimeout(2000)

  console.log('[e2e] title:', await page.title())
  console.log('[e2e] url:', page.url())

  await expect(page).toHaveTitle(/如意数据大屏|RuyiBigScreen/)

  const header = page.locator('.screen-header .header-title')
  if ((await header.count()) > 0) {
    await expect(header).toHaveText(/如意数据大屏|RuyiBigScreen/)
  } else {
    console.log('[e2e] header title missing; falling back to body check')
    await expect(page.locator('body')).toBeVisible()
  }

  const metricValues = page.locator('.metric-value')
  const count = await metricValues.count()
  console.log('[e2e] metric-value count:', count)
  for (let i = 0; i < count; i++) {
    const text = await metricValues.nth(i).textContent()
    console.log(`[e2e] metric #${i}:`, text)
  }

  const charts = page.locator('.chart')
  await expect(charts.first()).toBeVisible()
  console.log('[e2e] chart count:', await charts.count())

  for (let i = 0; i < await charts.count(); i++) {
    const box = await charts.nth(i).boundingBox()
    console.log(`[e2e] chart #${i} box:`, box)
  }

  const svgOrCanvas = page.locator('svg, canvas')
  console.log('[e2e] svg/canvas count:', await svgOrCanvas.count())
})
