export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#5f4a3a]">
      {/* Header */}
      <section className="border-b border-[#eadfd5] bg-[#f8ebe3]">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#c98f84]">
            Legal
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-[#8d7968]">
            Last updated: August 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <div className="space-y-10 leading-8 text-[#8d7968]">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#5f4a3a]">
              1. Introduction
            </h2>

            <p>
              At Mimi & Me, we respect your privacy and are committed to
              protecting the personal information you share with us. This
              Privacy Policy explains how we collect, use, store, and protect
              your information when you use our website and services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#5f4a3a]">
              2. Information We Collect
            </h2>

            <p>
              When you create an account, place an order, contact us, or use
              our services, we may collect information such as your name,
              email address, phone number, shipping address, billing details,
              and order information.
            </p>

            <p className="mt-4">
              We may also collect basic technical information such as browser
              type, device information, and website usage data to help us
              improve our services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#5f4a3a]">
              3. How We Use Your Information
            </h2>

            <p>We may use your information to:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Process and deliver your orders.</li>
              <li>Manage your account.</li>
              <li>Provide customer support.</li>
              <li>Communicate with you about your orders.</li>
              <li>Improve our website, products, and services.</li>
              <li>Prevent fraud and protect our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#5f4a3a]">
              4. Payment Information
            </h2>

            <p>
              Payment information may be processed through third-party payment
              providers. Mimi & Me does not intentionally store complete
              payment card details on its own servers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#5f4a3a]">
              5. Cookies
            </h2>

            <p>
              Our website may use cookies and similar technologies to maintain
              sessions, remember preferences, understand website usage, and
              improve your overall experience.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#5f4a3a]">
              6. Information Sharing
            </h2>

            <p>
              We do not sell your personal information. We may share necessary
              information with trusted service providers who help us operate
              our website, process payments, deliver orders, or provide other
              services required to fulfill your requests.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#5f4a3a]">
              7. Data Security
            </h2>

            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission or storage can be guaranteed
              to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#5f4a3a]">
              8. Your Rights
            </h2>

            <p>
              Depending on applicable law, you may have rights regarding your
              personal information, including requesting access, correction,
              or deletion of certain information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#5f4a3a]">
              9. Third-Party Links
            </h2>

            <p>
              Our website may contain links to third-party websites or
              services. We are not responsible for the privacy practices or
              content of those third-party websites.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[#5f4a3a]">
              10. Changes to This Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page along with an updated revision
              date.
            </p>
          </section>

          <section className="rounded-2xl border border-[#eadfd5] bg-[#f8ebe3] p-6">
            <h2 className="mb-3 text-xl font-bold text-[#5f4a3a]">
              Contact Us
            </h2>

            <p>
              If you have questions about this Privacy Policy or how your
              information is handled, contact us at{" "}
              <a
                href="mailto:support@mimiandme.com"
                className="font-semibold text-[#c98f84] hover:text-[#a8756d]"
              >
                support@mimiandme.com
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}