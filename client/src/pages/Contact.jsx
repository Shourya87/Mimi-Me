import { Mail, MapPin, Phone } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();

    // Connect this form to your contact API later.
  };

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#5f4a3a]">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center md:py-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#c98f84]">
          Contact Us
        </p>

        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          We would love to
          <span className="block text-[#c98f84]">hear from you.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#8d7968] md:text-lg">
          Have a question about an order, our products, or anything else?
          Send us a message and our team will get back to you.
        </p>
      </section>

      {/* Contact Content */}
      <section className="bg-[#f8ebe3]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 md:py-20">
          {/* Contact Information */}
          <div className="md:col-span-1">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#c98f84]">
              Get in Touch
            </p>

            <h2 className="text-3xl font-bold text-[#5f4a3a]">
              Let's talk.
            </h2>

            <p className="mt-4 leading-7 text-[#8d7968]">
              Our team is here to help with your questions, orders, and
              shopping experience.
            </p>

            <div className="mt-8 space-y-5">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fffaf5] text-[#c98f84] shadow-sm">
                  <Mail size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-[#5f4a3a]">Email</h3>
                  <p className="mt-1 text-sm text-[#8d7968]">
                    support@mimiandme.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fffaf5] text-[#c98f84] shadow-sm">
                  <Phone size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-[#5f4a3a]">Phone</h3>
                  <p className="mt-1 text-sm text-[#8d7968]">
                    +91 8791840787
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fffaf5] text-[#c98f84] shadow-sm">
                  <MapPin size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-[#5f4a3a]">Location</h3>
                  <p className="mt-1 text-sm leading-6 text-[#8d7968]">
                    Muzaffarnagar,
                    <br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm md:col-span-2 md:p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-[#5f4a3a]">
                Send us a message
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#8d7968]">
                Fill out the form below and we will get back to you as soon as
                possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
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
                  className="mb-2 block text-sm font-semibold tracking-wide text-[#5f4a3a]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Write your message..."
                  required
                  className="w-full resize-none rounded-2xl border border-[#e4d7c9] bg-[#fffcf8] px-5 py-3.5 text-[#3d2e22] shadow-sm outline-none transition-all duration-300 placeholder:text-[#a39384] hover:border-[#c7aa88] focus:border-[#a67c52] focus:bg-white focus:ring-4 focus:ring-[#eadccb] focus:shadow-lg"
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
      <section className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">
        <h2 className="text-3xl font-bold text-[#5f4a3a] md:text-4xl">
          Need help with an order?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#8d7968]">
          For order-related questions, keep your order number handy so we can
          help you faster.
        </p>

        <a
          href="mailto:support@mimiandme.com"
          className="mt-6 inline-flex font-semibold text-[#c98f84] transition hover:text-[#a8756d]"
        >
          support@mimiandme.com
        </a>
      </section>
    </main>
  );
}