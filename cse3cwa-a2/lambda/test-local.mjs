/**
 * Local test script for Lambda function
 * Run with: node test-local.mjs
 */

import { handler } from "./index.mjs";

// Test event
const testEvent = {
  body: JSON.stringify({
    title: "Test Escape Room",
    stages: [
      { label: "Find the Key", order: 0 },
      { label: "Solve the Puzzle", order: 1 },
      { label: "Unlock the Door", order: 2 },
    ],
  }),
};

console.log("Testing Lambda function locally...\n");

handler(testEvent)
  .then((response) => {
    console.log("Status Code:", response.statusCode);
    console.log("Headers:", JSON.stringify(response.headers, null, 2));
    console.log("\nResponse Body:");
    console.log(response.body);
    
    // Save HTML to file for viewing
    import("fs").then((fs) => {
      fs.writeFileSync("test-output.html", response.body);
      console.log("\n✅ HTML saved to test-output.html");
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
