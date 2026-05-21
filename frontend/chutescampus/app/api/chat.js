export async function createChat() {
  const res = await fetch("/create_chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

export async function saveChatHistory(messages) {
  const res = await fetch("/save_chat_history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ messages }),
  });
  return await res.json();
}

export async function getChatHistory(sessionId) {
  const res = await fetch("/get_chat_history", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-session-id": sessionId,
    },
  });
  return await res.json();
}

export async function getUserChats() {
  const res = await fetch("/get_user_chats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

export async function deleteChat(sessionId) {
  const res = await fetch("/delete_chat", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-session-id": sessionId,
    },
  });
  return await res.json();
}
