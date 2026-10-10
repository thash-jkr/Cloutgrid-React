import type { ReactNode } from 'react';
import { Minus, TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react';
import { compactCount } from '@/utils/compactCount';
import type { MediaInsightModel, ProfileInsightModel } from '@/types/integrationTypes';

type Trend = 'up' | 'down' | 'flat' | 'new';

interface ProfileHeroProps {
  insights: ProfileInsightModel[];
}

const ProfileHero = ({ insights }: ProfileHeroProps) => {
  const PRIORITY = ['views', 'accounts_engaged', 'content_interactions', 'likes'];

  const FLAT_THRESHOLD = 10;

  const NOUNS: Record<string, string> = {
    views: 'views',
    accounts_engaged: 'accounts engaged',
    content_interactions: 'content interactions',
    likes: 'likes',
  };

  const normalize = (name: string) =>
    name
      .trim()
      .toLowerCase()
      .replace(/[\s-]+/g, '_');

  const getTrend = (change: number): Trend => {
    if (!Number.isFinite(change)) return 'new';
    if (Math.abs(change) < FLAT_THRESHOLD) return 'flat';
    return change > 0 ? 'up' : 'down';
  };

  const Highlight = ({ children }: { children: ReactNode }) => (
    <span className="font-semibold text-secondary">{children}</span>
  );

  const TREND_ICON: Record<Trend, LucideIcon> = {
    up: TrendingUp,
    down: TrendingDown,
    flat: Minus,
    new: TrendingUp,
  };

  // Order by priority; fall back to the given order if no names match.
  const ranked = PRIORITY.map((key) => insights.find((i) => normalize(i.name) === key)).filter(
    (i): i is ProfileInsightModel => Boolean(i),
  );
  const candidates = ranked.length > 0 ? ranked : insights;

  const hasActivity = candidates.some((i) => i.value > 0);

  let headline: ReactNode = 'No activity in the last 28 days.';
  let Icon: LucideIcon = Minus;

  if (hasActivity) {
    const active = candidates.filter((i) => i.value > 0);

    // 1. first metric with a meaningful change, 2. first with no comparison, 3. steady
    const picked =
      active.find((i) => ['up', 'down'].includes(getTrend(i.change))) ??
      active.find((i) => getTrend(i.change) === 'new') ??
      active[0];

    const trend = getTrend(picked.change);
    const noun = NOUNS[normalize(picked.name)] ?? picked.title.toLowerCase();
    const count = <Highlight>{compactCount(picked.value)}</Highlight>;
    const percent = <Highlight>{Math.round(Math.abs(picked.change))}%</Highlight>;

    Icon = TREND_ICON[trend];

    switch (trend) {
      case 'up':
        headline = (
          <>
            {count} {noun} in the last 28 days, {percent} more than last month.
          </>
        );
        break;
      case 'down':
        headline = (
          <>
            {count} {noun} in the last 28 days, {percent} fewer than last month.
          </>
        );
        break;
      case 'flat':
        headline = (
          <>
            Steady activity: {count} {noun} in the last 28 days, within{' '}
            <Highlight>{FLAT_THRESHOLD}%</Highlight> of the previous period.
          </>
        );
        break;
      case 'new':
        headline = (
          <>
            {count} {noun} in the last 28 days. Comparison will appear after another 28 days of
            data.
          </>
        );
        break;
    }
  }

  return (
    <div className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-black border shadow-xs">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/10">
        <Icon className="h-5 w-5 text-secondary" />
      </div>

      <p className="text-base leading-snug text-black/90">{headline}</p>
    </div>
  );
};

export default ProfileHero;

export const MediaHero = ({ insights }: { insights: MediaInsightModel[] }) => {
  const PRIORITY = ['views', 'interactions', 'watch_time'];

  const FLAT_THRESHOLD = 10;

  const normalize = (name: string) =>
    name
      .trim()
      .toLowerCase()
      .replace(/[\s-]+/g, '_');

  const getTrend = (change: number): Trend => {
    if (!Number.isFinite(change)) return 'new';
    if (Math.abs(change) < FLAT_THRESHOLD) return 'flat';
    return change > 0 ? 'up' : 'down';
  };

  const Highlight = ({ children }: { children: ReactNode }) => (
    <span className="font-semibold text-secondary">{children}</span>
  );

  const TREND_ICON: Record<Trend, LucideIcon> = {
    up: TrendingUp,
    down: TrendingDown,
    flat: Minus,
    new: TrendingUp,
  };

  // Average watch time is assumed to arrive in seconds.
  const formatDuration = (seconds: number) => {
    const total = Math.round(seconds);
    if (total < 60) return `${total}s`;
    const m = Math.floor(total / 60);
    const s = total % 60;
    return s === 0 ? `${m}m` : `${m}m ${s}s`;
  };

  const describe = (item: MediaInsightModel): ReactNode => {
    const key = normalize(item.name);
    switch (key) {
      case 'views':
        return (
          <>
            <Highlight>{compactCount(item.average)}</Highlight> views on average
          </>
        );
      case 'interactions':
        return (
          <>
            <Highlight>{compactCount(item.average)}</Highlight> interactions on average
          </>
        );
      case 'watch_time':
        return (
          <>
            <Highlight>{formatDuration(item.average)}</Highlight> average watch time
          </>
        );
      default:
        return (
          <>
            <Highlight>{compactCount(item.average)}</Highlight> {item.name.toLowerCase()}
          </>
        );
    }
  };

  // Order by priority; fall back to the given order if no names match.
  const ranked = PRIORITY.map((key) => insights.find((i) => normalize(i.name) === key)).filter(
    (i): i is MediaInsightModel => Boolean(i),
  );
  const candidates = ranked.length > 0 ? ranked : insights;

  const active = candidates.filter((i) => i.average > 0);

  let headline: ReactNode = 'No recent posts to show insights for yet.';
  let Icon: LucideIcon = Minus;

  if (active.length > 0) {
    // 1. first metric with a meaningful change, 2. first with no comparison, 3. steady
    const picked =
      active.find((i) => ['up', 'down'].includes(getTrend(i.change))) ??
      active.find((i) => getTrend(i.change) === 'new') ??
      active[0];

    const trend = getTrend(picked.change);
    const phrase = describe(picked);
    const percent = <Highlight>{Math.round(Math.abs(picked.change))}%</Highlight>;

    Icon = TREND_ICON[trend];

    switch (trend) {
      case 'up':
        headline = (
          <>
            {phrase} across the last 6 posts, {percent} higher than the previous 6.
          </>
        );
        break;
      case 'down':
        headline = (
          <>
            {phrase} across the last 6 posts, {percent} lower than the previous 6.
          </>
        );
        break;
      case 'flat':
        headline = (
          <>
            Steady performance: {phrase} across the last 6 posts, within{' '}
            <Highlight>{FLAT_THRESHOLD}%</Highlight> of the previous 6.
          </>
        );
        break;
      case 'new':
        headline = (
          <>
            {phrase} across the last 6 posts. Comparison will appear once there are 6 earlier posts.
          </>
        );
        break;
    }
  }

  return (
    <div className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-black border shadow-xs">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/10">
        <Icon className="h-5 w-5 text-secondary" />
      </div>

      <p className="text-base leading-snug text-black/90">{headline}</p>
    </div>
  );
};
