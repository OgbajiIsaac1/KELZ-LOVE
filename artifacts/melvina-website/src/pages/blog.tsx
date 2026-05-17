import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Clock, ArrowRight, Search, TrendingUp, Users, School } from "lucide-react";
import { SOCIAL_LINKS, WHATSAPP_LINK } from "@/lib/constants";
import { FaYoutube } from "react-icons/fa";
import { useListBlogPosts } from "@workspace/api-client-react";
import NewsletterSignup from "@/components/NewsletterSignup";

const categories = ["All", "Literacy", "Teaching", "Leadership", "Students", "Schools"];

const tagColors: Record<string, string> = {
  Featured: "bg-primary text-primary-foreground",
  Popular: "bg-accent text-accent-foreground",
  Resources: "bg-emerald-100 text-emerald-700",
  Leadership: "bg-violet-100 text-violet-700",
  Story: "bg-rose-100 text-rose-700",
  General: "bg-muted text-muted-foreground",
};

const resources = [
  { title: "Student Reading Tracker (PDF)", desc: "A structured 30-day reading log for learners ages 10–22, with daily prompts and reflection questions.", type: "Free Download", icon: "📄" },
  { title: "Teacher Niche Discovery Worksheet", desc: "A guided self-assessment tool to help educators identify their professional strengths and define a clear teaching niche.", type: "Free Download", icon: "📋" },
  { title: "School Literacy Audit Checklist", desc: "The exact checklist I use when I begin a school consulting engagement — evaluate your current literacy systems in one hour.", type: "Free Download", icon: "✅" },
  { title: "5-Step Essay Structure for Students (Ages 14–22)", desc: "A printable framework that demystifies academic writing. Clear enough for students, rigorous enough for exams.", type: "Free Download", icon: "📝" },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: posts, isLoading } = useListBlogPosts();

  const filtered = (posts ?? []).filter((p) => {
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
      <section className="py-20 lg:py-28 page-header-bg border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#d4a017]/8 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-primary/6 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-block text-xs font-bold tracking-widest text-accent uppercase mb-4">The Education Enthusiast</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ideas, Insights &{" "}
              <span className="text-gradient">Resources</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Practical perspectives on literacy, teaching, and learning — drawn from real classrooms, real students, and over six years of education leadership. No theory for theory's sake.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="mt-10 flex gap-3 max-w-lg">
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
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card border border-border/60 rounded-2xl overflow-hidden">
                  <Skeleton className="h-28 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No articles found</p>
              <p className="text-sm mt-1">Try a different category or search term.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-card border border-border/60 rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  data-testid={`card-post-${post.id}`}
                >
                  {post.imageUrl ? (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="px-6 pt-8 pb-4 bg-primary/6 flex items-start justify-between">
                      <BookOpen size={28} className="text-primary opacity-60" />
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${tagColors[post.tag] ?? "bg-muted text-muted-foreground"}`}>
                        {post.tag}
                      </span>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs font-medium border-border/60 text-muted-foreground">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={11} /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-serif text-lg font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                          : new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <Link href={`/blog/${post.id}`}>
                        <span
                          className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
                          data-testid={`link-read-${post.id}`}
                        >
                          Read more <ArrowRight size={12} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-6 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <NewsletterSignup />
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-16 lg:py-20 border-t border-border/50 section-gold-bg">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
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
                <Badge className="self-start mb-3 text-xs bg-primary/10 text-primary border-0 font-semibold">{res.type}</Badge>
                <h3 className="font-serif font-bold text-base mb-2 leading-snug group-hover:text-primary transition-colors">{res.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{res.desc}</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-5 text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all" data-testid={`link-resource-${i}`}>
                  Get via WhatsApp <ArrowRight size={12} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube */}
      <section className="py-16 lg:py-20 section-purple-bg border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-6">
                <FaYoutube size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Watch on YouTube</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                Deep-dive conversations, teaching strategies, student success stories, and education insights — subscribe and never miss a new lesson from The Education Enthusiast.
              </p>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" data-testid="link-youtube">
                <Button size="lg" className="rounded-full gap-2.5 bg-red-600 hover:bg-red-700 text-white border-0 shadow-md">
                  <FaYoutube size={20} /> Visit the Channel
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
