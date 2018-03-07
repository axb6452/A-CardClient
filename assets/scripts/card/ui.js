
const store = require('../store')
const api = require('./api')

// const clock = function () {
//   const time = new Date()
//   const hours = time.getHours()
//   const minutes = time.getMinutes()
//   const seconds = time.getSeconds()
//
//   $('#clock').text(harold(hours) + ':' + harold(minutes) + ':' + harold(seconds))
//   function harold (standIn) {
//     if (standIn < 10) {
//       standIn = '0' + standIn
//     }
//     return standIn
//   }
// }

const getAllExpensesSuccess = function (data) {
  debugger
  console.log('number of records: ', data.expenses.length)
  if (data.expenses.length === 0) {
    $('#transactions-grid').hide()
    $('#btnUpdate').hide()
    $('#btnDelete').hide()
    // $('.latestsighting-class').hide()
  } else {
    // let latestSighting = new Date(data.sightings[0].created_at)
    // latestSighting = latestSighting.toString()
    // latestSighting = latestSighting.slice(0, length - 15)
    // $('#latestsighting').text(latestSighting).css('color', '#4C4C4C')
    $('#transactions-grid').show()
    $('#btnUpdate').show()
    $('#btnDelete').show()
    // $('.latestsighting-class').show()
    $('#transactions-grid td').remove()
    let tr
    let tbody
    let totalSavings = 0
    for (let i = 0; i < data.expenses.length; i++) {
      // console.log('total gallons ', data.expenses.total_gallons)
      // console.log(typeof (data.expenses.total_gallons))
      // console.log('price ', data.expenses.price)
      // console.log(typeof (data.expenses.price))

      totalSavings = totalSavings + ((data.expenses[i].total_gallons * data.expenses[i].price) - data.expenses[i].net_total)
      tbody = $('<tbody>')
      tr = $('<tr/>')
      tr.append('<td>' + (i + 1) + '</td>')
      tr.append('<td>' + data.expenses[i].id + '</td>')
      tr.append('<td>' + data.expenses[i].vehicle + '</td>')
      tr.append('<td>' + data.expenses[i].plate + '</td>')
      tr.append('<td>' + data.expenses[i].price + '</td>')
      tr.append('<td>' + data.expenses[i].total_gallons + '</td>')
      tr.append('<td>' + data.expenses[i].discount_rate + '</td>')
      tr.append('<td>' + data.expenses[i].net_total + '</td>')
      tbody.append(tr)
      $('#transactions-grid').append(tbody)
    }
    totalSavings = totalSavings.toFixed(3)
    const tfoot = $('<tfoot>')
    tr = $('<tr/>')
    tr.append('<td></td><td></td><td></td><td></td><td><td></td><td><b>Total Savings:</b></td><td>' + totalSavings + '</td>')
    tfoot.append(tr)
    $('#transactions-grid').append(tfoot)
  }
}

const getAllExpensesFailure = function () {
  debugger
  clearFormFields()
  $('#lbl-transactions').text('Error Getting All Expenses').css({'background-color': 'white', 'color': 'red', 'opacity': '100'})
  $('#lbl-transactions').show()
}

const createExpenseSuccess = function (data) {
  debugger
  clearFormFields()
  // $('#latestsighting').text(Date(data.sighting.created_at))
  $('#lbl-transactions')
    .text('New Expense Created by user ' + store.user.email)
    .css({'color': 'green', 'background-color': 'white', 'opacity': '100'})
  $('#lbl-transactions').show()
  $('#lbl-transactions').fadeTo(5000, 0)
  api.getAllExpenses()
    .then(getAllExpensesSuccess).catch(getAllExpensesFailure)
}

const createExpenseFailure = function () {
  debugger
  clearFormFields()
  $('#lbl-transactions').text('Error Creating Expense Record').css({'background-color': 'white', 'color': 'red', 'opacity': '100'})
  $('#lbl-transactions').show()
}

const updateExpenseSuccess = function (data) {
  debugger
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
  debugger
  clearFormFields()
  $('#lbl-transactions').text('Error Updating Expense').css({'background-color': 'white', 'color': 'red', 'opacity': '100'})
  $('#lbl-transactions').show()
}

const deleteExpenseSuccess = function () {
  debugger
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
  debugger
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
