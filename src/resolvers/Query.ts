import { getUserId, Context } from '../utils'

export const Query = {
  feed(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return ctx.db.allPosts({}, info)
  },

  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return ctx.db.User({ id }, info)
  },
}
