"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? "bg-gray-900 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white";
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-4">
          <Link
            href="/"
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
              "/"
            )}`}
          >
            Main
          </Link>
          <Link
            href="/red"
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
              "/red"
            )}`}
          >
            Red
          </Link>
          <Link
            href="/green"
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
              "/green"
            )}`}
          >
            Green
          </Link>
          <Link
            href="/blue"
            className={`px-3 py-2 rounded-md text-sm font-medium ${isActive(
              "/blue"
            )}`}
          >
            Blue
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
