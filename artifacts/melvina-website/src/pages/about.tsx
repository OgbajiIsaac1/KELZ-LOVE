import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Target, Heart, Zap, BookOpen, Star } from "lucide-react";
import profileImg from "@/assets/images/profile.png";

export default function About() {
  const values = [
    { title: "Excellence", icon: Star, desc: "Setting the highest standards in every educational endeavor." },
    { title: "Growth", icon: Target, desc: "Fostering continuous personal and professional development." },
    { title: "Integrity", icon: Heart, desc: "Operating with honesty, transparency, and deep care." },
    { title: "Impact", icon: Zap, desc: "Creating lasting, measurable change in students and schools." },
    { title: "Lifelong Learning", icon: BookOpen, desc: "Embracing curiosity as the foundation of all success." },
  ];

  return (
    <Layout>
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
            >
              <img 
                src={profileImg} 
                alt="Melvina Igboanugo" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
                More Than Teaching. <br />
                <span className="text-primary">Building Systems That Shape Lives.</span>
              </h1>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  As an education leader, mentor, and learning strategist, my work is rooted in a simple belief: every student can excel when given the right structure, and every educator can thrive when given the right support.
                </p>
                <p>
                  My journey in education has been defined by a commitment to literacy, clear expression, and academic excellence. Being recognized as the Enugu State Maltina Teacher of the Year (2023) and serving as Director of Studies at Roseville Secondary School has deepened my resolve to build systems that produce real learning outcomes.
                </p>
                <p>
                  I don't just teach. I partner with students to build strong reading habits and structured thinking. I mentor educators to find their niche and advance their careers. And I consult with schools to elevate their curriculum delivery.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-serif font-bold">Our Vision</h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              To cultivate a generation of confident readers, articulate thinkers, and empowered educators who transform their communities and shape the future of global education.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-serif font-bold">Our Mission</h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              To provide targeted interventions, strategic mentorship, and systemic support that equip learners, teachers, and institutions with the tools they need to achieve academic and professional excellence.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Core Values</h2>
            <p className="text-muted-foreground text-lg">The principles that guide every session, every workshop, and every partnership.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-6 rounded-xl border text-center hover:border-primary transition-colors hover:shadow-md"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
