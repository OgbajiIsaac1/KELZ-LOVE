import { useListSiteContent } from "@workspace/api-client-react";
import { useMemo } from "react";

export function useSiteContent() {
  const { data, isLoading } = useListSiteContent();

  const contentMap = useMemo(() => {
    const map = new Map<string, string>();
    if (data) {
      for (const item of data) {
        map.set(item.key, item.value);
      }
    }
    return map;
  }, [data]);

  const getContent = (key: string, fallback: string): string => {
    return contentMap.get(key) ?? fallback;
  };

  return { getContent, isLoading };
}
