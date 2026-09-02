import NavBar from '@/components/NavBar';

export default function EULA() {
  return (
    <div className="container mx-auto flex items-start mt-18 lg:mt-22">
      <NavBar />

      <div className="mx-3 flex w-full flex-col lg:mx-0">
        <h1 className="mb-4 text-3xl font-bold text-center">End User License Agreement (EULA)</h1>
        <p className="mb-6 italic">Effective Date: September 13, 2025</p>

        <p className="mb-4 whitespace-pre-line leading-relaxed">
          IMPORTANT: PLEASE READ THIS AGREEMENT CAREFULLY BEFORE USING CLOUTGRID. BY CREATING AN
          ACCOUNT OR ACCESSING THE APP, YOU AGREE TO BE BOUND BY THE TERMS OF THIS AGREEMENT. IF YOU
          DO NOT AGREE, DO NOT USE THE APP.
          {'\n\n'}
          This End User License Agreement (“Agreement”) is a legal contract between you (“User”,
          “you”) and Cloutivity Private Limited (“Company”, “we”, “us”, “our”), governing your use
          of the Cloutgrid mobile and web application (“App” or “Service”). This Agreement applies
          to both Creator Users and Business Users, who use the app for distinct but connected
          purposes.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">1. License Grant</h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          We grant you a limited, non-exclusive, non-transferable, and revocable license to
          download, install, and use Cloutgrid solely for lawful personal or professional purposes,
          in accordance with this Agreement, our Privacy Policy, and Community Guidelines. This
          license does not grant you any ownership over the app, its content, or associated
          services.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">2. Ownership</h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          All rights, title, and interest in and to Cloutgrid, including but not limited to its
          design, code, trademarks, logos, databases, and infrastructure, remain the exclusive
          property of Cloutivity Private Limited. No part of Cloutgrid may be reproduced,
          distributed, modified, or reverse-engineered without express written permission.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">3. User-Generated Content</h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          Cloutgrid enables users to post content such as images, videos, comments, messages, bios,
          collaboration offers, and other submissions (“User Content”). By posting User Content, you
          affirm that you own or have rights to that content and grant Cloutivity Private Limited a
          worldwide, royalty-free, non-exclusive license to host, display, modify (for formatting),
          and distribute your content solely for the operation and improvement of the platform.
          {'\n\n'}
          You acknowledge that:
          {'\n'}- You are solely responsible for all content you upload or share.
          {'\n'}- You must not post or transmit any content that is obscene, defamatory, sexually
          explicit, threatening, discriminatory, fraudulent, unlawful, or otherwise harmful.
          {'\n'}- You will not impersonate others or misrepresent affiliations.
          {'\n'}- You agree not to upload content that may violate copyright, privacy, or
          intellectual property rights of any third party.
          {'\n'}- We reserve the right to remove or restrict any content that violates these terms
          or our Community Guidelines, at our sole discretion.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">
          4. Community Standards & No Tolerance Policy
        </h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          Cloutgrid is built on a foundation of professionalism, respect, and inclusivity. By using
          Cloutgrid, you agree to comply with our Community Guidelines, which strictly prohibit:
          {'\n'}- Nudity or sexually explicit content
          {'\n'}- Harassment, bullying, hate speech, or abusive behavior
          {'\n'}- Violent, threatening, or dangerous content
          {'\n'}- Impersonation, scams, or fraudulent representations
          {'\n'}- Spam, misleading promotions, or malicious links Cloutgrid enforces a
          zero-tolerance policy against the above violations. Users engaging in such behavior will
          be subject to immediate and permanent account suspension without warning.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">5. Moderation & Reporting</h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          To maintain a safe and inclusive space, Cloutgrid implements both automated and manual
          content moderation systems. This includes:
          {'\n'}- Automatic filtering of keywords, phrases, or images deemed inappropriate
          {'\n'}- A user-driven reporting system to flag violations
          {'\n'}- Manual review by a trained content moderation team We take all user reports
          seriously and act swiftly upon verification. Penalties may include content removal,
          warnings, temporary suspension, or permanent bans depending on the severity of the
          offense.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">
          6. Third-Party Integrations (Instagram and Others)
        </h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          Cloutgrid includes optional integration with third-party services, such as the Instagram
          Graph API, which allows Creator Users to link their Instagram Business or Creator account.
          By connecting your Instagram account, you authorize us to collect publicly available and
          insight-level data such as your username, profile image, media count, follower count, and
          post analytics.
          {'\n\n'}
          This data is stored securely and used exclusively for features within Cloutgrid (e.g.,
          displaying creator analytics to potential business partners). You can disconnect your
          Instagram account at any time, and all associated data will be deleted upon request.
          {'\n\n'}
          We do not access your Instagram login credentials, nor do we share Instagram data with
          external advertisers or third parties outside of the Cloutgrid platform.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">7. Child Protection and Legal Compliance</h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          Cloutgrid is not intended for use by individuals under the age of 13. We implement a
          neutral age screen at sign-up to restrict access to children and do not knowingly collect
          or store data from anyone below this age.
          {'\n\n'}
          In compliance with the Children’s Online Privacy Protection Act (COPPA), the EU General
          Data Protection Regulation for Children (GDPR-K), and the Google Play Families Policy, we
          prohibit children from registering, posting content, or interacting on the platform.
          {'\n\n'}
          If a child is found to have used the service or submitted data in violation of this
          policy, their account will be terminated and all associated data will be deleted
          immediately.
          {'\n\n'}
          All ads, SDKs, and APIs used in the app—should advertising be introduced in the
          future—will be required to be Google Play-certified and child-safe, with additional
          safeguards enabled if any part of the app becomes accessible to younger audiences.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">8. Account Suspension and Termination</h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          We reserve the right to suspend or permanently terminate your account, without notice or
          liability, if you:
          {'\n'}- Violate any terms outlined in this Agreement or the Privacy Policy
          {'\n'}- Upload or promote objectionable or illegal content
          {'\n'}- Engage in abusive, fraudulent, or manipulative behavior
          {'\n'}- Attempt to interfere with the platform’s functionality or the safety of other
          users
          {'\n\n'}
          Account data may be retained temporarily for investigative or legal compliance purposes
          but will be permanently deleted upon request unless otherwise required by law.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">9. Limitation of Liability</h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          Cloutgrid is provided on an “as-is” and “as-available” basis. We do not guarantee
          uninterrupted access, error-free performance, or absolute security. To the fullest extent
          permitted by law, Cloutivity Private Limited shall not be liable for any direct, indirect,
          incidental, special, or consequential damages arising from:
          {'\n'}- Your use or inability to use the app
          {'\n'}- Exposure to objectionable content
          {'\n'}- Loss of data or reputation
          {'\n'}- Platform downtime, account suspensions, or technical issues
          {'\n\n'}
          Your use of Cloutgrid is at your sole risk.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">10. Updates and Modifications</h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          We may revise or update this Agreement from time to time, including to reflect changes in
          features, legal requirements, or moderation practices. Any material changes will be
          notified via in-app alert or email. Continued use of Cloutgrid after updates constitutes
          acceptance of the revised terms.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">11. Governing Law</h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          This Agreement shall be governed by and interpreted under the laws of India, without
          regard to its conflict of law provisions. Any legal disputes arising from the use of
          Cloutgrid shall be subject to the exclusive jurisdiction of the courts in Kerala, India.
        </p>

        <h2 className="mt-6 mb-2 text-lg font-bold">12. Contact</h2>
        <p className="mb-4 whitespace-pre-line leading-relaxed">
          For questions or concerns, contact:
          {'\n'}Email:{' '}
          <a href="mailto:info@cloutgrid.com" className="text-secondary hover:underline">
            info@cloutgrid.com
          </a>
        </p>

        <p className="mb-4 whitespace-pre-line leading-relaxed">
          BY CREATING AN ACCOUNT OR CONTINUING TO USE CLOUTGRID, YOU ACKNOWLEDGE THAT YOU HAVE READ,
          UNDERSTOOD, AND AGREED TO BE BOUND BY THIS EULA.
        </p>
      </div>
    </div>
  );
}
