import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { FaWhatsapp } from "react-icons/fa";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/impact", label: "Impact" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/60"
          : "bg-background/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <Link href="/">
          <span className="cursor-pointer group flex flex-col leading-tight">
            <span className="font-serif text-lg font-bold text-primary group-hover:text-primary/80 transition-colors">
              Melvina Igboanugo
            </span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-accent uppercase -mt-0.5">
              The Education Enthusiast
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                  location === link.href
                    ? "text-primary bg-primary/8 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <ThemeToggle />
          <div className="ml-2">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full px-5 gap-2 shadow-sm" size="sm">
                <FaWhatsapp size={15} />
                Book a Session
              </Button>
            </a>
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2 text-foreground rounded-lg hover:bg-muted transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-md absolute w-full flex flex-col shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium cursor-pointer transition-colors ${
                    location === link.href
                      ? "text-primary bg-primary/8 font-semibold"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground">Appearance</span>
              <ThemeToggle />
            </div>
            <div className="pt-2 pb-1">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full rounded-full gap-2">
                  <FaWhatsapp size={16} />
                  Book a Session
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
