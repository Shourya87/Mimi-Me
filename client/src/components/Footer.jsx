// src/components/layout/Footer.jsx

import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaInstagram />, href: "#" },
    
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaXTwitter />, href: "#" },
    { icon: <FaWhatsapp />, href: "#" },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-[#e6d7c9] bg-gradient-to-b from-[#fdfaf6] via-[#faf6f1] to-[#f5eee7]">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 -left-16 h-72 w-72 rounded-full bg-[#fff7f2] blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#f8ebe3] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-6">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/logo.png"
                alt="Mimi & Me"
                className="h-16 w-auto object-contain transition duration-300 hover:scale-105"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#8d7968]">
              Premium clothing thoughtfully curated for babies, little girls,
              and moms—crafted with love, comfort, and timeless elegance for
              every beautiful moment.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e6d7c9] bg-[#fffaf5] text-[#8d7968] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#e7c7b8] hover:bg-[#f9eee7] hover:text-[#c98f84]"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-5 text-lg font-semibold tracking-wide text-[#6d5b4d]">
              Shop
            </h3>

            <ul className="space-y-3 text-sm text-[#8d7968]">
              <li>
                <Link
                  to="/shop"
                  className="transition-all duration-300 hover:pl-1 hover:text-[#c98f84]"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="transition-all duration-300 hover:pl-1 hover:text-[#c98f84]"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/new-arrivals"
                  className="transition-all duration-300 hover:pl-1 hover:text-[#c98f84]"
                >
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link
                  to="/sale"
                  className="transition-all duration-300 hover:pl-1 hover:text-[#c98f84]"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-lg font-semibold tracking-wide text-[#6d5b4d]">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-[#8d7968]">
              <li>
                <Link
                  to="/about"
                  className="transition-all duration-300 hover:pl-1 hover:text-[#c98f84]"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="transition-all duration-300 hover:pl-1 hover:text-[#c98f84]"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="transition-all duration-300 hover:pl-1 hover:text-[#c98f84]"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="transition-all duration-300 hover:pl-1 hover:text-[#c98f84]"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold tracking-wide text-[#6d5b4d]">
              Get in Touch
            </h3>

            <div className="space-y-5 text-sm text-[#8d7968]">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#f8ebe3] p-2.5 text-[#c98f84]">
                  <Mail size={16} />
                </div>

                <span className="leading-6">
                  support@mimiandme.com
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#f8ebe3] p-2.5 text-[#c98f84]">
                  <Phone size={16} />
                </div>

                <span className="leading-6">
                  +91 8791840787
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#f8ebe3] p-2.5 text-[#c98f84]">
                  <MapPin size={16} />
                </div>

                <span className="leading-6">
                  Muzaffarnagar,
                  <br />
                  Uttar Pradesh, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#e6d7c9] pt-6 text-center text-sm text-[#9f8c7a] md:flex-row">
          <p>
            © {year}{" "}
            <span className="font-medium text-[#6d5b4d]">
              Mimi & Me
            </span>
            . All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            Made with{" "}
            <Heart
              size={15}
              className="fill-[#d89a8c] text-[#d89a8c]"
            />{" "}
            for little moments.
          </p>
        </div>
      </div>
    </footer>
  );
}