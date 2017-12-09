import { Context } from '../utils'

export const AuthPayload = {
  user: async ({ user: { id } }, args, ctx: Context, info) => {
    return ctx.db.query.user({ id }, info)
  },
}
