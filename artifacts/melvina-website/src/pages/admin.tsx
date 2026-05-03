import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import {
  useAdminMe,
  useAdminLogin,
  useAdminLogout,
  useListBlogPosts,
  useCreateBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
  useListNewsletterSubscribers,
  useListSiteContent,
  useUpdateSiteContent,
  getListBlogPostsQueryKey,
  getListNewsletterSubscribersQueryKey,
  getListSiteContentQueryKey,
  getAdminMeQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  BookOpen, Users, Settings, LogOut, Plus, Edit2, Trash2, Save, X,
  Mail, Eye, EyeOff, ChevronLeft, BarChart2,
} from "lucide-react";
import { BlogPost } from "@workspace/api-client-react";

type Tab = "dashboard" | "blog" | "content" | "newsletter";

const loginSchema = z.object({ password: z.string().min(1, "Password required") });
type LoginValues = z.infer<typeof loginSchema>;

const blogSchema = z.object({
  title: z.string().min(1, "Title required"),
  excerpt: z.string().min(1, "Excerpt required"),
  content: z.string().min(1, "Content required"),
  category: z.string().min(1, "Category required"),
  tag: z.string().min(1, "Tag required"),
  readTime: z.string().min(1, "Read time required"),
  imageUrl: z.string().optional(),
  published: z.boolean(),
});
type BlogValues = z.infer<typeof blogSchema>;

