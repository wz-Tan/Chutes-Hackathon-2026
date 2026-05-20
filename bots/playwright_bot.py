from playwright.async_api import async_playwright
from contextlib import asynccontextmanager
import asyncio
from dotenv import load_dotenv
import os


load_dotenv()


class PlaywrightBot:
    _playwright = None
    _browser = None

    def __init__(self, headless=False):
        self.headless = headless
        self.page = None

    async def __aenter__(self):
        if PlaywrightBot._browser is None:
            PlaywrightBot._playwright = await async_playwright().start()
            PlaywrightBot._browser = await PlaywrightBot._playwright.chromium.launch(headless=self.headless)
        return self

    async def __aexit__(self, *args):
        pass  # Browser stays alive across sessions

    @asynccontextmanager
    async def session(self):
        self.page = await PlaywrightBot._browser.new_page()
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
        await self.page.locator('input[name="student_uid"]').fill(student_id)
        await self.page.locator('input[name="password"]').fill(password)
        await self.page.locator('#submit').click()

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
    async with PlaywrightBot() as bot:
        async with bot.session() as s:
            await s.navigate('https://izone.sunway.edu.my/login')
            await s.login()
            await s.navigate('https://izone.sunway.edu.my/finance')
            await s.page.wait_for_load_state("domcontentloaded")
            content = await s.page.locator('#infoHeader').inner_text()
            print(content)

        # Browser is still alive — open another session reusing it
        # async with bot.session() as s:
        #     await s.navigate('https://example.com/reports')

    await PlaywrightBot.shutdown()


if __name__ == '__main__':
    asyncio.run(main())
