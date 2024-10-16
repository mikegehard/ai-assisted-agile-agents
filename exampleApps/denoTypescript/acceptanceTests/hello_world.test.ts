import { chromium, expect } from "https://deno.land/x/playwright@v1.39.0/mod.ts";

Deno.test("example test", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto("https://localhost:8000");
  
  await expect(page).toHaveText("Hello World!");
  
  await browser.close();
});
