import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchFeed } from '@/slices/feedSlice';
import CloutEmpty from '@/components/CloutEmpty';
import feedIcon from '@/assets/isometric/box.png';
import FeedPost from './FeedPost';

export default function FeedMiddle() {
  const dispatch = useAppDispatch();

  const { posts, postsHasMore, feedLoading } = useAppSelector((state) => state.feed);

  useEffect(() => {
    if (posts.length == 0) {
      dispatch(fetchFeed({ isFirstPage: true }));
    }
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

  return (
    <div className="flex flex-col items-center justify-center select-none mx-3 w-full lg:mx-0">
      <div className="w-full flex flex-col gap-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="rounded-xl bg-white shadow">
              <FeedPost id={post.id} />
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center items-center bg-white rounded-xl shadow">
            <CloutEmpty icon={feedIcon} message={'No new posts'} isLoading={feedLoading} />
          </div>
        )}
      </div>
    </div>
  );
}
