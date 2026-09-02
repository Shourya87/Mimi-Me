import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <main className="min-h-screen bg-[#fffaf7]">
      {/* Hero */}
      <section className="border-b border-[#eadfd5] bg-[#fdf5ef]">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#c98f84]">
            Legal
          </p>

          <h1 className="text-4xl font-bold text-[#6d5b4d] md:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[#8d7968]">
            Please read these terms carefully before using Mimi & Me or
            purchasing our products.
          </p>

          <p className="mt-4 text-sm text-[#a39384]">
            Last updated: August 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-10 text-[#6d5b4d]">
          {/* Introduction */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              1. Introduction
            </h2>

            <p className="leading-8 text-[#8d7968]">
              Welcome to Mimi & Me. By accessing our website, browsing our
              products, creating an account, or placing an order, you agree to
              comply with these Terms & Conditions. If you do not agree with
              any part of these terms, please do not use our website.
            </p>
          </section>

          {/* Use of Website */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              2. Use of Our Website
            </h2>

            <p className="mb-3 leading-8 text-[#8d7968]">
              You agree to use this website only for lawful purposes and in a
              manner that does not interfere with the operation of the
              website.
            </p>

            <ul className="list-disc space-y-2 pl-6 leading-7 text-[#8d7968]">
              <li>You must provide accurate information when creating an account.</li>
              <li>You are responsible for maintaining the security of your account.</li>
              <li>You must not attempt to gain unauthorized access to our systems.</li>
              <li>You must not use the website for fraudulent or unlawful activities.</li>
            </ul>
          </section>

          {/* Products */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              3. Products & Availability
            </h2>

            <p className="leading-8 text-[#8d7968]">
              We make reasonable efforts to ensure that product descriptions,
              images, prices, and availability displayed on our website are
              accurate. However, minor variations in color, appearance, or
              presentation may occur.
            </p>

            <p className="mt-4 leading-8 text-[#8d7968]">
              Products are subject to availability, and we reserve the right
              to limit quantities or discontinue products without prior notice.
            </p>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              4. Pricing & Payments
            </h2>

            <p className="leading-8 text-[#8d7968]">
              All prices displayed on our website are in Indian Rupees (₹).
              Prices, discounts, offers, and promotions may change at any time
              without prior notice.
            </p>

            <p className="mt-4 leading-8 text-[#8d7968]">
              You agree to provide valid payment information when placing an
              order. An order is considered successfully placed only after
              payment authorization and order confirmation.
            </p>
          </section>

          {/* Orders */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              5. Orders & Cancellation
            </h2>

            <p className="leading-8 text-[#8d7968]">
              Once an order is placed, you will receive an order confirmation.
              We reserve the right to cancel or reject an order in cases such
              as product unavailability, pricing errors, suspected fraud, or
              other operational reasons.
            </p>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              6. Shipping & Delivery
            </h2>

            <p className="leading-8 text-[#8d7968]">
              Delivery times provided on our website are estimates and may
              vary depending on the delivery location, courier availability,
              weather, holidays, or other circumstances beyond our control.
            </p>
          </section>

          {/* Returns */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              7. Returns & Refunds
            </h2>

            <p className="leading-8 text-[#8d7968]">
              Returns, exchanges, and refunds are subject to our applicable
              return and refund policy. Products must meet the eligibility
              requirements specified in that policy.
            </p>

            <Link
              to="/refund-policy"
              className="mt-4 inline-block font-medium text-[#c98f84] transition hover:text-[#a97168]"
            >
              View our Refund & Return Policy →
            </Link>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              8. Intellectual Property
            </h2>

            <p className="leading-8 text-[#8d7968]">
              All website content, including logos, graphics, images, text,
              designs, product descriptions, and other materials, belongs to
              Mimi & Me or its respective content providers and may not be
              reproduced or distributed without permission.
            </p>
          </section>

          {/* Limitation */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              9. Limitation of Liability
            </h2>

            <p className="leading-8 text-[#8d7968]">
              Mimi & Me will not be responsible for indirect, incidental, or
              consequential losses resulting from the use of our website or
              services, to the extent permitted by applicable law.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              10. Changes to These Terms
            </h2>

            <p className="leading-8 text-[#8d7968]">
              We may update these Terms & Conditions from time to time.
              Updated terms will be published on this page, and your continued
              use of the website after changes are published constitutes
              acceptance of the updated terms.
            </p>
          </section>

          {/* Contact */}
          <section className="rounded-2xl border border-[#eadfd5] bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold">
              11. Contact Us
            </h2>

            <p className="leading-8 text-[#8d7968]">
              If you have any questions regarding these Terms & Conditions,
              please contact us.
            </p>

            <div className="mt-4 space-y-2 text-sm text-[#8d7968]">
              <p>
                <span className="font-semibold text-[#6d5b4d]">Email:</span>{" "}
                support@mimiandme.com
              </p>

              <p>
                <span className="font-semibold text-[#6d5b4d]">Phone:</span>{" "}
                +91 8791840787
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}