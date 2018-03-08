'use strict'

const config = require('../config')
const store = require('../store')

const getAllFuelRates = function () {
  debugger
  return $.ajax({
    url: config.apiOrigin + '/stations',
    method: 'GET'
  })
}

const getAllExpenses = function () {
  debugger
  return $.ajax({
    url: config.apiOrigin + '/expenses',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createExpense = function (data) {
  debugger
  return $.ajax({
    url: config.apiOrigin + '/expenses',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const updateExpense = function (data) {
  debugger
  return $.ajax({
    url: config.apiOrigin + '/expenses/' + $('#txtupdateid').val(),
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteExpense = function () {
  debugger
  return $.ajax({
    url: config.apiOrigin + '/expenses/' + $('#txtdeleteid').val(),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getAllFuelRates,
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense
}
