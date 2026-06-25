import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { useGetBlogPost, useListBlogPosts, getGetBlogPostQueryKey } from "@workspace/api-client-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { usePageTitle } from "@/lib/seo";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function BlogPost({ id: idStr }: { id?: string }) {
  const id = parseInt(idStr ?? "0", 10);

  const { data: post, isLoading, isError } = useGetBlogPost(id, {
    query: { enabled: !!id, queryKey: getGetBlogPostQueryKey(id) },
  });

  const { data: allPosts } = useListBlogPosts();
  const related = allPosts?.filter((p) => p.id !== id).slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-20 max-w-3xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-3/4 mb-8" />
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-2/3 mb-3" />
        </div>
      </Layout>
    );
  }

  if (isError || !post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 py-32 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Article not found</h1>
          <p className="text-muted-foreground mb-8">This article may have been removed or does not exist.</p>
          <Link href="/blog">
            <Button variant="outline" className="rounded-full gap-2">
              <ArrowLeft size={16} /> Back to Blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  usePageTitle(post?.title);

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 lg:py-16 border-b border-border/50 bg-primary-subtle">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/blog">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-6 group">
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                Back to Blog
              </span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge variant="outline" className="border-primary/30 text-primary font-medium">
                {post.category}
              </Badge>
              <Badge className="bg-accent/10 text-accent-foreground border-0 font-semibold text-xs">
                {post.tag}
              </Badge>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock size={13} /> {post.readTime}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar size={13} /> {publishDate}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">{post.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      {post.imageUrl && (
        <div className="container mx-auto px-4 md:px-6 max-w-4xl -mb-8 relative z-10 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl overflow-hidden aspect-video shadow-xl border border-border/40"
          >
            <motion.img
              src={post.imageUrl}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>
        </div>
      )}

      {/* Article body */}
      <article className="container mx-auto px-4 md:px-6 max-w-3xl py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-strong:text-foreground"
        >
          {post.content.split("\n\n").map((para, i) => {
            if (para.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{para.replace("## ", "")}</h2>;
            }
            if (para.startsWith("### ")) {
              return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{para.replace("### ", "")}</h3>;
            }
            if (para.startsWith("- ")) {
              const items = para.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={i} className="my-4 space-y-2 list-disc list-inside">
                  {items.map((item, j) => (
                    <li key={j} className="text-muted-foreground">{item.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-muted-foreground leading-relaxed mb-5">
                {para}
              </p>
            );
          })}
        </motion.div>

        {/* Author + CTA */}
        <div className="mt-14 pt-10 border-t border-border/50 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="font-serif text-primary text-xl font-bold">MI</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">Melvina Igboanugo</p>
            <p className="text-xs text-accent font-semibold tracking-widest uppercase mb-2">The Education Enthusiast</p>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Education leader, mentor, and learning strategist with over six years of experience transforming how students learn and educators teach.
            </p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="rounded-full">Book a Session with Melvina</Button>
            </a>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-border/50 py-14 bg-card/40">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="font-serif text-2xl font-bold mb-8">More Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.id}`}>
                  <div
                    className="bg-card border border-border/60 rounded-xl p-5 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
                    data-testid={`card-related-${p.id}`}
                  >
                    <Badge variant="outline" className="text-xs mb-3 border-border/60">{p.category}</Badge>
                    <h3 className="font-serif font-bold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
                    <span className="text-xs text-primary font-semibold mt-3 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Read more <ArrowLeft size={11} className="rotate-180" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <div className="container mx-auto px-4 md:px-6 max-w-2xl py-14">
        <NewsletterSignup />
      </div>
    </Layout>
  );
}
