import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CloutEmpty from '@/components/CloutEmpty';
import feedIcon from '@/assets/isometric/box.png';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { likePost } from '@/slices/feedSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faHeart as unlike } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import CloutModal from '@/components/CloutModal';
import Comments from './Comments';

interface FeedPostProps {
  id: number;
}

const FeedPost = ({ id }: FeedPostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [animatingId, setAnimatingId] = useState(-1);

  const { posts: feed } = useAppSelector((state) => state.feed);
  const { posts, collabs } = useAppSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lastTapRef = useRef(0);

  const post =
    feed.find((p) => p.id === id) ??
    posts.find((p) => p.id === id) ??
    collabs.find((p) => p.id === id) ??
    null;

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

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto">
      {post != null ? (
        <div key={post.id} className="flex flex-col">
          <div className="p-3 flex w-full items-center justify-start font-semibold">
            <img
              src={post.posted_by.profile_photo}
              alt="Profile"
              className="mr-2 h-8 w-8 rounded-full object-cover"
            />
            <h3
              onClick={() => navigate(`/profile/${post.posted_by.username}`)}
              className="cursor-pointer hover:text-secondary"
            >
              {post.posted_by.name}
            </h3>
          </div>

          <div className="flex w-full flex-col items-center justify-center">
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
                <span className="text-gray-500">
                  {post.like_count == 1 ? 'Like' : 'Likes'}
                </span>• {post.comment_count}{' '}
                <span className="text-gray-500">
                  {post.comment_count == 1 ? 'Comment' : 'Comments'}
                </span>
              </p>
            </div>
            <FontAwesomeIcon
              icon={faSquare}
              onClick={() => setShowComments(true)}
              className="text-3xl hover:scale-105"
            />
          </div>

          <div className="w-full p-3">
            <h1 className="font-semibold">
              @{post.posted_by.username}{' '}
              {post.collaboration && (
                <span className="text-gray-500">
                  collaborating with{' '}
                  <span className="text-black">@{post.collaboration.username}</span>
                </span>
              )}
            </h1>
            <p>{post.caption}</p>
          </div>
        </div>
      ) : (
        <CloutEmpty icon={feedIcon} message={'No new posts'} />
      )}

      <CloutModal isOpen={showComments} onClose={() => setShowComments(false)} title="Comments">
        <Comments id={id} />
      </CloutModal>
    </div>
  );
};

export default FeedPost;
