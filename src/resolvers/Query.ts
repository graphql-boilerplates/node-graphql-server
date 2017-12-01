import { getUserId, Context } from '../utils'

export const Query = {
  feed(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return ctx.graphcool.allBookings({ filter: { bookee: { id } } }, info)
  },

  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx)
    return ctx.graphcool.User({ id }, info)
  },
}
