import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faHeart as unlike } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchFeed, likePost } from '@/slices/feedSlice';
// import CommentModal from '@/components/CommentModal';
import type { PostModel } from '@/types/feedTypes';

export default function FeedMiddle() {
  const [selectedPost, setSelectedPost] = useState<PostModel | null>(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [animatingId, setAnimatingId] = useState(-1);

  const navigate = useNavigate();
  const lastTapRef = useRef(0);
  const dispatch = useAppDispatch();

  const { posts, postsHasMore } = useAppSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeed({ isFirstPage: true }))
      .unwrap()
      .catch(() => {
        // toast.error('Error fetching posts');
      });
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (postsHasMore && scrollY + innerHeight >= scrollHeight - 300) {
        dispatch(fetchFeed({ isFirstPage: false }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, postsHasMore]);

  const handleTap = (id: number, isLiked: boolean) => {
    const now = new Date().getTime();
    const delay = 300;

    if (now - lastTapRef.current < delay) {
      if (isLiked) {
        setAnimatingId(id);
        setTimeout(() => {
          setAnimatingId(-1);
        }, 300);
      } else {
        handleClick(id);
      }
    }

    lastTapRef.current = now;
  };

  const handleClick = (id: number, isLiked = false) => {
    if (!isLiked) setAnimatingId(id);
    handleLike(id);
    setTimeout(() => {
      setAnimatingId(-1);
    }, 300);
  };

  const handleLike = (id: number) => {
    dispatch(likePost(id));
  };

  const handleComment = (post: PostModel) => {
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center select-none mx-3 lg:mx-0">
      {/* <Toaster /> */}
      <div className="w-full flex flex-col gap-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="flex flex-col rounded-xl bg-white shadow divide-y">
              <div className="p-3 flex w-full items-center justify-start font-semibold">
                <img
                  src={post.posted_by.profile_photo}
                  alt="Profile"
                  className="mr-2 h-8 w-8 rounded-full object-cover"
                />
                <h3
                  onClick={() => navigate(`/profiles/${post.posted_by.username}`)}
                  className="cursor-pointer hover:text-secondary"
                >
                  {post.posted_by.name}
                </h3>
                {post.collaboration && (
                  <>
                    <span className="mx-1 font-normal text-gray-500">with</span>
                    <h3
                      onClick={() => navigate(`/profiles/${post.collaboration!.username}`)}
                      className="cursor-pointer hover:text-secondary"
                    >
                      {post.collaboration.name}
                    </h3>
                  </>
                )}
              </div>

              <div className="flex w-full flex-col items-center justify-center">
                <div className="m-3 w-full px-3">
                  <p>{post.caption}</p>
                </div>
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full"
                  onClick={() => {
                    handleTap(post.id, post.is_liked);
                  }}
                />
              </div>

              <div className="flex w-full items-center justify-around p-5">
                <FontAwesomeIcon
                  icon={post.is_liked ? faHeart : unlike}
                  className={`text-3xl transition-transform duration-300 ${
                    post.is_liked ? 'text-secondary' : ''
                  } ${animatingId === post.id ? 'scale-125' : ''}`}
                  onClick={() => handleClick(post.id, post.is_liked)}
                />
                <div className="flex w-1/2 items-center justify-center font-semibold">
                  <p className="flex w-full items-center justify-center gap-1">
                    {post.like_count}
                    <span className="text-gray-500">{post.like_count == 1 ? 'Like' : 'Likes'}</span>
                    • {post.comment_count}{' '}
                    <span className="text-gray-500">
                      {post.comment_count == 1 ? 'Comment' : 'Comments'}
                    </span>
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faSquare}
                  onClick={() => handleComment(post)}
                  className="text-3xl hover:scale-105"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="null-text">
            <p>No new posts to show</p>
          </div>
        )}
      </div>

      {/* {showCommentModal && selectedPost && (
        <CommentModal post={selectedPost} onClose={() => setShowCommentModal(false)} />
      )} */}
    </div>
  );
}
