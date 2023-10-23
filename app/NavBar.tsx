'use client';

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();
  // console.log(currentPath);

  const links = [
    { label: 'Dashboard', href: '/'},
    { label: 'Issues', href: '/issues/list'},
    // { label: 'Dashboard', href: '/'},
    // { label: 'Dashboard', href: '/'},
    // { label: 'Dashboard', href: '/'},
  ]
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(link =>
          <Link
            key={link.href}
            className={classNames({
              'text-zinc-900': link.href === currentPath,
              'text-zinc-500': link.href !== currentPath,
              'hover:text-zinc-800 transition-colors': true,
            })}
            // className={`${link.href === currentPath ? "text-zinc-900" : "text-zinc-500"} hover:text-zinc-800 transition-colors`}
            href={link.href}
          >
            {link.label}
          </Link>)
        }   
      </ul>
    </nav>
  );
};

export default NavBar;
