const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { AuthPayload } = require('./AuthPayload')
const { scalars } = require('graphcool-binding')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...post,
  },
  AuthPayload,
  DateTime: scalars.DateTime,
}
