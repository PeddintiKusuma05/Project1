import { MessageSquare, Brain, FileText, Shield } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Describe Symptoms",
    description: "Enter your symptoms in natural language, as you would describe them to a doctor.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI analyzes your symptoms against a vast medical knowledge base.",
  },
  {
    icon: FileText,
    title: "Get Insights",
    description: "Receive potential conditions and personalized health recommendations.",
  },
  {
    icon: Shield,
    title: "Stay Informed",
    description: "Use insights to make informed decisions about seeking professional care.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered health insights in just a few simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 h-full">
                <div className="mb-4 relative">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow duration-300">
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
