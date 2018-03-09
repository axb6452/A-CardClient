
const store = require('../store')
const api = require('./api')

const getAllFuelRatesSuccess = function (data) {
  if (data.stations.length === 0) {
    $('#fuelrates-grid').hide()
  } else {
    $('#fuelrates-grid').show()
    $('#fuelrates-grid td').remove()
    let tr
    let tbody
    for (let i = 0; i < data.stations.length; i++) {
      tbody = $('<tbody>')
      tr = $('<tr/>')
      tr.append('<td>' + (i + 1) + '</td>')
      tr.append('<td>' + data.stations[i].id + '</td>')
      tr.append('<td>' + data.stations[i].name + '</td>')
      tr.append('<td>' + data.stations[i].petrol_price + '</td>')
      tr.append('<td>' + data.stations[i].diesel_price + '</td>')
      tbody.append(tr)
      $('#fuelrates-grid').append(tbody)
    }
  }
  $('.fuelrates-page').show()
  $('.transactions-page').hide()
}

const getAllFuelRatesFailure = function () {
  clearFormFields()
  $('.fuelrates-page').show()
  $('.transactions-page').hide()
  $('#lbl-transactions').text('Error Getting All Fuel Rates').css({'background-color': 'white', 'color': 'red', 'opacity': '100'})
  $('#lbl-transactions').show()
}

const getAllExpensesSuccess = function (data) {
  if (data.expenses.length === 0) {
    $('#transactions-grid').hide()
    $('#btnUpdate').hide()
    $('#btnDelete').hide()
  } else {
    $('#transactions-grid').show()
    $('#btnUpdate').show()
    $('#btnDelete').show()
    $('#transactions-grid td').remove()
    let tr
    let tbody
    let totalSavings = 0
    let price
    let netTotal
    let createdAt
    for (let i = 0; i < data.expenses.length; i++) {
      if (data.expenses[i].vehicle === 'Semi-trailer truck' || data.expenses[i].vehicle === 'Pickup truck') {
        price = data.expenses[i].station.diesel_price
      } else {
        price = data.expenses[i].station.petrol_price
      }

      netTotal = (price * data.expenses[i].total_gallons) - ((price * data.expenses[i].discount_rate) * data.expenses[i].total_gallons)

      totalSavings = totalSavings + ((data.expenses[i].total_gallons * price) - netTotal)

      createdAt = new Date(data.expenses[i].created_at)
      createdAt = createdAt.toString()
      createdAt = createdAt.slice(0, length - 15)

      tbody = $('<tbody>')
      tr = $('<tr/>')
      tr.append('<td>' + (i + 1) + '</td>')
      tr.append('<td>' + createdAt + '</td>')
      tr.append('<td>' + data.expenses[i].id + '</td>')
      tr.append('<td>' + data.expenses[i].vehicle + '</td>')
      tr.append('<td>' + data.expenses[i].plate + '</td>')
      tr.append('<td>' + price.toFixed(3) + '</td>')
      tr.append('<td>' + data.expenses[i].total_gallons + '</td>')
      tr.append('<td>' + data.expenses[i].discount_rate + '</td>')
      tr.append('<td>' + netTotal.toFixed(3) + '</td>')
      tbody.append(tr)
      $('#transactions-grid').append(tbody)
    }
    totalSavings = totalSavings.toFixed(3)
    const tfoot = $('<tfoot>')
    tr = $('<tr/>')
    tr.append('<td></td><td></td><td></td><td></td><td><td></td><td></td><td><b>Total Savings:</b></td><td>' + totalSavings + '</td>')
    tfoot.append(tr)
    $('#transactions-grid').append(tfoot)
  }
  $('.fuelrates-page').hide()
  $('.transactions-page').show()
}

const getAllExpensesFailure = function () {
  clearFormFields()
  $('.fuelrates-page').hide()
  $('.transactions-page').show()
  $('#lbl-transactions').text('Error Getting All Expenses').css({'background-color': 'white', 'color': 'red', 'opacity': '100'})
  $('#lbl-transactions').show()
}

const createExpenseSuccess = function (data) {
  clearFormFields()
  $('#lbl-transactions')
    .text('New Expense Created by user ' + store.user.email)
    .css({'color': 'green', 'background-color': 'white', 'opacity': '100'})
  $('#lbl-transactions').show()
  $('#lbl-transactions').fadeTo(5000, 0)
  api.getAllExpenses()
    .then(getAllExpensesSuccess).catch(getAllExpensesFailure)
}

const createExpenseFailure = function () {
  clearFormFields()
  $('#lbl-transactions').text('Error Creating Expense Record').css({'background-color': 'white', 'color': 'red', 'opacity': '100'})
  $('#lbl-transactions').show()
}

const updateExpenseSuccess = function (data) {
  clearFormFields()
  $('#lbl-transactions')
    .text('Expense with id ' + data.expense.id + ' has been updated by user ' + store.user.email)
    .css({'color': 'green', 'background-color': 'white', 'opacity': '100'})
  $('#lbl-transactions').show()
  $('#lbl-transactions').fadeTo(5000, 0)
  api.getAllExpenses()
    .then(getAllExpensesSuccess).catch(getAllExpensesFailure)
}

const updateExpenseFailure = function () {
  clearFormFields()
  $('#lbl-transactions').text('Error Updating Expense').css({'background-color': 'white', 'color': 'red', 'opacity': '100'})
  $('#lbl-transactions').show()
}

const deleteExpenseSuccess = function () {
  clearFormFields()
  const id = $('#txtdeleteid').val()
  $('#lbl-transactions')
    .text('Expense with id ' + id + ' has been deleted by user ' + store.user.email)
    .css({'color': 'green', 'background-color': 'white', 'opacity': '100'})
  $('#lbl-transactions').show()
  $('#lbl-transactions').fadeTo(5000, 0)
  api.getAllExpenses()
    .then(getAllExpensesSuccess).catch(getAllExpensesFailure)
}

const deleteExpenseFailure = function () {
  clearFormFields()
  $('#lbl-transactions').text('Error Deleting Expense Record').css({'background-color': 'white', 'color': 'red', 'opacity': '100'})
  $('#lbl-transactions').show()
}

const clearFormFields = function () {
  $('.input-expense-add').val('').css({'border': 'solid', 'border-color': '#ccc'})
  $('.input-expense-update').val('').css({'border': 'solid', 'border-color': '#ccc'})
  $('.input-expense-delete').val('').css({'border': 'solid', 'border-color': '#ccc'})
  $('#lbl-transactions').text('')
}

module.exports = {
  getAllFuelRatesSuccess,
  getAllFuelRatesFailure,
  getAllExpensesSuccess,
  getAllExpensesFailure,
  createExpenseSuccess,
  createExpenseFailure,
  updateExpenseSuccess,
  updateExpenseFailure,
  deleteExpenseSuccess,
  deleteExpenseFailure,
  clearFormFields
}
