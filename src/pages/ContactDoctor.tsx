import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Phone,
  Video,
  MessageCircle,
  ArrowLeft,
  Clock,
  Star,
  CheckCircle,
  Send,
  Zap,
  Shield,
  Globe,
  Heart,
  Calendar,
  MapPin,
  Award,
  Users,
  AlertTriangle,
  Pill,
  Activity
} from "lucide-react";

const contactOptions = [
  {
    icon: Zap,
    title: "AI-Powered Instant Match",
    description: "Get matched with the perfect doctor based on your symptoms, medical history, and preferences using our advanced AI algorithm",
    duration: "5-15 min",
    availability: "Available 24/7",
    features: ["AI Matching", "Instant Connection", "Personalized Care"],
    urgency: "high"
  },
  {
    icon: Video,
    title: "Video Consultation",
    description: "Face-to-face consultation with HD video quality, screen sharing, and digital prescription capabilities",
    duration: "15-30 min",
    availability: "Available 24/7",
    features: ["HD Video", "Screen Share", "Digital Rx"],
    urgency: "medium"
  },
  {
    icon: Phone,
    title: "Emergency Phone Call",
    description: "Immediate phone consultation for urgent health concerns with priority routing to available specialists",
    duration: "10-15 min",
    availability: "24/7 Emergency Line",
    features: ["Priority Routing", "Emergency Care", "Follow-up"],
    urgency: "high"
  },
  {
    icon: MessageCircle,
    title: "Secure Chat Consultation",
    description: "End-to-end encrypted text consultation with file sharing, medical image analysis, and prescription delivery",
    duration: "Flexible",
    availability: "Available 24/7",
    features: ["Encrypted", "File Sharing", "Image Analysis"],
    urgency: "low"
  },
  {
    icon: Heart,
    title: "Chronic Care Management",
    description: "Ongoing care coordination for chronic conditions with personalized treatment plans and regular check-ins",
    duration: "30-45 min",
    availability: "Scheduled",
    features: ["Care Plans", "Regular Monitoring", "Coordination"],
    urgency: "medium"
  },
  {
    icon: Globe,
    title: "International Consultation",
    description: "Connect with doctors worldwide for second opinions, travel medicine, and specialized international care",
    duration: "20-40 min",
    availability: "Multi-timezone",
    features: ["Global Network", "Second Opinions", "Travel Med"],
    urgency: "medium"
  }
];

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "General Physician",
    experience: "12 years",
    rating: 4.9,
    reviews: 234,
    image: "👩‍⚕️",
    languages: ["English", "Spanish"],
    qualifications: ["MD", "Board Certified"],
    availability: "Available now",
    responseTime: "< 5 min",
    consultationTypes: ["AI Match", "Video", "Phone", "Chat"],
    specializations: ["Primary Care", "Preventive Medicine", "Chronic Care"],
    location: "New York, NY",
    price: "$50-100"
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Emergency Medicine",
    experience: "8 years",
    rating: 4.8,
    reviews: 189,
    image: "👨‍⚕️",
    languages: ["English", "Mandarin"],
    qualifications: ["MD", "Emergency Medicine Board Certified"],
    availability: "Available in 10 min",
    responseTime: "< 10 min",
    consultationTypes: ["Emergency Phone", "Video", "AI Match"],
    specializations: ["Emergency Care", "Trauma", "Critical Care"],
    location: "Los Angeles, CA",
    price: "$75-150"
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Family Medicine",
    experience: "15 years",
    rating: 4.9,
    reviews: 312,
    image: "👩‍⚕️",
    languages: ["English", "Spanish", "Portuguese"],
    qualifications: ["MD", "Family Medicine Board Certified"],
    availability: "Available today",
    responseTime: "< 15 min",
    consultationTypes: ["Video", "Phone", "Chat", "Chronic Care"],
    specializations: ["Family Care", "Pediatrics", "Geriatrics"],
    location: "Miami, FL",
    price: "$45-90"
  },
  {
    name: "Dr. David Kim",
    specialty: "Internal Medicine",
    experience: "10 years",
    rating: 4.7,
    reviews: 156,
    image: "👨‍⚕️",
    languages: ["English", "Korean"],
    qualifications: ["MD", "Internal Medicine Board Certified"],
    availability: "Available tomorrow",
    responseTime: "< 30 min",
    consultationTypes: ["AI Match", "Video", "Chat"],
    specializations: ["Internal Medicine", "Chronic Diseases", "Preventive Care"],
    location: "Seattle, WA",
    price: "$60-120"
  },
  {
    name: "Dr. Maria Gonzalez",
    specialty: "Telemedicine Specialist",
    experience: "7 years",
    rating: 4.8,
    reviews: 203,
    image: "👩‍⚕️",
    languages: ["English", "Spanish", "French"],
    qualifications: ["MD", "Telemedicine Certified"],
    availability: "Available now",
    responseTime: "< 2 min",
    consultationTypes: ["AI Match", "Video", "Chat", "International"],
    specializations: ["Telemedicine", "Digital Health", "Global Care"],
    location: "Madrid, Spain",
    price: "$40-80"
  },
  {
    name: "Dr. James Wilson",
    specialty: "Chronic Care Specialist",
    experience: "18 years",
    rating: 4.9,
    reviews: 278,
    image: "👨‍⚕️",
    languages: ["English"],
    qualifications: ["MD", "Chronic Care Management Certified"],
    availability: "Available this week",
    responseTime: "< 1 hour",
    consultationTypes: ["Chronic Care", "Video", "Phone"],
    specializations: ["Diabetes", "Hypertension", "Heart Disease"],
    location: "Boston, MA",
    price: "$80-160"
  }
];

