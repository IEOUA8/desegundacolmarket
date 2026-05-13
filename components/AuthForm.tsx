"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/cart";
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({
            email,
            password
          })
        : await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
              data: {
                name
              }
            }
          });

    setPending(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (mode === "register" && !result.data.session) {
      setMessage("Revisa tu correo para confirmar la cuenta antes de iniciar sesion.");
      return;
    }

    router.push(nextPath as Route);
    router.refresh();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {mode === "register" ? (
        <label className="block text-sm font-medium">
          Nombre
          <input
            className="focus-ring mt-2 h-11 w-full border border-[color:var(--line)] px-3"
            onChange={(event) => setName(event.target.value)}
            type="text"
            value={name}
          />
        </label>
      ) : null}
      <label className="block text-sm font-medium">
        Email
        <input
          className="focus-ring mt-2 h-11 w-full border border-[color:var(--line)] px-3"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
      </label>
      <label className="block text-sm font-medium">
        Password
        <input
          className="focus-ring mt-2 h-11 w-full border border-[color:var(--line)] px-3"
          minLength={6}
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
      </label>
      <button
        className="focus-ring h-12 w-full bg-[color:var(--ink)] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled={pending}
        type="submit"
      >
        {pending ? "Procesando" : mode === "login" ? "Iniciar sesion" : "Crear cuenta"}
      </button>
      {message ? <p className="text-sm text-[color:var(--accent)]">{message}</p> : null}
    </form>
  );
}
