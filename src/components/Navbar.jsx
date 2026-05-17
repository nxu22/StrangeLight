import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const iconStyle = { color: "#2C1810", textDecoration: "none", display: "flex", alignItems: "center", position: "relative" };

export default function Navbar() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const hideSearch = pathname === "/cart" || pathname === "/login";
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  }

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "22px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", mixBlendMode: "multiply" }}>
        <Link to="/" style={{ color: "#2C1810", textDecoration: "none", fontSize: "12px", fontWeight: 900, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Strange Light
        </Link>

        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>

          {/* Search */}
          {!hideSearch && (
            <button
              onClick={() => setSearchOpen(o => !o)}
              style={{ ...iconStyle, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          )}

          {/* Account */}
          <Link to="/login" style={iconStyle} title={user ? "My Account" : "Login"}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>

          {/* Cart */}
          <Link to="/cart" style={iconStyle} title="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span style={{ position: "absolute", top: "-6px", right: "-8px", backgroundColor: "#D9531E", color: "#F0E4C8", borderRadius: "50%", width: "16px", height: "16px", fontSize: "9px", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: 0 }}>
                {totalItems}
              </span>
            )}
          </Link>

        </div>
      </nav>

      {/* Search dropdown */}
      {searchOpen && (
        <div style={{ position: "fixed", top: "64px", left: 0, right: 0, zIndex: 99, backgroundColor: "#F2D9C2", borderBottom: "1px solid #C45A3A", padding: "20px 48px", display: "flex", alignItems: "center", gap: "12px" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", maxWidth: "500px", margin: "0 auto" }}>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by animal — dog, cat, owl…"
              style={{ flex: 1, padding: "12px 16px", fontSize: "13px", fontFamily: "inherit", letterSpacing: "0.05em", border: "1px solid #C45A3A", backgroundColor: "#F0E4C8", color: "#2C1810", outline: "none" }}
            />
            <button type="submit" style={{ padding: "12px 24px", backgroundColor: "#2C1810", color: "#F0E4C8", border: "none", fontFamily: "inherit", fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
              Go
            </button>
            <button type="button" onClick={() => setSearchOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#B89B95", fontSize: "20px", lineHeight: 1, padding: "0 4px" }}>
              ×
            </button>
          </form>
        </div>
      )}
    </>
  );
}
