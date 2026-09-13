import { ArrowUpRight, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#eadfd5] bg-[#f8ebe3] shadow-[0_15px_45px_rgba(109,91,77,0.07)]">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#c98f84]/15 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-white/70 blur-3xl" />

        <div className="pointer-events-none absolute right-1/4 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full border border-white/60" />

        <div className="relative mx-auto max-w-3xl px-6 py-10 text-center sm:px-10 sm:py-12">
          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#dfc2b3] bg-[#fffaf7] text-[#c98f84] shadow-sm">
            <Mail size={23} strokeWidth={1.8} />
          </div>

          {/* Eyebrow */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#dfc2b3]" />

            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#9a8879]">
              Stay Connected
            </p>

            <span className="h-px w-8 bg-[#dfc2b3]" />
          </div>

          {/* Heading */}
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#6d5b4d] sm:text-4xl">
            Stay in the loop
          </h2>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#8d7968] sm:text-base">
            Subscribe to get updates about new arrivals, special offers, and
            exclusive styles from Mimi & Me.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <div className="flex flex-1 items-center rounded-xl border border-[#dfcfc3] bg-[#fffaf7] px-4 shadow-sm transition-all duration-300 focus-within:border-[#c98f84] focus-within:ring-4 focus-within:ring-[#c98f84]/10">
              <Mail
                size={18}
                className="shrink-0 text-[#9a8879]"
                strokeWidth={1.8}
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent px-3 py-3.5 text-sm text-[#6d5b4d] outline-none placeholder:text-[#b09e90]"
              />
            </div>

            <button
              type="submit"
              className="group flex items-center justify-center gap-2 rounded-xl bg-[#6d5b4d] px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(109,91,77,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#58493e] hover:shadow-lg"
            >
              Subscribe

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </button>
          </form>

          {/* Privacy Note */}
          <p className="mt-4 text-xs text-[#a08e80]">
            We respect your inbox. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
}