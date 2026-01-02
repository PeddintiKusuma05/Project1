import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Stethoscope,
  Clock,
  Star,
  MapPin,
  Phone,
  Video,
  MessageCircle,
  Award,
  Users,
  Calendar
} from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Physician",
    experience: "12 years",
    rating: 4.9,
    reviews: 234,
    location: "New York, NY",
    availability: "Available today",
    languages: ["English", "Spanish"],
    qualifications: ["MD", "Board Certified"],
    consultationTypes: ["Video", "Phone", "Chat"],
    image: "👩‍⚕️",
    price: "$50-100"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    experience: "15 years",
    rating: 4.8,
    reviews: 189,
    location: "Los Angeles, CA",
    availability: "Available tomorrow",
    languages: ["English", "Mandarin"],
    qualifications: ["MD", "FACC", "Board Certified"],
    consultationTypes: ["Video", "Phone"],
    image: "👨‍⚕️",
    price: "$75-150"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    experience: "10 years",
    rating: 4.9,
    reviews: 312,
    location: "Chicago, IL",
    availability: "Available today",
    languages: ["English", "Spanish"],
    qualifications: ["MD", "FAAP", "Board Certified"],
    consultationTypes: ["Video", "Phone", "Chat"],
    image: "👩‍⚕️",
    price: "$45-90"
  },
  {
    id: 4,
    name: "Dr. David Kim",
    specialty: "Dermatologist",
    experience: "8 years",
    rating: 4.7,
    reviews: 156,
    location: "Seattle, WA",
    availability: "Available in 2 days",
    languages: ["English", "Korean"],
    qualifications: ["MD", "Board Certified"],
    consultationTypes: ["Video", "Chat"],
    image: "👨‍⚕️",
    price: "$60-120"
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Psychiatrist",
    experience: "14 years",
    rating: 4.8,
    reviews: 278,
    location: "Austin, TX",
    availability: "Available today",
    languages: ["English"],
    qualifications: ["MD", "Board Certified"],
    consultationTypes: ["Video", "Phone"],
    image: "👩‍⚕️",
    price: "$80-160"
  },
  {
    id: 6,
    name: "Dr. Robert Martinez",
    specialty: "Orthopedic Surgeon",
    experience: "18 years",
    rating: 4.9,
    reviews: 203,
    location: "Miami, FL",
    availability: "Available tomorrow",
    languages: ["English", "Spanish"],
    qualifications: ["MD", "FAAOS", "Board Certified"],
    consultationTypes: ["Video", "Phone"],
    image: "👨‍⚕️",
    price: "$90-180"
  }
];

const specialties = [
  "General Physician",
  "Cardiologist",
  "Pediatrician",
  "Dermatologist",
  "Psychiatrist",
  "Orthopedic Surgeon",
  "Neurologist",
  "Gynecologist",
  "Dentist",
  "Ophthalmologist"
];

const DoctorRecommendations = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  const handleSpecialtyFilter = (specialty: string) => {
    setSelectedSpecialty(specialty);
    if (specialty === "") {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(doctors.filter(doctor => doctor.specialty === specialty));
    }
  };

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Phone":
        return <Phone className="h-4 w-4" />;
      case "Chat":
        return <MessageCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Stethoscope className="h-4 w-4" />
            Doctor Recommendations
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Find the Right <span className="text-gradient">Healthcare Professional</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Connect with experienced doctors across various specialties. Browse profiles, check availability,
            and book consultations that fit your schedule and needs.
          </p>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-display font-bold text-2xl text-foreground">500+</span>
              </div>
              <span className="text-sm text-muted-foreground">Verified Doctors</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Star className="h-5 w-5 text-primary" />
                <span className="font-display font-bold text-2xl text-foreground">4.8</span>
              </div>
              <span className="text-sm text-muted-foreground">Average Rating</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-display font-bold text-2xl text-foreground">24/7</span>
              </div>
              <span className="text-sm text-muted-foreground">Availability</span>
            </div>
          </div>

          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              Join as Patient to Book Consultation
            </Button>
          </Link>
        </div>
      </section>

      {/* Specialty Filter */}
      <section className="pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-6">Browse by Specialty</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={selectedSpecialty === "" ? "default" : "outline"}
              onClick={() => handleSpecialtyFilter("")}
              className="rounded-full"
            >
              All Specialties
            </Button>
            {specialties.slice(0, 8).map((specialty) => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                onClick={() => handleSpecialtyFilter(specialty)}
                className="rounded-full"
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-3">{doctor.image}</div>
                  <CardTitle className="text-xl">{doctor.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {doctor.specialty}
                  </CardDescription>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                      <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {doctor.experience}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {doctor.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {doctor.availability}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="h-4 w-4" />
                      {doctor.qualifications.join(", ")}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Consultation Types:</p>
                    <div className="flex gap-2">
                      {doctor.consultationTypes.map((type) => (
                        <div key={type} className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {getConsultationIcon(type)}
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-lg font-semibold text-primary">{doctor.price}</span>
                    <Link to="/signup">
                      <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of patients who trust Healix for their healthcare needs.
            Create your account today and connect with top-rated doctors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Sign Up as Patient
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Login to Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoctorRecommendations;