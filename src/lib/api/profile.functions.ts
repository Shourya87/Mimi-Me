import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const updateProfileSchema = z.object({
  userId: z.string().uuid(),
  fullName: z.string().min(1).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
});

export const updateProfile = createServerFn({ method: "POST" })
  .inputValidator(updateProfileSchema)
  .handler(async ({ data }) => {
    const { userId, ...fields } = data;

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({
        full_name: fields.fullName,
        phone: fields.phone,
        address: fields.address,
        city: fields.city,
        zip: fields.zip,
        country: fields.country,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("[updateProfile] Supabase error:", error);
      throw new Error("Failed to update profile.");
    }

    return { success: true };
  });

const getProfileSchema = z.object({
  userId: z.string().uuid(),
});

export const getProfile = createServerFn({ method: "POST" })
  .inputValidator(getProfileSchema)
  .handler(async ({ data }) => {
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", data.userId)
      .single();

    if (error) {
      console.error("[getProfile] Supabase error:", error);
      return null;
    }

    return profile;
  });
