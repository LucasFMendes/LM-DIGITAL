class FlowBuilder {
  constructor() {
    this.nodes = [];
    this.connections = [];
    this.selectedNode = null;
    this.currentPath = null;
    this.startPort = null;
    this.activeFromNode = null;
    this.nodeCounter = 0;

    this.init();
  }

  /* =========================
     INIT
  ========================= */
  init() {
    this.cacheDOM();
    this.bindEvents();
    this.load();
  }

  cacheDOM() {
    this.canvas = document.getElementById("canvas");
    this.svg = document.getElementById("connections");
    this.editor = document.getElementById("editor");
  }

  /* =========================
     DRAG & DROP SIDEBAR
  ========================= */
  bindEvents() {
    document.querySelectorAll(".action-card").forEach(card => {
      card.addEventListener("dragstart", e => {
        e.dataTransfer.setData("type", card.dataset.type || "");
        e.dataTransfer.setData("label", card.innerText.trim());
        e.dataTransfer.setData("icon", card.dataset.icon || "🔧");
        e.dataTransfer.setData("bg", card.dataset.bg || "#065f46");
        e.dataTransfer.effectAllowed = "copy";
      });
    });

    this.canvas.addEventListener("dragover", e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    });

    this.canvas.addEventListener("drop", e => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const type = e.dataTransfer.getData("type");
      if (!type) return;

      this.createNode(
        e.dataTransfer.getData("label"),
        e.dataTransfer.getData("icon"),
        e.dataTransfer.getData("bg"),
        type,
        x - 120,
        y - 20
      );
    });

    document.addEventListener("mousemove", e => this.handleMouseMove(e));
    document.addEventListener("mouseup", e => this.handleMouseUp(e));
  }

  /* =========================
     NODES
  ========================= */
  createNode(label, icon, bg, type, x, y, id = null) {
    const nodeId = id || ++this.nodeCounter;
    if (id && id > this.nodeCounter) this.nodeCounter = id;

    const node = document.createElement("div");
    node.className = `node ${type}`;
    node.dataset.id = nodeId;
    node.style.left = typeof x === "string" ? x : `${x}px`;
    node.style.top = typeof y === "string" ? y : `${y}px`;

    node.innerHTML = `
      <div class="node-header">
        <span class="icon">${icon}</span>
        <span class="node-title">${label}</span>
      </div>
      <div class="port in"></div>
      <div class="port out"></div>
    `;

    this.canvas.appendChild(node);
    this.makeDraggable(node);

    node.addEventListener("click", e => {
      e.stopPropagation();
      this.selectNode(node);
    });

    node.querySelector(".port.out").addEventListener("mousedown", e =>
      this.startConnection(e, node)
    );

    this.nodes.push({ id: nodeId, element: node, type, bg });
    return node;
  }

  makeDraggable(node) {
    let dragging = false;
    let offset = { x: 0, y: 0 };

    node.addEventListener("mousedown", e => {
      if (e.target.classList.contains("port")) return;
      dragging = true;
      const r = node.getBoundingClientRect();
      offset = { x: e.clientX - r.left, y: e.clientY - r.top };
      this.selectNode(node);
    });

    document.addEventListener("mousemove", e => {
      if (!dragging) return;
      const c = this.canvas.getBoundingClientRect();
      node.style.left = `${e.clientX - c.left - offset.x}px`;
      node.style.top = `${e.clientY - c.top - offset.y}px`;
      this.updateAllConnections();
    });

    document.addEventListener("mouseup", () => (dragging = false));
  }

  /* =========================
     CONNECTIONS
  ========================= */
  startConnection(e, node) {
    e.stopPropagation();
    this.startPort = node.querySelector(".port.out");
    this.activeFromNode = node;

    this.currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.currentPath.setAttribute("stroke", "#22c55e");
    this.currentPath.setAttribute("stroke-width", "3");
    this.currentPath.setAttribute("fill", "none");
    this.currentPath.classList.add("flow-line");

    this.svg.appendChild(this.currentPath);
  }

  handleMouseMove(e) {
    if (!this.currentPath || !this.startPort) return;
    this.drawCurve(
      this.currentPath,
      this.getCoords(this.startPort),
      this.getMousePos(e)
    );
  }

  handleMouseUp(e) {
    if (!this.currentPath) return;

    const targetPort = e.target.closest(".port.in");

    if (targetPort) {
      const toNode = targetPort.closest(".node");
      this.connections.push({
        path: this.currentPath,
        from: this.activeFromNode,
        to: toNode
      });
    } else {
      // 👉 NÓ INTERMEDIÁRIO
      const pos = this.getMousePos(e);
      const newNode = this.createNode(
        "Intermediário",
        "🔀",
        "#334155",
        "intermediate",
        pos.x,
        pos.y
      );

      this.connections.push({
        path: this.currentPath,
        from: this.activeFromNode,
        to: newNode
      });
    }

    this.updateAllConnections();
    this.currentPath = null;
    this.startPort = null;
  }

  updateAllConnections() {
    this.connections.forEach(c => {
      this.drawCurve(
        c.path,
        this.getCoords(c.from.querySelector(".port.out")),
        this.getCoords(c.to.querySelector(".port.in"))
      );
    });
  }

  /* =========================
     EDITOR
  ========================= */
  selectNode(node) {
    document.querySelectorAll(".node").forEach(n => n.classList.remove("selected"));
    this.selectedNode = node;
    node.classList.add("selected");
    this.openEditor(node);
  }

  openEditor(node) {
    this.editor.classList.add("open");
    const title = node.querySelector(".node-title").innerText;

    this.editor.innerHTML = `
      <h3>Configuração</h3>
      <label>Título</label>
      <input id="edit-title" value="${title}">
      <button id="delete-node">Excluir</button>
    `;

    document.getElementById("edit-title").oninput = e =>
      node.querySelector(".node-title").innerText = e.target.value;

    document.getElementById("delete-node").onclick = () => this.removeNode(node);
  }

  removeNode(node) {
    this.connections = this.connections.filter(c => {
      if (c.from === node || c.to === node) {
        c.path.remove();
        return false;
      }
      return true;
    });

    node.remove();
    this.editor.classList.remove("open");
  }

  /* =========================
     SAVE / LOAD
  ========================= */
  save() {
    const data = {
      nodes: this.nodes.map(n => ({
        id: n.id,
        x: n.element.style.left,
        y: n.element.style.top,
        label: n.element.querySelector(".node-title").innerText,
        type: n.type
      })),
      connections: this.connections.map(c => ({
        fromId: c.from.dataset.id,
        toId: c.to.dataset.id
      }))
    };

    localStorage.setItem("lm_flow", JSON.stringify(data));
  }
