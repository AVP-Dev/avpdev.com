import re
from playwright.sync_api import sync_playwright, Page, expect

def verify_all_fixes(page: Page):
    """
    This script verifies all the visual fixes:
    1. Translation gaps on the blog and brief pages.
    2. Portfolio component rendering on the homepage.
    3. Form input visibility on the brief page (light theme).
    """
    base_url = "http://localhost:4321"

    # --- Verification 1: Blog Page Translations ---
    print("Verifying blog page translations...")
    page.goto(f"{base_url}/en/blog/")

    # Check for the translated main header
    blog_h1 = page.locator("h1.section-title")
    expect(blog_h1).to_contain_text("Tech Journal")

    # Check for the translated sub-header
    blog_p = page.locator("p.section-subtitle")
    expect(blog_p).to_contain_text("Practical articles, case studies, and notes")

    # Check for the translated "All Articles" sub-header
    other_posts_h2 = page.locator("h2", has_text="All Articles")
    expect(other_posts_h2).to_be_visible()

    page.screenshot(path="jules-scratch/verification/01_blog_page.png")
    print("Blog page screenshot captured.")

    # --- Verification 2: Portfolio Component on Homepage ---
    print("Verifying portfolio component on homepage...")
    page.goto(f"{base_url}/en/")

    # Check that the portfolio section is present
    portfolio_section = page.locator("#portfolio")
    expect(portfolio_section).to_be_visible()

    # Scroll the portfolio section into view
    portfolio_section.scroll_into_view_if_needed()

    # Check that portfolio cards are being rendered
    first_card = portfolio_section.locator(".portfolio-card").first
    expect(first_card).to_be_visible()

    # Check for a project title (verifies data flow and rendering)
    expect(first_card.locator("h3")).to_contain_text("Terra Forma: A B2C Platform for Direct Sales in the USA")

    # Check for technology tags
    expect(first_card.locator(".tag").first).to_be_visible()

    portfolio_section.screenshot(path="jules-scratch/verification/02_homepage_portfolio.png")
    print("Homepage portfolio screenshot captured.")

    # --- Verification 3: Form Input Visibility on Brief Page (Light Theme) ---
    print("Verifying form input visibility on brief page...")
    page.goto(f"{base_url}/en/brief/")

    # Ensure it's the light theme for this check
    page.evaluate("document.documentElement.className = 'light-theme'")

    # Check that the main header is translated
    brief_h1 = page.locator("h1.section-title")
    expect(brief_h1).to_contain_text("Brief for Website Development")

    # Wait for the page to be fully loaded and scroll the form into view
    page.wait_for_load_state("networkidle")
    form = page.locator(".brief-form")
    form.scroll_into_view_if_needed()

    # Take a screenshot of the form
    expect(form).to_be_visible()
    form.screenshot(path="jules-scratch/verification/03_brief_page_form.png")
    print("Brief page form screenshot captured.")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_all_fixes(page)
            print("All verification steps completed successfully.")
        except Exception as e:
            print(f"An error occurred during verification: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    main()