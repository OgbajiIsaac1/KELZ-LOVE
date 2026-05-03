import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { WHATSAPP_LINK } from "@/lib/constants";
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
    <Layout>
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Let's Work Together</h1>
                <p className="text-lg text-muted-foreground">
                  Whether you're looking for student mentorship, educator guidance, or school consulting, I'm here to help. Reach out and let's start the conversation.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-card rounded-xl border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Email</p>
                    <a href="mailto:meligboanugo@gmail.com" className="text-lg font-semibold hover:text-primary transition-colors">
                      meligboanugo@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card rounded-xl border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Phone</p>
                    <a href="tel:+2347067825349" className="text-lg font-semibold hover:text-primary transition-colors">
                      +234 706 782 5349
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card rounded-xl border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Location</p>
                    <p className="text-lg font-semibold">Enugu, Nigeria</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full h-16 text-lg rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-3">
                    <FaWhatsapp size={28} />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl border shadow-xl p-8 lg:p-10"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12 gap-5"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-primary" size={32} />
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
                  <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
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
  );
}
