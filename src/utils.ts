import * as jwt from 'jsonwebtoken'
import * as fs from 'fs'
import { Graphcool } from 'graphcool-orm'

export interface Context {
  graphcool: Graphcool
  request: any
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    return userId
  }

  throw new AuthError()
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
