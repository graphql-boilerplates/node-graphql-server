import { getUserId, Context } from '../../utils'

export const post = {
  async writePost(parent, args, ctx: Context, info) {
    const authorId = getUserId(ctx)
    return ctx.graphcool.createPost({ ...args, authorId }, info)
  },

  async deletePost(parent, { id }, ctx: Context, info) {
    const authorId = getUserId(ctx)
    const postExists = await ctx.graphcool.PostExists({
      id,
      author: { id: authorId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.graphcool.deletePost({ id }, info)
  },
}
