import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { WHATSAPP_LINK } from "@/lib/constants";
import { usePageTitle } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";
import { PaystackButton } from "react-paystack";
import { Button } from "@/components/ui/button";

export default function Programs() {
  usePageTitle("Programs");
  const paystackPublicKey = "YOUR_PAYSTACK_PUBLIC_KEY";

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
    <Layout>
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

                <div
                  className="w-full h-12 rounded-md overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${prog.accent}, ${prog.accent}cc)` }}
                >
                  <PaystackButton
                    email="client@example.com"
                    amount={prog.price * 100 * 1500}
                    publicKey={paystackPublicKey}
                    text="Enroll Now"
                    onSuccess={() => alert("Payment complete!")}
                    onClose={() => alert("Payment cancelled")}
                    className="w-full h-full font-medium transition-all text-white bg-transparent"
                  />
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
              <PaystackButton
                email="educator@example.com"
                amount={15 * 100 * 1500}
                publicKey={paystackPublicKey}
                text="Join Mentorship"
                onSuccess={() => alert("Payment complete!")}
                onClose={() => alert("Payment cancelled")}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-md font-medium transition-colors"
              />
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
  );
}
