import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export class AuthRequiredError extends Error {
  constructor() {
    super("Authentication is required.");
  }
}

export async function getAuthenticatedAppUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ supabaseAuthId: user.id }, { email: user.email }]
    }
  });

  if (existingUser) {
    return prisma.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        supabaseAuthId: user.id,
        email: user.email,
        name:
          existingUser.name ??
          user.user_metadata.full_name ??
          user.user_metadata.name ??
          user.email.split("@")[0]
      }
    });
  }

  return prisma.user.create({
    data: {
      supabaseAuthId: user.id,
      email: user.email,
      name: user.user_metadata.full_name ?? user.user_metadata.name ?? user.email.split("@")[0]
    }
  });
}
