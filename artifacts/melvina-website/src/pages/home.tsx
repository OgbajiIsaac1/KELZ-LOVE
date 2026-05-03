import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/constants";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Award, BookOpen, GraduationCap, Presentation } from "lucide-react";

import heroImg from "@/assets/images/hero.png";
import studentImg from "@/assets/images/student-reading.png";
import teacherImg from "@/assets/images/teacher-workshop.png";
import schoolImg from "@/assets/images/school-admin.png";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
              Raising Readers. Building Thinkers. <span className="text-primary">Transforming Education.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              I help students, educators, and schools build strong literacy, clear expression, and systems that produce real learning outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto text-md px-8 rounded-full h-14">Book a Session</Button>
              </a>
              <a href="#">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-md px-8 rounded-full h-14">Join Learning Community</Button>
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-square"
          >
            <img 
              src={heroImg} 
              alt="Melvina Igboanugo mentoring" 
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y bg-primary/5 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80">
            <div className="flex items-center gap-2 font-medium text-sm md:text-base text-foreground">
              <Award className="text-primary" /> Enugu State Maltina Teacher of the Year (2023)
            </div>
            <div className="flex items-center gap-2 font-medium text-sm md:text-base text-foreground">
              <GraduationCap className="text-primary" /> Director of Studies, Roseville Secondary School
            </div>
            <div className="flex items-center gap-2 font-medium text-sm md:text-base text-foreground">
              <BookOpen className="text-primary" /> Global School Advocate (UNESCO / SDSN)
            </div>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-muted-foreground text-lg">Empowering the entire educational ecosystem through targeted interventions and strategic support.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Student Development",
                desc: "Helping learners become confident readers, writers, and thinkers.",
                img: studentImg
              },
              {
                title: "Educator Growth",
                desc: "Supporting teachers to build strong niches and impactful careers.",
                img: teacherImg
              },
              {
                title: "School Support",
                desc: "Partnering with schools to improve curriculum delivery and outcomes.",
                img: schoolImg
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who I Serve */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who I Serve</h2>
            <p className="text-muted-foreground text-lg">Tailored approaches for every stage of the educational journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Students (Ages 10–22)", icon: BookOpen },
              { title: "Educators & School Leaders", icon: Presentation },
              { title: "Schools & Institutions", icon: GraduationCap }
            ].map((audience, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border text-center hover:border-primary transition-colors">
                <audience.icon className="w-10 h-10 mx-auto text-primary mb-4" />
                <h3 className="font-semibold text-lg">{audience.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 max-w-2xl mx-auto">
            There is a clear path for you here.
          </h2>
          <Link href="/programs">
            <Button size="lg" variant="secondary" className="rounded-full h-14 px-8 text-lg font-semibold hover:bg-secondary/90 text-primary">
              Explore Programs
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
