import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import impactStudentImg from "@/assets/images/impact-student.png";
import impactEducatorImg from "@/assets/images/impact-educator.png";
import impactSchoolImg from "@/assets/images/impact-school.png";

export default function Impact() {
  const impacts = [
    {
      title: "Student Impact",
      img: impactStudentImg,
      outcomes: ["Improved reading confidence", "Better writing skills", "Stronger academic performance", "Enhanced critical thinking"],
      reverse: false
    },
    {
      title: "Educator Impact",
      img: impactEducatorImg,
      outcomes: ["Clear niche direction", "Better teaching structure", "Increased confidence", "Accelerated career growth"],
      reverse: true
    },
    {
      title: "School Impact",
      img: impactSchoolImg,
      outcomes: ["Improved curriculum delivery", "Better tracking systems", "Stronger learning outcomes", "Enhanced institutional reputation"],
      reverse: false
    }
  ];

  const testimonials = [
    {
      quote: "Melvina completely transformed how my son approaches his studies. He went from dreading reading assignments to proactively seeking out new books. Her structured approach works miracles.",
      author: "Grace O.",
      role: "Parent"
    },
    {
      quote: "The mentorship program gave me the clarity I needed to define my niche in educational technology. Melvina's insights are practical, actionable, and deeply inspiring.",
      author: "David E.",
      role: "High School Teacher"
    },
    {
      quote: "Partnering with Melvina for our curriculum overhaul was the best decision our board made this year. Our teachers feel more supported and our students' performance metrics have notably improved.",
      author: "Mrs. Adebayo",
      role: "School Administrator"
    }
  ];

  return (
    <Layout>
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Measuring Our Impact</h1>
            <p className="text-xl text-muted-foreground">
              Transformation isn't just an idea—it's a measurable reality. We track our success through the growth of our students, the confidence of our educators, and the excellence of our partner schools.
            </p>
          </div>

          <div className="space-y-24">
            {impacts.map((item, i) => (
              <div key={i} className={`grid md:grid-cols-2 gap-12 items-center ${item.reverse ? 'md:grid-flow-col-dense' : ''}`}>
                <motion.div 
                  initial={{ opacity: 0, x: item.reverse ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={item.reverse ? 'md:col-start-2' : ''}
                >
                  <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: item.reverse ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`space-y-6 ${item.reverse ? 'md:col-start-1' : ''}`}
                >
                  <h2 className="text-3xl font-bold font-serif">{item.title}</h2>
                  <div className="w-12 h-1 bg-primary rounded-full"></div>
                  <ul className="space-y-4">
                    {item.outcomes.map((outcome, j) => (
                      <li key={j} className="flex items-center gap-3 text-lg">
                        <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-16 text-center">Stories of Transformation</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-primary-foreground/10 p-8 rounded-2xl backdrop-blur-sm border border-primary-foreground/20"
              >
                <div className="mb-6 text-primary-foreground/60">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"/>
                  </svg>
                </div>
                <p className="text-lg leading-relaxed mb-8 italic">"{test.quote}"</p>
                <div>
                  <div className="font-bold text-lg">{test.author}</div>
                  <div className="text-primary-foreground/80 text-sm">{test.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
