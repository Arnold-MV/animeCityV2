import type { Metadata } from "next";
import "./globals.css";

// Supports weights 100-900
import "@fontsource-variable/asap";

import { SideBar } from "./components/SideBar/SideBar";

export const metadata: Metadata = {
  title: "AnimeCity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="h-screen relative">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

        <div className=" h-screen lg:grid  grid-cols-5">
          <SideBar />

          {/* ste será mi contenido que del lado derecho*/}
          <div className="col-span-4 relative h-full overflow-y-auto  custom-scrollbar">
            <main className=" pb-2.5 ">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
