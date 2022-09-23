const { model } = require('mongoose')
const { user, company, invoice, customer, inventoryItem, blacklist, estimate } = require('./schemas')

module.exports = {
    User: model('User', user),
    Company: model('Company', company),
    Invoice: model('Invoice', invoice),
    Estimate: model('Estimate', estimate),
    Customer: model('Customer', customer),
    InventoryItem: model('InventoryItem', inventoryItem),
    Blacklist: model('Blacklist', blacklist),
}