from backend.database import get_connection


def create_conversation():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO conversations DEFAULT VALUES")
    conn.commit()
    convo_id = cur.lastrowid
    conn.close()
    return convo_id


def save_message(conversation_id, sender, content):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO messages (conversation_id, sender, content) VALUES (?, ?, ?)",
        (conversation_id, sender, content)
    )
    conn.commit()
    conn.close()
