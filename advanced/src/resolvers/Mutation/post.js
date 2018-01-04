const { getUserId, Context } = require('../../utils')

const post = {
  async writePost(parent, { title, text }, ctx, info) {
    const authorId = getUserId(ctx)
    return ctx.db.mutation.createPost(
      {
        data: {
          title,
          text,
          author: {
            connect: { id: authorId },
          },
        },
      },
      info,
    )
  },

  async deletePost(parent, { id }, ctx, info) {
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

module.exports = { post }
