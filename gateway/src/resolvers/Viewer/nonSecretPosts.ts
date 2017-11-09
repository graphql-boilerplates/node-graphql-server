import { checkPermission } from '../../util'

export async function nonSecretPosts({args: { limit }, context, info}) {
  const posts = await context.delegate('query', 'allPosts', { last: limit, filter: {secret: false} }, context, info)

  // optionally additional checks can be executed on the data
  const results = await Promise.all(posts.map(item => checkPermission(`{
    SomePostExists(filter: {
      id: "${item.id}"
      secret: false
    })
  }`)))

  return posts.filter((_, index) => results[index])
}
