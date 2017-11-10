import { request } from 'graphql-request'
import * as jwt from 'jsonwebtoken'

export async function login({ args: { email, password }}) {
  const token = await authUser(email, password)

  return { token }
}

async function authUser(email: string, password: string): Promise<string> {
  const query = `query getUser($email: String!) {
    User(email: $email) {
      id
      password
    }
  }`
  const { User } = await request<any>(process.env.GRAPHQL_ENDPOINT!, query, {
    email,
  })

  // TODO hash password with bcrypt
  if (User === null || User.password !== password) {
    throw new Error('Auth failed')
  }

  return jwt.sign({ userId: User.id }, process.env.JWT_SECRET!)
}
