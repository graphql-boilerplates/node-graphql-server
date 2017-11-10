import { checkPermission, getUserId } from '../../util'

export async function friendsPosts({args: { limit }, context, info}) {
  const userId = getUserId(context)
  const filter = {
    author: {
      friends_some: {
        id: userId
      }
    }
  }
  const posts = await context.delegate('query', 'allPosts', { last: limit, filter }, context, info)

  return posts
}
