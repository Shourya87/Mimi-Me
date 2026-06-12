import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, resetPassword } from "@/hooks/use-auth";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormValues = z.infer<typeof schema>;

const searchSchema = z.object({
  next: z.string().optional(),
  reset: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in — Mini & Me" },
      { name: "description", content: "Sign in to your Mini & Me account to manage orders, wishlist, and profile." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await signIn(values.email, values.password);
      toast.success("Welcome back!");
      navigate({ to: next ?? "/account" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign in failed";
      toast.error(message.includes("Invalid login") ? "Incorrect email or password." : message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetLoading(true);
    try {
      await resetPassword(resetEmail);
      toast.success("Reset link sent", { description: `Check your inbox at ${resetEmail}.` });
      setResetMode(false);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to send reset link.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5" aria-hidden />
          <span className="font-display text-2xl">Mini &amp; Me</span>
        </Link>

        <div className="rounded-3xl bg-background p-8 ring-1 ring-border">
          {resetMode ? (
            <>
              <h1 className="font-display text-2xl">Reset your password</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your email and we'll send a link to reset your password.
              </p>
              <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
                <div>
                  <Label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-11 rounded-xl bg-secondary/40"
                  />
                </div>
                <Button type="submit" className="h-11 w-full rounded-full" disabled={resetLoading}>
                  {resetLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send reset link
                </Button>
                <button
                  type="button"
                  onClick={() => setResetMode(false)}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
                >
                  Back to sign in
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl">Welcome back</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to your account to manage orders and saved items.
              </p>

              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div>
                  <Label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    type="email"
                    {...form.register("email")}
                    placeholder="you@example.com"
                    className="h-11 rounded-xl bg-secondary/40"
                    autoComplete="email"
                  />
                  {form.formState.errors.email && (
                    <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...form.register("password")}
                      placeholder="••••••••"
                      className="h-11 rounded-xl bg-secondary/40 pr-11"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setResetMode(true)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" size="lg" className="h-12 w-full rounded-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign in
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                New to Mini &amp; Me?{" "}
                <Link to="/signup" className="font-medium text-foreground underline underline-offset-2">
                  Create an account
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
