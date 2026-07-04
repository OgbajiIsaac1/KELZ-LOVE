import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { WHATSAPP_LINK } from "@/lib/constants";
import { SeoHead } from "@/components/SeoHead";
import { SITE_URL } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";
import { PaystackButton } from "react-paystack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function PaystackEnrollButton({
  amount,
  email: initialEmail,
  onEmailRequired,
  text,
  publicKey,
  className,
  onSuccess,
  onClose,
}: {
  amount: number;
  email: string;
  onEmailRequired: () => void;
  text: string;
  publicKey: string;
  className?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}) {
  if (!publicKey) {
    return (
      <div className="w-full h-12 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground px-2 text-center">
        Payments unavailable — configure VITE_PAYSTACK_PUBLIC_KEY
      </div>
    );
  }

  if (!initialEmail) {
    return (
      <button
        type="button"
        onClick={onEmailRequired}
        className={`w-full h-12 rounded-md font-medium transition-all text-white ${className ?? ""}`}
      >
        {text}
      </button>
    );
  }

  return (
    <PaystackButton
      email={initialEmail}
      amount={amount}
      publicKey={publicKey}
      text={text}
      onSuccess={() => onSuccess?.()}
      onClose={() => onClose?.()}
      className={`w-full h-12 rounded-md font-medium transition-all text-white ${className ?? ""}`}
    />
  );
}

const programsFaq = [
  {
    question: "What age groups do the student programs cover?",
    answer: "Student programs are designed for three age brackets: Ages 10–13 (foundational reading and vocabulary), Ages 14–17 (analytical writing and exam prep), and Ages 18–22 (advanced academic writing and career readiness).",
  },
  {
    question: "How long are the programs and how often do sessions run?",
    answer: "Student sessions run 40 minutes twice monthly for one year (Ages 10–13) or six months (Ages 14–17). Ages 18–22 sessions are 1 hour twice monthly. The educator mentorship is 1 hour monthly for six months.",
  },
  {
    question: "How much do the programs cost?",
    answer: "Student programs range from $10–$15 per month depending on the age bracket. Educator mentorship is $15 per month. School consulting is custom-priced based on the institution's needs.",
  },
  {
    question: "Do you offer school consulting services?",
    answer: "Yes, school consulting covers curriculum evaluation, literacy development strategies, teacher training, and academic leadership structuring. Pricing is customized per engagement.",
  },
  {
    question: "How can I enroll or book a consultation?",
    answer: "You can enroll in student or educator programs directly on this page via the Paystack payment buttons. For school consulting, use the WhatsApp link to book a consultation.",
  },
];

