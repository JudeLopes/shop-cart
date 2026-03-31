import { Shield, Heart, AlertCircle, Lock, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen hero-gradient py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About MindGuard
          </h1>
          <p className="text-muted-foreground text-lg">
            Understanding our mission and commitment to your privacy
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Mission */}
          <section className="bg-card rounded-2xl shadow-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Our Purpose
              </h2>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                MindGuard was created with a simple but powerful mission: to provide a safe, 
                anonymous space where anyone can check in with their mental well-being without 
                fear of judgment or exposure.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We understand that mental health struggles can feel isolating, and sometimes 
                you just need a private moment to reflect on how you're really feeling. 
                MindGuard offers gentle assessment tools and practical coping resources to 
                support you wherever you are on your journey.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our goal is to help identify early signs of distress—from everyday stress to 
                more serious concerns—and connect you with appropriate resources and support.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section className="bg-card rounded-2xl shadow-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Lock className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Privacy & Anonymity
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-xl">
                <Shield className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">No Data Storage</h3>
                  <p className="text-sm text-muted-foreground">
                    We do not store, save, or transmit any text you enter. All analysis 
                    happens locally in your browser and is discarded immediately.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-xl">
                <Users className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Complete Anonymity</h3>
                  <p className="text-sm text-muted-foreground">
                    No accounts, no sign-ups, no personal information required. 
                    You can use MindGuard completely anonymously.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-xl">
                <Sparkles className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Your Space, Your Terms</h3>
                  <p className="text-sm text-muted-foreground">
                    This is a judgment-free zone. Express yourself freely knowing 
                    that your words remain private and confidential.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Important Disclaimer */}
          <section className="bg-accent/50 border border-accent-foreground/20 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-accent-foreground" />
              <h2 className="font-display text-xl font-bold text-foreground">
                Important Disclaimer
              </h2>
            </div>

            <div className="space-y-4 text-accent-foreground">
              <p>
                <strong>MindGuard is NOT a replacement for professional mental health care.</strong>
              </p>
              <p>
                This tool is designed for educational and self-awareness purposes only. 
                It uses simple keyword analysis to provide general guidance and should not 
                be considered a clinical diagnosis or professional advice.
              </p>
              <p>
                If you are experiencing a mental health crisis, severe distress, or thoughts 
                of self-harm, please contact a qualified mental health professional, call a 
                crisis helpline, or go to your nearest emergency room immediately.
              </p>
              <p className="font-medium">
                Your life matters. Professional help is available.
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-card rounded-2xl shadow-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              How MindGuard Works
            </h2>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Share Your Thoughts</h3>
                  <p className="text-sm text-muted-foreground">
                    Write freely about how you're feeling in our safe check-in space.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Gentle Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our system identifies patterns and keywords to understand your current state.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Personalized Guidance</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive appropriate resources and coping techniques based on your needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Connect with Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Access crisis helplines and professional resources when needed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center pt-4">
            <Link to="/check-in">
              <Button size="lg" className="rounded-xl px-8 py-6 shadow-card">
                Start Your Safe Check-In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
