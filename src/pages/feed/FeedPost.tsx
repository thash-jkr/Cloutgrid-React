import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CloutEmpty from '@/components/CloutEmpty';
import feedIcon from '@/assets/isometric/box.png';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { deletePost, likePost } from '@/slices/feedSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faHeart as unlike } from '@fortawesome/free-regular-svg-icons';
import { faEllipsis, faFlag, faHeart, faTrash, faWarning } from '@fortawesome/free-solid-svg-icons';
import CloutModal from '@/components/CloutModal';
import Comments from './Comments';
import type { MenuAction } from '@/components/CloutMenu';
import CloutMenu from '@/components/CloutMenu';
import CloutAlert from '@/components/CloutAlert';
import toast, { Toaster } from 'react-hot-toast';

interface FeedPostProps {
  id: number;
}

const FeedPost = ({ id }: FeedPostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [animatingId, setAnimatingId] = useState(-1);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showReportAlert, setShowReportAlert] = useState(false);

  const { posts: feed } = useAppSelector((state) => state.feed);
  const { posts, collabs, otherPosts, otherCollabs } = useAppSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lastTapRef = useRef(0);

  const post =
    feed.find((p) => p.id === id) ??
    posts.find((p) => p.id === id) ??
    collabs.find((p) => p.id === id) ??
    otherPosts.find((p) => p.id === id) ??
    otherCollabs.find((p) => p.id === id) ??
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

  const actions: MenuAction[] = post?.is_owner
    ? [{ icon: faTrash, label: 'Delete Post', action: () => setShowDeleteAlert(true) }]
    : [
        { icon: faFlag, label: 'Report Post', action: () => setShowReportAlert(true) },
        {
          icon: faWarning,
          label: `Report @${post?.posted_by.username}`,
          action: () => setShowReportAlert(true),
        },
      ];

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto noscroll">
      <Toaster />
      {post != null ? (
        <div key={post.id} className="flex flex-col">
          <div className="flex justify-between items-center p-3">
            <div className="flex items-center justify-start font-semibold">
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

            <FontAwesomeIcon
              icon={faEllipsis}
              className="transition-transform duration-300 hover:scale-125"
              onClick={() => setShowMenu(true)}
            />
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
            <div className="font-semibold">
              <span
                className="hover:text-secondary cursor-pointer"
                onClick={() => navigate(`/profile/${post.posted_by.username}`)}
              >
                @{post.posted_by.username}{' '}
              </span>
              {post.collaboration && (
                <span className="text-gray-500">
                  collaborating with{' '}
                  <span
                    className="text-black hover:text-secondary cursor-pointer"
                    onClick={() => navigate(`/profile/${post.collaboration?.username}`)}
                  >
                    @{post.collaboration.username}
                  </span>
                </span>
              )}
            </div>
            <p className="whitespace-pre-line">{post.caption}</p>
          </div>
        </div>
      ) : (
        <CloutEmpty icon={feedIcon} message={'Nothing to see here'} />
      )}

      <CloutModal isOpen={showComments} onClose={() => setShowComments(false)} title="Comments">
        <Comments id={id} />
      </CloutModal>

      <CloutMenu isOpen={showMenu} onClose={() => setShowMenu(false)} actions={actions} />

      <CloutAlert
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        title="Delete Post"
        body="Are you sure you want to delete this post?"
        onSubmit={() => {
          {
            post &&
              dispatch(deletePost(post.id))
                .unwrap()
                .then(() => {
                  setShowDeleteAlert(false);
                  toast.success('Post deleted');
                })
                .catch(() => {
                  toast.error('Failed to delete post');
                });
          }
        }}
      />

      <CloutAlert
        isOpen={showReportAlert}
        onClose={() => setShowReportAlert(false)}
        title="Report"
        body="Let us know why you are reporting this. Please be specific and provide any relevant details."
        textField={true}
        onSubmit={() => {
          toast.success('Reported');
          setShowReportAlert(false);
        }}
      />
    </div>
  );
};

export default FeedPost;
