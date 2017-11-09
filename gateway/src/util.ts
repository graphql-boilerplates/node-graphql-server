import * as jwt from 'jsonwebtoken'
import {GraphQLClient} from 'graphql-request'

const permissionClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT + '/permissions', {
  headers: {
    Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
  }
})

export async function checkPermission(query, variables?: any) {
  const result = await permissionClient.request(query, variables)

  return Object.keys(result).reduce((acc, key) => result[key] && acc, true)
}

export function getUserId(context) {
  const Authorization = context.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    return userId
  }
  return null
}
