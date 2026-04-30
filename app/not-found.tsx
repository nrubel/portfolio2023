import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-cyan-500/3 blur-[100px]" />
      </div>

      <div className="relative z-10 space-y-6">
        <div className="font-mono text-8xl font-bold gradient-text">404</div>
        <div className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">ERROR:</span> Route not found in
          filesystem
        </div>
        <p className="text-muted-foreground max-w-sm">
          This page doesn&apos;t exist. Maybe it was moved, deleted, or never
          existed in the first place.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
