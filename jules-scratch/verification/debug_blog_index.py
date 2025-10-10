from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    print("Navigating to the English blog index page to debug...")
    page.goto("http://localhost:4321/en/blog/")
    page.wait_for_load_state('networkidle')
    page.screenshot(path="jules-scratch/verification/debug_blog_index_page.png")
    print("Screenshot taken. Please inspect 'jules-scratch/verification/debug_blog_index_page.png'.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)