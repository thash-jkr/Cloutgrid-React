import { useState } from 'react';
import PostGrid from './PostGrid';
import type { PostModel } from '@/types/feedTypes';
import Instagram from '../integration/Instagram';
import YouTube from '../integration/YouTube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faImages, faBriefcase, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import type { UserProfile } from '@/types/authTypes';
import { Button } from 'actify';

type ProfileTab = 'posts' | 'instagram' | 'youtube' | 'collabs';

interface TabConfig {
  id: ProfileTab;
  label: string;
  icon: typeof faImages;
  visibleFor: UserProfile['type'][];
}

const TABS: TabConfig[] = [
  { id: 'posts', label: 'Posts', icon: faImages, visibleFor: ['creator', 'business'] },
  { id: 'instagram', label: 'Instagram', icon: faInstagram, visibleFor: ['creator'] },
  { id: 'youtube', label: 'Youtube', icon: faYoutube, visibleFor: ['creator'] },
  { id: 'collabs', label: 'Collabs', icon: faBriefcase, visibleFor: ['business'] },
];

interface ProfileBodyProps {
  posts: PostModel[];
  collabs: PostModel[];
  user: UserProfile;
}

const ProfileBody = ({ posts, collabs, user }: ProfileBodyProps) => {
  const [selectedPost, setSelectedPost] = useState<PostModel | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');

  const visibleTabs = TABS.filter((tab) => tab.visibleFor.includes(user.type));

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostGrid posts={posts} onSelect={setSelectedPost} />;
      case 'instagram':
        return <Instagram />;
      case 'youtube':
        return <YouTube />;
      case 'collabs':
        return <PostGrid posts={collabs} onSelect={setSelectedPost} />;
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      <div
        className="flex w-full items-center justify-around gap-2 
      rounded-2xl bg-white p-3 shadow"
      >
        {visibleTabs.map((tab) => (
          <Button
            key={tab.id}
            color="primary"
            variant={activeTab === tab.id ? 'filled' : 'outlined'}
            onPress={() => setActiveTab(tab.id)}
          >
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={tab.icon} />

              <span className='hidden lg:flex'>{tab.label}</span>

              {tab.id == 'instagram' &&
                user.type == 'creator' &&
                user.instagram_connected == true && (
                  <FontAwesomeIcon icon={faCircleCheck} className="text-secondary" />
                )}

              {tab.id == 'instagram' &&
                user.type == 'creator' &&
                user.instagram_connected == false && (
                  <FontAwesomeIcon icon={faCircleXmark} className="text-gray-500" />
                )}

              {tab.id == 'youtube' &&
                user.type == 'creator' &&
                user.youtube_connected == true && (
                  <FontAwesomeIcon icon={faCircleCheck} className="text-secondary" />
                )}

              {tab.id == 'youtube' &&
                user.type == 'creator' &&
                user.youtube_connected == false && (
                  <FontAwesomeIcon icon={faCircleXmark} className="text-gray-500" />
                )}
            </span>
          </Button>
        ))}
      </div>

      <div
        className="mb-5 flex min-h-[20vh] w-full flex-col items-center
       justify-start overflow-auto rounded-lg bg-white shadow"
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfileBody;
