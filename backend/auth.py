from supabase_client import client


# Sign up
def sign_up(email: str, password: str):
    res = client.auth.sign_up({"email": email, "password": password})
    return res.user


# Sign in
def sign_in(email: str, password: str):
    res = client.auth.sign_in_with_password({"email": email, "password": password})
    return res.session


# Sign out
def sign_out():
    client.auth.sign_out()


# Get current user
def get_user():
    return client.auth.get_user()
