"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { logout } from "@/redux/user/userSlice";
import { useAppDispatch } from "@/redux/store";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const pathname = usePathname();
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigation = [
    { name: "Home", href: "/", current: pathname === "/" },
    { name: "Products", href: "/products", current: pathname === "/products" },
    { name: "About", href: "/about-us", current: pathname === "/about-us" },
    { name: "Contact", href: "/contact", current: pathname === "/contact" },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Disclosure
      as="nav"
      className="bg-secondary shadow-sm shadow-secondary px-4 fixed top-0 w-full z-50"
    >
      <div className="flex justify-center max-w-full px-2 md:px-6 lg:px-8">
        <div className="relative w-full flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-between">
            <Link
              href="/"
              className="hidden md:flex flex-shrink-0 items-center"
            >
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </Link>
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-primary text-white"
                        : "text-primary hover:bg-primary hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <form className="flex items-center mr-5">
              <input
                type="text"
                placeholder="Search"
                className="w-2/3 sm:w-11/12 lg:w-full bg-transparent border-b border-primary text-primary outline-none"
              />
            </form>
          </div>
          <div className="absolute inset-y-0 right-0 flex gap-3 items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-secondary p-1 text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <Link
              href="/cart"
              className="relative rounded-full bg-secondary p-1 text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
            </Link>

            {/* Profile dropdown */}
            {!currentUser ? (
              <Link href="/auth/log-in">
                <button className="border px-2 py-1 bg-primary text-white rounded-lg border-primary hover:bg-transparent hover:text-primary">
                  Log In
                </button>
              </Link>
            ) : (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {currentUser.profilePicture ? (
                      <img
                        src={currentUser.profilePicture}
                        className="h-8 w-8 rounded-full"
                        alt="avatar"
                      />
                    ) : (
                      <img
                        src="default-avatar.jpg"
                        alt="avatar"
                        className="h-8 w-8 rounded-full"
                      />
                    )}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-secondary py-1 shadow-lg ring-1 ring-primary ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-primary data-[focus]:bg-primary data-[focus]:text-white"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-primary data-[focus]:bg-primary data-[focus]:text-white"
                    >
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-start block px-4 py-2 text-sm text-primary data-[focus]:bg-primary data-[focus]:text-white"
                    >
                      Log out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>
      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-primary hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              <Link href={item.href}>{item.name}</Link>
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
