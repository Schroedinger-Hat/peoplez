import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { redirect } from "next/navigation"
import HomePage from "@/app/page"

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation")
  return {
    ...actual,
    redirect: vi.fn(),
  }
})

vi.mock("@/app/devPage", () => {
  return { DevPage: () => <div>Mocked DevPage</div> }
})

vi.mock("@/lib/envs", () => ({
  inDevEnvironment: vi.fn(),
}))

describe("HomePage Component", () => {
  it("renders DevPage in development environment", async () => {
    const { inDevEnvironment } = await import("@/lib/envs")
    inDevEnvironment.mockReturnValueOnce(true)

    render(await HomePage())
    expect(screen.getByText("Mocked DevPage")).toBeDefined()
  })

  it("calls redirect when not in development", async () => {
    const { inDevEnvironment } = await import("@/lib/envs")
    inDevEnvironment.mockReturnValueOnce(false)
    render(await HomePage())
    expect(redirect).toHaveBeenCalledWith("/members", "replace")
  })
})
