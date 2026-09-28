import { defineConfig, devices } from "@playwright/test";

// BASE_URL aponta para o ambiente implantado (staging no pipeline).
// Sem ela, sobe o preview local do Vite.
const baseURL = process.env.BASE_URL ?? "http://localhost:4173";

export default defineConfig({
  testDir: "./e2e",
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["html", { open: "never" }], ["list"]] : "list",
  use: { baseURL, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: "npm run build && npm run preview", url: baseURL },
});
