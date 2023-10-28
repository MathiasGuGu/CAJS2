export function filterBlogPosts(posts, filterType) {
  switch (filterType) {
    case "newest":
      return posts.sort((a, b) => new Date(b.created) - new Date(a.created));
    case "oldest":
      return posts.sort((a, b) => new Date(a.created) - new Date(b.created));
    case "popular":
      return posts.sort((a, b) => b._count.reactions - a._count.reactions);
    default:
      return posts;
  }
}
