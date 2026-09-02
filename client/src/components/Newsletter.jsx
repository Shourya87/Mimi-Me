import { Mail, ArrowRight } from "lucide-react";
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
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 px-6 py-12 sm:px-10 lg:px-16">
        {/* Decorative elements */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-pink-200/50 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm">
            <Mail size={25} />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Stay Connected
          </p>

          <h2 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
            Stay in the loop
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-stone-600">
            Subscribe to get updates about new arrivals, special offers, and
            exclusive styles from Mimi & Me.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <div className="flex flex-1 items-center rounded-xl border border-stone-200 bg-white px-4 shadow-sm focus-within:border-orange-400">
              <Mail size={19} className="shrink-0 text-stone-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent px-3 py-3.5 text-sm text-stone-800 outline-none placeholder:text-stone-400"
              />
            </div>

            <button
              type="submit"
              className="group flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-600"
            >
              Subscribe
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          <p className="mt-4 text-xs text-stone-500">
            We respect your inbox. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
}