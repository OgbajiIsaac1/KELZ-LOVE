import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Target, Heart, Zap, BookOpen, Star } from "lucide-react";
import { usePageTitle } from "@/lib/seo";
import profileImg from "@/assets/images/profile.png";

export default function About() {
  usePageTitle("About");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const values = [
    { title: "Excellence", icon: Star, desc: "Setting the highest standards in every educational endeavor." },
    { title: "Growth", icon: Target, desc: "Fostering continuous personal and professional development." },
    { title: "Integrity", icon: Heart, desc: "Operating with honesty, transparency, and deep care." },
    { title: "Impact", icon: Zap, desc: "Creating lasting, measurable change in students and schools." },
    { title: "Lifelong Learning", icon: BookOpen, desc: "Embracing curiosity as the foundation of all success." },
  ];

  return (
    <Layout>
      {/* Hero — fuchsia pink + navy blue from profile photo */}
      <section ref={heroRef} className="py-20 lg:py-32 about-hero-bg relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#e91e8c]/8 blur-3xl" />
          <div className="absolute bottom-10 left-0 w-72 h-72 rounded-full bg-[#1a237e]/8 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-[#e91e8c]/4 blur-2xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* PARALLAX profile image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Pink-navy gradient border frame */}
              <div
                className="absolute -inset-3 rounded-3xl opacity-70"
                style={{
                  background: "linear-gradient(135deg, #e91e8c 0%, #1a237e 50%, #e91e8c 100%)",
                  padding: "2px",
                  borderRadius: "1.25rem",
                }}
              />
              {/* overflow-hidden clips parallax movement */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden img-pink-glow">
                <motion.img
                  src={profileImg}
                  alt="Melvina Igboanugo"
                  className="object-cover w-full h-full scale-110"
                  style={{ y: imageParallaxY }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                {/* Navy tint at bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(26, 35, 126, 0.18) 0%, transparent 55%)" }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{ background: "rgba(233, 30, 140, 0.10)", color: "#c01070", border: "1px solid rgba(233, 30, 140, 0.22)" }}
              >
                Meet Melvina
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
                More Than Teaching.{" "}
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #e91e8c 0%, #1a237e 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Building Systems That Shape Lives.
                </span>
              </h1>

              {/* Pink accent bar */}
              <div className="w-16 h-1.5 rounded-full" style={{ background: "linear-gradient(90deg, #e91e8c, #1a237e)" }} />

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

              {/* Quick badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                {["Maltina Teacher of the Year 2023", "UNESCO Global School Advocate", "Director of Studies"].map((badge) => (
                  <span
                    key={badge}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(26, 35, 126, 0.08)", color: "#1a237e", border: "1px solid rgba(26, 35, 126, 0.18)" }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission — deep navy (matching her navy trousers in photo) */}
      <section className="py-24 about-navy-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#e91e8c]/12 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/4 blur-2xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 text-center md:text-left relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2"
              style={{ background: "rgba(233, 30, 140, 0.20)", color: "#f48cb8" }}
            >
              Vision
            </div>
            <h2 className="text-3xl font-serif font-bold">Our Vision</h2>
            <div className="w-10 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #e91e8c, rgba(233,30,140,0.3))" }} />
            <p className="text-lg text-white/80 leading-relaxed">
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
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2"
              style={{ background: "rgba(255, 255, 255, 0.10)", color: "rgba(255,255,255,0.75)" }}
            >
              Mission
            </div>
            <h2 className="text-3xl font-serif font-bold">Our Mission</h2>
            <div className="w-10 h-1 rounded-full" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.15))" }} />
            <p className="text-lg text-white/80 leading-relaxed">
              To provide targeted interventions, strategic mentorship, and systemic support that equip learners, teachers, and institutions with the tools they need to achieve academic and professional excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values — soft fuchsia warmth */}
      <section className="py-24 about-values-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#c01070" }}>
              Our Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Principles That Guide Us</h2>
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
                className="bg-card p-6 rounded-xl border text-center hover:shadow-md transition-all group"
                style={{ borderColor: "rgba(233, 30, 140, 0.12)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{
                    background: "linear-gradient(135deg, rgba(233,30,140,0.12), rgba(26,35,126,0.08))",
                    border: "1.5px solid rgba(233,30,140,0.20)",
                  }}
                >
                  <value.icon className="w-6 h-6" style={{ color: "#c01070" }} />
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
