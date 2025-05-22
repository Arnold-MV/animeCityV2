import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col text-xl xl:text-2xl gap-y-4 text-slate-100 font-medium">
      <Link
        href="/"
        className={`nav ${pathname === "/" ? "nav-active text-red-700" : ""}`}
      >
        Inicio
      </Link>
      <div className="flex flex-col  ">
        <span className=" font-light  text-slate-500 ">Categorías</span>
        <div className="flex flex-col gap-y-3 pl-3  pt-1 ">
          <Link
            href="/movies"
            className={`nav ${
              pathname.startsWith("/movies") ? "nav-active text-red-700" : ""
            }`}
          >
            Películas
          </Link>
          <Link
            href="/series"
            className={`nav ${
              pathname.startsWith("/series") ? "nav-active text-red-700" : ""
            }`}
          >
            Series
          </Link>
        </div>
      </div>

      {/* Agregar más enlaces según sea necesario */}
    </nav>
  );
};
