import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/constants";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, BookOpen, GraduationCap, Presentation } from "lucide-react";

import heroImg from "@/assets/images/hero.png";
import studentImg from "@/assets/images/student-reading.png";
import teacherImg from "@/assets/images/teacher-workshop.png";
import schoolImg from "@/assets/images/school-admin.png";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <Layout>
      {/* Hero Section — cobalt blue + gold from photo */}
      <section ref={heroRef} className="relative py-20 lg:py-32 overflow-hidden home-hero-bg">
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-0 w-80 h-80 rounded-full bg-[#1e4fc8]/8 blur-3xl" />
          <div className="absolute bottom-0 right-10 w-72 h-72 rounded-full bg-[#d4a017]/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-[#1e4fc8]/5 blur-2xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-[#1e4fc8]/10 text-[#1e4fc8] border border-[#1e4fc8]/20">
              The Education Enthusiast
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
              Raising Readers. Building Thinkers.{" "}
              <span className="text-gradient">Transforming Education.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              I help students, educators, and schools build strong literacy, clear expression, and systems that produce real learning outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-md px-8 rounded-full h-14"
                  style={{ background: "linear-gradient(135deg, #1a4fc8, #1e3a8a)" }}
                >
                  Book a Session
                </Button>
              </a>
              <a href="#">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-md px-8 rounded-full h-14 border-[#d4a017]/50 text-[#1a4fc8] hover:bg-[#d4a017]/8"
                >
                  Join Learning Community
                </Button>
              </a>
            </div>

            {/* Mini stat strip */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { label: "Students Mentored", value: "500+" },
                { label: "Schools Supported", value: "30+" },
                { label: "Years Experience", value: "6+" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-gradient">{s.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* PARALLAX hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Gold-blue gradient border frame */}
            <div
              className="absolute -inset-3 rounded-3xl opacity-60"
              style={{
                background: "linear-gradient(135deg, #1a4fc8 0%, #d4a017 50%, #1a4fc8 100%)",
                padding: "2px",
                borderRadius: "1.25rem",
              }}
            />
            {/* overflow-hidden so parallax image moves without spilling */}
            <div className="relative rounded-2xl overflow-hidden img-blue-glow aspect-video lg:aspect-[4/5]">
              <motion.img
                src={heroImg}
                alt="Melvina Igboanugo mentoring"
                className="object-cover w-full h-full scale-110"
                style={{ y: imageParallaxY }}
              />
              {/* Cobalt tint at bottom */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(26, 79, 200, 0.15) 0%, transparent 50%)" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip — cobalt blue wash */}
      <section className="border-y home-trust-bg py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-90">
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

      {/* What I Do — warm golden ivory */}
      <section className="py-24 home-whatido-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">What I Do</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Empowering Every Corner of Education</h2>
            <p className="text-muted-foreground text-lg">Empowering the entire educational ecosystem through targeted interventions and strategic support.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Student Development", desc: "Helping learners become confident readers, writers, and thinkers.", img: studentImg, accent: "#1a4fc8" },
              { title: "Educator Growth", desc: "Supporting teachers to build strong niches and impactful careers.", img: teacherImg, accent: "#d4a017" },
              { title: "School Support", desc: "Partnering with schools to improve curriculum delivery and outcomes.", img: schoolImg, accent: "#1a4fc8" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-card rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300"
                style={{ borderColor: i === 1 ? "rgba(212, 160, 23, 0.35)" : "hsl(var(--border))" }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to top, ${item.accent}28 0%, transparent 60%)` }}
                  />
                </div>
                <div className="p-6">
                  <div className="w-8 h-1 rounded-full mb-3" style={{ background: `linear-gradient(90deg, ${item.accent}, ${item.accent}66)` }} />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who I Serve — soft cobalt blue */}
      <section className="py-24 home-serve-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">Who I Serve</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored for Every Stage</h2>
            <p className="text-muted-foreground text-lg">Tailored approaches for every stage of the educational journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Students (Ages 10–22)", icon: BookOpen, color: "#1a4fc8" },
              { title: "Educators & School Leaders", icon: Presentation, color: "#d4a017" },
              { title: "Schools & Institutions", icon: GraduationCap, color: "#1a4fc8" },
            ].map((audience, i) => (
              <div
                key={i}
                className="bg-card p-6 rounded-xl border text-center hover:shadow-lg transition-all group"
                style={{ borderColor: "rgba(26, 79, 200, 0.15)" }}
              >
                <div
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${audience.color}18, ${audience.color}08)`,
                    border: `1.5px solid ${audience.color}30`,
                  }}
                >
                  <audience.icon className="w-7 h-7" style={{ color: audience.color }} />
                </div>
                <h3 className="font-semibold text-lg">{audience.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — deep cobalt to midnight blue with gold shimmer */}
      <section className="py-24 text-white text-center home-cta-bg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#d4a017]/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: "rgba(212, 160, 23, 0.25)", color: "#f5d060", border: "1px solid rgba(212, 160, 23, 0.35)" }}
          >
            Start Your Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 max-w-2xl mx-auto">
            There is a clear path for you here.
          </h2>
          <Link href="/programs">
            <Button
              size="lg"
              className="rounded-full h-14 px-10 text-lg font-semibold border-none"
              style={{ background: "linear-gradient(135deg, #d4a017, #c8921a)", color: "#fff" }}
            >
              Explore Programs
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
