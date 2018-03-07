'use strict'

const api = require('./api')
const ui = require('./ui')

const onAdd = function (event) {
  debugger
  event.preventDefault()
  if ($('#txtaddvehicle').val() === '') {
    $('#txtaddvehicle').css({'border': 'solid', 'border-color': 'red'})
    return false
  } else if ($('#txtaddplate').val() === '') {
    $('#txtaddplate').css({'border': 'solid', 'border-color': 'red'})
    return false
  } else if ($('#txtaddprice').val() === '') {
    $('#txtaddprice').css({'border': 'solid', 'border-color': 'red'})
    return false
  } else if ($('#txtaddtotalgallons').val() === '') {
    $('#txtaddtotalgallons').css({'border': 'solid', 'border-color': 'red'})
    return false
  } else {
    $('#addModal').modal('toggle')
    const data = {
      expense: {
        vehicle: $('#txtaddvehicle').val(),
        plate: $('#txtaddplate').val(),
        price: $('#txtaddprice').val(),
        total_gallons: $('#txtaddtotalgallons').val(),
        discount_rate: $('#txtadddiscountrate').val(),
        net_total: (parseFloat($('#txtaddprice').val()) * parseFloat($('#txtaddtotalgallons').val())) - ((parseFloat($('#txtadddiscountrate').val()) * parseFloat($('#txtaddprice').val())) * parseFloat($('#txtaddtotalgallons').val()))
      }
    }
    console.log('data is ', data)
    api.createExpense(data)
      .then(ui.createExpenseSuccess)
      .catch(ui.createExpenseFailure)
  }
}

const onUpdate = function (event) {
  debugger
  event.preventDefault()
  if ($('#txtupdateid').val() === '') {
    $('#txtupdateid').css({'border': 'solid', 'border-color': 'red'})
    return false
  } else if ($('#txtupdatevehicle').val() === '') {
    $('#txtupdatevehicle').css({'border': 'solid', 'border-color': 'red'})
    return false
  } else if ($('#txtupdateplate').val() === '') {
    $('#txtupdateplate').css({'border': 'solid', 'border-color': 'red'})
    return false
  } else if ($('#txtupdateprice').val() === '') {
    $('#txtupdateprice').css({'border': 'solid', 'border-color': 'red'})
    return false
  } else if ($('#txtupdatetotalgallons').val() === '') {
    $('#txtupdateprice').css({'border': 'solid', 'border-color': 'red'})
    return false
  } else if ($('#txtupdatediscountrate').val() === '') {
    $('#txtupdatediscountrate').css({'border': 'solid', 'border-color': 'red'})
    return false
  } else {
    $('#updateModal').modal('toggle')
    const data = {
      expense: {
        id: $('#txtupdateid').val(),
        vehicle: $('#txtupdatevehicle').val(),
        plate: $('#txtupdateplate').val(),
        price: $('#txtupdateprice').val(),
        total_gallons: $('#txtupdatetotalgallons').val(),
        discount_rate: $('#txtupdatediscountrate').val(),
        net_total: (parseFloat($('#txtupdateprice').val()) * parseFloat($('#txtupdatetotalgallons').val())) - ((parseFloat($('#txtupdatediscountrate').val()) * parseFloat($('#txtupdateprice').val())) * parseFloat($('#txtupdatetotalgallons').val()))
      }
    }
    console.log('data is ', data)
    api.updateExpense(data)
      .then(ui.updateExpenseSuccess)
      .catch(ui.updateExpenseFailure)
  }
}

const onDelete = function (event) {
  debugger
  event.preventDefault()
  if ($('#txtdeleteid').val() === '') {
    $('#txtdeleteid').css({'border': 'solid', 'border-color': 'red'})
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

const onClearUpdateDeleteInputs = function (event) {
  $('#txtupdateid').val('')
  $('#txtupdatebird').val('')
  $('#txtupdatecharacteristics').val('')
  $('#txtupdatecolor').val('')
  $('#txtdeleteid').val('')
}

const addHandlers = function () {
  $('#btn-expense-add').on('click', onAdd)
  $('#btn-expense-update').on('click', onUpdate)
  $('#btn-expense-delete').on('click', onDelete)
  $('#updateModal').on('hidden.bs.modal', onClearUpdateDeleteInputs)
  $('#deleteModal').on('hidden.bs.modal', onClearUpdateDeleteInputs)
}

module.exports = {
  addHandlers
}
