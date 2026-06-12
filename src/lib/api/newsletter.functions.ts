import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email(), source: z.string().optional() }))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("newsletter_subs")
      .upsert(
        { email: data.email, source: data.source ?? "homepage" },
        { onConflict: "email", ignoreDuplicates: true },
      );

    if (error) {
      console.error("[subscribeNewsletter] Supabase error:", error);
      throw new Error("Failed to subscribe. Please try again.");
    }

    return { success: true };
  });
