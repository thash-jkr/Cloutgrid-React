import NavBar from '@/components/NavBar';

export default function DataDeletion() {
  return (
    <div className="container mx-auto flex items-start mt-18 lg:mt-22">
      <NavBar />

      <div className="mx-3 flex w-full flex-col lg:mx-0">
        <h1 className="mb-4 text-3xl font-bold text-center">Data Deletion Policy</h1>
        <p className="mb-6 italic">Last Updated: July 16, 2026</p>

        <p className="mb-4 leading-relaxed">
          Cloutgrid, developed and operated by Cloutivity Private Limited, gives every user full
          control over their account and personal data. This page explains exactly how to request
          deletion of your Cloutgrid account, what happens when you do, and what data is affected.
          This policy applies to all users, including Creator Users and Business Users.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">How to Delete Your Account</h2>
        <p className="mb-4 leading-relaxed">
          You can permanently delete your Cloutgrid account directly from within the app. No
          email or manual request is required.
        </p>
        <ol className="mb-4 list-decimal space-y-1.5 pl-6 leading-relaxed">
          <li>Open the Cloutgrid app and log in</li>
          <li>Go to Profile</li>
          <li>Tap Settings</li>
          <li>Tap Security</li>
          <li>Tap Delete Account and confirm</li>
        </ol>
        <p className="mb-4 leading-relaxed">
          If you no longer have the app installed, or are unable to access your account, you can
          instead request deletion by emailing us at{' '}
          <a href="mailto:info@cloutgrid.com" className="text-secondary hover:underline">
            info@cloutgrid.com
          </a>{' '}
          from the email address associated with your account. We will process manual requests
          promptly after verifying your identity.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">What Gets Deleted</h2>
        <p className="mb-4 leading-relaxed">
          Every feature and record in Cloutgrid is directly or indirectly linked to your user
          account. When your account is deleted, this link means the deletion cascades through
          our systems automatically, removing your account and all associated data in full,
          including:
        </p>
        <ol className="mb-4 list-decimal space-y-1.5 pl-6 leading-relaxed">
          <li>Your profile information, including your name, email address, and profile photo</li>
          <li>All posts, media, and content you have uploaded</li>
          <li>Job postings, applications, and collaboration history</li>
          <li>Messages and conversations you are part of</li>
          <li>Comments you have made</li>
          <li>
            Any Instagram or YouTube account data stored by Cloutgrid, including access tokens
            and insights data retrieved through those integrations
          </li>
        </ol>
        <p className="mb-4 leading-relaxed">
          No trace of your account or associated content remains in our systems after deletion.
          We do not retain a copy of your data, and none of it can be recovered once deletion is
          complete.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">Instagram and YouTube Connections</h2>
        <p className="mb-4 leading-relaxed">
          If you connected an Instagram or YouTube account to Cloutgrid, deleting your Cloutgrid
          account permanently deletes our stored copy of any related data and access tokens.
          Please note that this removes Cloutgrid's access on our end, but does not itself revoke
          the connection from within your Instagram or YouTube account settings. If you would
          like to fully remove Cloutgrid's access from your Instagram or YouTube account
          directly, you can do so at any time through that platform's own connected-apps
          settings.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">When Deletion Takes Effect</h2>
        <p className="mb-4 leading-relaxed">
          Account deletion is instant. As soon as you confirm the deletion request in the app, or
          as soon as we process a manual request sent by email, your account and all associated
          data described above are permanently removed. This action cannot be undone, and we
          recommend downloading or saving any content you wish to keep before proceeding.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">Data Retention</h2>
        <p className="mb-4 leading-relaxed">
          Cloutgrid does not retain any personal data or user content after an account is
          deleted. There is no grace period, backup copy, or retention window. Once deletion is
          complete, your data is gone from our systems in full.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">Contact Us</h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          Cloutivity Private Limited
          {'\n'}Email:{' '}
          <a href="mailto:info@cloutgrid.com" className="text-secondary hover:underline">
            info@cloutgrid.com
          </a>
          {'\n\n'}
          If you have any questions about this Data Deletion Policy or need help deleting your
          account, please reach out to us at the email address above.
        </p>
      </div>
    </div>
  );
}