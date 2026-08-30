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
        Connecting your Instagram unlocks analytics that help you stand out to businesses 🙋🏻‍♂️.
        This transparency builds trust, boosts your credibility, and increases your chances of
        securing collaborations 🤝.
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
        Connecting your YouTube channel unlocks verified metrics that demonstrate your influence
        🚀. Providing real-time data builds professional credibility and makes it easier for
        brands to partner with you 🤝.
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