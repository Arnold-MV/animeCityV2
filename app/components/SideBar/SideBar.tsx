"use client";
import { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { NavBar } from "../Navbar/NavBar";

export const SideBar = () => {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    setIsClient(true); // Solo se activa en el cliente
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      setAnimClass("menu-exit");
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    } else {
      setIsOpen(true);
      setAnimClass("menu-enter");
    }
  };

  return (
    <>
      {/* Botón mobile */}
      <button
        onClick={toggleMenu}
        className={`lg:hidden fixed top-4 right-4 z-50 border-2 border-gray-500 hover:bg-gray-700 transition-all text-white p-2 rounded ${
          isOpen ? "bg-gray-700" : "bg-gray-600"
        }`}
      >
        {isOpen ? (
          <svg
            className="block size-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z"
            />
          </svg>
        ) : (
          <svg
            className="block size-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex col-span-1 flex-col h-full justify-between items-center px-4 pb-2.5 pt-9 gap-y-4">
        <div className="flex flex-col gap-y-10 items-center">
          <Header />
          <NavBar />
        </div>
        <Footer />
      </div>

      {/* Mobile Sidebar (sólo después del montaje en cliente) */}
      {isClient && isOpen && (
        <div
          className={`
            lg:hidden
            fixed top-0 left-0 h-screen  z-40 bg-black
            flex flex-col justify-between items-center px-4 pb-2.5 pt-9 gap-y-4
            ${animClass}
          `}
        >
          <div className="flex flex-col gap-y-10 items-center">
            <Header />
            <NavBar />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
