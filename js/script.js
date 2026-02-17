// ============================================
// WORKFLOW ENGINE - PRODUÇÃO (PLUG & SELL)
// Node.js + Express + Redis (BullMQ ready)
// ============================================

import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

// =============================
// MEMÓRIA (trocar por DB depois)
// =============================
const workflows = {}
const executions = {}

// =============================
// UTILIDADES
// =============================
function evaluateCondition(expression, context) {
  try {
    return Function('ctx', `with(ctx){ return ${expression} }`)(context)
  } catch (e) {
    return false
  }
}

// =============================
// ENGINE CORE
// =============================
async function runNode({ workflow, nodeId, executionId, payload }) {
  const node = workflow.nodes.find(n => n.id === nodeId)
  if (!node) return

  executions[executionId].currentNode = nodeId

  switch (node.type) {
    case 'message':
      console.log('📤 Mensagem:', node.data.text)
      return node.next

    case 'condition':
      for (const rule of node.rules) {
        const result = evaluateCondition(rule.if, { payload })
        if (result) return rule.next
      }
      return node.fallback

    case 'delay':
      await new Promise(r => setTimeout(r, node.data.time))
      return node.next

    case 'action':
      console.log('⚙️ Ação executada:', node.data.action)
      return node.next

    case 'input':
      executions[executionId].variables[node.data.key] = payload.text
      return node.next

    default:
      return null
  }
}

async function runWorkflow({ workflowId, contactId, payload }) {
  const workflow = workflows[workflowId]
  if (!workflow) throw new Error('Workflow não encontrado')

  const executionId = `${workflowId}:${contactId}`

  if (!executions[executionId]) {
    executions[executionId] = {
      workflowId,
      contactId,
      currentNode: workflow.start,
      variables: {}
    }
  }

  let nextNode = executions[executionId].currentNode

  while (nextNode) {
    nextNode = await runNode({
      workflow,
      nodeId: nextNode,
      executionId,
      payload
    })
  }

  console.log('✅ Fluxo finalizado')
}

// =============================
// API
// =============================
app.post('/workflow', (req, res) => {
  const workflow = req.body
  workflows[workflow.id] = workflow
  res.json({ status: 'ok', message: 'Workflow salvo' })
})

app.post('/workflow/trigger', async (req, res) => {
  const { workflowId, contactId, payload } = req.body
  try {
    await runWorkflow({ workflowId, contactId, payload })
    res.json({ status: 'executed' })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

// =============================
// SERVER
// =============================
app.listen(3333, () => {
  console.log('🚀 Workflow Engine rodando na porta 3333')
})
