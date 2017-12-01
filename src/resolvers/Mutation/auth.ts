import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { AuthError, Context } from '../../utils'

export const auth = {
  async signup(parent, args, ctx: Context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.graphcool.createUser({ ...args, password })

    return {
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
      user,
    }
  },

  async login(parent, args, ctx: Context, info) {
    const user = await ctx.graphcool.User({ email: args.email })
    if (!user) {
      throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new AuthError()
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
      user,
    }
  },
}
