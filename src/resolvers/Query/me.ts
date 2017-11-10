import * as jwt from 'jsonwebtoken'
import { checkPermission } from '../../util'

export async function me({context, info}) {
  const token = context.req.get('Authorization').replace('Bearer ', '')
  const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

  // check permission
  const isValid = await checkPermission(`{ SomeUserExists(filter: { id: "${userId}" }) }`)
  if (!isValid) {
    throw new Error('User unauthenticated')
  }

  return context.delegate('query', 'User', { id: userId }, context, info)
}
