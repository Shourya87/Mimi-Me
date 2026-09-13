import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { NAV_LINKS } from "../constants/navigation";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { user, isAuthenticated } = useAuthStore();

  const iconButton =
    "relative flex h-11 w-11 items-center justify-center rounded-full border border-[#e6d7c9] bg-[#fffaf5] text-[#7d6a59] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dfc2b3] hover:bg-[#f8ebe3] hover:text-[#c98f84]";

  const mobileIconButton =
    "relative flex h-11 w-11 items-center justify-center rounded-full border border-[#e6d7c9] bg-[#fffaf5] text-[#7d6a59] transition-all duration-300 hover:border-[#dfc2b3] hover:bg-[#f8ebe3] hover:text-[#c98f84]";

  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfd5] bg-[#fffaf7]/90 shadow-md backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center transition duration-300 hover:opacity-90"
        >
          <img
            src="/logo.png"
            alt="Mimi & Me"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative text-[15px] font-medium transition-all duration-300 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:rounded-full after:bg-[#c98f84] after:transition-all after:duration-300 ${
                    isActive
                      ? "text-[#6d5b4d] after:w-full"
                      : "text-[#8d7968] after:w-0 hover:text-[#c98f84] hover:after:w-full"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/shop"
            aria-label="Search"
            title="Search"
            className={iconButton}
          >
            <Search size={19} />
          </Link>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            title="Wishlist"
            className={iconButton}
          >
            <Heart size={19} />
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
            title="Cart"
            className={iconButton}
          >
            <ShoppingBag size={19} />
          </Link>

          <Link
            to={isAuthenticated ? "/profile" : "/login"}
            aria-label="Account"
            title={isAuthenticated ? "Profile" : "Login"}
            className={iconButton}
          >
            <User size={19} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="rounded-xl border border-[#e6d7c9] bg-[#fffaf5] p-2 text-[#7d6a59] transition hover:bg-[#f8ebe3] md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-[#eadfd5] bg-[#fffaf7] transition-all duration-300 md:hidden ${
          isOpen ? "max-h-150" : "max-h-0"
        }`}
      >
        <div className="space-y-2 px-6 py-6">
          {/* Mobile Navigation */}
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-[15px] font-medium transition ${
                  isActive
                    ? "bg-[#f8ebe3] text-[#c98f84]"
                    : "text-[#8d7968] hover:bg-[#fdf3ed] hover:text-[#c98f84]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Actions */}
          <div className="mt-6 flex items-center gap-3 border-t border-[#eadfd5] pt-6">
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              aria-label="Search"
              title="Search"
              className={mobileIconButton}
            >
              <Search size={18} />
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setIsOpen(false)}
              aria-label="Wishlist"
              title="Wishlist"
              className={mobileIconButton}
            >
              <Heart size={18} />
            </Link>

            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              aria-label="Cart"
              title="Cart"
              className={mobileIconButton}
            >
              <ShoppingBag size={18} />
            </Link>

            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              onClick={() => setIsOpen(false)}
              aria-label="Account"
              title={isAuthenticated ? "Profile" : "Login"}
              className={mobileIconButton}
            >
              <User size={18} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
