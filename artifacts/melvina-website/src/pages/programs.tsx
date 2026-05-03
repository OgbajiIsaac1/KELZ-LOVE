import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/constants";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { PaystackButton } from "react-paystack";

export default function Programs() {
  const paystackPublicKey = "YOUR_PAYSTACK_PUBLIC_KEY"; // Placeholder

  const studentPrograms = [
    {
      age: "Ages 10–13",
      details: "40 min, twice monthly, 1 year",
      price: 10,
      outcome: "Strong reading habits and confidence",
      features: ["Foundational reading skills", "Vocabulary building", "Interactive learning sessions", "Monthly progress reports"]
    },
    {
      age: "Ages 14–17",
      details: "40 min, twice monthly, 6 months",
      price: 12,
      outcome: "Improved writing and academic performance",
      features: ["Analytical writing techniques", "Exam preparation strategies", "Critical thinking exercises", "Personalized feedback"]
    },
    {
      age: "Ages 18–22",
      details: "1 hour, twice monthly",
      price: 15,
      outcome: "Clear expression and structured thinking",
      features: ["Advanced academic writing", "Presentation skills", "Research methodologies", "Career readiness communication"]
    }
  ];

  return (
    <Layout>
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Programs & Mentorship</h1>
            <p className="text-xl text-muted-foreground">
              Structured pathways designed to deliver measurable growth for students, clear direction for educators, and robust systems for schools.
            </p>
          </div>

          {/* Student Programs */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-10 text-center font-serif">Student Programs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {studentPrograms.map((prog, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl border p-8 shadow-sm hover:shadow-xl transition-all relative flex flex-col"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{prog.age}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{prog.details}</p>
                    <div className="text-3xl font-bold text-primary">${prog.price}<span className="text-lg text-muted-foreground font-normal">/month</span></div>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg mb-6">
                    <p className="font-medium text-primary text-sm">Outcome: {prog.outcome}</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {prog.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <PaystackButton 
                    email="client@example.com"
                    amount={prog.price * 100 * 1500} // Rough NGN conversion for demo
                    publicKey={paystackPublicKey}
                    text="Enroll Now"
                    onSuccess={() => alert("Payment complete!")}
                    onClose={() => alert("Payment cancelled")}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-md font-medium transition-colors"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Educator Mentorship */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl border p-8 shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <h2 className="text-3xl font-bold mb-6 font-serif">Educator Mentorship</h2>
              <div className="mb-6">
                <p className="text-muted-foreground mb-4">1 hour monthly, 6 months</p>
                <div className="text-3xl font-bold text-primary mb-4">$15<span className="text-lg text-muted-foreground font-normal">/month</span></div>
                <div className="bg-primary/5 p-4 rounded-lg mb-6">
                  <p className="font-medium text-primary">Focus: Niche clarity & Career growth</p>
                  <p className="font-medium text-primary mt-1">Outcome: Confidence and direction</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Identifying your unique teaching strengths</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Building a personal brand in education</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Strategic career progression planning</span>
                </li>
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
              className="bg-secondary/30 rounded-2xl border border-primary/20 p-8 shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <h2 className="text-3xl font-bold mb-6 font-serif">School Consulting</h2>
              <div className="mb-6">
                <p className="text-muted-foreground mb-4">Customized engagements for educational institutions</p>
                <div className="text-2xl font-bold text-primary mb-4">Custom Pricing</div>
                <div className="bg-background/80 p-4 rounded-lg mb-6">
                  <p className="font-medium text-primary">Outcome: Stronger academic systems</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Curriculum evaluation and improvement</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>School-wide literacy development strategies</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Comprehensive teacher support and training</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Academic leadership structuring</span>
                </li>
              </ul>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button variant="default" className="w-full h-12 text-md">Book a Consultation</Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
