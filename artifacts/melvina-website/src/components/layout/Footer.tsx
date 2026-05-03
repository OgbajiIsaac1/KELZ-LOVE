import { Link } from "wouter";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t bg-card py-12 text-card-foreground">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-4">
          <Link href="/">
            <span className="font-serif text-2xl font-bold text-primary cursor-pointer">
              Melvina Igboanugo
            </span>
          </Link>
          <p className="text-muted-foreground max-w-sm">
            Transforming Education, One Learner at a Time. Dedicated to building strong literacy, clear expression, and academic excellence.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/about"><span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">About</span></Link></li>
            <li><Link href="/programs"><span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">Programs</span></Link></li>
            <li><Link href="/impact"><span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">Impact</span></Link></li>
            <li><Link href="/contact"><span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">Contact</span></Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Melvina Igboanugo. All rights reserved.</p>
      </div>
    </footer>
  );
}
