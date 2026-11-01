"use client";

import { useEffect } from "react";
import { sitePath } from "@/lib/selected-portfolio/content";

export function ProjectDetailRedirect({
  id,
  homePath = "/",
}: {
  id: string;
  homePath?: string;
}) {
  useEffect(() => {
    window.location.replace(`${sitePath(homePath)}#project/${id}/details`);
  }, [id, homePath]);
  return null;
}
