from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(locale="en-US")
    page = context.new_page()

    # 1. Verify Blog Post Routing
    print("Verifying blog post routing...")
    page.goto("http://localhost:4321/en/blog/")
    # Click the first blog card that is not the featured one
    other_posts_heading = page.get_by_role("heading", name="Все статьи")
    if other_posts_heading.is_visible():
        first_blog_card = page.locator('.blog-card-link').first
        post_href = first_blog_card.get_attribute('href')
        first_blog_card.click()
        page.wait_for_load_state()
        expect(page).to_have_url(f"http://localhost:4321{post_href}")
        page.screenshot(path="jules-scratch/verification/01_blog_post_page.png")
        print("Blog post routing verified.")

    # 2. Verify Project Translation and Routing
    print("Verifying project translation and routing...")
    page.goto("http://localhost:4321/en/")
    # Check for English text in the portfolio section
    expect(page.get_by_role("heading", name="Featured Projects")).to_be_visible()

    # Click the first project
    first_project_link = page.locator('.portfolio-card-wrapper .case-link').first
    project_href = first_project_link.get_attribute('href')
    first_project_link.click()
    page.wait_for_load_state()
    expect(page).to_have_url(f"http://localhost:4321{project_href}")

    # Switch to Russian
    lang_switcher = page.locator('.lang-switcher .lang-btn:not(.active)').first
    lang_switcher.click()
    page.wait_for_load_state()

    # Check that the URL has switched to Russian
    ru_project_href = project_href.replace('/en/', '/ru/')
    expect(page).to_have_url(f"http://localhost:4321{ru_project_href}")
    page.screenshot(path="jules-scratch/verification/02_project_page_ru.png")
    print("Project translation and routing verified.")

    # 3. Verify Form Input Visibility in Light Theme
    print("Verifying form input visibility...")
    page.goto("http://localhost:4321/en/brief/")

    # Switch to light theme by directly applying the class via script
    page.evaluate("document.body.classList.remove('dark-theme')")
    page.evaluate("document.body.classList.add('light-theme')")
    page.wait_for_timeout(500) # Wait for theme to apply

    # Check form inputs
    form_input = page.locator('.form-control').first
    expect(form_input).to_be_visible()

    page.screenshot(path="jules-scratch/verification/03_form_light_theme.png")
    print("Form input visibility verified.")

    # Close browser
    browser.close()

with sync_playwright() as playwright:
    run(playwright)