const ContactDoctor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState<string>("");
  const [symptoms, setSymptoms] = useState<string>("");
  const [isAIMatching, setIsAIMatching] = useState(false);
  const [matchedDoctors, setMatchedDoctors] = useState<typeof doctors>([]);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    message: "",
    insurance: "",
    preferredLanguage: "",
    medicalHistory: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI-powered doctor matching based on symptoms and urgency
  const performAIMatching = useCallback(async () => {
    if (!symptoms.trim() || !urgencyLevel) return;

    setIsAIMatching(true);

    // Simulate AI matching algorithm
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const matched = doctors.filter(doctor => {
      const hasMatchingSpecialty = doctor.specializations.some(spec =>
        symptoms.toLowerCase().includes(spec.toLowerCase()) ||
        spec.toLowerCase().includes(symptoms.toLowerCase())
      );

      const hasUrgencyMatch = urgencyLevel === "high" ?
        doctor.consultationTypes.includes("Emergency Phone") || doctor.consultationTypes.includes("AI Match") :
        true;

      return hasMatchingSpecialty || hasUrgencyMatch;
    });

    setMatchedDoctors(matched.length > 0 ? matched : doctors.slice(0, 3));
    setIsAIMatching(false);

    toast({
      title: "AI Matching Complete!",
      description: `Found ${matched.length} doctors matching your needs.`,
    });
  }, [symptoms, urgencyLevel, toast]);

  useEffect(() => {
    if (symptoms && urgencyLevel) {
      performAIMatching();
    }
  }, [performAIMatching, symptoms, urgencyLevel]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Consultation Request Submitted!",
      description: selectedOption === "AI-Powered Instant Match" ?
        "AI is matching you with the best doctor. You'll be connected shortly." :
        "A doctor will contact you within the specified timeframe.",
    });

    setIsSubmitting(false);
    setFormData({ ...formData, message: "", medicalHistory: "" });
    setSelectedOption(null);
    setSelectedDoctor(null);
    setSymptoms("");
    setUrgencyLevel("");
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-orange-600 bg-orange-50 border-orange-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getUrgencyIcon = (level: string) => {
    switch (level) {
      case "high": return <AlertTriangle className="h-4 w-4" />;
      case "medium": return <Clock className="h-4 w-4" />;
      case "low": return <CheckCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Emergency Alert Banner */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-6 shadow-lg border border-red-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Medical Emergency?</h3>
                    <p className="text-red-100 text-sm">
                      If you're experiencing a life-threatening emergency, call emergency services immediately.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold">911</div>
                    <div className="text-xs text-red-100">Emergency</div>
                  </div>
                  <div className="w-px h-8 bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-lg font-bold">+1 (555) 012-3456</div>
                    <div className="text-xs text-red-100">24/7 Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              Advanced <span className="text-gradient">Doctor Consultation</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Experience healthcare innovation with AI-powered doctor matching, instant consultations,
              and personalized care from certified medical professionals worldwide.
            </p>

            {/* Key Features */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">AI Matching</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">Global Network</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Award className="h-4 w-4" />
                <span className="text-sm font-medium">Board Certified</span>
              </div>
            </div>
          </div>

          {/* Urgency Assessment */}
          <Card className="p-6 mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Quick Health Assessment
              </CardTitle>
              <CardDescription>
                Help us prioritize your consultation by assessing the urgency of your health concern.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Urgency Level
                  </label>
                  <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Low - Non-urgent, general inquiry
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          Medium - Needs attention soon
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          High - Emergency or severe symptoms
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Describe Your Symptoms
                  </label>
                  <Input
                    placeholder="Briefly describe your symptoms..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="bg-background/50"
                  />
                </div>
              </div>
              {urgencyLevel && (
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${getUrgencyColor(urgencyLevel)}`}>
                  {getUrgencyIcon(urgencyLevel)}
                  {urgencyLevel === "high" ? "Emergency Priority" :
                   urgencyLevel === "medium" ? "Priority Care" : "Standard Care"}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Options */}
          <div className="mb-12">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
              Choose Your Consultation Type
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contactOptions.map((option, index) => (
                <Card
                  key={index}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-card relative ${
                    selectedOption === option.title
                      ? "border-primary ring-2 ring-primary/20 shadow-glow"
                      : "border-border/50 hover:border-primary/30"
                  }`}
                  onClick={() => setSelectedOption(option.title)}
                >
                  {option.urgency === "high" && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-3 w-3 text-white" />
                    </div>
                  )}
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
                    <div className="space-y-2">
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
                      <div className="flex flex-wrap gap-1">
                        {option.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* AI-Matched Doctors */}
          {(matchedDoctors.length > 0 || isAIMatching) && (
            <div className="mb-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Zap className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {isAIMatching ? "AI Matching Doctors..." : "AI-Recommended Doctors"}
                </h2>
              </div>

              {isAIMatching ? (
                <div className="flex justify-center py-12">
                  <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Analyzing your symptoms and finding the best doctors...</p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedDoctors.map((doctor, index) => (
                    <Card
                      key={index}
                      className={`p-6 border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 cursor-pointer ${
                        selectedDoctor === doctor.name ? "border-primary ring-2 ring-primary/20" : ""
                      }`}
                      onClick={() => setSelectedDoctor(doctor.name)}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-4xl">{doctor.image}</div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-foreground">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{doctor.rating}</span>
                              <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {doctor.experience}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {doctor.location}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {doctor.availability} • {doctor.responseTime}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {doctor.languages.slice(0, 2).map((lang) => (
                            <Badge key={lang} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                          {doctor.languages.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{doctor.languages.length - 2}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm font-semibold text-primary">{doctor.price}</span>
                          <div className="flex gap-1">
                            {doctor.consultationTypes.slice(0, 2).map((type, idx) => (
                              <div key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                {type === "AI Match" ? "🤖" :
                                 type === "Video" ? "📹" :
                                 type === "Phone" ? "📞" :
                                 type === "Chat" ? "💬" : type}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All Available Doctors */}
          <div className="mb-12">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
              All Available Doctors
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor, index) => (
                <Card
                  key={index}
                  className={`p-6 border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 cursor-pointer ${
                    selectedDoctor === doctor.name ? "border-primary ring-2 ring-primary/20" : ""
                  }`}
                  onClick={() => setSelectedDoctor(doctor.name)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{doctor.image}</div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{doctor.rating}</span>
                          <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {doctor.experience}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {doctor.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {doctor.availability} • {doctor.responseTime}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.slice(0, 2).map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                      {doctor.languages.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{doctor.languages.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm font-semibold text-primary">{doctor.price}</span>
                      <div className="flex gap-1">
                        {doctor.consultationTypes.slice(0, 2).map((type, idx) => (
                          <div key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {type === "AI Match" ? "🤖" :
                             type === "Video" ? "📹" :
                             type === "Phone" ? "📞" :
                             type === "Chat" ? "💬" : type}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-6 md:p-8 border-border/50 shadow-card">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Advanced Consultation Request
            </h2>
            <p className="text-muted-foreground mb-6">
              Provide detailed information to help us match you with the most suitable healthcare professional.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
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

              <div className="grid md:grid-cols-2 gap-4">
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
                    Preferred Language
                  </label>
                  <Select value={formData.preferredLanguage} onValueChange={(value) => setFormData({ ...formData, preferredLanguage: value })}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="mandarin">Mandarin</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Health Information */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Describe Your Concern
                </label>
                <Textarea
                  placeholder="Please describe your symptoms, when they started, and any relevant details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="min-h-[120px] bg-background/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Medical History (Optional)
                </label>
                <Textarea
                  placeholder="List any relevant medical history, current medications, allergies, or previous conditions..."
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                  className="min-h-[100px] bg-background/50"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Insurance Provider (Optional)
                  </label>
                  <Input
                    placeholder="e.g., Blue Cross Blue Shield, Aetna"
                    value={formData.insurance}
                    onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Preferred Doctor (Optional)
                  </label>
                  <Select value={selectedDoctor || ""} onValueChange={setSelectedDoctor}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select from available doctors" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.name} value={doctor.name}>
                          {doctor.name} - {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Summary */}
              {(selectedOption || urgencyLevel) && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <h4 className="font-medium text-foreground mb-2">Consultation Summary</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {selectedOption && <p><strong>Type:</strong> {selectedOption}</p>}
                      {urgencyLevel && <p><strong>Urgency:</strong> {urgencyLevel === "high" ? "Emergency" : urgencyLevel === "medium" ? "Priority" : "Standard"}</p>}
                      {selectedDoctor && <p><strong>Preferred Doctor:</strong> {selectedDoctor}</p>}
                      {formData.preferredLanguage && <p><strong>Language:</strong> {formData.preferredLanguage}</p>}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting || !selectedOption}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Processing Request...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {selectedOption === "AI-Powered Instant Match" ? "Find My Doctor" : "Request Consultation"}
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