export default function Programs() {
  const [pendingEmail, setPendingEmail] = useState("");
  const [emailPromptFor, setEmailPromptFor] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ?? "";

  const studentPrograms = [
    {
      age: "Ages 10–13",
      details: "40 min, twice monthly, 1 year",
      price: 10,
      outcome: "Strong reading habits and confidence",
      features: ["Foundational reading skills", "Vocabulary building", "Interactive learning sessions", "Monthly progress reports"],
      accent: "#d4a017",
    },
    {
      age: "Ages 14–17",
      details: "40 min, twice monthly, 6 months",
      price: 12,
      outcome: "Improved writing and academic performance",
      features: ["Analytical writing techniques", "Exam preparation strategies", "Critical thinking exercises", "Personalized feedback"],
      accent: "#1a4fc8",
      featured: true,
    },
    {
      age: "Ages 18–22",
      details: "1 hour, twice monthly",
      price: 15,
      outcome: "Clear expression and structured thinking",
      features: ["Advanced academic writing", "Presentation skills", "Research methodologies", "Career readiness communication"],
      accent: "#d4a017",
    },
  ];

  return (
    <>
      <SeoHead
        title="Programs"
        description="Structured mentorship pathways for students (Ages 10–22), educators, and schools. Build literacy, clear expression, and academic systems that produce real results."
        ogDescription="Mentorship programs for students (Ages 10–22), educators, and schools — literacy, academic writing, teacher training, and school consulting."
        canonicalPath="/programs"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE_URL}/programs#webpage`,
            url: `${SITE_URL}/programs`,
            name: "Programs | Melvina Igboanugo — The Education Enthusiast",
            description: "Structured mentorship pathways for students (Ages 10–22), educators, and schools.",
            isPartOf: { "@id": `${SITE_URL}/#website` },
            breadcrumb: { "@id": `${SITE_URL}/programs#breadcrumb` },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", "h2", ".faq-question"],
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": `${SITE_URL}/programs#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Programs", item: `${SITE_URL}/programs` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${SITE_URL}/programs#faq`,
            mainEntity: programsFaq.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Enroll in a Mentorship Program",
            description: "Steps to join Melvina Igboanugo's student or educator mentorship programs.",
            step: [
              { "@type": "HowToStep", position: 1, name: "Choose a Program", text: "Select the program that matches your age group or role — student (Ages 10–22), educator, or school." },
              { "@type": "HowToStep", position: 2, name: "Enter Your Email", text: "Provide your email address to set up payment via the Paystack enrollment button." },
              { "@type": "HowToStep", position: 3, name: "Complete Payment", text: "Pay the monthly fee securely through Paystack to confirm your spot." },
              { "@type": "HowToStep", position: 4, name: "Start Learning", text: "Receive your session schedule and begin your structured mentorship journey." },
            ],
          },
        ]}
      />
      <Layout>
      {paymentStatus && (
        <div className={`px-4 py-3 text-center text-sm font-medium ${paymentStatus.type === "success" ? "bg-emerald-50 text-emerald-800 border-b border-emerald-200" : "bg-red-50 text-red-800 border-b border-red-200"}`}>
          {paymentStatus.message}
          <button onClick={() => setPaymentStatus(null)} className="ml-3 underline">Dismiss</button>
        </div>
      )}
      {/* Page Header — gold + purple gradient */}
      <section className="py-20 lg:py-28 page-header-bg relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#d4a017]/8 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-primary/6 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
              style={{ background: "rgba(212, 160, 23, 0.12)", color: "#a07010", border: "1px solid rgba(212, 160, 23, 0.25)" }}
            >
              Programs & Mentorship
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              Structured Pathways to{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(262 60% 42%), #d4a017)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Real Growth
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Structured pathways designed to deliver measurable growth for students, clear direction for educators, and robust systems for schools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Student Programs */}
      <section className="py-24 section-gold-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#a07010] mb-3">For Students</span>
            <h2 className="text-3xl font-bold font-serif">Student Programs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {studentPrograms.map((prog, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border p-8 shadow-sm hover:shadow-xl transition-all relative flex flex-col"
                style={{
                  borderColor: prog.featured ? prog.accent + "55" : "hsl(var(--border))",
                  boxShadow: prog.featured ? `0 0 0 2px ${prog.accent}22` : undefined,
                }}
              >
                {prog.featured && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full text-white"
                    style={{ background: "linear-gradient(135deg, #1a4fc8, #1e3a8a)" }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className="w-10 h-1 rounded-full mb-4" style={{ background: `linear-gradient(90deg, ${prog.accent}, ${prog.accent}66)` }} />
                  <h3 className="text-2xl font-bold mb-2">{prog.age}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{prog.details}</p>
                  <div className="text-3xl font-bold" style={{ color: prog.accent }}>
                    ${prog.price}<span className="text-lg text-muted-foreground font-normal">/month</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg mb-6" style={{ background: `${prog.accent}10`, border: `1px solid ${prog.accent}22` }}>
                  <p className="font-medium text-sm" style={{ color: prog.accent }}>Outcome: {prog.outcome}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {prog.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: prog.accent }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  {emailPromptFor === i && (
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={pendingEmail}
                        onChange={(e) => setPendingEmail(e.target.value)}
                        className="h-10 text-sm"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="shrink-0 h-10"
                        onClick={() => setEmailPromptFor(null)}
                      >
                        Done
                      </Button>
                    </div>
                  )}
                  <div
                    className="w-full h-12 rounded-md overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${prog.accent}, ${prog.accent}cc)` }}
                  >
                    <PaystackEnrollButton
                      amount={prog.price * 100 * 1500}
                      email={emailPromptFor === i ? pendingEmail : ""}
                      onEmailRequired={() => { setEmailPromptFor(i); setPendingEmail(""); }}
                      text="Enroll Now"
                      publicKey={paystackPublicKey}
                      className="w-full h-full font-medium transition-all text-white bg-transparent"
                      onSuccess={() => setPaymentStatus({ type: "success", message: "Payment complete! You'll receive a confirmation shortly." })}
                      onClose={() => setPaymentStatus({ type: "error", message: "Payment was cancelled. You can try again anytime." })}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Educator & School */}
      <section className="py-24 section-purple-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">For Professionals</span>
            <h2 className="text-3xl font-bold font-serif">Educator & School Programs</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Educator Mentorship */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl border p-8 shadow-sm hover:shadow-xl transition-all flex flex-col"
              style={{ borderColor: "rgba(107, 33, 168, 0.20)" }}
            >
              <div className="w-10 h-1 rounded-full mb-4" style={{ background: "linear-gradient(90deg, hsl(262 60% 42%), #d4a017)" }} />
              <h2 className="text-3xl font-bold mb-6 font-serif">Educator Mentorship</h2>
              <div className="mb-6">
                <p className="text-muted-foreground mb-4">1 hour monthly, 6 months</p>
                <div className="text-3xl font-bold text-primary mb-4">
                  $15<span className="text-lg text-muted-foreground font-normal">/month</span>
                </div>
                <div className="p-4 rounded-lg mb-6" style={{ background: "rgba(107, 33, 168, 0.07)", border: "1px solid rgba(107, 33, 168, 0.15)" }}>
                  <p className="font-medium text-primary">Focus: Niche clarity & Career growth</p>
                  <p className="font-medium text-primary mt-1">Outcome: Confidence and direction</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span>Identifying your unique teaching strengths</span></li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span>Building a personal brand in education</span></li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span>Strategic career progression planning</span></li>
              </ul>
              <div className="space-y-2">
                {emailPromptFor === 99 && (
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={pendingEmail}
                      onChange={(e) => setPendingEmail(e.target.value)}
                      className="h-10 text-sm"
                      autoFocus
                    />
                    <Button size="sm" variant="secondary" className="shrink-0 h-10" onClick={() => setEmailPromptFor(null)}>
                      Done
                    </Button>
                  </div>
                )}
                <PaystackEnrollButton
                  amount={15 * 100 * 1500}
                  email={emailPromptFor === 99 ? pendingEmail : ""}
                  onEmailRequired={() => { setEmailPromptFor(99); setPendingEmail(""); }}
                  text="Join Mentorship"
                  publicKey={paystackPublicKey}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-md font-medium transition-colors"
                  onSuccess={() => setPaymentStatus({ type: "success", message: "Payment complete! You'll receive a confirmation shortly." })}
                  onClose={() => setPaymentStatus({ type: "error", message: "Payment was cancelled. You can try again anytime." })}
                />
              </div>
            </motion.div>

            {/* School Consulting */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#d4a017]/30 p-8 shadow-sm hover:shadow-xl transition-all flex flex-col"
              style={{ background: "linear-gradient(145deg, rgba(212, 160, 23, 0.06) 0%, rgba(107, 33, 168, 0.04) 100%)" }}
            >
              <div className="w-10 h-1 rounded-full mb-4" style={{ background: "linear-gradient(90deg, #d4a017, hsl(262 60% 42%))" }} />
              <h2 className="text-3xl font-bold mb-6 font-serif">School Consulting</h2>
              <div className="mb-6">
                <p className="text-muted-foreground mb-4">Customized engagements for educational institutions</p>
                <div className="text-2xl font-bold mb-4" style={{ color: "#a07010" }}>Custom Pricing</div>
                <div className="p-4 rounded-lg mb-6" style={{ background: "rgba(212, 160, 23, 0.08)", border: "1px solid rgba(212, 160, 23, 0.22)" }}>
                  <p className="font-medium" style={{ color: "#a07010" }}>Outcome: Stronger academic systems</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "#d4a017" }} /><span>Curriculum evaluation and improvement</span></li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "#d4a017" }} /><span>School-wide literacy development strategies</span></li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "#d4a017" }} /><span>Comprehensive teacher support and training</span></li>
                <li className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "#d4a017" }} /><span>Academic leadership structuring</span></li>
              </ul>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button
                  variant="default"
                  className="w-full h-12 text-md"
                  style={{ background: "linear-gradient(135deg, #d4a017, #c8921a)", border: "none", color: "#fff" }}
                >
                  Book a Consultation
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
    </>
  );
}
