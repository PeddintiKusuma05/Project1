import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const faqs = [
    {
      question: "What is Healix?",
      answer: "Healix is an AI-powered health analysis platform that helps users understand their symptoms and potential health conditions. Our advanced AI analyzes symptom descriptions to provide insights and recommendations."
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI provides preliminary insights based on symptom patterns and medical knowledge. However, it is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for accurate diagnosis and treatment."
    },
    {
      question: "Is my health data secure?",
      answer: "Yes, we take data security very seriously. All user data is encrypted and stored securely. We comply with healthcare data protection standards and never share personal health information with third parties without explicit consent."
    },
    {
      question: "Who can use Healix?",
      answer: "Healix is designed for both healthcare professionals and patients. Doctors can use it as a supplementary tool for patient consultations, while patients can use it for preliminary symptom analysis before seeking professional medical help."
    },
    {
      question: "How do I create an account?",
      answer: "You can sign up as either a Doctor or Patient. Fill in your details including name, Gmail address, and other optional information. Your account will be created immediately and you can start using the platform."
    },
    {
      question: "What information do I need to provide during signup?",
      answer: "Required information includes your full name and Gmail address. Optional information includes phone number, age, gender, and address. This helps us provide more personalized insights."
    },
    {
      question: "Can I update my profile information?",
      answer: "Currently, profile information is set during signup. If you need to update your information, please contact our support team."
    },
    {
      question: "How do I describe my symptoms for analysis?",
      answer: "When using the symptom analysis feature, provide detailed descriptions of your symptoms, including duration, severity, and any accompanying factors. The more specific you are, the better the AI can provide relevant insights."
    },
    {
      question: "What should I do if the analysis suggests a serious condition?",
      answer: "If the AI analysis suggests any serious or concerning conditions, immediately consult with a qualified healthcare professional. Do not rely solely on AI analysis for medical decisions."
    },
    {
      question: "How can I contact a doctor through the platform?",
      answer: "Use our 'Contact Doctor' feature to connect with healthcare professionals. You can schedule consultations and discuss your symptoms and analysis results with qualified medical practitioners."
    },
    {
      question: "Is Healix available on mobile devices?",
      answer: "Yes, Healix is fully responsive and works on all devices including smartphones, tablets, and desktop computers. You can access all features from any modern web browser."
    },
    {
      question: "What if I forget my password?",
      answer: "If you forget your password, please contact our support team. We can help you reset your password securely."
    },
    {
      question: "Can doctors access patient analysis results?",
      answer: "Doctors can access their own analysis tools and patient consultation features. Patient data privacy is maintained, and doctors can only access information shared during consultations."
    },
    {
      question: "How often should I use the symptom analysis feature?",
      answer: "The symptom analysis is designed for occasional use when you have specific health concerns. It should not replace regular check-ups with healthcare professionals."
    },
    {
      question: "What languages does Healix support?",
      answer: "Currently, Healix supports English. We are working on adding support for additional languages in the future."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <HelpCircle className="h-4 w-4" />
            Frequently Asked Questions
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Got Questions? <span className="text-gradient">We've Got Answers</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Healix, our AI-powered health analysis platform, and how to make the most of our services.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Common Questions</CardTitle>
              <CardDescription className="text-center">
                Click on any question to see the answer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-4">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact-doctor"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Contact Doctor
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
                      >
                        Email Support
                      </Button>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;