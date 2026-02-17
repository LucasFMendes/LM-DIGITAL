import sqlite3

DB_NAME = "chatbot.db"

def get_connection():
    return sqlite3.connect(DB_NAME, check_same_thread=False)

def init_db():
    conn = get_connection()
    cur = conn.cursor()
    
    # Tabela de Nódulos (As caixas de mensagem)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS nodes (
        id TEXT PRIMARY KEY,
        type TEXT,
        content TEXT,
        next_node_id TEXT
    )""")

    # Tabela de Edges (As linhas que ligam os blocos)
    cur.execute("""
    CREATE TABLE IF NOT EXISTS edges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source_node_id TEXT,
        target_node_id TEXT,
        condition_value TEXT
    )""")
    
    conn.commit()
    conn.close()
    print("✅ Banco de dados de fluxo inicializado!")