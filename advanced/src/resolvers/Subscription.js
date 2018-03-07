const { getUserId } = require('../utils')

const Subscription = {
  async feedSubscription(parent, args, ctx, info) {
    return await ctx.db.subscription.post({ where: {
      mutation_in: ['CREATED', 'DELETED', 'DELETED'],
      node: {
        isPublished: true
      },
    }}, info)
  },
}

module.exports = { Subscription }
