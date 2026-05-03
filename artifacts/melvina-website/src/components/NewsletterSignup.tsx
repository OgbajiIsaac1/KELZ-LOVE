import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { useSubscribeNewsletter } from "@workspace/api-client-react";
import { Mail, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
});
type FormValues = z.infer<typeof schema>;

export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [success, setSuccess] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const subscribe = useSubscribeNewsletter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = (values: FormValues) => {
    subscribe.mutate(
      { data: values },
      {
        onSuccess: () => setSuccess(true),
        onError: (err: unknown) => {
          const status = (err as { status?: number })?.status;
          if (status === 409) {
            setAlreadySubscribed(true);
            setSuccess(true);
          }
        },
      }
    );
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-primary/6 border border-primary/20 rounded-2xl p-8 text-center"
      >
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="text-primary" size={28} />
        </div>
        <h3 className="font-serif font-bold text-xl mb-2">
          {alreadySubscribed ? "Already subscribed!" : "You're in!"}
        </h3>
        <p className="text-muted-foreground text-sm">
          {alreadySubscribed
            ? "This email is already subscribed to The Education Enthusiast updates."
            : "Welcome to The Education Enthusiast community. Watch your inbox for insights, resources, and updates."}
        </p>
      </motion.div>
    );
  }

  return (
    <div className={`bg-primary rounded-2xl p-8 md:p-10 ${compact ? "" : "shadow-lg"}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center">
          <Mail className="text-primary-foreground" size={20} />
        </div>
        <div>
          <p className="font-serif text-primary-foreground font-bold text-lg leading-tight">Stay Informed</p>
          <p className="text-primary-foreground/70 text-xs">The Education Enthusiast</p>
        </div>
      </div>
      <p className="text-primary-foreground/80 text-sm mb-6 leading-relaxed">
        Join educators, students, and school leaders who get practical insights on literacy, teaching, and learning — straight to their inbox.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/40 rounded-xl h-11"
                      data-testid="input-newsletter-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-primary-foreground/80 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email address"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/40 rounded-xl h-11"
                      data-testid="input-newsletter-email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-primary-foreground/80 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={subscribe.isPending}
            className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl h-11 font-semibold"
            data-testid="button-newsletter-submit"
          >
            {subscribe.isPending ? "Subscribing..." : "Subscribe — it's free"}
          </Button>
          <p className="text-primary-foreground/50 text-xs text-center">No spam, ever. Unsubscribe anytime.</p>
        </form>
      </Form>
    </div>
  );
}
