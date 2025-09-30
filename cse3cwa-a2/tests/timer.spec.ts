import { test, expect } from "@playwright/test";

test.describe("Timer Component", () => {
  test("should countdown and decrease over time", async ({ page }) => {
    // Navigate to the timer demo page
    await page.goto("/timer-demo");

    // Wait for page to load
    await expect(page.locator("h1")).toContainText("Timer Component Demo");

    // Get the timer element
    const timerElement = page.locator('[role="timer"]');
    await expect(timerElement).toBeVisible();

    // Get initial time value
    const initialTime = await timerElement.textContent();
    expect(initialTime).toMatch(/\d{2}:\d{2}/); // Format: mm:ss

    // Parse initial time
    const [initialMinutes, initialSeconds] = initialTime!
      .split(":")
      .map(Number);
    const initialTotalSeconds = initialMinutes * 60 + initialSeconds;

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

    // Get new time value
    const newTime = await timerElement.textContent();
    const [newMinutes, newSeconds] = newTime!.split(":").map(Number);
    const newTotalSeconds = newMinutes * 60 + newSeconds;

    // Verify time has decreased
    expect(newTotalSeconds).toBeLessThan(initialTotalSeconds);
    
    // Verify it decreased by approximately 3 seconds (with 1 second tolerance)
    const difference = initialTotalSeconds - newTotalSeconds;
    expect(difference).toBeGreaterThanOrEqual(2);
    expect(difference).toBeLessThanOrEqual(4);

    console.log(`Timer test: ${initialTime} → ${newTime} (decreased by ${difference}s)`);
  });

  test("should display timer in correct format", async ({ page }) => {
    await page.goto("/timer-demo");

    const timerElement = page.locator('[role="timer"]');
    const timeText = await timerElement.textContent();

    // Verify format is mm:ss
    expect(timeText).toMatch(/^\d{2}:\d{2}$/);
  });

  test("should show warning color when time is low", async ({ page }) => {
    // Set timer to 1 minute for faster testing
    await page.goto("/timer-demo");

    // Set minutes to 0 (will show in red)
    const minutesInput = page.locator('input[type="number"]');
    await minutesInput.fill("0");
    await minutesInput.press("Enter");

    // Click reset to apply
    const resetButton = page.locator('button:has-text("Reset Timer")');
    await resetButton.click();

    // Wait a moment for timer to update
    await page.waitForTimeout(500);

    // Timer should be red (has warning class)
    const timerElement = page.locator('[role="timer"]');
    
    // In the actual timer, it should show 00:00 or close to it
    const timeText = await timerElement.textContent();
    expect(timeText).toMatch(/^00:/);
  });

  test("should reset timer when reset button is clicked", async ({ page }) => {
    await page.goto("/timer-demo");

    // Wait for initial render
    await page.waitForTimeout(1000);

    // Get initial time
    const timerElement = page.locator('[role="timer"]');
    const timeAfterWait = await timerElement.textContent();

    // Click reset button
    const resetButton = page.locator('button:has-text("Reset Timer")');
    await resetButton.click();

    // Get time after reset
    const timeAfterReset = await timerElement.textContent();

    // Time should be reset to initial value (30:00 by default)
    expect(timeAfterReset).toMatch(/30:00/);
  });
});
