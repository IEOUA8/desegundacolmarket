"use client";

import { LogOut, ReceiptText, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useMarketplaceStore } from "@/store/useMarketplaceStore";

export function AccountButton() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const hydrateCart = useMarketplaceStore((state) => state.hydrateCart);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!cancelled) {
        setEmail(user?.email ?? null);
      }
    }

    loadUser();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
      if (!session) {
        hydrateCart([]);
      }
      router.refresh();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [hydrateCart, router, supabase.auth]);

  async function handleLogout() {
    await supabase.auth.signOut();
    hydrateCart([]);
    setEmail(null);
    router.push("/login");
    router.refresh();
  }

  if (!email) {
    return (
      <Link className="focus-ring grid h-10 w-10 place-items-center" aria-label="Iniciar sesion" href="/login">
        <UserRound size={20} />
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Link
        className="focus-ring grid h-10 w-10 place-items-center"
        aria-label="Mis ordenes"
        href="/account/orders"
      >
        <ReceiptText size={20} />
      </Link>
      <button
        className="focus-ring grid h-10 w-10 place-items-center"
        aria-label={`Cerrar sesion de ${email}`}
        onClick={handleLogout}
        type="button"
      >
        <LogOut size={20} />
      </button>
    </div>
  );
}
