import { Component } from "solid-js";
import { A, useLocation } from "@solidjs/router";

const NavBar: Component = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav class="fixed bottom-0 left-0 right-0 border-t-2 border-primary bg-[#0D1117] flex justify-around items-center h-16 z-50">
      <A
        href="/"
        class="flex flex-col items-center justify-center gap-1 py-1 px-3 transition-transform"
        classList={{ "scale-115 text-primary": isActive("/"), "text-gray-500": !isActive("/") }}
      >
        <span class="text-lg">🏠</span>
        <span class="font-pixel text-[8px]">Home</span>
      </A>
      <A
        href="/history"
        class="flex flex-col items-center justify-center gap-1 py-1 px-3 transition-transform"
        classList={{ "scale-115 text-primary": isActive("/history"), "text-gray-500": !isActive("/history") }}
      >
        <span class="text-lg">📋</span>
        <span class="font-pixel text-[8px]">History</span>
      </A>
      <A
        href="/achievements"
        class="flex flex-col items-center justify-center gap-1 py-1 px-3 transition-transform"
        classList={{ "scale-115 text-primary": isActive("/achievements"), "text-gray-500": !isActive("/achievements") }}
      >
        <span class="text-lg">🏆</span>
        <span class="font-pixel text-[8px]">Achieve</span>
      </A>
      <A
        href="/report"
        class="flex flex-col items-center justify-center gap-1 py-1 px-3 transition-transform"
        classList={{ "scale-115 text-primary": isActive("/report"), "text-gray-500": !isActive("/report") }}
      >
        <span class="text-lg">📊</span>
        <span class="font-pixel text-[8px]">Report</span>
      </A>
    </nav>
  );
};

export default NavBar;
