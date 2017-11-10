import { request } from 'graphql-request'
import * as jwt from 'jsonwebtoken'

export async function signup({args: { email, password }}) {
  const token = await signupUser(email, password)
  return { token }
}

async function signupUser(email: string, password: string): Promise<string> {
  const query = `mutation newUser($email: String!, $password: String!) {
    User: createUser(email: $email, password: $password) {
      id
    }
  }`
  const { User } = await request<any>(process.env.GRAPHQL_ENDPOINT!, query, { email, password })

  return jwt.sign({ userId: User.id }, process.env.JWT_SECRET!)
}
