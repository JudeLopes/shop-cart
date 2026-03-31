import { useState } from "react";
import { AlertTriangle, CheckCircle, Info, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type DistressLevel = "stable" | "mild" | "high" | "crisis" | null;

interface AnalysisResult {
  level: DistressLevel;
  keywords: string[];
  message: string;
}

const distressKeywords = {
  crisis: ["suicide", "kill myself", "end my life", "want to die", "no reason to live", "better off dead", "can't go on"],
  high: ["hopeless", "worthless", "can't cope", "breaking down", "giving up", "exhausted", "numb", "empty", "isolated", "alone forever"],
  mild: ["stressed", "anxious", "worried", "overwhelmed", "tired", "sad", "frustrated", "struggling", "difficult", "hard time"],
  stable: ["okay", "fine", "good", "better", "hopeful", "grateful", "calm", "peaceful", "managing", "coping"]
};

const analyzeText = (text: string): AnalysisResult => {
  const lowerText = text.toLowerCase();
  const foundKeywords: string[] = [];

  // Check for crisis indicators first
  for (const keyword of distressKeywords.crisis) {
    if (lowerText.includes(keyword)) {
      foundKeywords.push(keyword);
    }
  }
  if (foundKeywords.length > 0) {
    return {
      level: "crisis",
      keywords: foundKeywords,
      message: "We're concerned about what you shared. Please reach out to a crisis helpline immediately. You matter, and help is available."
    };
  }

  // Check for high distress
  for (const keyword of distressKeywords.high) {
    if (lowerText.includes(keyword)) {
      foundKeywords.push(keyword);
    }
  }
  if (foundKeywords.length >= 2) {
    return {
      level: "high",
      keywords: foundKeywords,
      message: "You seem to be going through a difficult time. Consider reaching out to a mental health professional or trusted person."
    };
  }

  // Check for mild distress
  for (const keyword of distressKeywords.mild) {
    if (lowerText.includes(keyword)) {
      foundKeywords.push(keyword);
    }
  }
  if (foundKeywords.length >= 1) {
    return {
      level: "mild",
      keywords: foundKeywords,
      message: "It sounds like you're experiencing some stress. That's okay—try some of our coping techniques to help manage these feelings."
    };
  }

  // Check for stable indicators
  for (const keyword of distressKeywords.stable) {
    if (lowerText.includes(keyword)) {
      foundKeywords.push(keyword);
    }
  }

  return {
    level: "stable",
    keywords: foundKeywords.length > 0 ? foundKeywords : ["balanced"],
    message: "You seem to be in a good place. Keep taking care of yourself and check in regularly."
  };
};

const CheckIn = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate analysis delay for UX
    setTimeout(() => {
      setResult(analyzeText(text));
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleReset = () => {
    setText("");
    setResult(null);
  };

  const getLevelConfig = (level: DistressLevel) => {
    switch (level) {
      case "stable":
        return {
          label: "Stable",
          className: "distress-stable",
          icon: CheckCircle,
          bgClass: "bg-stable-bg"
        };
      case "mild":
        return {
          label: "Mild Distress",
          className: "distress-mild",
          icon: Info,
          bgClass: "bg-mild-bg"
        };
      case "high":
        return {
          label: "High Distress",
          className: "distress-high",
          icon: AlertTriangle,
          bgClass: "bg-high-bg"
        };
      case "crisis":
        return {
          label: "Crisis Level",
          className: "distress-crisis",
          icon: Phone,
          bgClass: "bg-crisis-bg"
        };
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen hero-gradient py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full shadow-soft mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                100% Anonymous
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Safe Check-In
            </h1>
            <p className="text-muted-foreground">
              Share how you're feeling. Your words help us understand how to support you best.
            </p>
          </div>

          {/* Input Card */}
          <div className="bg-card rounded-2xl shadow-card p-6 sm:p-8 mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              How are you feeling today?
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write freely about your thoughts, feelings, or what's on your mind. This is a safe space..."
              className="min-h-[200px] rounded-xl border-border focus:ring-2 focus:ring-primary/20 resize-none text-base"
              disabled={isAnalyzing}
            />
            
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleAnalyze}
                disabled={!text.trim() || isAnalyzing}
                className="flex-1 rounded-xl py-6"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Text"
                )}
              </Button>
              {result && (
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="rounded-xl py-6"
                >
                  Start Over
                </Button>
              )}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="flex items-start gap-3 bg-secondary/50 rounded-xl p-4 mb-8">
            <Shield className="w-5 h-5 text-secondary-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-secondary-foreground">
              <strong>Your privacy matters:</strong> All data is processed locally and anonymously. 
              Nothing you write is stored or sent to any server.
            </p>
          </div>

          {/* Results */}
          {result && (
            <div className="animate-fadeIn">
              {(() => {
                const config = getLevelConfig(result.level);
                if (!config) return null;
                const Icon = config.icon;

                return (
                  <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                    {/* Result Header */}
                    <div className={`p-6 ${config.className} border-b`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-current/10 flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium opacity-80">Assessment Result</p>
                          <h3 className="text-xl font-display font-bold">{config.label}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Result Content */}
                    <div className="p-6 space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Our Understanding
                        </h4>
                        <p className="text-foreground leading-relaxed">
                          {result.message}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">
                          Detected Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {result.keywords.map((keyword, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1 rounded-full text-sm font-medium border ${config.className}`}
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Crisis Resources */}
                      {result.level === "crisis" && (
                        <div className="bg-crisis-bg rounded-xl p-4 border border-crisis/30">
                          <h4 className="font-semibold text-crisis flex items-center gap-2 mb-3">
                            <Phone className="w-5 h-5" />
                            Please Reach Out Now
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p className="text-foreground">
                              <strong>India:</strong> 9152987821 (iCall)
                            </p>
                            <p className="text-foreground">
                              <strong>US:</strong> 988 (Suicide & Crisis Lifeline)
                            </p>
                            <p className="text-foreground">
                              <strong>UK:</strong> 116 123 (Samaritans)
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Resources Link */}
                      <Button
                        variant="outline"
                        className="w-full rounded-xl py-6"
                        asChild
                      >
                        <a href="/resources">
                          View Coping Techniques & Resources
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
