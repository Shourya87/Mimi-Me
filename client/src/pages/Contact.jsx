import { Mail, MapPin, Phone } from "lucide-react";

import Input from "../components/Input";
import Button from "../components/Button";

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Connect this form to your contact API later.
  };

  return (
    <main className="min-h-screen bg-[#F8F5F1] text-[#6d5b4d]">
      {/* Hero */}
      <section className="border-b border-[#E7DBD0] bg-[#FFFCF9]">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D8BBA6]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9A7660] sm:text-xs">
              Contact Us
            </p>

            <span className="h-px w-8 bg-[#D8BBA6]" />
          </div>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#4F3C30] sm:text-4xl lg:text-5xl">
            We would love to
            <span className="block text-[#B77D73]">
              hear from you.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#8D7968] sm:text-base">
            Have a question about an order, our products, or anything else?
            Send us a message and our team will get back to you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-[#F3E8DE]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-3 lg:gap-12 lg:px-8 lg:py-20">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-6 bg-[#D0AD97]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9A7660] sm:text-xs">
                Get in Touch
              </p>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-[#4F3C30] sm:text-3xl">
              Let's talk.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#806F60] sm:text-base">
              Our team is here to help with your questions, orders, and
              shopping experience.
            </p>

            <div className="mt-7 space-y-5">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E4D4C7] bg-[#FFFCF9] text-[#B77D73] shadow-sm">
                  <Mail size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#4F3C30]">
                    Email
                  </h3>

                  <p className="mt-1 text-sm text-[#8D7968]">
                    support@mimiandme.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E4D4C7] bg-[#FFFCF9] text-[#8A6652] shadow-sm">
                  <Phone size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#4F3C30]">
                    Phone
                  </h3>

                  <p className="mt-1 text-sm text-[#8D7968]">
                    +91 8791840787
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E4D4C7] bg-[#FFFCF9] text-[#9A7660] shadow-sm">
                  <MapPin size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#4F3C30]">
                    Location
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#8D7968]">
                    Muzaffarnagar,
                    <br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-[#E6D9CC] bg-[#FFFCF9] p-5 shadow-[0_10px_35px_rgba(109,91,77,0.06)] sm:p-7 lg:col-span-2 lg:p-8">
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-px w-5 bg-[#D8BBA6]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A7660]">
                  Message
                </span>
              </div>

              <h2 className="text-xl font-semibold tracking-tight text-[#4F3C30] sm:text-2xl">
                Send us a message
              </h2>

              <p className="mt-1.5 text-sm leading-6 text-[#8D7968]">
                Fill out the form below and we will get back to you as soon as
                possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  id="name"
                  name="name"
                  label="Your Name"
                  type="text"
                  placeholder="Enter your name"
                  required
                />

                <Input
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <Input
                id="subject"
                name="subject"
                label="Subject"
                type="text"
                placeholder="What can we help you with?"
                required
              />

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold tracking-wide text-[#4F3C30]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message..."
                  required
                  className="w-full resize-none rounded-2xl border border-[#E2D5C9] bg-[#FAF7F3] px-4 py-3 text-sm text-[#4F3C30] shadow-sm outline-none transition-all duration-300 placeholder:text-[#A39384] hover:border-[#D3B8A3] focus:border-[#B8957C] focus:bg-[#FFFCF9] focus:ring-4 focus:ring-[#F1E5DB]"
                />
              </div>

              <Button type="submit" size="lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#E7DBD0] bg-[#FFFCF9]">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#D0AD97]" />
            <span className="text-[#B77D73]">✦</span>
            <span className="h-px w-7 bg-[#D0AD97]" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-[#4F3C30] sm:text-3xl lg:text-4xl">
            Need help with an order?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#8D7968] sm:text-base">
            For order-related questions, keep your order number handy so we can
            help you faster.
          </p>

          <a
            href="mailto:support@mimiandme.com"
            className="mt-5 inline-flex text-sm font-semibold text-[#B77D73] transition-colors hover:text-[#8A6652]"
          >
            support@mimiandme.com
          </a>
        </div>
      </section>
    </main>
  );
}