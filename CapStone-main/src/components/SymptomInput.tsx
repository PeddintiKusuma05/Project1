import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, Sparkles } from "lucide-react";

interface SymptomInputProps {
  onAnalyze: (symptoms: string) => void;
  isLoading: boolean;
}

const SymptomInput = ({ onAnalyze, isLoading }: SymptomInputProps) => {
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onAnalyze(symptoms);
    }
  };

  const exampleSymptoms = [
    "Headache and fever",
    "Persistent cough",
    "Fatigue and weakness",
    "Stomach pain",
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative">
        <Textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms in detail... (e.g., I've had a persistent headache for 3 days, along with mild fever and fatigue)"
          className="min-h-[140px] resize-none rounded-2xl border-border/60 bg-card/50 backdrop-blur-sm p-4 pr-12 text-base placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
        />
        <Search className="absolute right-4 top-4 h-5 w-5 text-muted-foreground/40" />
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Try:</span>
        {exampleSymptoms.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setSymptoms(example)}
            className="text-sm px-3 py-1.5 rounded-full bg-accent/50 text-accent-foreground hover:bg-accent transition-colors duration-200"
          >
            {example}
          </button>
        ))}
      </div>

      <Button
        type="submit"
        variant="hero"
        size="xl"
        className="w-full"
        disabled={!symptoms.trim() || isLoading}
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Analyzing Symptoms...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Analyze with AI
          </>
        )}
      </Button>
    </form>
  );
};

export default SymptomInput;
