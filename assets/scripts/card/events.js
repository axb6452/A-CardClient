'use strict'

const api = require('./api')
const ui = require('./ui')

const onGetFuelRates = function (event) {
  $('#transactions-link').removeClass('active')
  $('#btn-changepassword').removeClass('active')
  $('#fuelrates-link').addClass('active')
  api.getAllFuelRates()
    .then(ui.getAllFuelRatesSuccess)
    .catch(ui.getAllFuelRatesFailure)
}

const onGetTransactions = function (event) {
  $('#transactions-link').addClass('active')
  $('#fuelrates-link').removeClass('active')
  $('#btn-changepassword').removeClass('active')
  api.getAllExpenses()
    .then(ui.getAllExpensesSuccess)
    .catch(ui.getAllExpensesFailure)
}

const onAdd = function (event) {
  event.preventDefault()
  let stationId
  switch ($('#txtaddstation').val()) {
    case 'Shell':
      stationId = 1
      break
    case 'Sunoco':
      stationId = 2
      break
    case 'BP':
      stationId = 3
      break
    case 'Wawa':
      stationId = 4
      break
    default:
      stationId = 1
  }
  const checkPlateInjection = /<|>/g.test($('#txtaddplate').val())
  const totalGallonNaN = isNaN($('#txtaddtotalgallons').val())
  if ($('#txtaddplate').val() === '' || checkPlateInjection === true) {
    $('#txtaddplate').css({
      'border': 'solid',
      'border-color': 'red'
    })
    return false
  } else if ($('#txtaddtotalgallons').val() === '' || totalGallonNaN === true) {
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
    api.createExpense(data)
      .then(ui.createExpenseSuccess)
      .catch(ui.createExpenseFailure)
  }
}

const onUpdate = function (event) {
  event.preventDefault()
  let stationId
  switch ($('#txtupdatestation').val()) {
    case 'Shell':
      stationId = 1
      break
    case 'Sunoco':
      stationId = 2
      break
    case 'BP':
      stationId = 3
      break
    case 'Wawa':
      stationId = 4
      break
    default:
      stationId = 1
  }
  // const plate = $('#txtupdateplate').val().replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const checkPlateInjection = /<|>/g.test($('#txtupdateplate').val())
  const totalGallonNaN = isNaN($('#txtupdatetotalgallons').val())
  if ($('#txtupdateid').val() === '') {
    $('#txtupdateid').css({
      'border': 'solid',
      'border-color': 'red'
    })
    return false
  } else if ($('#txtupdateplate').val() === '' || checkPlateInjection === true) {
    $('#txtupdateplate').css({
      'border': 'solid',
      'border-color': 'red'
    })
    return false
  } else if ($('#txtupdatetotalgallons').val() === '' || totalGallonNaN === true) {
    $('#txtupdatetotalgallons').css({
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
    api.updateExpense(data)
      .then(ui.updateExpenseSuccess)
      .catch(ui.updateExpenseFailure)
  }
}

const onDelete = function (event) {
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

const onClearUpdateDeleteInputs = function (event) {
  $('#txtupdateid').val('')
  $('#txtupdatebird').val('')
  $('#txtupdatecharacteristics').val('')
  $('#txtupdatecolor').val('')
  $('#txtdeleteid').val('')
}

const addHandlers = function () {
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
