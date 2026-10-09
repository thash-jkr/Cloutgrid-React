import {
  Clock,
  Eye,
  Heart,
  Megaphone,
  MousePointerClick,
  SkipForward,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';

interface InfoSectionProps {
  title: string;
  bullets: string[];
}

function InfoSection({ title, bullets }: InfoSectionProps) {
  return (
    <div className="flex flex-col items-start">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <div className="mt-2.5 flex flex-col items-start pl-1">
        {bullets.map((text, i) => (
          <BulletPoint key={i} text={text} />
        ))}
      </div>
    </div>
  );
}

interface BulletPointProps {
  text: string;
}

function BulletPoint({ text }: BulletPointProps) {
  return (
    <div className="mb-3 flex items-start gap-2.5">
      <span className="text-sm font-bold text-gray-900">•</span>
      <span className="flex-1 text-sm text-gray-600">{text}</span>
    </div>
  );
}

export function InstagramConstants() {
  return (
    <div className="px-4">
      <p className="mb-2 text-[13px] text-gray-900">
        Connecting your Instagram unlocks analytics that help you stand out to businesses 🙋🏻‍♂️. This
        transparency builds trust, boosts your credibility, and increases your chances of securing
        collaborations 🤝.
      </p>

      <div className="mt-5">
        <InfoSection
          title="What you'll get once connected:"
          bullets={[
            'Verified display of your follower count, followings, and media count.',
            'Insights into your reach, profile views, and audience engagement shown on your Cloutgrid profile.',
            'Access to detailed media insights (likes, comments, impressions, video views) that brands care about.',
            'A stronger, more credible profile that businesses can evaluate at a glance.',
          ]}
        />
      </div>

      <div className="mt-5">
        <InfoSection
          title="What you need before connecting:"
          bullets={[
            'Your Instagram must be a Creator or Business account (personal accounts cannot connect).',
            'Your Instagram account must be linked to a Facebook Page (Meta requires this link for insights).',
            "You'll log in with your Facebook credentials to complete the connection.",
          ]}
        />
      </div>

      <div className="mt-5">
        <InfoSection
          title="How to connect:"
          bullets={[
            'Make sure your Instagram is switched to a Creator or Business account (you can change this in Instagram Settings → Account).',
            'Ensure your Instagram is linked to a Facebook Page you manage.',
            'Click "Connect Instagram" above and log in with Facebook.',
            'Grant the requested permissions (needed to pull your analytics securely).',
          ]}
        />
      </div>
    </div>
  );
}

export function YoutubeConstants() {
  return (
    <div className="px-4">
      <p className="mb-2 text-[13px] text-gray-900">
        Connecting your YouTube channel unlocks verified metrics that demonstrate your influence 🚀.
        Providing real-time data builds professional credibility and makes it easier for brands to
        partner with you 🤝.
      </p>

      <div className="mt-5">
        <InfoSection
          title="What you'll get once connected:"
          bullets={[
            'Verified subscriber count and lifetime video views displayed on your profile.',
            'Real-time data on your average view duration, watch time, and click-through rates.',
            'Audience demographics including age, gender, and top geographic locations.',
            'Performance trends for your latest uploads and most popular content.',
          ]}
        />
      </div>

      <div className="mt-5">
        <InfoSection
          title="What you need before connecting:"
          bullets={[
            'A YouTube channel with active content (public or unlisted videos).',
            'The Google Account credentials associated with your YouTube channel.',
            "Approval for Cloutgrid to view your YouTube Analytics reports via Google's secure login.",
          ]}
        />
      </div>

      <div className="mt-5">
        <InfoSection
          title="How to connect:"
          bullets={[
            'Ensure you are logged into the Google Account that manages your YouTube channel.',
            'Click "Connect YouTube" above to open the secure Google Sign-In prompt.',
            'Select the specific channel you wish to link to Cloutgrid.',
            'Grant the requested permissions so we can securely display your analytics to potential partners.',
          ]}
        />
      </div>
    </div>
  );
}

interface InsightInfo {
  title: string;
  description: string;
  icon: LucideIcon;
}

const INSIGHTS: InsightInfo[] = [
  {
    title: 'Accounts engaged',
    description:
      'The number of unique accounts that interacted with your content. An account is counted once, even if it interacted several times.',
    icon: Users,
  },
  {
    title: 'Likes',
    description: 'The total number of likes on your posts, reels and videos.',
    icon: Heart,
  },
  {
    title: 'Content interactions',
    description:
      'The total number of actions people took on your content, such as likes, comments, shares, saves and replies. Unlike accounts engaged, one person can add several interactions.',
    icon: MousePointerClick,
  },
  {
    title: 'Views',
    description:
      'The number of times your content was played or displayed. Repeat views by the same account are counted.',
    icon: Eye,
  },
];

const ProfileInsightsInfo = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <p className="text-sm text-gray-600 p-3">
        Each number is the total for the last 28 days. The percentage beside it compares that total
        with the 28 days before it. For example, +12% means 12% more than the previous 28-day
        window.
      </p>

      <ul className="flex flex-col divide-y">
        {INSIGHTS.map(({ title, description, icon: Icon }) => (
          <li key={title} className="flex items-start gap-3 p-3 first:pt-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <Icon className="h-4 w-4" />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileInsightsInfo;

function InsightList({ items }: { items: InsightInfo[] }) {
  return (
    <ul className="flex flex-col divide-y">
      {items.map(({ title, description, icon: Icon }) => (
        <li key={title} className="flex items-start gap-3 p-3 first:pt-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <Icon className="h-4 w-4" />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

const REACH_INFO: InsightInfo[] = [
  {
    title: 'Reach',
    description:
      'The number of unique accounts that saw your content at least once. An account is counted once, no matter how many times it viewed your content.',
    icon: Megaphone,
  },
  {
    title: 'Reading the chart',
    description:
      'Each point is the reach for one day. Peaks usually line up with days you posted or when a post took off, and dips show quieter days.',
    icon: TrendingUp,
  },
];

export const ReachInfo = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <p className="p-3 text-sm text-gray-600">
        The chart shows your daily reach for the last 28 days. Because the same person can be
        reached on several days, adding up the daily values gives a higher number than your reach
        for the whole period.
      </p>

      <InsightList items={REACH_INFO} />
    </div>
  );
};

const MEDIA_INSIGHTS_INFO: InsightInfo[] = [
  {
    title: 'Views',
    description: 'The average number of times each of your last 6 posts was played or displayed.',
    icon: Eye,
  },
  {
    title: 'Watch time',
    description:
      'The average total time people spent watching each of your last 6 videos and reels.',
    icon: Clock,
  },
  {
    title: 'Skip rate',
    description:
      'The average share of plays where the viewer skipped away within the first few seconds. Lower is better, so a drop in this number is a good sign.',
    icon: SkipForward,
  },
  {
    title: 'Interactions',
    description:
      'The average number of actions, such as likes, comments, shares and saves, on each of your last 6 posts.',
    icon: MousePointerClick,
  },
];

export const MediaInsightsInfo = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <p className="p-3 text-sm text-gray-600">
        Each number is the average across your 6 most recent posts. The percentage beside it
        compares that average with the 6 posts before them. For example, +12% means 12% higher than
        the previous 6 posts.
      </p>

      <InsightList items={MEDIA_INSIGHTS_INFO} />
    </div>
  );
};
