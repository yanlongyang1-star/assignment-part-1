/**
 * Instrumentation Hook
 * Called once when the Next.js server starts
 */

export async function register() {
  const startupTime = new Date().toISOString();
  
  console.log("=".repeat(60));
  console.log("Application Starting");
  console.log("=".repeat(60));
  console.log(`Startup Time: ${startupTime}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("=".repeat(60));
  console.log("");
}
