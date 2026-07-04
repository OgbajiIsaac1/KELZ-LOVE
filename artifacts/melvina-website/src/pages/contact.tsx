import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { WHATSAPP_LINK } from "@/lib/constants";
import { SeoHead } from "@/components/SeoHead";
import { SITE_URL } from "@/lib/seo";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useSubmitContact } from "@workspace/api-client-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormValues = z.infer<typeof formSchema>;

const contactItems = [
  { icon: Mail, label: "Email", value: "meligboanugo@gmail.com", href: "mailto:meligboanugo@gmail.com", accent: "#d4a017" },
  { icon: Phone, label: "Phone", value: "+234 706 782 5349", href: "tel:+2347067825349", accent: "#1a4fc8" },
  { icon: MapPin, label: "Location", value: "Enugu, Nigeria", href: undefined, accent: "#d4a017" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const submitContact = useSubmitContact();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(values: FormValues) {
    submitContact.mutate(
      { data: values },
      {
        onSuccess: () => {
          setSubmitted(true);
          form.reset();
        },
      }
    );
  }

  return (
    <>
      <SeoHead
        title="Contact"
        description="Get in touch with Melvina Igboanugo for student mentorship, educator guidance, or school consulting. Based in Enugu, Nigeria — available worldwide."
        ogDescription="Reach out for student mentorship, educator training, or school consulting with Melvina Igboanugo."
        canonicalPath="/contact"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": `${SITE_URL}/contact#webpage`,
            url: `${SITE_URL}/contact`,
            name: "Contact | Melvina Igboanugo — The Education Enthusiast",
            description: "Get in touch with Melvina Igboanugo for student mentorship, educator guidance, or school consulting.",
            isPartOf: { "@id": `${SITE_URL}/#website` },
            breadcrumb: { "@id": `${SITE_URL}/contact#breadcrumb` },
            mainEntity: { "@id": `${SITE_URL}/#person` },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${SITE_URL}/contact#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
            ],
          },
        ]}
      />
      <Layout>
      {/* Page Header */}
      <section className="py-14 page-header-bg border-b border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#d4a017]/8 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-primary/6 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
              style={{ background: "rgba(212, 160, 23, 0.12)", color: "#a07010", border: "1px solid rgba(212, 160, 23, 0.25)" }}
            >
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              <span
                style={{
                  background: "linear-gradient(135deg, #1a4fc8, #d4a017)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Let's Work Together
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Whether you're looking for student mentorship, educator guidance, or school consulting, I'm here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact body */}
      <section className="py-16 lg:py-24 section-gold-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left column — contact details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                {contactItems.map(({ icon: Icon, label, value, href, accent }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border hover:shadow-md transition-all"
                    style={{ borderColor: `${accent}25` }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${accent}12`, border: `1.5px solid ${accent}28` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: accent }} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{label}</p>
                      {href ? (
                        <a href={href} className="text-lg font-semibold hover:text-primary transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <Button
                  className="w-full h-16 text-lg rounded-xl text-white flex items-center justify-center gap-3"
                  style={{ background: "linear-gradient(135deg, #25D366, #1ab855)" }}
                >
                  <FaWhatsapp size={28} />
                  Chat on WhatsApp
                </Button>
              </a>

              {/* Decorative blurb */}
              <div
                className="p-6 rounded-2xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(26, 79, 200, 0.06) 0%, rgba(212, 160, 23, 0.05) 100%)",
                  border: "1px solid rgba(26, 79, 200, 0.12)",
                }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#d4a017]/10 blur-xl" />
                <p className="text-sm text-muted-foreground leading-relaxed italic relative">
                  "I personally read every message and believe every conversation is an opportunity to create impact. Don't hesitate to reach out."
                </p>
                <p
                  className="mt-3 text-sm font-semibold"
                  style={{ color: "#1a4fc8" }}
                >
                  — Melvina Igboanugo
                </p>
              </div>
            </motion.div>

            {/* Right column — form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl border shadow-xl p-8 lg:p-10"
              style={{ borderColor: "rgba(212, 160, 23, 0.20)" }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12 gap-5"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(26, 79, 200, 0.12), rgba(212, 160, 23, 0.10))" }}
                  >
                    <CheckCircle2 style={{ color: "#1a4fc8" }} size={32} />
                  </div>
                  <h2 className="text-2xl font-bold font-serif">Message received!</h2>
                  <p className="text-muted-foreground max-w-xs leading-relaxed">
                    Thank you for reaching out. Melvina personally reads every message and will get back to you soon.
                  </p>
                  <Button variant="outline" className="rounded-full mt-2" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="w-10 h-1 rounded-full mb-3" style={{ background: "linear-gradient(90deg, #1a4fc8, #d4a017)" }} />
                    <h2 className="text-2xl font-bold">Send a Message</h2>
                  </div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} className="h-12" />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} className="h-12" />
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
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How can I help you?"
                                className="min-h-[150px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full h-12 text-md"
                        disabled={submitContact.isPending}
                        data-testid="button-send-message"
                        style={{ background: "linear-gradient(135deg, #1a4fc8, #1e3a8a)", border: "none" }}
                      >
                        {submitContact.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
    </>
  );
}
