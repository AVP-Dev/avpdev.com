from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:4321/en/")

    # Scroll to the portfolio section
    portfolio_section = page.locator("#portfolio")
    portfolio_section.scroll_into_view_if_needed()
    page.wait_for_timeout(500) # wait for animations
    page.screenshot(path="jules-scratch/verification/portfolio_verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)