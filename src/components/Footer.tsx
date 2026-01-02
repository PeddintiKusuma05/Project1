import { Heart, Phone, Mail, MapPin, Clock, Shield, Award, Users } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-gradient-to-br from-card/50 to-card/30">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl gradient-primary">
                <img src="/icon.svg" alt="Healix" className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Healix
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced AI-powered healthcare platform connecting patients with certified medical professionals worldwide.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Shield className="h-3 w-3 text-primary" />
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Award className="h-3 w-3 text-primary" />
                Board Certified
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/contact-doctor" className="hover:text-primary transition-colors">AI Doctor Matching</a></li>
              <li><a href="/contact-doctor" className="hover:text-primary transition-colors">Video Consultations</a></li>
              <li><a href="/contact-doctor" className="hover:text-primary transition-colors">Emergency Care</a></li>
              <li><a href="/contact-doctor" className="hover:text-primary transition-colors">Chronic Care Management</a></li>
              <li><a href="/contact-doctor" className="hover:text-primary transition-colors">International Consultations</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="hover:text-primary transition-colors underline-offset-2 hover:underline">
                      peddintikusuma@gmail.com
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Email Support</DialogTitle>
                      <DialogDescription>
                        Please mail your problem to the admin email below. Include as many details as possible so we can help quickly.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-3 rounded-md bg-accent text-foreground flex items-center justify-between">
                        <span className="font-mono text-sm">peddintikusuma@gmail.com</span>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => navigator.clipboard.writeText('peddintikusuma@gmail.com')}
                        >
                          Copy
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() => {
                            const subject = encodeURIComponent('Support Request from Healix');
                            const body = encodeURIComponent('Hello,\n\nI would like assistance with the following problem:\n\n[Describe your issue here]\n\nThanks,');
                            window.location.href = `mailto:peddintikusuma@gmail.com?subject=${subject}&body=${body}`;
                          }}
                        >
                          Open mail app
                        </Button>
                        <Button
                          className="flex-1"
                          variant="outline"
                          onClick={() => navigator.clipboard.writeText('Hello,\n\nI would like assistance with the following problem:\n\n[Describe your issue here]\n\nThanks,')}
                        >
                          Copy message template
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+1-555-0123" className="hover:text-primary transition-colors">
                  +1 (555) 012-3456
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Global Healthcare Network</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>24/7 Emergency Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links & Emergency */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="/contact-doctor" className="hover:text-primary transition-colors">Find a Doctor</a></li>
              <li><a href="/login" className="hover:text-primary transition-colors">Patient Portal</a></li>
              <li><a href="/signup" className="hover:text-primary transition-colors">Join as Patient</a></li>
            </ul>

            {/* Emergency Button */}
            <div className="mt-6">
              <a
                href="/contact-doctor"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-lg"
              >
                🚨 Emergency Care
              </a>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 py-6 border-y border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-display font-bold text-2xl text-foreground">500+</span>
            </div>
            <span className="text-sm text-muted-foreground">Verified Doctors</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-display font-bold text-2xl text-foreground">4.8</span>
            </div>
            <span className="text-sm text-muted-foreground">Average Rating</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-display font-bold text-2xl text-foreground">24/7</span>
            </div>
            <span className="text-sm text-muted-foreground">Availability</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-display font-bold text-2xl text-foreground">100%</span>
            </div>
            <span className="text-sm text-muted-foreground">Secure & Private</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
            <a href="/faq" className="hover:text-foreground transition-colors">Support</a>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © 2026 Healix Healthcare. Made with <Heart className="h-4 w-4 text-red-500" /> for better health worldwide
          </p>
        </div>

              </div>
    </footer>
  );
};

export default Footer;
