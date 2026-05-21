# This File is Used for CRUD
from supabase_client import client

# ── Keys ──────────────────────────────────────────────────────────────────────


def store_key(user_id: str, key_name: str, key_value: str):
    print("Storing key ", key_name, "with value of ", key_value, "for user ", user_id)


def retrieve_key(user_id: str, key_name: str):
    print("Retrieving key ", key_name, "for user ", user_id)


def update_key(user_id: str, key_name: str, key_value: str):
    print("Update key ", key_name, "with value of ", key_value, "for user ", user_id)


def delete_key(user_id: str, key_name: str):
    print("Deleting key ", key_name, "for user ", user_id)


# ── Chat ──────────────────────────────────────────────────────────────────────

def create_chat(user_id: str):
    print("Chat Created")


def add_message(session_id: str, user_msg: str, ai_msg: str):
    print("Message Added")


def get_chat_history(session_id: str):
    print("Retrieving chat history for session ", session_id)


def get_user_chats(user_id: str):
    print("Retrieving all chats for user ", user_id)


def delete_chat(session_id: str):
    print("Deleting chat ", session_id)
