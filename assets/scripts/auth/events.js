'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  if ($('#txtoldpassword').val() === '') {
    $('#txtoldpassword').css({'border': 'solid', 'border-color': 'red'})
    return false
  } else if ($('#txtnewpassword').val() === '') {
    $('#txtnewpassword').css({'border': 'solid', 'border-color': 'red'})
    return false
  } else {
    $('#modal-changepassword').modal('toggle')
    const data = {
      passwords: {
        old: $('#txtoldpassword').val(),
        new: $('#txtnewpassword').val()
      }
    }
    api.changePassword(data)
      .then(ui.changePasswordSuccess)
      .catch(ui.changePasswordFailure)
  }
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onClearInputs = function (event) {
  $('#txtoldpassword').val('')
  $('#txtnewpassword').val('')
  $('#transactions-link').addClass('active')
  $('#fuelrates-link').removeClass('active')
  $('#btn-changepassword').removeClass('active')
}

const addHandlers = function () {
  $('#signupform').on('submit', onSignUp)
  $('#loginform').on('submit', onSignIn)
  $('#btn-logout').on('click', onSignOut)
  $('#btn-submitpassword').on('click', onChangePassword)
  $('#login-link').on('click', function () { $('#about-page').hide(); $('#box-page').show(); $('#login-link').addClass('active'); $('#about-link').removeClass('active') })
  $('#about-link').on('click', function () { $('#box-page').hide(); $('#about-page').show(); $('#login-link').removeClass('active'); $('#about-link').addClass('active') })
  $('#btn-changepassword').on('click', function () { $('#transactions-link').removeClass('active'); $('#fuelrates-link').removeClass('active'); $('#btn-changepassword').addClass('active') })
  $('#modal-changepassword').on('hidden.bs.modal', onClearInputs)
}

module.exports = {
  addHandlers
}
