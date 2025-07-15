import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto("https://cosmocode.io/automation-practice-webtable/");

  const tableContainer = page.locator("xpath=//table[@id='countries']");

  const rows = await tableContainer.locator("xpath=.//tr").all();

  const countries: Country[] = await Promise.all(rows.map(async (result) => ({
        name : await result.locator("xpath=.//td[2]").innerText(),
        capital: await result.locator("xpath=.//td[3]").innerText(),
        currency: await result.locator("xpath=.//td[4]").innerText(),
        primaryLanguage: await result.locator("xpath=.//td[5]").innerText()
  })))

  for(const country of countries){
    console.log(country);
  }

});

interface Country {
    name: string,
    capital: string,
    currency: string,
    primaryLanguage: string,
}