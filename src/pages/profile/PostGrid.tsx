import { useAppSelector } from '@/app/hooks';
import CloutEmpty from '@/components/CloutEmpty';
import type { PostModel } from '@/types/feedTypes';
import postIcon from '@/assets/isometric/photo.png';

interface PostGridScope {
  posts: PostModel[];
  onSelect: (post: PostModel) => void;
}

const PostGrid = ({ posts, onSelect }: PostGridScope) => {
  const { profileLoading } = useAppSelector((state) => state.profile);

  return (
    <div className="p-1 w-full">
      {posts.length > 0 ? (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-1 w-full">
          {posts.map((post) => (
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
          ))}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <CloutEmpty icon={postIcon} message={'No posts to show'} isLoading={profileLoading} />
        </div>
      )}
    </div>
  );
};

export default PostGrid;
