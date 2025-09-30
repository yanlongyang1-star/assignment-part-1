import { test, expect } from "@playwright/test";

test.describe("Room Persistence", () => {
  // Generate unique room title for this test run
  const testRoomTitle = `Test Room ${Date.now()}`;

  test("should save a room and persist after page reload", async ({ page }) => {
    // Navigate to rooms demo page
    await page.goto("/rooms-demo");

    // Wait for page to load
    await expect(page.locator("h1")).toContainText("Rooms API Demo");

    // Fill in room title
    const titleInput = page.locator('input[placeholder="Enter room title..."]');
    await titleInput.fill(testRoomTitle);

    // Fill in stage information
    const stageInputs = page.locator('input[placeholder="Stage label..."]');
    const firstStageInput = stageInputs.first();
    await firstStageInput.fill("Test Stage 1");

    // Create the room
    const createButton = page.locator('button:has-text("Create Room")');
    await createButton.click();

    // Wait for success alert
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toContain("successfully");
      dialog.accept();
    });

    // Wait for the room to appear in the list
    await page.waitForTimeout(1000);

    // Verify room appears in the list
    const roomCard = page.locator(`article:has-text("${testRoomTitle}")`);
    await expect(roomCard).toBeVisible();

    // Verify stage is shown
    await expect(roomCard).toContainText("Test Stage 1");

    // Get room ID for verification (from delete button or other unique identifier)
    const deleteButton = roomCard.locator('button:has-text("Delete")');
    await expect(deleteButton).toBeVisible();

    // Reload the page
    await page.reload();

    // Wait for page to reload
    await expect(page.locator("h1")).toContainText("Rooms API Demo");
    await page.waitForTimeout(1000);

    // Verify room still exists after reload
    const roomCardAfterReload = page.locator(
      `article:has-text("${testRoomTitle}")`
    );
    await expect(roomCardAfterReload).toBeVisible();
    await expect(roomCardAfterReload).toContainText("Test Stage 1");

    console.log(`✅ Room "${testRoomTitle}" persisted after reload`);

    // Cleanup: Delete the test room
    const deleteButtonAfterReload = roomCardAfterReload.locator(
      'button:has-text("Delete")'
    );
    
    // Handle confirmation dialog
    page.once("dialog", (dialog) => {
      dialog.accept();
    });
    
    await deleteButtonAfterReload.click();

    // Wait for delete success
    page.once("dialog", (dialog) => {
      expect(dialog.message()).toContain("successfully");
      dialog.accept();
    });

    // Wait for UI update
    await page.waitForTimeout(1000);

    // Verify room is deleted
    await expect(roomCardAfterReload).not.toBeVisible();

    console.log(`✅ Test room "${testRoomTitle}" cleaned up`);
  });

  test("should persist multiple rooms with stages", async ({ page }) => {
    await page.goto("/rooms-demo");

    const room1Title = `Room A ${Date.now()}`;
    const room2Title = `Room B ${Date.now()}`;

    // Create first room
    await page.locator('input[placeholder="Enter room title..."]').fill(room1Title);
    await page.locator('input[placeholder="Stage label..."]').first().fill("Stage A1");
    await page.locator('button:has-text("Create Room")').click();
    
    page.once("dialog", (dialog) => dialog.accept());
    await page.waitForTimeout(1000);

    // Create second room
    await page.locator('input[placeholder="Enter room title..."]').fill(room2Title);
    await page.locator('input[placeholder="Stage label..."]').first().fill("Stage B1");
    await page.locator('button:has-text("Create Room")').click();
    
    page.once("dialog", (dialog) => dialog.accept());
    await page.waitForTimeout(1000);

    // Verify both rooms exist
    await expect(page.locator(`article:has-text("${room1Title}")`)).toBeVisible();
    await expect(page.locator(`article:has-text("${room2Title}")`)).toBeVisible();

    // Reload page
    await page.reload();
    await page.waitForTimeout(1000);

    // Verify both rooms still exist
    await expect(page.locator(`article:has-text("${room1Title}")`)).toBeVisible();
    await expect(page.locator(`article:has-text("${room2Title}")`)).toBeVisible();

    // Cleanup both rooms
    page.on("dialog", (dialog) => dialog.accept());
    
    await page.locator(`article:has-text("${room1Title}") button:has-text("Delete")`).click();
    await page.waitForTimeout(500);
    
    await page.locator(`article:has-text("${room2Title}") button:has-text("Delete")`).click();
    await page.waitForTimeout(500);

    console.log("✅ Multiple rooms persistence test completed");
  });

  test("should handle empty room list correctly", async ({ page }) => {
    await page.goto("/rooms-demo");

    // If there are rooms, might see them, but empty message should appear if no rooms
    const emptyMessage = page.locator('text="No rooms yet"');
    const hasRooms = await page.locator("article").count() > 0;

    if (!hasRooms) {
      await expect(emptyMessage).toBeVisible();
    }

    // Reload
    await page.reload();

    // Same state should persist
    if (!hasRooms) {
      await expect(emptyMessage).toBeVisible();
    }
  });
});
