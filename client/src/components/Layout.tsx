import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import ChatbotWidget from "./ChatbotWidget";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/check-in", label: "Safe Check-In" },
    { path: "/resources", label: "Support & Resources" },
    { path: "/about", label: "About & Privacy" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl calm-gradient flex items-center justify-center shadow-soft group-hover:shadow-card transition-shadow">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-semibold text-foreground">
                MindGuard
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border animate-fadeIn">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              <span className="font-display text-lg font-medium text-foreground">
                MindGuard
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              For educational use only, not medical advice. If you're in crisis, please contact a helpline.
            </p>
            <div className="flex gap-4">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Get Help
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full calm-gradient shadow-elevated flex items-center justify-center hover:scale-105 transition-transform z-50"
        aria-label="Quick Coping Tips"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </button>

      {chatOpen && <ChatbotWidget onClose={() => setChatOpen(false)} />}
    </div>
  );
};

export default Layout;
