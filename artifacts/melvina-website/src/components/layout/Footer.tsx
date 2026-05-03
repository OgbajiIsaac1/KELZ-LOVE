import { Link } from "wouter";
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { href: SOCIAL_LINKS.youtube, icon: FaYoutube, label: "YouTube", color: "hover:text-red-500" },
    { href: SOCIAL_LINKS.linkedin, icon: FaLinkedin, label: "LinkedIn", color: "hover:text-blue-500" },
    { href: SOCIAL_LINKS.instagram, icon: FaInstagram, label: "Instagram", color: "hover:text-pink-500" },
    { href: SOCIAL_LINKS.facebook, icon: FaFacebook, label: "Facebook", color: "hover:text-blue-600" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Top CTA band */}
      <div className="bg-primary py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-primary-foreground/70 text-sm font-semibold uppercase tracking-widest mb-3">The Education Enthusiast</p>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Learning Journey?
          </h3>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Join hundreds of students, educators, and schools who are building futures through stronger literacy, clearer thinking, and systems that work.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 md:px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <Link href="/">
              <span className="font-serif text-2xl font-bold text-primary cursor-pointer">
                Melvina Igboanugo
              </span>
            </Link>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase mt-1">The Education Enthusiast</p>
          </div>
          <p className="text-background/70 max-w-sm leading-relaxed text-sm">
            Education leader, mentor, and learning strategist dedicated to transforming how students learn, how educators teach, and how schools operate. Building confident thinkers and purpose-driven leaders — one program at a time.
          </p>
          <div className="space-y-2.5 text-sm">
            <a href="mailto:meligboanugo@gmail.com" className="flex items-center gap-2.5 text-background/70 hover:text-accent transition-colors">
              <Mail size={15} className="text-accent shrink-0" />
              meligboanugo@gmail.com
            </a>
            <a href="tel:+2347067825349" className="flex items-center gap-2.5 text-background/70 hover:text-accent transition-colors">
              <Phone size={15} className="text-accent shrink-0" />
              +234 706 782 5349
            </a>
            <span className="flex items-center gap-2.5 text-background/70">
              <MapPin size={15} className="text-accent shrink-0" />
              Enugu State, Nigeria
            </span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-semibold text-background mb-5 text-sm uppercase tracking-widest">Explore</h4>
          <ul className="space-y-3">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Melvina" },
              { href: "/programs", label: "Programs" },
              { href: "/impact", label: "Impact" },
              { href: "/blog", label: "Blog & Resources" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href}>
                  <span className="text-background/60 hover:text-accent cursor-pointer transition-colors text-sm">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-semibold text-background mb-5 text-sm uppercase tracking-widest">Connect</h4>
          <div className="space-y-3">
            {socialLinks.map(({ href, icon: Icon, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 text-background/60 ${color} transition-colors group text-sm`}
              >
                <span className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center group-hover:bg-background/20 transition-colors">
                  <Icon size={15} />
                </span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10 py-6 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-background/40">
          <p>&copy; {new Date().getFullYear()} Melvina Igboanugo. All rights reserved.</p>
          <p className="italic font-serif">"Raising Readers. Building Thinkers. Transforming Education."</p>
        </div>
      </div>
    </footer>
  );
}
