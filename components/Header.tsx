import { Search, UserRound } from "lucide-react";
import Link from "next/link";
import { CartButton } from "@/components/CartButton";

export function Header() {
  return (
    <header className="border-b border-[color:var(--line)] bg-[color:var(--background)]">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link className="font-serif text-2xl font-semibold" href="/">
          De Segunda
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[color:var(--muted)] md:flex">
          <Link href="/shop">Marketplace</Link>
          <Link href="/#curaduria">Curaduria</Link>
          <Link href="/#vender">Vender</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button className="focus-ring grid h-10 w-10 place-items-center" aria-label="Buscar" type="button">
            <Search size={20} />
          </button>
          <button className="focus-ring grid h-10 w-10 place-items-center" aria-label="Cuenta" type="button">
            <UserRound size={20} />
          </button>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
