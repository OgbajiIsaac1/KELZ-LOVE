import { useSeo, type SeoProps } from "@/lib/seo";

export function SeoHead(props: SeoProps) {
  useSeo(props);
  return null;
}