load() {
  const raw = localStorage.getItem("lm_flow");
  if (!raw) return;

  // 🔥 LIMPA ESTADO ATUAL
  this.nodes = [];
  this.connections = [];
  this.nodeCounter = 0;

  this.canvas.querySelectorAll(".node").forEach(n => n.remove());
  this.svg.innerHTML = "";

  const data = JSON.parse(raw);

  // 🔹 RECRIA NÓS
  data.nodes.forEach(n => {
    this.createNode(
      n.label,
      "🔧",
      "#065f46",
      n.type,
      n.x,
      n.y,
      n.id
    );
  });

  // 🔹 RECRIA CONEXÕES
  data.connections.forEach(c => {
    const from = document.querySelector(`.node[data-id="${c.fromId}"]`);
    const to = document.querySelector(`.node[data-id="${c.toId}"]`);
    if (!from || !to) return;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "#22c55e");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("fill", "none");
    path.classList.add("flow-line");

    this.svg.appendChild(path);
    this.connections.push({ path, from, to });
  });

  this.updateAllConnections();
}

 
  /* =========================
     GEOMETRY
  ========================= */
  drawCurve(path, start, end) {
    const dx = Math.abs(end.x - start.x) * 0.5;
    path.setAttribute(
      "d",
      `M ${start.x} ${start.y}
       C ${start.x + dx} ${start.y},
         ${end.x - dx} ${end.y},
         ${end.x} ${end.y}`
    );
  }

  getCoords(el) {
    const r = el.getBoundingClientRect();
    const c = this.canvas.getBoundingClientRect();
    return { x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 };
  }

  getMousePos(e) {
    const r = this.canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
}

const builder = new FlowBuilder();
