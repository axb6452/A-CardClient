'use strict'

const api = require('./api')
const ui = require('./ui')

const onGetFuelRates = function(event) {
  api.getAllFuelRates()
    .then(ui.getAllFuelRatesSuccess)
    .catch(ui.getAllFuelRatesFailure)
}

const onGetTransactions = function(event) {
  api.getAllExpenses()
    .then(ui.getAllExpensesSuccess)
    .catch(ui.getAllExpensesFailure)
}

const onAdd = function(event) {
  debugger
  let stationId
  switch ($('#txtaddstation').val()) {
    case 'Shell':
      stationId = 2
      break
    case 'Sunoco':
      stationId = 4
      break
    case 'BP':
      stationId = 3
      break
    case 'Wawa':
      stationId = 1
      break
    default:
      stationId = 2
  }
  event.preventDefault()
  if ($('#txtaddplate').val() === '') {
    $('#txtaddplate').css({
      'border': 'solid',
      'border-color': 'red'
    })
    return false
  } else if ($('#txtaddtotalgallons').val() === '') {
    $('#txtaddtotalgallons').css({
      'border': 'solid',
      'border-color': 'red'
    })
    return false
  } else {
    $('#addModal').modal('toggle')
    const data = {
      expense: {
        vehicle: $('#txtaddvehicle').val(),
        plate: $('#txtaddplate').val(),
        total_gallons: $('#txtaddtotalgallons').val(),
        discount_rate: 0.05,
        station_id: stationId
      }
    }
    console.log('data is ', data)
    api.createExpense(data)
      .then(ui.createExpenseSuccess)
      .catch(ui.createExpenseFailure)
  }
}

const onUpdate = function(event) {
  debugger
  let stationId
  switch ($('#txtupdatestation').val()) {
    case 'Shell':
      stationId = 2
      break
    case 'Sunoco':
      stationId = 4
      break
    case 'BP':
      stationId = 3
      break
    case 'Wawa':
      stationId = 1
      break
    default:
      stationId = 2
  }
  event.preventDefault()
  if ($('#txtupdateid').val() === '') {
    $('#txtupdateid').css({
      'border': 'solid',
      'border-color': 'red'
    })
    return false
  } else if ($('#txtupdateplate').val() === '') {
    $('#txtupdateplate').css({
      'border': 'solid',
      'border-color': 'red'
    })
    return false
  } else if ($('#txtupdatetotalgallons').val() === '') {
    $('#txtupdateprice').css({
      'border': 'solid',
      'border-color': 'red'
    })
    return false
  } else {
    $('#updateModal').modal('toggle')
    const data = {
      expense: {
        id: $('#txtupdateid').val(),
        vehicle: $('#txtupdatevehicle').val(),
        plate: $('#txtupdateplate').val(),
        total_gallons: $('#txtupdatetotalgallons').val(),
        discount_rate: 0.05,
        station_id: stationId
      }
    }
    console.log('data is ', data)
    api.updateExpense(data)
      .then(ui.updateExpenseSuccess)
      .catch(ui.updateExpenseFailure)
  }
}

const onDelete = function(event) {
  debugger
  event.preventDefault()
  if ($('#txtdeleteid').val() === '') {
    $('#txtdeleteid').css({
      'border': 'solid',
      'border-color': 'red'
    })
    return false
  } else {
    $('#deleteModal').modal('toggle')
    api.deleteExpense()
      .then(ui.deleteExpenseSuccess)
      .catch(ui.deleteExpenseFailure)
  }
}

// const onGridLoad = function (event) {
//   api.getAllExpenses()
//     .then(ui.getAllExpensesSuccess)
//     .catch(ui.getAllExpensesFailure)
// }

const onClearUpdateDeleteInputs = function(event) {
  $('#txtupdateid').val('')
  $('#txtupdatebird').val('')
  $('#txtupdatecharacteristics').val('')
  $('#txtupdatecolor').val('')
  $('#txtdeleteid').val('')
}

const addHandlers = function() {
  $('#fuelrates-link').on('click', onGetFuelRates)
  $('#transactions-link').on('click', onGetTransactions)
  $('#btn-expense-add').on('click', onAdd)
  $('#btn-expense-update').on('click', onUpdate)
  $('#btn-expense-delete').on('click', onDelete)
  $('#updateModal').on('hidden.bs.modal', onClearUpdateDeleteInputs)
  $('#deleteModal').on('hidden.bs.modal', onClearUpdateDeleteInputs)
}

module.exports = {
  addHandlers
}
