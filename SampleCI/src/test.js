import add from "./index";
if (add(2, 3) !== 5) {
  console.error("❌ Test failed: add(2, 3) should be 5");
  process.exit(1); // Exit with failure
}

console.log("✅ All tests passed!");