export default function Admin() {
  const [, setLocation] = useLocation();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [editingContentKey, setEditingContentKey] = useState<string | null>(null);
  const [editingContentValue, setEditingContentValue] = useState("");
  const [loginError, setLoginError] = useState("");

  const qc = useQueryClient();
  const { data: session, isLoading: sessionLoading } = useAdminMe({
    query: { queryKey: getAdminMeQueryKey() },
  });
  const login = useAdminLogin();
  const logout = useAdminLogout();

  const { data: posts, isLoading: postsLoading } = useListBlogPosts(
    { all: "true" },
    { query: { enabled: session?.authenticated === true } }
  );
  const { data: subscribers, isLoading: subsLoading } = useListNewsletterSubscribers({
    query: { enabled: session?.authenticated === true },
  });
  const { data: siteContent, isLoading: contentLoading } = useListSiteContent({
    query: { enabled: session?.authenticated === true },
  });

  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();
  const updateContent = useUpdateSiteContent();

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { password: "" },
  });

  const blogForm = useForm<BlogValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "", excerpt: "", content: "", category: "Literacy",
      tag: "General", readTime: "5 min read", imageUrl: "", published: false,
    },
  });

  const handleLogin = (values: LoginValues) => {
    setLoginError("");
    login.mutate(
      { data: values },
      {
        onSuccess: () => qc.invalidateQueries({ queryKey: getAdminMeQueryKey() }),
        onError: () => setLoginError("Incorrect password. Try again."),
      }
    );
  };

  const handleLogout = () => {
    logout.mutate({}, {
      onSuccess: () => qc.invalidateQueries({ queryKey: getAdminMeQueryKey() }),
    });
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreatingPost(false);
    blogForm.reset({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tag: post.tag,
      readTime: post.readTime,
      imageUrl: post.imageUrl ?? "",
      published: post.published,
    });
  };

  const openCreate = () => {
    setEditingPost(null);
    setIsCreatingPost(true);
    blogForm.reset({
      title: "", excerpt: "", content: "", category: "Literacy",
      tag: "General", readTime: "5 min read", imageUrl: "", published: false,
    });
  };

  const handleSavePost = (values: BlogValues) => {
    const data = { ...values, imageUrl: values.imageUrl || null };
    if (editingPost) {
      updatePost.mutate(
        { id: editingPost.id, data },
        {
          onSuccess: () => {
            qc.invalidateQueries({ queryKey: getListBlogPostsQueryKey() });
            setEditingPost(null);
          },
        }
      );
    } else {
      createPost.mutate(
        { data },
        {
          onSuccess: () => {
            qc.invalidateQueries({ queryKey: getListBlogPostsQueryKey() });
            setIsCreatingPost(false);
          },
        }
      );
    }
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this post?")) return;
    deletePost.mutate(
      { id },
      { onSuccess: () => qc.invalidateQueries({ queryKey: getListBlogPostsQueryKey() }) }
    );
  };

  const handleSaveContent = (key: string) => {
    updateContent.mutate(
      { key, data: { value: editingContentValue } },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getListSiteContentQueryKey() });
          setEditingContentKey(null);
        },
      }
    );
  };

  const tabs = [
    { id: "dashboard" as Tab, label: "Dashboard", icon: BarChart2 },
    { id: "blog" as Tab, label: "Blog Posts", icon: BookOpen },
    { id: "content" as Tab, label: "Site Content", icon: Settings },
    { id: "newsletter" as Tab, label: "Newsletter", icon: Mail },
  ];

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-3">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    );
  }

  if (!session?.authenticated) {
    return (
      <div className="min-h-screen bg-primary-subtle flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-1">Admin Access</h1>
            <p className="text-xs font-bold tracking-widest text-accent uppercase">The Education Enthusiast</p>
          </div>
          <div className="bg-card border border-border/60 rounded-2xl p-8 shadow-lg">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          className="h-11"
                          data-testid="input-admin-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {loginError && <p className="text-sm text-destructive">{loginError}</p>}
                <Button
                  type="submit"
                  className="w-full rounded-xl h-11"
                  disabled={login.isPending}
                  data-testid="button-admin-login"
                >
                  {login.isPending ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Default password: <code className="bg-muted px-1 rounded">melvina2026</code>
            </p>
          </div>
          <div className="text-center mt-6">
            <button onClick={() => setLocation("/")} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
              <ChevronLeft size={14} /> Back to site
            </button>
          </div>
        </div>
      </div>
    );
  }

  const showingForm = isCreatingPost || editingPost !== null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-60 bg-card border-r border-border flex flex-col shrink-0 hidden md:flex">
        <div className="p-6 border-b border-border">
          <h2 className="font-serif font-bold text-primary text-lg leading-tight">Melvina CMS</h2>
          <p className="text-xs text-accent font-semibold tracking-widest uppercase">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setTab(id); setEditingPost(null); setIsCreatingPost(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              data-testid={`tab-${id}`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <button
            onClick={() => setLocation("/")}
            className="w-full flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-xl hover:bg-muted"
          >
            <ChevronLeft size={15} /> View Site
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 transition-colors px-3 py-2 rounded-xl hover:bg-destructive/5"
            data-testid="button-logout"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex">
        {tabs.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex flex-col items-center py-3 gap-0.5 text-xs transition-colors ${
              tab === id ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-16 md:pb-0">
        {/* Top bar */}
        <div className="border-b border-border bg-card/80 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <h1 className="font-semibold text-foreground">{tabs.find(t => t.id === tab)?.label}</h1>
          {tab === "blog" && !showingForm && (
            <Button size="sm" className="rounded-full gap-1.5" onClick={openCreate} data-testid="button-new-post">
              <Plus size={15} /> New Post
            </Button>
          )}
        </div>

        <div className="p-6 max-w-5xl">
          {/* === DASHBOARD === */}
          {tab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Published Posts", value: posts?.filter(p => p.published).length ?? "—", icon: BookOpen, color: "text-primary" },
                  { label: "Draft Posts", value: posts?.filter(p => !p.published).length ?? "—", icon: EyeOff, color: "text-muted-foreground" },
                  { label: "Subscribers", value: subscribers?.length ?? "—", icon: Mail, color: "text-accent-foreground" },
                  { label: "Content Items", value: siteContent?.length ?? "—", icon: Settings, color: "text-emerald-600" },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="bg-card border border-border/60 rounded-xl p-5">
                    <Icon size={20} className={`${color} mb-3`} />
                    <div className="text-2xl font-bold font-serif">{value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border/60 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={() => { setTab("blog"); openCreate(); }}>
                    <Plus size={14} /> New Blog Post
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => setTab("content")}>
                    Edit Site Content
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => setTab("newsletter")}>
                    View Subscribers
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* === BLOG POSTS === */}
          {tab === "blog" && (
            <div>
              {showingForm ? (
                <div>
                  <button
                    onClick={() => { setEditingPost(null); setIsCreatingPost(false); }}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
                  >
                    <ChevronLeft size={15} /> Back to posts
                  </button>
                  <h2 className="font-serif text-xl font-bold mb-6">
                    {editingPost ? "Edit Post" : "New Post"}
                  </h2>
                  <Form {...blogForm}>
                    <form onSubmit={blogForm.handleSubmit(handleSavePost)} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField control={blogForm.control} name="title" render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Title</FormLabel>
                            <FormControl><Input placeholder="Post title..." className="h-11" {...field} data-testid="input-post-title" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={blogForm.control} name="category" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <select className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm" {...field} data-testid="select-post-category">
                                {["Literacy", "Teaching", "Leadership", "Students", "Schools"].map(c => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={blogForm.control} name="tag" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tag / Label</FormLabel>
                            <FormControl>
                              <select className="w-full h-11 px-3 rounded-lg border border-input bg-background text-sm" {...field} data-testid="select-post-tag">
                                {["Featured", "Popular", "Resources", "Leadership", "Story", "General"].map(t => (
                                  <option key={t} value={t}>{t}</option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={blogForm.control} name="readTime" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Read Time</FormLabel>
                            <FormControl><Input placeholder="e.g. 5 min read" className="h-11" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={blogForm.control} name="imageUrl" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL (optional)</FormLabel>
                            <FormControl><Input placeholder="https://..." className="h-11" {...field} data-testid="input-post-image" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={blogForm.control} name="excerpt" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt / Summary</FormLabel>
                          <FormControl><Textarea placeholder="Short description shown on blog listing..." rows={3} className="resize-none" {...field} data-testid="textarea-post-excerpt" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={blogForm.control} name="content" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Content</FormLabel>
                          <p className="text-xs text-muted-foreground -mt-1">Use ## for headings, ### for subheadings, - for bullet points. Separate paragraphs with a blank line.</p>
                          <FormControl><Textarea placeholder="Write the full article here..." rows={16} className="resize-none font-mono text-sm leading-relaxed" {...field} data-testid="textarea-post-content" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={blogForm.control} name="published" render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-4">
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} data-testid="switch-post-published" />
                            </FormControl>
                            <div>
                              <FormLabel className="text-sm font-medium cursor-pointer">
                                {field.value ? "Published — visible to visitors" : "Draft — only visible to you"}
                              </FormLabel>
                            </div>
                          </div>
                        </FormItem>
                      )} />
                      <div className="flex gap-3 pt-2">
                        <Button type="submit" className="gap-2" disabled={createPost.isPending || updatePost.isPending} data-testid="button-save-post">
                          <Save size={15} />
                          {createPost.isPending || updatePost.isPending ? "Saving..." : "Save Post"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => { setEditingPost(null); setIsCreatingPost(false); }}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              ) : (
                <div className="space-y-3">
                  {postsLoading ? (
                    Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)
                  ) : posts?.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                      <BookOpen size={36} className="mx-auto mb-3 opacity-30" />
                      <p className="font-medium">No posts yet</p>
                      <p className="text-sm">Create your first blog post to get started.</p>
                    </div>
                  ) : (
                    posts?.map((post) => (
                      <div
                        key={post.id}
                        className="bg-card border border-border/60 rounded-xl p-5 flex items-start gap-4"
                        data-testid={`post-item-${post.id}`}
                      >
                        {post.imageUrl && (
                          <img src={post.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0 hidden sm:block" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs border-border/60">{post.category}</Badge>
                            {post.published ? (
                              <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium"><Eye size={11} /> Published</span>
                            ) : (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground"><EyeOff size={11} /> Draft</span>
                            )}
                          </div>
                          <h3 className="font-semibold text-sm line-clamp-1">{post.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-lg" onClick={() => openEdit(post)} data-testid={`button-edit-${post.id}`}>
                            <Edit2 size={13} />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-lg text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/5" onClick={() => handleDelete(post.id)} data-testid={`button-delete-${post.id}`}>
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* === SITE CONTENT === */}
          {tab === "content" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-6">
                Edit the text that appears across your website. Changes are saved immediately.
              </p>
              {contentLoading ? (
                Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)
              ) : siteContent?.length === 0 ? (
                <div className="bg-muted/50 rounded-xl p-8 text-center text-muted-foreground text-sm">
                  No content items found. They will appear here once the site generates default content.
                </div>
              ) : (
                siteContent?.map((item) => (
                  <div key={item.key} className="bg-card border border-border/60 rounded-xl p-5" data-testid={`content-item-${item.key}`}>
                    <div className="flex items-center justify-between mb-3">
                      <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">{item.key}</code>
                      {editingContentKey !== item.key && (
                        <Button size="sm" variant="outline" className="h-7 gap-1 text-xs rounded-lg" onClick={() => { setEditingContentKey(item.key); setEditingContentValue(item.value); }} data-testid={`button-edit-content-${item.key}`}>
                          <Edit2 size={11} /> Edit
                        </Button>
                      )}
                    </div>
                    {editingContentKey === item.key ? (
                      <div className="space-y-3">
                        <Textarea
                          value={editingContentValue}
                          onChange={(e) => setEditingContentValue(e.target.value)}
                          rows={4}
                          className="resize-none text-sm"
                          data-testid={`textarea-content-${item.key}`}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" className="gap-1.5 h-8" onClick={() => handleSaveContent(item.key)} disabled={updateContent.isPending} data-testid={`button-save-content-${item.key}`}>
                            <Save size={12} /> {updateContent.isPending ? "Saving..." : "Save"}
                          </Button>
                          <Button size="sm" variant="outline" className="h-8" onClick={() => setEditingContentKey(null)}>
                            <X size={12} />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{item.value}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* === NEWSLETTER === */}
          {tab === "newsletter" && (
            <div className="space-y-4">
              <div className="bg-card border border-border/60 rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="text-primary" size={22} />
                </div>
                <div>
                  <p className="font-semibold text-2xl">{subscribers?.length ?? 0}</p>
                  <p className="text-sm text-muted-foreground">Total subscribers</p>
                </div>
              </div>
              {subsLoading ? (
                Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-xl" />)
              ) : subscribers?.length === 0 ? (
                <div className="bg-muted/50 rounded-xl p-8 text-center text-muted-foreground text-sm">
                  No subscribers yet. Share the newsletter form to get your first signups.
                </div>
              ) : (
                <div className="bg-card border border-border/60 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-muted/30 border-b border-border/60 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    <span>Name</span><span>Email</span><span>Joined</span>
                  </div>
                  <div className="divide-y divide-border/40">
                    {subscribers?.map((sub) => (
                      <div key={sub.id} className="grid grid-cols-3 gap-4 px-5 py-3.5 text-sm items-center" data-testid={`subscriber-${sub.id}`}>
                        <span className="font-medium truncate">{sub.name ?? "—"}</span>
                        <span className="text-muted-foreground truncate">{sub.email}</span>
                        <span className="text-muted-foreground text-xs">
                          {new Date(sub.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
