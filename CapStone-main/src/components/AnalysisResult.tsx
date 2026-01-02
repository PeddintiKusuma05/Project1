import { AlertTriangle, CheckCircle, Info, Heart, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Condition {
  name: string;
  probability: "high" | "medium" | "low";
  description: string;
  recommendations: string[];
}

interface AnalysisResultProps {
  conditions: Condition[];
  disclaimer: string;
}

const AnalysisResult = ({ conditions, disclaimer }: AnalysisResultProps) => {
  const getProbabilityStyles = (probability: string) => {
    switch (probability) {
      case "high":
        return {
          bg: "bg-destructive/10",
          border: "border-destructive/20",
          text: "text-destructive",
          icon: AlertTriangle,
        };
      case "medium":
        return {
          bg: "bg-amber-500/10",
          border: "border-amber-500/20",
          text: "text-amber-600",
          icon: Info,
        };
      default:
        return {
          bg: "bg-primary/10",
          border: "border-primary/20",
          text: "text-primary",
          icon: CheckCircle,
        };
    }
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl gradient-primary">
          <Stethoscope className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Analysis Results</h2>
          <p className="text-sm text-muted-foreground">Based on your symptoms</p>
        </div>
      </div>

      <div className="space-y-4">
        {conditions.map((condition, index) => {
          const styles = getProbabilityStyles(condition.probability);
          const Icon = styles.icon;

          return (
            <Card
              key={index}
              className={`p-5 border ${styles.border} ${styles.bg} gradient-card shadow-card hover:shadow-glow transition-all duration-300`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${styles.bg}`}>
                  <Icon className={`h-5 w-5 ${styles.text}`} />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      {condition.name}
                    </h3>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${styles.bg} ${styles.text} capitalize`}
                    >
                      {condition.probability} match
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {condition.description}
                  </p>
                  <div className="pt-2">
                    <p className="text-sm font-medium text-foreground mb-2">Recommendations:</p>
                    <ul className="space-y-1.5">
                      {condition.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Heart className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-4 bg-muted/50 border-muted">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">{disclaimer}</p>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisResult;
