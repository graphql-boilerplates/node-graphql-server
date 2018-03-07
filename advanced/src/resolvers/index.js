const { Query } = require('./Query')
const { Subcription } = require('./Subcription')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { AuthPayload } = require('./AuthPayload')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...post,
  },
  ...Subcription
  AuthPayload,
}
