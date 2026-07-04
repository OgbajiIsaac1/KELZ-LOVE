import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/SeoHead";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <SeoHead title="Page Not Found" noindex />
      <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold font-serif text-primary mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button className="rounded-full gap-2">
              <ArrowLeft size={16} /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
    </>
  );
}
