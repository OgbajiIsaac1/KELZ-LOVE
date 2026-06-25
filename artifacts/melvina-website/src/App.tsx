import { lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Programs = lazy(() => import("@/pages/programs"));
const Impact = lazy(() => import("@/pages/impact"));
const Contact = lazy(() => import("@/pages/contact"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blog-post"));
const Admin = lazy(() => import("@/pages/admin"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/">{() => <AnimatedPage><Home /></AnimatedPage>}</Route>
        <Route path="/about">{() => <AnimatedPage><About /></AnimatedPage>}</Route>
        <Route path="/programs">{() => <AnimatedPage><Programs /></AnimatedPage>}</Route>
        <Route path="/impact">{() => <AnimatedPage><Impact /></AnimatedPage>}</Route>
        <Route path="/contact">{() => <AnimatedPage><Contact /></AnimatedPage>}</Route>
        <Route path="/blog">{() => <AnimatedPage><Blog /></AnimatedPage>}</Route>
        <Route path="/blog/:id">{(params) => <AnimatedPage><BlogPost id={params.id} /></AnimatedPage>}</Route>
        <Route path="/admin">{() => <AnimatedPage><Admin /></AnimatedPage>}</Route>
        <Route>{() => <AnimatedPage><NotFound /></AnimatedPage>}</Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Router />
        </Suspense>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
