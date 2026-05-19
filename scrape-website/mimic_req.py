import requests
import os
from dotenv import load_dotenv

load_dotenv()
session = requests.Session()
session.cookies.clear()

# Login
def login():
    payload = {
        'student_uid': os.getenv('student_id'),
        'password': os.getenv('password'),
    }
    response = session.post(
        'https://izone.sunway.edu.my/login',
        data=payload
    )
    return response

# Checkin
def checkin(code: str):
    response = session.post(
        'https://izone.sunway.edu.my/icheckin/iCheckinNowWithCode',
        data={'checkin_code': code}
    )
    return response
