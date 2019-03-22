'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let config = {
  logging: function () {}
}
let MetricStub = {
  belongsTo: sinon.spy()
}
let AgentStub = null
let db = null
let sandbox = null
test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  AgentStub = {
    hasMany: sandbox.spy()
  }
  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })
  db = await setupDatabase(config)
})
test.afterEach(() => {
  sandbox && sandbox.restore()
})
test('Agent', t => {
  t.truthy(db.Agent, 'Agente servicio existe')
})

test.serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'AgentModel.hasMany fue ejecutada')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Los arguments podrian ser de MetricModel')
  t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo fue ejecutado')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Los argumentos que podrian ser de AgentModel')
})
