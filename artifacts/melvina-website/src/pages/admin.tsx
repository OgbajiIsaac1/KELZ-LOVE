import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { SeoHead } from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/RichTextEditor";
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
  useListContactSubmissions,
  useMarkContactRead,
  getListBlogPostsQueryKey,
  getListNewsletterSubscribersQueryKey,
  getListSiteContentQueryKey,
  getAdminMeQueryKey,
  getListContactSubmissionsQueryKey,
  BlogPost,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  BookOpen, Settings, LogOut, Plus, Edit2, Trash2, Save, X,
  Mail, Eye, EyeOff, ChevronLeft, BarChart2, MessageSquare, CheckCheck, Circle,
} from "lucide-react";

type Tab = "dashboard" | "blog" | "content" | "newsletter" | "messages";

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
  const [showNewContent, setShowNewContent] = useState(false);
  const [newContentKey, setNewContentKey] = useState("");
  const [newContentValue, setNewContentValue] = useState("");
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);
  const [loginError, setLoginError] = useState("");

  const qc = useQueryClient();
  const { data: session, isLoading: sessionLoading } = useAdminMe({
    query: { queryKey: getAdminMeQueryKey() },
  });
  const login = useAdminLogin();
  const logout = useAdminLogout();

  const isAuthed = session?.authenticated === true;

  const { data: posts, isLoading: postsLoading } = useListBlogPosts(
    { all: "true" },
    { query: { enabled: isAuthed, queryKey: getListBlogPostsQueryKey({ all: "true" }) } }
  );
  const { data: subscribers, isLoading: subsLoading } = useListNewsletterSubscribers({
    query: { enabled: isAuthed, queryKey: getListNewsletterSubscribersQueryKey() },
  });
  const { data: siteContent, isLoading: contentLoading } = useListSiteContent({
    query: { enabled: isAuthed, queryKey: getListSiteContentQueryKey() },
  });
  const { data: messages, isLoading: messagesLoading } = useListContactSubmissions({
    query: { enabled: isAuthed, queryKey: getListContactSubmissionsQueryKey() },
  });

  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();
  const updateContent = useUpdateSiteContent();
  const markRead = useMarkContactRead();

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
    logout.mutate(undefined, {
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

  const handleCreateContent = () => {
    if (!newContentKey.trim()) return;
    updateContent.mutate(
      { key: newContentKey.trim(), data: { value: newContentValue } },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getListSiteContentQueryKey() });
          setShowNewContent(false);
          setNewContentKey("");
          setNewContentValue("");
        },
      }
    );
  };

  const handleMarkRead = (id: number) => {
    markRead.mutate(
      { id },
      { onSuccess: () => qc.invalidateQueries({ queryKey: getListContactSubmissionsQueryKey() }) }
    );
  };

  const unreadCount = messages?.filter((m) => !m.read).length ?? 0;

  const tabs: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: BarChart2 },
    { id: "blog", label: "Blog Posts", icon: BookOpen },
    { id: "content", label: "Site Content", icon: Settings },
    { id: "newsletter", label: "Newsletter", icon: Mail },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: unreadCount },
  ];

  if (sessionLoading) {
    return (
      <>
        <SeoHead title="Admin" noindex />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="space-y-3">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
        </div>
      </>
    );
  }

  if (!session?.authenticated) {
    return (
      <>
        <SeoHead title="Admin — Login" noindex />
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
                Contact the site administrator if you don't have access.
              </p>
          </div>
          <div className="text-center mt-6">
            <button onClick={() => setLocation("/")} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
              <ChevronLeft size={14} /> Back to site
            </button>
          </div>
        </div>
      </div>
    </>
    );
  }

  const showingForm = isCreatingPost || editingPost !== null;

  return (
    <>
      <SeoHead title="Admin" noindex />
      <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-60 bg-card border-r border-border flex-col shrink-0 hidden md:flex">
        <div className="p-6 border-b border-border">
          <h2 className="font-serif font-bold text-primary text-lg leading-tight">Melvina CMS</h2>
          <p className="text-xs text-accent font-semibold tracking-widest uppercase">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(({ id, label, icon: Icon, badge }) => (
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
              <span className="flex-1 text-left">{label}</span>
              {badge != null && badge > 0 && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                  tab === id ? "bg-primary-foreground/20 text-primary-foreground" : "bg-destructive text-destructive-foreground"
                }`}>
                  {badge}
                </span>
              )}
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

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex">
        {tabs.map(({ id, icon: Icon, badge }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex flex-col items-center py-3 gap-0.5 text-xs transition-colors relative ${
              tab === id ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon size={18} />
            {badge != null && badge > 0 && (
              <span className="absolute top-1.5 right-1/4 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-16 md:pb-0">
        {/* Top bar */}
        <div className="border-b border-border bg-card/80 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <h1 className="font-semibold text-foreground flex items-center gap-2">
            {tabs.find(t => t.id === tab)?.label}
            {tab === "messages" && unreadCount > 0 && (
              <span className="text-xs bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full font-bold">
                {unreadCount} unread
              </span>
            )}
          </h1>
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
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: "Published Posts", value: posts?.filter(p => p.published).length ?? "—", icon: BookOpen, color: "text-primary" },
                  { label: "Drafts", value: posts?.filter(p => !p.published).length ?? "—", icon: EyeOff, color: "text-muted-foreground" },
                  { label: "Subscribers", value: subscribers?.length ?? "—", icon: Mail, color: "text-accent-foreground" },
                  { label: "Content Items", value: siteContent?.length ?? "—", icon: Settings, color: "text-emerald-600" },
                  { label: "Unread Messages", value: unreadCount, icon: MessageSquare, color: unreadCount > 0 ? "text-destructive" : "text-muted-foreground" },
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
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => setTab("messages")}>
                    View Messages {unreadCount > 0 && `(${unreadCount} unread)`}
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
                          <FormControl>
                            <RichTextEditor
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Write the full article here…"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={blogForm.control} name="published" render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-4">
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} data-testid="switch-post-published" />
                            </FormControl>
                            <FormLabel className="text-sm font-medium cursor-pointer">
                              {field.value ? "Published — visible to visitors" : "Draft — only visible to you"}
                            </FormLabel>
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
                    </div>
                  ) : (
                    posts?.map((post) => (
                      <div key={post.id} className="bg-card border border-border/60 rounded-xl p-5 flex items-start gap-4" data-testid={`post-item-${post.id}`}>
                        {post.imageUrl && (
                          <img src={post.imageUrl} alt="" loading="lazy" className="w-16 h-16 rounded-lg object-cover shrink-0 hidden sm:block" />
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
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">Edit the text that appears across your website.</p>
                <Button size="sm" variant="outline" className="rounded-full gap-1.5" onClick={() => { setShowNewContent(!showNewContent); setNewContentKey(""); setNewContentValue(""); }}>
                  <Plus size={14} /> New Content
                </Button>
              </div>

              {showNewContent && (
                <div className="bg-card border border-border/60 rounded-xl p-5 space-y-3">
                  <Input
                    placeholder="Content key (e.g. hero_title)"
                    value={newContentKey}
                    onChange={(e) => setNewContentKey(e.target.value)}
                    className="h-10 text-sm font-mono"
                  />
                  <Textarea
                    placeholder="Content value"
                    value={newContentValue}
                    onChange={(e) => setNewContentValue(e.target.value)}
                    rows={4}
                    className="resize-none text-sm"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="gap-1.5 h-8" onClick={handleCreateContent} disabled={updateContent.isPending || !newContentKey.trim()}>
                      <Save size={12} /> {updateContent.isPending ? "Saving..." : "Create"}
                    </Button>
                    <Button size="sm" variant="outline" className="h-8" onClick={() => setShowNewContent(false)}>
                      <X size={12} />
                    </Button>
                  </div>
                </div>
              )}

              {contentLoading ? (
                Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)
              ) : siteContent?.length === 0 ? (
                <div className="bg-muted/50 rounded-xl p-8 text-center text-muted-foreground text-sm">
                  No content items found. Click "New Content" to add one.
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
                        <Textarea value={editingContentValue} onChange={(e) => setEditingContentValue(e.target.value)} rows={4} className="resize-none text-sm" data-testid={`textarea-content-${item.key}`} />
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
                  No subscribers yet.
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

          {/* === MESSAGES === */}
          {tab === "messages" && (
            <div className="space-y-3">
              {messagesLoading ? (
                Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)
              ) : messages?.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <MessageSquare size={36} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No messages yet</p>
                  <p className="text-sm mt-1">Messages from your contact form will appear here.</p>
                </div>
              ) : (
                messages?.map((msg) => {
                  const isExpanded = expandedMessage === msg.id;
                  return (
                    <div
                      key={msg.id}
                      className={`bg-card border rounded-xl overflow-hidden transition-all duration-200 ${
                        !msg.read ? "border-primary/30 shadow-sm" : "border-border/60"
                      }`}
                      data-testid={`message-${msg.id}`}
                    >
                      <div
                        className="p-5 cursor-pointer"
                        onClick={() => setExpandedMessage(isExpanded ? null : msg.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0">
                            {msg.read ? (
                              <CheckCheck size={16} className="text-muted-foreground" />
                            ) : (
                              <Circle size={16} className="text-primary fill-primary" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                              <div className="flex items-center gap-2">
                                <span className={`font-semibold text-sm ${!msg.read ? "text-foreground" : "text-muted-foreground"}`}>
                                  {msg.name}
                                </span>
                                <span className="text-xs text-muted-foreground">{msg.email}</span>
                                {!msg.read && (
                                  <Badge className="text-[10px] bg-primary/10 text-primary border-0 font-semibold px-1.5 py-0">New</Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground shrink-0">
                                {new Date(msg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            <p className={`text-sm mt-1 ${isExpanded ? "" : "line-clamp-2"} ${!msg.read ? "text-foreground/80" : "text-muted-foreground"}`}>
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-0 border-t border-border/50 mt-0">
                          <div className="bg-muted/40 rounded-lg p-4 mt-3 mb-4">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                          </div>
                          <div className="flex gap-3 flex-wrap">
                            <a href={`mailto:${msg.email}?subject=Re: Your message to Melvina Igboanugo`}>
                              <Button size="sm" className="rounded-full gap-1.5 h-8">
                                <Mail size={13} /> Reply via Email
                              </Button>
                            </a>
                            {!msg.read && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-full gap-1.5 h-8"
                                onClick={() => handleMarkRead(msg.id)}
                                disabled={markRead.isPending}
                                data-testid={`button-mark-read-${msg.id}`}
                              >
                                <CheckCheck size={13} /> Mark as Read
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

        </div>
      </main>
    </div>
    </>
  );
}
