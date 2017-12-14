import { getUserId, Context } from '../../utils'

export const post = {
  async writePost(parent, { title, text }, ctx: Context, info) {
    const authorId = getUserId(ctx)
    return ctx.db.mutation.createPost(
      { data: { title, text, authorId, isPublished: true } },
      info,
    )
  },

  async deletePost(parent, { id }, ctx: Context, info) {
    const authorId = getUserId(ctx)
    const postExists = await ctx.db.exists.posts({
      id,
      author: { id: authorId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.deletePost({ where: { id } })
  },
}
