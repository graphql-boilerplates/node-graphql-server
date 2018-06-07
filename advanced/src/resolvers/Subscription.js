const Subscription = {
  feedSubscription: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.db.subscription.post(
        {
          where: {
            node: {
              isPublished: true,
            },
          },
        },
        info,
      )
    },
  },
}

module.exports = { Subscription }
