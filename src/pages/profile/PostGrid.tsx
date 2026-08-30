import type { PostModel } from "@/types/feedTypes";

interface PostGridScope {
    posts: PostModel[]
    onSelect: (post:PostModel) => void
}

const PostGrid = ({posts, onSelect}: PostGridScope) => {
  return <div className="p-1 lg:p-1 grid grid-cols-3 gap-1 w-full">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="relative w-full aspect-square overflow-hidden rounded lg:hover:scale-[90%] transition-transform"
            onClick={() => {
              onSelect(post);
            }}
          >
            <img
              src={`${post.image}`}
              alt="Post"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))
      ) : (
        <div className="null-text">
          <h1>No posts found!</h1>
        </div>
      )}
    </div>
};

export default PostGrid;
