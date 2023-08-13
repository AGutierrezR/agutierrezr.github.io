export function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, { timeZone: 'UTC' })
}

export function formatBlogPosts(posts, {
  filterOutDrafts = true,
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined,
} = {}) {

  const filterdedPost = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;

    // Filter out draft posts
    if (filterOutDrafts && draft) return acc;

    // Filter out future posts
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc

    acc.push(post)

    return acc
  }, [])

  if (sortByDate) {
    filterdedPost.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  }

  if (typeof limit === 'number') {
    return filterdedPost.slice(0, limit)
  }

  return filterdedPost
}