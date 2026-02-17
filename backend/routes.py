# routes.py
from flask import Blueprint, request, jsonify
from backend.database import get_connection

api = Blueprint("api", __name__)

@api.route("/save-flow", methods=["POST"])
def save_flow():
    data = request.json
    conn = get_connection()
    cur = conn.cursor()
    
    # Limpa o estado anterior
    cur.execute("DELETE FROM nodes")
    cur.execute("DELETE FROM edges")
    
    # Salva os novos blocos com posições (X, Y)
    for node in data.get('nodes', []):
        cur.execute("INSERT INTO nodes (id, type, content, pos_x, pos_y) VALUES (?, ?, ?, ?, ?)",
                    (node['id'], node['type'], node['data']['label'], node['position']['x'], node['position']['y']))
    
    # Salva as conexões
    for edge in data.get('edges', []):
        cur.execute("INSERT INTO edges (source_node_id, target_node_id) VALUES (?, ?, ?)",
                    (edge['source'], edge['target'], edge.get('label')))
    
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})