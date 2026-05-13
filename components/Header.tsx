import { Search, ShoppingBag, UserRound } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-[color:var(--line)] bg-[color:var(--background)]">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <a className="font-serif text-2xl font-semibold" href="#">
          De Segunda
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[color:var(--muted)] md:flex">
          <a href="#marketplace">Marketplace</a>
          <a href="#curaduria">Curaduria</a>
          <a href="#vender">Vender</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="focus-ring grid h-10 w-10 place-items-center" aria-label="Buscar" type="button">
            <Search size={20} />
          </button>
          <button className="focus-ring grid h-10 w-10 place-items-center" aria-label="Cuenta" type="button">
            <UserRound size={20} />
          </button>
          <button className="focus-ring grid h-10 w-10 place-items-center bg-[color:var(--ink)] text-white" aria-label="Carrito" type="button">
            <ShoppingBag size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}
