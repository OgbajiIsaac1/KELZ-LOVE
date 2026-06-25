import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import { usePageTitle } from "@/lib/seo";
import impactStudentImg from "@/assets/images/impact-student.png";
import impactEducatorImg from "@/assets/images/impact-educator.png";
import impactSchoolImg from "@/assets/images/impact-school.png";

export default function Impact() {
  usePageTitle("Impact");
  const impacts = [
    {
      title: "Student Impact",
      img: impactStudentImg,
      outcomes: ["Improved reading confidence", "Better writing skills", "Stronger academic performance", "Enhanced critical thinking"],
      reverse: false,
      accent: "#1a4fc8",
    },
    {
      title: "Educator Impact",
      img: impactEducatorImg,
      outcomes: ["Clear niche direction", "Better teaching structure", "Increased confidence", "Accelerated career growth"],
      reverse: true,
      accent: "#d4a017",
    },
    {
      title: "School Impact",
      img: impactSchoolImg,
      outcomes: ["Improved curriculum delivery", "Better tracking systems", "Stronger learning outcomes", "Enhanced institutional reputation"],
      reverse: false,
      accent: "#1a4fc8",
    },
  ];

  const testimonials = [
    {
      quote: "Melvina completely transformed how my son approaches his studies. He went from dreading reading assignments to proactively seeking out new books. Her structured approach works miracles.",
      author: "Grace O.",
      role: "Parent",
    },
    {
      quote: "The mentorship program gave me the clarity I needed to define my niche in educational technology. Melvina's insights are practical, actionable, and deeply inspiring.",
      author: "David E.",
      role: "High School Teacher",
    },
    {
      quote: "Partnering with Melvina for our curriculum overhaul was the best decision our board made this year. Our teachers feel more supported and our students' performance metrics have notably improved.",
      author: "Mrs. Adebayo",
      role: "School Administrator",
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
              style={{ background: "rgba(26, 79, 200, 0.10)", color: "#1a4fc8", border: "1px solid rgba(26, 79, 200, 0.22)" }}
            >
              Impact & Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              <span
                style={{
                  background: "linear-gradient(135deg, #1a4fc8, #d4a017)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Measuring Our Impact
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Transformation isn't just an idea—it's a measurable reality. We track our success through the growth of our students, the confidence of our educators, and the excellence of our partner schools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact sections — alternating gold and blue */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-0">
            {impacts.map((item, i) => (
              <div
                key={i}
                className={`py-20 ${i % 2 === 0 ? "section-gold-bg" : "section-purple-bg"}`}
                style={{ margin: "0 -16px", padding: "5rem 16px" }}
              >
                <div className={`container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center ${item.reverse ? "md:grid-flow-col-dense" : ""}`}>
                  <motion.div
                    initial={{ opacity: 0, x: item.reverse ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={item.reverse ? "md:col-start-2" : ""}
                  >
                    <div
                      className="rounded-2xl overflow-hidden shadow-2xl aspect-video"
                      style={{ boxShadow: `0 20px 60px ${item.accent}28, 0 0 0 3px ${item.accent}22` }}
                    >
                      <motion.img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: item.reverse ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`space-y-6 ${item.reverse ? "md:col-start-1" : ""}`}
                  >
                    <h2 className="text-3xl font-bold font-serif">{item.title}</h2>
                    <div className="w-12 h-1.5 rounded-full" style={{ background: `linear-gradient(90deg, ${item.accent}, ${item.accent}55)` }} />
                    <ul className="space-y-4">
                      {item.outcomes.map((outcome, j) => (
                        <li key={j} className="flex items-center gap-3 text-lg">
                          <CheckCircle className="w-6 h-6 shrink-0" style={{ color: item.accent }} />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — rich purple-gold gradient */}
      <section className="py-24 section-primary-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#d4a017]/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
              style={{ background: "rgba(212, 160, 23, 0.25)", color: "#f5d060", border: "1px solid rgba(212, 160, 23, 0.35)" }}
            >
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">Stories of Transformation</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl backdrop-blur-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <div className="mb-6" style={{ color: "rgba(212, 160, 23, 0.7)" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <p className="text-lg leading-relaxed mb-8 italic text-white/90">"{test.quote}"</p>
                <div>
                  <div className="font-bold text-lg">{test.author}</div>
                  <div className="text-sm" style={{ color: "rgba(212, 160, 23, 0.75)" }}>{test.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
