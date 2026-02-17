# No schemas.py
from pydantic import BaseModel
from typing import List, Optional

class NodeSchema(BaseModel):
    id: str
    type: str
    content: str
    next_node_id: Optional[str] = None

class FlowSchema(BaseModel):
    bot_id: int
    nodes: List[NodeSchema]