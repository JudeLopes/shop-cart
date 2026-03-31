import { 
  Wind, 
  Eye, 
  Sparkles, 
  Heart, 
  Phone, 
  MapPin,
  ChevronDown,
  Leaf,
  Music,
  Footprints
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Resources = () => {
  return (
    <div className="min-h-screen hero-gradient py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Support & Resources
          </h1>
          <p className="text-muted-foreground text-lg">
            Practical techniques and resources to help you through difficult moments
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breathing Exercises */}
          <section className="bg-card rounded-2xl shadow-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wind className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Breathing Exercises
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">4-7-8 Technique</h3>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Breathe in through your nose for 4 seconds</li>
                  <li>Hold your breath for 7 seconds</li>
                  <li>Exhale slowly through mouth for 8 seconds</li>
                  <li>Repeat 3-4 times</li>
                </ol>
              </div>
              <div className="bg-muted/50 rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">Box Breathing</h3>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Breathe in for 4 seconds</li>
                  <li>Hold for 4 seconds</li>
                  <li>Breathe out for 4 seconds</li>
                  <li>Hold for 4 seconds, then repeat</li>
                </ol>
              </div>
            </div>

            {/* Breathing Animation */}
            <div className="mt-6 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full calm-gradient animate-breathe flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-sm">Breathe</span>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Follow the circle: expand = inhale, contract = exhale
                </p>
              </div>
            </div>
          </section>

          {/* Grounding Techniques */}
          <section className="bg-card rounded-2xl shadow-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Eye className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Grounding Techniques
              </h2>
            </div>

            <div className="bg-secondary/30 rounded-xl p-6 mb-4">
              <h3 className="font-semibold text-foreground mb-4 text-lg">
                5-4-3-2-1 Method
              </h3>
              <p className="text-muted-foreground mb-4">
                This technique helps bring you back to the present moment by engaging your senses:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">5</span>
                  <p className="text-foreground pt-1">Name <strong>5 things</strong> you can see around you</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">4</span>
                  <p className="text-foreground pt-1">Name <strong>4 things</strong> you can physically touch</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">3</span>
                  <p className="text-foreground pt-1">Name <strong>3 things</strong> you can hear right now</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">2</span>
                  <p className="text-foreground pt-1">Name <strong>2 things</strong> you can smell</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">1</span>
                  <p className="text-foreground pt-1">Name <strong>1 thing</strong> you can taste</p>
                </div>
              </div>
            </div>
          </section>

          {/* Stress Relief Activities */}
          <section className="bg-card rounded-2xl shadow-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Stress-Relief Activities
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-xl p-5 text-center">
                <Leaf className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Nature Walk</h3>
                <p className="text-sm text-muted-foreground">
                  Spend 10-15 minutes outdoors, even in a park or garden
                </p>
              </div>
              <div className="bg-muted/50 rounded-xl p-5 text-center">
                <Music className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Calming Music</h3>
                <p className="text-sm text-muted-foreground">
                  Listen to soothing sounds or your favorite calming playlist
                </p>
              </div>
              <div className="bg-muted/50 rounded-xl p-5 text-center">
                <Footprints className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Gentle Movement</h3>
                <p className="text-sm text-muted-foreground">
                  Try stretching, yoga, or a short walk to release tension
                </p>
              </div>
            </div>
          </section>

          {/* Mental Health Tips */}
          <section className="bg-card rounded-2xl shadow-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Mental Health Tips
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-1" className="border rounded-xl px-4">
                <AccordionTrigger className="hover:no-underline">
                  Establish a routine
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Having a daily routine can provide structure and reduce anxiety. 
                  Set regular times for waking up, meals, work, and relaxation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-xl px-4">
                <AccordionTrigger className="hover:no-underline">
                  Practice self-compassion
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Treat yourself with the same kindness you'd offer a friend. 
                  It's okay to have difficult days—acknowledge your feelings without judgment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-xl px-4">
                <AccordionTrigger className="hover:no-underline">
                  Stay connected
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Reach out to friends, family, or support groups regularly. 
                  Social connection is vital for mental well-being.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-xl px-4">
                <AccordionTrigger className="hover:no-underline">
                  Limit news and social media
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Set boundaries on how much negative content you consume. 
                  Take breaks from screens and practice digital wellness.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border rounded-xl px-4">
                <AccordionTrigger className="hover:no-underline">
                  Prioritize sleep
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Aim for 7-9 hours of quality sleep. Create a calming bedtime routine 
                  and keep your sleep environment comfortable.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Crisis Helplines */}
          <section className="bg-card rounded-2xl shadow-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-destructive" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Crisis Helplines
              </h2>
            </div>

            <p className="text-muted-foreground mb-6">
              If you or someone you know is in crisis, please reach out to one of these helplines:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground">🇮🇳 India</p>
                <p className="text-lg font-bold text-primary">9152987821</p>
                <p className="text-sm text-muted-foreground">iCall (Mon-Sat, 8am-10pm)</p>
              </div>
              <div className="border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground">🇺🇸 United States</p>
                <p className="text-lg font-bold text-primary">988</p>
                <p className="text-sm text-muted-foreground">Suicide & Crisis Lifeline (24/7)</p>
              </div>
              <div className="border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground">🇬🇧 United Kingdom</p>
                <p className="text-lg font-bold text-primary">116 123</p>
                <p className="text-sm text-muted-foreground">Samaritans (24/7)</p>
              </div>
              <div className="border border-border rounded-xl p-4">
                <p className="font-semibold text-foreground">🌍 International</p>
                <p className="text-lg font-bold text-primary">findahelpline.com</p>
                <p className="text-sm text-muted-foreground">Find helplines worldwide</p>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-6 rounded-xl py-6"
              disabled
            >
              <MapPin className="w-5 h-5 mr-2" />
              Find Help Near You (Coming Soon)
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resources;
