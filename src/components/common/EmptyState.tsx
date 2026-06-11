import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  icon: ReactNode;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaTo?: string;
}

export function EmptyState({ icon, title, body, ctaLabel, ctaTo }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-secondary/50 px-6 py-20 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-background text-foreground/70">
        {icon}
      </div>
      <h2 className="mt-6 font-display text-2xl">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{body}</p>
      {ctaLabel && ctaTo && (
        <Button asChild className="mt-6 rounded-full px-6">
          <Link to={ctaTo}>{ctaLabel}</Link>
        </Button>
      )}
    </div>
  );
}
