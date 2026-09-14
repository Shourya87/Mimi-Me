import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <main className="min-h-screen bg-[#F8F5F1] text-[#6d5b4d]">
      {/* Hero */}
      <section className="border-b border-[#E7DBD0] bg-[#FFFCF9]">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-18">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D8BBA6]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9A7660] sm:text-xs">
              Legal
            </p>

            <span className="h-px w-8 bg-[#D8BBA6]" />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#4F3C30] sm:text-4xl lg:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#8D7968] sm:text-base">
            Please read these terms carefully before using Mimi & Me or
            purchasing our products.
          </p>

          <p className="mt-3 text-xs text-[#9A8879] sm:text-sm">
            Last updated: August 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="rounded-3xl border border-[#E6D9CC] bg-[#FFFCF9] p-6 shadow-[0_8px_30px_rgba(109,91,77,0.05)] sm:p-8 lg:p-10">
          <div className="space-y-9 text-sm leading-7 text-[#806F60] sm:text-[15px]">
            {/* 1. Introduction */}
            <section>
              <h2 className="mb-2.5 text-xl font-semibold tracking-tight text-[#4F3C30] sm:text-2xl">
                1. Introduction
              </h2>

              <p>
                Welcome to Mimi & Me. By accessing our website, browsing our
                products, creating an account, or placing an order, you agree
                to comply with these Terms & Conditions. If you do not agree
                with any part of these terms, please do not use our website.
              </p>
            </section>

            {/* 2. Use of Website */}
            <section>
              <h2 className="mb-2.5 text-xl font-semibold tracking-tight text-[#4F3C30] sm:text-2xl">
                2. Use of Our Website
              </h2>

              <p className="mb-3">
                You agree to use this website only for lawful purposes and in a
                manner that does not interfere with the operation of the
                website.
              </p>

              <ul className="list-disc space-y-1.5 pl-5 marker:text-[#B77D73]">
                <li>
                  You must provide accurate information when creating an
                  account.
                </li>
                <li>
                  You are responsible for maintaining the security of your
                  account.
                </li>
                <li>
                  You must not attempt to gain unauthorized access to our
                  systems.
                </li>
                <li>
                  You must not use the website for fraudulent or unlawful
                  activities.
                </li>
              </ul>
            </section>

            {/* 3. Products */}
            <section>
              <h2 className="mb-2.5 text-xl font-semibold tracking-tight text-[#4F3C30] sm:text-2xl">
                3. Products & Availability
              </h2>

              <p>
                We make reasonable efforts to ensure that product descriptions,
                images, prices, and availability displayed on our website are
                accurate. However, minor variations in color, appearance, or
                presentation may occur.
              </p>

              <p className="mt-3">
                Products are subject to availability, and we reserve the right
                to limit quantities or discontinue products without prior
                notice.
              </p>
            </section>

            {/* 4. Pricing */}
            <section>
              <h2 className="mb-2.5 text-xl font-semibold tracking-tight text-[#4F3C30] sm:text-2xl">
                4. Pricing & Payments
              </h2>

              <p>
                All prices displayed on our website are in Indian Rupees (₹).
                Prices, discounts, offers, and promotions may change at any
                time without prior notice.
              </p>

              <p className="mt-3">
                You agree to provide valid payment information when placing an
                order. An order is considered successfully placed only after
                payment authorization and order confirmation.
              </p>
            </section>

            {/* 5. Orders */}
            <section>
              <h2 className="mb-2.5 text-xl font-semibold tracking-tight text-[#4F3C30] sm:text-2xl">
                5. Orders & Cancellation
              </h2>

              <p>
                Once an order is placed, you will receive an order
                confirmation. We reserve the right to cancel or reject an
                order in cases such as product unavailability, pricing errors,
                suspected fraud, or other operational reasons.
              </p>
            </section>

            {/* 6. Shipping */}
            <section>
              <h2 className="mb-2.5 text-xl font-semibold tracking-tight text-[#4F3C30] sm:text-2xl">
                6. Shipping & Delivery
              </h2>

              <p>
                Delivery times provided on our website are estimates and may
                vary depending on the delivery location, courier availability,
                weather, holidays, or other circumstances beyond our control.
              </p>
            </section>

            {/* 7. Returns */}
            <section>
              <h2 className="mb-2.5 text-xl font-semibold tracking-tight text-[#4F3C30] sm:text-2xl">
                7. Returns & Refunds
              </h2>

              <p>
                Returns, exchanges, and refunds are subject to our applicable
                return and refund policy. Products must meet the eligibility
                requirements specified in that policy.
              </p>

              <Link
                to="/refund-policy"
                className="mt-3 inline-flex items-center font-semibold text-[#B77D73] transition-colors hover:text-[#8A6652]"
              >
                View our Refund & Return Policy
                <span className="ml-1">→</span>
              </Link>
            </section>

            {/* 8. Intellectual Property */}
            <section>
              <h2 className="mb-2.5 text-xl font-semibold tracking-tight text-[#4F3C30] sm:text-2xl">
                8. Intellectual Property
              </h2>

              <p>
                All website content, including logos, graphics, images, text,
                designs, product descriptions, and other materials, belongs to
                Mimi & Me or its respective content providers and may not be
                reproduced or distributed without permission.
              </p>
            </section>

            {/* 9. Limitation */}
            <section>
              <h2 className="mb-2.5 text-xl font-semibold tracking-tight text-[#4F3C30] sm:text-2xl">
                9. Limitation of Liability
              </h2>

              <p>
                Mimi & Me will not be responsible for indirect, incidental, or
                consequential losses resulting from the use of our website or
                services, to the extent permitted by applicable law.
              </p>
            </section>

            {/* 10. Changes */}
            <section>
              <h2 className="mb-2.5 text-xl font-semibold tracking-tight text-[#4F3C30] sm:text-2xl">
                10. Changes to These Terms
              </h2>

              <p>
                We may update these Terms & Conditions from time to time.
                Updated terms will be published on this page, and your
                continued use of the website after changes are published
                constitutes acceptance of the updated terms.
              </p>
            </section>

            {/* 11. Contact */}
            <section className="rounded-2xl border border-[#E2D2C4] bg-[#F3E8DE] p-5 sm:p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-px w-5 bg-[#D0AD97]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A7660]">
                  Get in Touch
                </span>
              </div>

              <h2 className="mb-2 text-lg font-semibold text-[#4F3C30] sm:text-xl">
                11. Contact Us
              </h2>

              <p>
                If you have any questions regarding these Terms & Conditions,
                please contact us.
              </p>

              <div className="mt-4 space-y-2 text-sm text-[#806F60]">
                <p>
                  <span className="font-semibold text-[#4F3C30]">
                    Email:
                  </span>{" "}
                  support@mimiandme.com
                </p>

                <p>
                  <span className="font-semibold text-[#4F3C30]">
                    Phone:
                  </span>{" "}
                  +91 8791840787
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}