from playwright.async_api import async_playwright
from contextlib import asynccontextmanager
import asyncio
from dotenv import load_dotenv
import os


load_dotenv()


class MyBot:
    _playwright = None
    _browser = None

    def __init__(self, headless=False):
        self.headless = headless
        self.page = None

    async def __aenter__(self):
        if MyBot._browser is None:
            MyBot._playwright = await async_playwright().start()
            MyBot._browser = await MyBot._playwright.chromium.launch(headless=self.headless)
        return self

    async def __aexit__(self, *args):
        pass  # Browser stays alive across sessions

    @asynccontextmanager
    async def session(self):
        self.page = await MyBot._browser.new_page()
        try:
            yield self
        finally:
            await self.page.close()
            self.page = None

    async def navigate(self, url: str):
        await self.page.goto(url, wait_until='domcontentloaded')

    async def login(self):
        username = os.getenv('username')
        password = os.getenv('password')
        pass

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
    async with MyBot() as bot:
        async with bot.session() as s:
            await s.login()
            await s.navigate('https://elearn.sunway.edu.my/ultra/stream')

        # Browser is still alive — open another session reusing it
        # async with bot.session() as s:
        #     await s.navigate('https://example.com/reports')

    await MyBot.shutdown()


if __name__ == '__main__':
    asyncio.run(main())
