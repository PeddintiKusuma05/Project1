import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Video, 
  MessageCircle, 
  ArrowLeft, 
  Clock, 
  Star, 
  CheckCircle,
  Send
} from "lucide-react";

const contactOptions = [
  {
    icon: Video,
    title: "Video Consultation",
    description: "Face-to-face consultation with a doctor from the comfort of your home",
    duration: "15-30 min",
    availability: "Available 24/7",
  },
  {
    icon: Phone,
    title: "Phone Call",
    description: "Quick phone consultation for urgent health concerns",
    duration: "10-15 min",
    availability: "8 AM - 10 PM",
  },
  {
    icon: MessageCircle,
    title: "Chat Consultation",
    description: "Text-based consultation for non-urgent queries",
    duration: "Flexible",
    availability: "Available 24/7",
  },
];

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "General Physician",
    experience: "12 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Internal Medicine",
    experience: "8 years",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Dr. Emily Williams",
    specialty: "Family Medicine",
    experience: "15 years",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face",
  },
];

const ContactDoctor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Request Submitted!",
      description: "A doctor will contact you within 30 minutes.",
    });

    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Symptom Checker
          </Button>

          {/* Hero */}
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Connect with a <span className="text-gradient">Doctor</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get professional medical advice from certified doctors. Choose your preferred consultation method.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactOptions.map((option, index) => (
              <Card
                key={index}
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-card ${
                  selectedOption === option.title
                    ? "border-primary ring-2 ring-primary/20 shadow-glow"
                    : "border-border/50 hover:border-primary/30"
                }`}
                onClick={() => setSelectedOption(option.title)}
              >
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <option.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {option.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {option.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      {option.availability}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Available Doctors */}
          <div className="mb-12">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
              Available Doctors
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {doctors.map((doctor, index) => (
                <Card
                  key={index}
                  className="p-6 border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{doctor.experience} exp.</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      {doctor.rating}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-6 md:p-8 border-border/50 shadow-card">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Request a Consultation
            </h2>
            <p className="text-muted-foreground mb-6">
              Fill in your details and we'll connect you with a doctor shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Full Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Describe Your Concern
                </label>
                <Textarea
                  placeholder="Briefly describe your symptoms or health concern..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="min-h-[120px] bg-background/50"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Request Consultation
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactDoctor;
