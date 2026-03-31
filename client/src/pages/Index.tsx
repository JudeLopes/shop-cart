import { Link } from "react-router-dom";
import { Shield, Lock, Heart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-[85vh] flex items-center relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-breathe" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-breathe" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-gentle" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full shadow-soft mb-8 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Your mental wellness companion
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
              MindGuard
              <span className="block text-primary mt-2">
                Crisis Detection & Support
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              Anonymous, private, and built to protect your mental well-being. 
              A safe space to check in with yourself.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              <Link to="/check-in">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 rounded-xl shadow-card hover:shadow-elevated transition-all group">
                  Start Safe Check-In
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/resources">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-6 rounded-xl bg-card/50 backdrop-blur-sm border-border hover:bg-card transition-all">
                  Explore Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How MindGuard Helps
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A compassionate approach to understanding your mental state
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="card-gradient rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Safe Assessment
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Share your feelings through journaling. Our system gently identifies signs of distress without judgment.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-gradient rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all group">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Complete Privacy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your words stay with you. We don't store any data. Everything is processed anonymously.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-gradient rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all group">
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Supportive Resources
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Access coping techniques, grounding exercises, and crisis helplines tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full calm-gradient mx-auto mb-8 flex items-center justify-center animate-float">
              <Heart className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              You're Not Alone
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Taking care of your mental health is a sign of strength. 
              MindGuard is here to support you on your journey, 
              one check-in at a time.
            </p>
            <Link to="/check-in">
              <Button size="lg" className="rounded-xl px-8 py-6 shadow-card hover:shadow-elevated transition-all">
                Begin Your Check-In
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
