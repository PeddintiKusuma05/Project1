import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, ArrowRight, Video, Phone, MessageCircle } from "lucide-react";

const DoctorContactCTA = () => {
  return (
    <Card className="p-6 md:p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/30 shadow-card">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow shrink-0">
          <Stethoscope className="h-8 w-8 text-primary-foreground" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-display font-bold text-xl text-foreground mb-2">
            Need Professional Medical Advice?
          </h3>
          <p className="text-muted-foreground mb-4">
            Connect directly with certified doctors via video call, phone, or chat. Get expert guidance for your health concerns.
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Video className="h-4 w-4 text-primary" />
              Video
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-primary" />
              Phone
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4 text-primary" />
              Chat
            </span>
          </div>
        </div>

        <Link to="/contact-doctor">
          <Button variant="hero" size="lg" className="shrink-0">
            Contact a Doctor
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default DoctorContactCTA;
