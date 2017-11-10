import * as jwt from 'jsonwebtoken'

export async function authMiddleware({context, parent, args, info}, next) {
  const Authorization = context.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    if (userId) {
      return await next({context, parent, args, info})
    }
  }

  throw new AuthError()
}

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
