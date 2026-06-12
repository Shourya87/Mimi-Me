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
import { signUp } from "@/hooks/use-auth";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — Mini & Me" },
      { name: "description", content: "Join Mini & Me to track orders, save your wishlist, and get early access." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await signUp(values.email, values.password, values.fullName);
      setEmailSent(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign up failed";
      if (message.toLowerCase().includes("already registered")) {
        toast.error("An account with that email already exists.", {
          description: "Try signing in instead.",
          action: { label: "Sign in", onClick: () => navigate({ to: "/login" }) },
        });
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <Link to="/" className="mb-8 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5" aria-hidden />
            <span className="font-display text-2xl">Mini &amp; Me</span>
          </Link>
          <div className="rounded-3xl bg-background p-10 ring-1 ring-border">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sage/50">
              <Sparkles className="h-7 w-7 text-foreground" />
            </div>
            <h1 className="font-display text-2xl">Check your inbox</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              We sent a confirmation link to{" "}
              <span className="font-medium text-foreground">{form.getValues("email")}</span>.
              Click the link to activate your account, then sign in.
            </p>
            <Button asChild className="mt-8 h-11 w-full rounded-full">
              <Link to="/login">Go to sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5" aria-hidden />
          <span className="font-display text-2xl">Mini &amp; Me</span>
        </Link>

        <div className="rounded-3xl bg-background p-8 ring-1 ring-border">
          <h1 className="font-display text-2xl">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Join the family — track orders, save your wishlist, and get early access.
          </p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <Label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
                Full name
              </Label>
              <Input
                {...form.register("fullName")}
                placeholder="Amelia Rivers"
                className="h-11 rounded-xl bg-secondary/40"
                autoComplete="name"
              />
              {form.formState.errors.fullName && (
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.fullName.message}</p>
              )}
            </div>

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
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                  className="h-11 rounded-xl bg-secondary/40 pr-11"
                  autoComplete="new-password"
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

            <div>
              <Label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
                Confirm password
              </Label>
              <Input
                type="password"
                {...form.register("confirmPassword")}
                placeholder="••••••••"
                className="h-11 rounded-xl bg-secondary/40"
                autoComplete="new-password"
              />
              {form.formState.errors.confirmPassword && (
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" size="lg" className="h-12 w-full rounded-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-foreground underline underline-offset-2">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
