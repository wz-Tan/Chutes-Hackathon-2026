from playwright.async_api import async_playwright
from contextlib import asynccontextmanager
import asyncio
from dotenv import load_dotenv
import os


load_dotenv()


class ElearnBot:
    _playwright = None
    _browser = None

    def __init__(self, headless=False):
        self.headless = headless
        self.page = None

    async def __aenter__(self):
        if ElearnBot._browser is None:
            ElearnBot._playwright = await async_playwright().start()
            ElearnBot._browser = await ElearnBot._playwright.chromium.launch(headless=self.headless)
        return self

    async def __aexit__(self, *args):
        pass  # Browser stays alive across sessions

    @asynccontextmanager
    async def session(self):
        self.page = await ElearnBot._browser.new_page()
        try:
            yield self
        finally:
            await self.page.close()
            self.page = None

    async def navigate(self, url: str):
        await self.page.goto(url, wait_until='domcontentloaded')

    async def login(self):
        student_id = os.getenv('student_id')
        password = os.getenv('password')

        # Login with sunway ID
        login_options = self.page.locator('#seg-login-option-list')
        await login_options.locator('button').first.click()

        # Fill and submit
        await self.page.locator('#userNameInput').fill(student_id)
        await self.page.locator('#passwordInput').fill(password)
        await self.page.locator('#submitButton').click()
    
    

    async def download_file(self):
        await self.page.wait_for_load_state('load')

        # Step 1: Expand all folders first
        folders = self.page.locator('[data-analytics-id="content.item.folder.toggleFolder.button"]')
        folder_count = await folders.count()
        
        for i in range(folder_count):
            await folders.nth(i).click()
            await self.page.wait_for_timeout(500)  # wait for folder to expand

        # Step 2: Click all download buttons
        download_buttons = self.page.locator('[data-analytics-id="components.directives.content-item-base.overflowMenu.showMenu.button"]')
        button_count = await download_buttons.count()
        print(button_count)

        for i in range(button_count):
            # Open the overflow menu
            await download_buttons.nth(i).click()
            await self.page.wait_for_timeout(300)

            # Click the actual Download option in the menu
            async with self.page.expect_download() as download_info:
                await self.page.locator('[data-analytics-id="components.directives.content-item-base.overflowMenu.global.download.link"]').click()

            
            download = await download_info.value
            save_dir = "elearn-documents/"
            await download.save_as(os.path.join(save_dir, download.suggested_filename))
            print(f"Saved: {download.suggested_filename}")

    @classmethod
    async def shutdown(cls):
        if cls._browser:
            await cls._browser.close()
            cls._browser = None
        if cls._playwright:
            await cls._playwright.stop()
            cls._playwright = None


# Example usage
async def main():
    async with ElearnBot() as bot:
        async with bot.session() as s:
            await s.navigate('https://elearn.sunway.edu.my/?new_loc=%2Fultra%2Fstream')
            await s.page.locator('#agree_button').click()
            await s.login()
            # await s.page.wait_for_load_state('load')
            await s.page.wait_for_load_state('domcontentloaded')

            # DIP
            await s.navigate('https://elearn.sunway.edu.my/ultra/courses/_66701_1/outline')
            await s.page.wait_for_load_state('networkidle')
            await s.download_file()

            
            # feed = s.page.locator('.activity-feed').first
            # await feed.wait_for(state='visible')
            # for item in await feed.all():
            #     print(await item.text_content(), end='\n\n\n')

        # Browser is still alive — open another session reusing it
        # async with bot.session() as s:
        #     await s.navigate('https://example.com/reports')

    await ElearnBot.shutdown()


if __name__ == '__main__':
    asyncio.run(main())
