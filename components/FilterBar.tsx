import { SlidersHorizontal } from "lucide-react";

const filters = ["Categoria", "Marca", "Talla", "Precio", "Estado", "Ubicacion"];

export function FilterBar() {
  return (
    <section className="sticky top-0 z-20 border-y border-[color:var(--line)] bg-[color:var(--background)]/95 backdrop-blur">
      <div className="container-shell flex min-h-16 items-center gap-3 overflow-x-auto py-3">
        <button
          className="focus-ring flex h-10 shrink-0 items-center gap-2 bg-[color:var(--ink)] px-4 text-sm font-medium text-white"
          type="button"
        >
          <SlidersHorizontal size={17} />
          Filtros
        </button>
        {filters.map((filter) => (
          <button
            className="focus-ring h-10 shrink-0 border border-[color:var(--line)] bg-white px-4 text-sm text-[color:var(--ink)]"
            key={filter}
            type="button"
          >
            {filter}
          </button>
        ))}
        <select
          className="focus-ring ml-auto h-10 shrink-0 border border-[color:var(--line)] bg-white px-3 text-sm"
          aria-label="Ordenar productos"
          defaultValue="trend"
        >
          <option value="trend">Tendencia</option>
          <option value="new">Recientes</option>
          <option value="price-asc">Menor precio</option>
          <option value="price-desc">Mayor precio</option>
        </select>
      </div>
    </section>
  );
}
