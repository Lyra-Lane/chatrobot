import { Mail, Linkedin, Github, MessageSquare, Shield, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [showWeChatQR, setShowWeChatQR] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // In a real application, this would send to your backend
      console.log("Form submission:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "manyaoli@berkeley.edu",
      link: "mailto:manyaoli@berkeley.edu",
      color: "bg-[hsl(var(--morandi-rose))]"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/manyao-li-9a4436375",
      link: "https://www.linkedin.com/in/manyao-li-9a4436375",
      color: "bg-[hsl(var(--morandi-sage))]"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Lyra-lane",
      link: "https://github.com/Lyra-lane",
      color: "bg-[hsl(var(--morandi-beige))]"
    },
    {
      icon: MessageSquare,
      label: "WeChat",
      value: "xftvhunko111",
      action: () => setShowWeChatQR(!showWeChatQR),
      color: "bg-[hsl(var(--morandi-rose))]"
    }
  ];

  return (
    <section 
      id="contact" 
      ref={ref}
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-morandi-cream transition-all duration-800 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold morandi-gray mb-4">Get In Touch</h2>
          <p className="text-xl text-[hsl(var(--morandi-sage))] mb-8">Let's connect and explore opportunities together</p>
          
          {/* Contact Introduction */}
          <div className="mb-12">
            <p className="text-lg text-[hsl(var(--morandi-sage))]">
              I'm always open to discussing new opportunities, collaborations, or simply connecting with fellow data enthusiasts.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold morandi-gray mb-8">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className={`w-12 h-12 ${info.color} rounded-full flex items-center justify-center`}>
                    <info.icon className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium morandi-gray">{info.label}</p>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-[hsl(var(--morandi-sage))] hover:text-[hsl(var(--morandi-rose))] transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-[hsl(var(--morandi-sage))]">{info.value}</span>
                        {info.action && (
                          <button 
                            onClick={info.action}
                            className="text-sm text-[hsl(var(--morandi-rose))] hover:opacity-80"
                          >
                            View QR Code
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold morandi-gray mb-3">Current Status</h4>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="morandi-gray">Available for Data Science Internships</span>
              </div>
              <p className="text-sm text-[hsl(var(--morandi-sage))] mt-2">Expected graduation: 2027</p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold morandi-gray mb-8">Send a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="morandi-gray">Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your full name" 
                          {...field}
                          className="border-morandi-light focus:ring-[hsl(var(--morandi-rose))] focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="morandi-gray">Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your.email@example.com" 
                          {...field}
                          className="border-morandi-light focus:ring-[hsl(var(--morandi-rose))] focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="morandi-gray">Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message here..."
                          rows={6}
                          {...field}
                          className="border-morandi-light focus:ring-[hsl(var(--morandi-rose))] focus:border-transparent resize-vertical"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting}
                  className="w-full bg-[hsl(var(--morandi-rose))] hover:opacity-80 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium"
                >
                  <Send size={16} className="mr-2" />
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 p-4 bg-morandi-light rounded-lg">
              <p className="text-sm morandi-gray">
                <Shield className="text-[hsl(var(--morandi-sage))] mr-2 inline" size={16} />
                <strong>Privacy Notice:</strong> Your information is only used for contact purposes and will not be shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
