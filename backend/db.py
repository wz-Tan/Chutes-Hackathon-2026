# This File is Used for CRUD
from supabase_client import client


# Add in User Passwords
def store_key(user_id: str, key_name: str, key_value: str):
    print("Storing key ", key_name, "with value of ", key_value, "for user ", user_id)


def retrieve_key(user_id: str, key_name: str):
    print("Retrieving key ", key_name, "for user ", user_id)


def update_key(user_id: str, key_name: str, key_value: str):
    print("Update key ", key_name, "with value of ", key_value, "for user ", user_id)


def delete_key(user_id: str, key_name: str):
    print("Deleting key ", key_name, "for user ", user_id)
