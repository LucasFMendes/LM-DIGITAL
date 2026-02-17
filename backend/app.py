# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app) # Importante para o HTML conseguir falar com o Python

def get_connection():
    return sqlite3.connect('chatbot.db', check_same_thread=False)

@app.route("/api/save-flow", methods=["POST"])
def save_flow():
    data = request.json
    conn = get_connection()
    cur = conn.cursor()
    
    # Limpa o fluxo para atualizar
    cur.execute("DELETE FROM nodes")
    cur.execute("DELETE FROM edges")
    
    # Salva Nodes (Blocos)
    for node in data.get('nodes', []):
        cur.execute("INSERT INTO nodes (id, type, content) VALUES (?, ?, ?)",
                    (node['id'], node['type'], node['label']))
    
    # Salva Edges (Linhas/Conexões)
    for edge in data.get('edges', []):
        cur.execute("INSERT INTO edges (source_node_id, target_node_id, condition_value) VALUES (?, ?, ?)",
                    (edge['source'], edge['target'], edge.get('label')))
    
    conn.commit()
    conn.close()
    return jsonify({"status": "success"}) #

if __name__ == "__main__":
    app.run(debug=True, port=5000)