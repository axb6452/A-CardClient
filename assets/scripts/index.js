'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
const cardEvents = require('./card/events')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.login-page').show()
  $('.application-page').hide()
  authEvents.addHandlers()
  cardEvents.addHandlers()
  // $('.expense-grid').on('load', cardEvents.onGridLoad())
})
