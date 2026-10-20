import { useState, type ReactNode } from 'react';
import {
  BadgeCheck,
  ChartColumn,
  ChevronDown,
  Clock,
  Eye,
  Heart,
  Info,
  Megaphone,
  MousePointerClick,
  Play,
  SkipForward,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';

function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-semibold text-gray-900">{children}</h3>;
}

function IconLine({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-3">
      <Icon className="h-5 w-5 shrink-0 text-secondary" strokeWidth={2} />
      <span className="flex-1 text-sm text-gray-900">{text}</span>
    </div>
  );
}

function StepLine({ number, text }: { number: number; text: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-3">
      <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-white">
        {number}
      </span>
      <span className="flex-1 text-sm text-gray-900">{text}</span>
    </div>
  );
}

function Callout({ text }: { text: string }) {
  return (
    <div className="flex w-full items-center gap-2 rounded-xl bg-white border p-3">
      <Info className="h-4.5 w-4.5 shrink-0 text-gray-500" />
      <span className="flex-1 text-xs text-gray-700">{text}</span>
    </div>
  );
}

function SmallPrint({ text }: { text: string }) {
  return <p className="mb-2 text-xs text-gray-500">{text}</p>;
}

function Details({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between py-2 text-sm text-primary"
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-2">
            {items.map((text, i) => (
              <SmallPrint key={i} text={text} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ConnectInfoProps {
  benefits: { icon: LucideIcon; text: string }[];
  steps: string[];
  requirement: string;
  details: string[];
}

function ConnectInfo({ benefits, steps, requirement, details }: ConnectInfoProps) {
  return (
    <div className="flex flex-col items-start gap-3 px-3 w-full">
      <SectionTitle>Show brands your real numbers</SectionTitle>
      <div className="w-full">
        {benefits.map((b) => (
          <IconLine key={b.text} icon={b.icon} text={b.text} />
        ))}
      </div>

      <div className="w-full">
        <SectionTitle>How it works</SectionTitle>
        <div className="mt-3">
          {steps.map((text, i) => (
            <StepLine key={i} number={i + 1} text={text} />
          ))}
        </div>
      </div>

      <div className="w-full">
        <Callout text={requirement} />
      </div>

      <div className="w-full">
        <Details title="Details and privacy" items={details} />
      </div>
    </div>
  );
}

export function InstagramConstants() {
  return (
    <ConnectInfo
      benefits={[
        { icon: BadgeCheck, text: 'Verified followers and post counts' },
        { icon: ChartColumn, text: 'Reach and engagement on your profile' },
        { icon: Play, text: 'Reel performance brands care about' },
      ]}
      steps={[
        'Tap Connect Instagram',
        'Log in with Instagram and tap Allow',
        "You're done. Your insights appear here",
      ]}
      requirement="Requires a Creator or Business Instagram account."
      details={[
        'Cloutgrid can view your profile, posts and insights. It cannot post, message or comment on your behalf.',
        'Have a personal account? Switch to Creator or Business in Instagram under Settings → Account type and tools. It is free.',
        'You can disconnect at any time.',
      ]}
    />
  );
}

export function YoutubeConstants() {
  return (
    <ConnectInfo
      benefits={[
        { icon: BadgeCheck, text: 'Verified subscribers and total views' },
        { icon: Clock, text: 'Watch time and average view duration' },
        { icon: Users, text: 'Audience age, gender and top locations' },
      ]}
      steps={[
        'Tap Connect YouTube',
        'Sign in with Google and pick your channel',
        "Tap Allow. You're done",
      ]}
      requirement="Your channel needs at least one public or unlisted video."
      details={[
        'Cloutgrid can view your channel and its analytics. It cannot upload, edit or delete anything on your channel.',
        'Manage more than one channel? Choose the one you want brands to see when Google asks.',
        'You can disconnect at any time from your profile.',
      ]}
    />
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

export const ProfileInsightsInfo = () => {
  return (
    <div className="flex w-full flex-col gap-5 h-full overflow-y-auto">
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
    <div className="flex w-full flex-col gap-5 h-full overflow-y-auto">
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
    <div className="flex w-full flex-col gap-5 h-full overflow-y-auto">
      <p className="p-3 text-sm text-gray-600">
        Each number is the average across your 6 most recent posts. The percentage beside it
        compares that average with the 6 posts before them. For example, +12% means 12% higher than
        the previous 6 posts.
      </p>

      <InsightList items={MEDIA_INSIGHTS_INFO} />
    </div>
  );
};
