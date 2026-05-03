import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, ArrowRight, Search, Youtube, TrendingUp, Users, School } from "lucide-react";
import { SOCIAL_LINKS, WHATSAPP_LINK } from "@/lib/constants";
import { FaYoutube } from "react-icons/fa";

const categories = ["All", "Literacy", "Teaching", "Leadership", "Students", "Schools"];

const blogPosts = [
  {
    id: 1,
    category: "Literacy",
    title: "Why Most Students Struggle to Read — And What Actually Fixes It",
    excerpt: "Reading is not just decoding words on a page. It is building meaning, developing empathy, and training the mind to think in structures. Here is the science-backed approach that is changing outcomes in my sessions.",
    readTime: "5 min read",
    date: "April 28, 2026",
    tag: "Featured",
    icon: BookOpen,
    color: "bg-primary/8 text-primary",
    borderColor: "border-primary/20",
  },
  {
    id: 2,
    category: "Teaching",
    title: "The Niche Problem: Why Most Educators Feel Stuck in Their Careers",
    excerpt: "After years of working with teachers across schools, I've noticed one common thread in the ones who feel unfulfilled — they never defined their professional niche. Here's how to find yours and build from it.",
    readTime: "7 min read",
    date: "April 15, 2026",
    tag: "Popular",
    icon: TrendingUp,
    color: "bg-accent/10 text-accent-foreground",
    borderColor: "border-accent/20",
  },
  {
    id: 3,
    category: "Students",
    title: "Building a Reading Habit at Ages 10–13: A Practical Guide for Parents",
    excerpt: "The window between ages 10 and 13 is one of the most critical for lifelong reading habits. In this guide, I share the exact framework I use with young learners in my mentorship program.",
    readTime: "6 min read",
    date: "April 5, 2026",
    tag: "Resources",
    icon: Users,
    color: "bg-emerald-50 text-emerald-700",
    borderColor: "border-emerald-200",
  },
  {
    id: 4,
    category: "Schools",
    title: "Curriculum That Actually Works: 5 Systems Every School Needs",
    excerpt: "Curriculum documents fill shelves. What moves schools forward is implementation — systems that track, measure, and respond. Here are the five pillars I build with every consulting client.",
    readTime: "8 min read",
    date: "March 22, 2026",
    tag: "Leadership",
    icon: School,
    color: "bg-violet-50 text-violet-700",
    borderColor: "border-violet-200",
  },
  {
    id: 5,
    category: "Literacy",
    title: "Expression Over Performance: Teaching Students to Write With Confidence",
    excerpt: "We have trained students to write for grades, not for communication. The result is technically correct writing that says nothing. Here is how I flip that script in every session.",
    readTime: "5 min read",
    date: "March 10, 2026",
    tag: "Resources",
    icon: BookOpen,
    color: "bg-primary/8 text-primary",
    borderColor: "border-primary/20",
  },
  {
    id: 6,
    category: "Leadership",
    title: "The UNESCO-SDSN Work and What It Taught Me About Global Education",
    excerpt: "Representing Nigerian educators on a global platform showed me both how far we have come and how much work remains. Here are my honest reflections and what they mean for the work I do locally.",
    readTime: "9 min read",
    date: "February 28, 2026",
    tag: "Story",
    icon: TrendingUp,
    color: "bg-accent/10 text-accent-foreground",
    borderColor: "border-accent/20",
  },
];

const resources = [
  {
    title: "Student Reading Tracker (PDF)",
    desc: "A structured 30-day reading log for learners ages 10–22, with daily prompts and reflection questions.",
    type: "Free Download",
    icon: "📄",
  },
  {
    title: "Teacher Niche Discovery Worksheet",
    desc: "A guided self-assessment tool to help educators identify their professional strengths and define a clear teaching niche.",
    type: "Free Download",
    icon: "📋",
  },
  {
    title: "School Literacy Audit Checklist",
    desc: "The exact checklist I use when I begin a school consulting engagement — evaluate your current literacy systems in one hour.",
    type: "Free Download",
    icon: "✅",
  },
  {
    title: "5-Step Essay Structure for Students (Ages 14–22)",
    desc: "A printable framework that demystifies academic writing. Clear enough for students, rigorous enough for exams.",
    type: "Free Download",
    icon: "📝",
  },
];

const tagColors: Record<string, string> = {
  Featured: "bg-primary text-primary-foreground",
  Popular: "bg-accent text-accent-foreground",
  Resources: "bg-emerald-100 text-emerald-700",
  Leadership: "bg-violet-100 text-violet-700",
  Story: "bg-rose-100 text-rose-700",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogPosts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }),
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-primary-subtle border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-xs font-bold tracking-widest text-accent uppercase mb-4">
              The Education Enthusiast
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ideas, Insights &{" "}
              <span className="text-gradient">Resources</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Practical perspectives on literacy, teaching, and learning — drawn from real classrooms, real students, and over six years of education leadership. No theory for theory's sake.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-10 flex gap-3 max-w-lg"
          >
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search articles and resources..."
                className="pl-10 rounded-full bg-card border-border/60 h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border/40 py-3">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                data-testid={`filter-${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog posts grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg">No articles match your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => {
                const Icon = post.icon;
                return (
                  <motion.article
                    key={post.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className={`bg-card border rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${post.borderColor} flex flex-col`}
                    data-testid={`card-post-${post.id}`}
                  >
                    {/* Card header band */}
                    <div className={`${post.color} px-6 py-8 flex items-start justify-between`}>
                      <Icon size={32} className="opacity-70" />
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColors[post.tag] || "bg-muted text-muted-foreground"}`}>
                        {post.tag}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs font-medium border-border/60 text-muted-foreground">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={11} />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="font-serif text-lg font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {post.excerpt}
                      </p>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
                          data-testid={`link-read-${post.id}`}
                        >
                          Read more <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-16 lg:py-20 border-t border-border/50 bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold tracking-widest text-accent uppercase mb-3 block">Free Resources</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tools You Can Use Today</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Practical, printable resources built from real experience — for students, educators, and school leaders who want results, not just reading material.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((res, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card border border-border/60 rounded-2xl p-6 group hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col"
                data-testid={`card-resource-${i}`}
              >
                <div className="text-3xl mb-4">{res.icon}</div>
                <Badge className="self-start mb-3 text-xs bg-primary/10 text-primary border-0 font-semibold">
                  {res.type}
                </Badge>
                <h3 className="font-serif font-bold text-base mb-2 leading-snug group-hover:text-primary transition-colors">
                  {res.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{res.desc}</p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
                  data-testid={`link-resource-${i}`}
                >
                  Get via WhatsApp <ArrowRight size={12} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube section */}
      <section className="py-16 lg:py-20 bg-primary-subtle border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-6">
                <FaYoutube size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Watch on YouTube</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                Deep-dive conversations, teaching strategies, student success stories, and education insights — subscribe to the channel and never miss a new lesson from The Education Enthusiast.
              </p>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-youtube"
              >
                <Button size="lg" className="rounded-full gap-2.5 bg-red-600 hover:bg-red-700 text-white border-0 shadow-md">
                  <FaYoutube size={20} />
                  Visit the Channel
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Conversation</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Follow The Education Enthusiast across platforms for weekly insights on literacy, teaching, and building learning systems that last.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
                  Instagram
                </Button>
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
                  LinkedIn
                </Button>
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
                  Facebook
                </Button>
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
                  YouTube
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
