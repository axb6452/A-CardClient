'use strict'

const store = require('../store')
const cardApi = require('../card/api')
const cardUi = require('../card/ui')

const signUpSuccess = function (data) {
  clearAuthFields()
  $('#lbl-signup').text('User ' + data.user.email + ' successfully created.')
    .css({'color': 'green', 'background-color': 'white', 'opacity': '100'})
  $('#lblSignUpMessage').show()
  $('#lblSignUpMessage').fadeTo(3000, 0)
}

const signUpFailure = function () {
  clearAuthFields()
  $('#lbl-signup').text('Error during sign up')
    .css({'color': 'red', 'background-color': 'white', 'opacity': '100'}).show()
}

const signInSuccess = function (data) {
  debugger
  clearAuthFields()
  store.user = data.user
  $('.login-page').hide()
  $('.application-page').show()
  $('#transactions-link').addClass('active')
  // $('#userlabel').text(store.user.email + '; id: ' + store.user.id).css('color', '#4C4C4C')
  $('#lbl-transactions').text('User ' + store.user.email + ' successfully signed in.')
    .css({'color': 'green', 'background-color': 'white', 'opacity': '100'})
  $('#lbl-transactions').fadeTo(3000, 0)
  $('#lbl-transactions').show()
  cardApi.getAllExpenses()
    .then(cardUi.getAllExpensesSuccess).catch(cardUi.getAllExpensesFailure)
}

const signInFailure = function () {
  clearAuthFields()
  $('#lbl-signin').text('Error during sign in')
    .css({'color': 'red', 'background-color': 'white', 'opacity': '100'}).show()
}

const changePasswordSuccess = function () {
  clearAuthFields()
  $('#lbl-transactions')
    .text('Successfully changed password')
    .css({'color': 'green', 'background-color': 'white', 'opacity': '100'})
    .show()
  $('#lbl-transactions').fadeTo(3000, 0)
}

const changePasswordFailure = function () {
  clearAuthFields()
  $('#lbl-transactions').text('Error during change password')
    .css({'color': 'red', 'background-color': 'white', 'opacity': '100'}).show()
}

const signOutSuccess = function () {
  clearAuthFields()
  $('.application-page').hide()
  $('.login-page').show()
  $('#lbl-signin').text('User ' + store.user.email + ' successfully signed out.')
    .css({'color': 'green', 'background-color': 'white', 'opacity': '100'})
  $('#lbl-signin').show()
  $('#lbl-signin').fadeTo(3000, 0)
}

const signOutFailure = function () {
  clearAuthFields()
  $('#lbl-transactions').text('Error during sign out')
    .css({'color': 'red', 'background-color': 'white', 'opacity': '100'}).show()
  $('#lbl-transactions').show()
}

const clearAuthFields = function () {
  $('#signupform').find('input:text').val('')
  $('#loginform').find('input:password').val('')
  $('#loginform').find('input:text').val('')
  $('.input-user-changepassword').val('')
  $('#lbl-transactions').text('')
  $('#lbl-signup').text('')
  $('#lbl-signin').text('')
  $('#txtoldpassword').css({'border': 'solid', 'border-color': '#ccc'})
  $('#txtnewpassword').css({'border': 'solid', 'border-color': '#ccc'})
  // $('#lblgridmessage').text('')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  clearAuthFields
}
