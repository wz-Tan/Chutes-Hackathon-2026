import requests
import os
from dotenv import load_dotenv
from bs4 import BeautifulSoup

load_dotenv()


class SessionBot:
    _session = None

    def __init__(self):
        session = requests.Session()
        session.cookies.clear()
        self._session = session

    def get_fresh_token(self):
        page = self._session.get('https://izone.sunway.edu.my/login')
        soup = BeautifulSoup(page.text, 'html.parser')
        return soup.find('input', {'name': '__ncforminfo'})['value']

    def login(self):
        ncforminfo = self.get_fresh_token()
        
        payload = {
            'student_uid': os.getenv('student_id'),
            'password': os.getenv('password'),
            'form_action': 'submitted',
            '__ncforminfo': ncforminfo,
            'g-recaptcha-response': '',
        }

        response = self._session.post(
            'https://izone.sunway.edu.my/login',
            data=payload,
        )
        return response

    def checkin(self, code: str):
        response = self._session.post(
            'https://izone.sunway.edu.my/icheckin/iCheckinNowWithCode',
            data={'checkin_code': code},
            allow_redirects=False,
        )
        return response
    
    def is_checkin_success(self, html_str: str) -> bool:
        soup = BeautifulSoup(html_str, 'html.parser')
        el = soup.find(id='notification')
        return 'not valid' not in el.text

def main():
    bot = SessionBot()
    bot.login()
    response = bot.checkin('12345')
    b = bot.is_checkin_success(response.text)
    print(b)

if __name__ == '__main__':
    main()