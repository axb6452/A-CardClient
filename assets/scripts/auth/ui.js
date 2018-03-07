'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  // clearAuthFields()
  console.log('successfully signed up')
}

const signUpFailure = function () {
  // clearAuthFields()
  console.log('Error during sign up')
}

const signInSuccess = function (data) {
  // clearAuthFields()
  store.user = data.user
  console.log('successfuly signed in')
  $('.login-page').hide()
  $('.transactions-page').show()
}

const signInFailure = function () {
  // clearAuthFields()
  // $('#lblSignOutMessage').text('Error during sign in')
  // .css({'color': 'red', 'background-color': 'white', 'opacity': '100'}).show()
  console.log('error during sign in')
}

const changePasswordSuccess = function () {
  // clearAuthFields()
  // $('#lblSignInMessage')
  //   .text('Successfully changed password')
  //   .css({'color': 'green', 'background-color': 'white', 'opacity': '100'})
  //   .show()
  // $('#lblSignInMessage').fadeTo(3000, 0)
  console.log('successfully changed password')
}

const changePasswordFailure = function () {
  // clearAuthFields()
  // $('#lblSignInMessage').text('Error during change password')
  //   .css({'color': 'red', 'background-color': 'white', 'opacity': '100'}).show()
  console.log('change password failure')
}

const signOutSuccess = function () {
  // clearAuthFields()
  // $('.sighting-grid').hide()
  // $('.userlogin').show()
  // $('#lblSignOutMessage').text('User ' + store.user.email + ' successfully signed out.')
  //   .css({'color': 'green', 'background-color': 'white', 'opacity': '100'})
  // $('#lblSignOutMessage').show()
  // $('#lblSignOutMessage').fadeTo(3000, 0)
  console.log('successfully signed out')
  $('.transactions-page').hide()
  $('.login-page').show()
}

const signOutFailure = function () {
  // clearAuthFields()
  // $('#lblSignOutMessage').show()
  // $('#lblSignOutMessage').text('Error during sign out')
  //   .css({'color': 'red', 'background-color': 'white', 'opacity': '100'}).show()
  console.log('Error during sign out')
}

const clearAuthFields = function () {
  $('#sign-in').find('input:text').val('')
  $('#sign-in').find('input:password').val('')
  $('#sign-up').find('input:text').val('')
  $('#sign-up').find('input:password').val('')
  $('#txtoldpassword').val('')
  $('#txtnewpassword').val('')
  $('.input-user-changepassword').val('')
  $('#lblSignUpMessage').text('')
  $('#lblSignInMessage').text('')
  $('#lblSignOutMessage').text('')
  $('#txtoldpassword').css('border', '0')
  $('#txtnewpassword').css('border', '0')
  $('#lblgridmessage').text('')
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
