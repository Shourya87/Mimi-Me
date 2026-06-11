import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Required"),
  message: z.string().min(10, "Tell us a little more"),
});
type Values = z.infer<typeof schema>;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mini & Me" },
      {
        name: "description",
        content: "Get in touch with our small team — we reply within 24 hours, Monday to Friday.",
      },
      { property: "og:title", content: "Contact — Mini & Me" },
      {
        property: "og:description",
        content: "Questions, kind words, custom requests — we'd love to hear from you.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const form = useForm<Values>({ resolver: zodResolver(schema) });
  const onSubmit = (v: Values) => {
    toast.success("Message sent", { description: `We'll get back to you at ${v.email} soon.` });
    form.reset();
  };

  return (
    <>
      <section className="container-page py-12 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">We'd love to hear from you.</h1>
          <p className="mt-3 text-muted-foreground">
            Whether it's a question, a kind word, or a custom request — write to us.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-[2fr_1fr]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-3xl bg-background p-8 ring-1 ring-border">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Name</Label>
                <Input {...form.register("name")} className="h-11 rounded-xl" />
                {form.formState.errors.name && <p className="mt-1 text-xs text-destructive">{form.formState.errors.name.message}</p>}
              </div>
              <div>
                <Label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Email</Label>
                <Input {...form.register("email")} className="h-11 rounded-xl" />
                {form.formState.errors.email && <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p>}
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Subject</Label>
              <Input {...form.register("subject")} className="h-11 rounded-xl" />
              {form.formState.errors.subject && <p className="mt-1 text-xs text-destructive">{form.formState.errors.subject.message}</p>}
            </div>
            <div>
              <Label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Message</Label>
              <Textarea {...form.register("message")} rows={6} className="rounded-xl" />
              {form.formState.errors.message && <p className="mt-1 text-xs text-destructive">{form.formState.errors.message.message}</p>}
            </div>
            <Button type="submit" size="lg" className="h-12 w-full rounded-full">Send message</Button>
          </form>

          <aside className="space-y-4">
            {[
              { icon: Mail, t: "Email", v: "hello@miniandme.co" },
              { icon: Phone, t: "Phone", v: "+1 (555) 010-2025" },
              { icon: MessageCircle, t: "Live chat", v: "Mon–Fri, 9–5 EST" },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl bg-secondary/60 p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background">
                  <c.icon className="h-4 w-4" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{c.t}</p>
                <p className="mt-1 text-sm font-medium">{c.v}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>
      <FaqAccordion />
    </>
  );
}
