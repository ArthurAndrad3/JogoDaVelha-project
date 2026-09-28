import { test, expect } from "@playwright/test";

test("jogador X vence uma partida completa", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { name: "Jogo Da Velha" })).toBeVisible();

  const squares = page.locator("#game-board button");
  for (const index of [0, 3, 1, 4, 2]) {
    await squares.nth(index).click();
  }

  await expect(page.getByText("Player 1 ganhou!")).toBeVisible();
  await page.getByRole("button", { name: "Jogar Denovo!" }).click();
  await expect(page.locator("#game-over")).toHaveCount(0);
});
