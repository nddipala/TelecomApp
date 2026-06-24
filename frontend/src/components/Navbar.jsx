import { Link, useLocation } from "react-router-dom";

/** Top navigation bar styled like an internal T-Mobile retail tool. */
export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-magenta text-lg font-extrabold text-white">
            T
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-ink">Smart Device Upgrade Tracker</p>
            <p className="text-xs text-gray-500">Internal Retail Console</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/" label="Lookup" active={pathname === "/"} />
          <NavLink
            to="/dashboard"
            label="Dashboard"
            active={pathname.startsWith("/dashboard")}
          />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
        active ? "bg-magenta/10 text-magenta" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );
}
