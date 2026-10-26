"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "cn";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PiListBulletsBold } from "react-icons/pi";
import Link from "next/link";
import {
  CalendarCheck,
  FolderBookmark,
  Banknote,
  UserRoundCog,
  House,
  Replace,
} from "lucide-react";
import { FaPowerOff } from "react-icons/fa6";
import Image from "next/image";
import Logo from "../../../../../public/logo-odonto.png";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";

export function SideBarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { update } = useSession();
  const router = useRouter();
  async function handleLogout() {
    await signOut();
    await update();
    router.replace("/");
  }

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex  flex-col justify-between  border-r bg-slate-200 transition-all duration-200 p-4 h-full rounded-r-2xl gap-2.5",
          {
            "w-20 items-center": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          },
        )}
      >
        <Image
          src={Logo}
          alt="logo-ondonto"
          priority
          quality={100}
          className="w-auto h-auto my-5"
        />

        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant={"ghost"}
          className={clsx(
            "w-fit bg-slate-300 text-2xl hover:bg-slate-400 text-slate-900 shadow-2xs shadow-black/20 border-none",
            {
              "self-end": !isCollapsed,
              "self-center": isCollapsed,
            },
          )}
        >
          {isCollapsed ? (
            <TbLayoutSidebarLeftCollapseFilled />
          ) : (
            <TbLayoutSidebarRightCollapseFilled />
          )}
        </Button>
        {!isCollapsed && <span className="font-extrabold">Painel</span>}

        <SidebarLinks
          icon={<CalendarCheck />}
          label="Agendamentos"
          href="/dashboard"
          isCollapsed={isCollapsed}
          pathname={pathname}
        />
        <SidebarLinks
          icon={<FolderBookmark />}
          label="Serviços"
          href="/dashboard/services"
          isCollapsed={isCollapsed}
          pathname={pathname}
        />

        {!isCollapsed && <span className="font-extrabold">Configuração</span>}
        <SidebarLinks
          icon={<Banknote />}
          label="Planos"
          href="/dashboard/plans"
          isCollapsed={isCollapsed}
          pathname={pathname}
        />
        <SidebarLinks
          icon={<UserRoundCog />}
          label="Perfil"
          href="/dashboard/profile"
          isCollapsed={isCollapsed}
          pathname={pathname}
        />

        <div
          className={clsx(
            "mt-20 flex justify-between items-center transition-discrete duration-200",
            {
              "flex-col": isCollapsed,
            },
          )}
        >
          <SidebarLinks
            icon={<House />}
            label="Inicio"
            href="/"
            isCollapsed={isCollapsed}
            pathname={pathname}
          />
          <Button
            variant={"ghost"}
            onClick={handleLogout}
            className={
              " flex text-slate-800 hover:text-red-400 bg-transparent hover:bg-transparent"
            }
          >
            <FaPowerOff size={50} />
            {!isCollapsed && <span className="text-base font-bold">Sair</span>}
          </Button>
        </div>
      </aside>

      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        <header className="md:hidden flex sticky top-0 bg-slate-200 shadow-2xs shadow-black/20 px-3 rounded-b-2xl z-30 ">
          <Sheet>
            <div className="flex items-center gap-2 p-2">
              <SheetTrigger
                className={
                  "p-2 bg-slate-300 rounded-md shadow-2xs shadow-black/20 hover:bg-slate-400/50 duration-200"
                }
                onClick={() => setIsCollapsed(false)}
              >
                <PiListBulletsBold className="text-xl" />
              </SheetTrigger>
              <h1 className="text-base md:text-lg font-semibold flex gap-1">
                Menu
                <p className="font-extrabold">
                  Odonto<span className="text-teal-600">PRO</span>
                </p>
              </h1>
            </div>

            <SheetContent side="left" className={"p-2 bg-slate-200 max-w-xs"}>
              <SheetHeader className="border-b border-slate-400">
                <p className="font-extrabold text-2xl">
                  Odonto<span className="text-teal-600">PRO</span>
                </p>
                <p className="text-slate-700"> Acesse ao serviços aqui</p>
              </SheetHeader>

              <nav className="flex flex-col gap-1 p-2">
                <SidebarLinks
                  icon={<CalendarCheck />}
                  label="Agendamentos"
                  href="/dashboard"
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />
                <SidebarLinks
                  icon={<FolderBookmark />}
                  label="Serviços"
                  href="/dashboard/services"
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />
                <SidebarLinks
                  icon={<Banknote />}
                  label="Planos"
                  href="/dashboard/plans"
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />
                <SidebarLinks
                  icon={<UserRoundCog />}
                  label="Perfil"
                  href="/dashboard/profile"
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />

                <div className="bottom-0 fixed flex  items-center justify-between gap-20 transition-discrete duration-200 ">
                  <SidebarLinks
                    icon={<House />}
                    label="Inicio"
                    href="/"
                    isCollapsed={isCollapsed}
                    pathname={pathname}
                  />
                  <Button
                    variant={"ghost"}
                    onClick={handleLogout}
                    className={
                      " flex text-slate-800 hover:text-red-400 bg-transparent hover:bg-transparent"
                    }
                  >
                    <FaPowerOff />
                    {!isCollapsed && (
                      <span className="text-base font-bold w-20 h-20">
                        Sair
                      </span>
                    )}
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

interface LinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isCollapsed: boolean;
  pathname: string;
}

function SidebarLinks({ href, icon, isCollapsed, label, pathname }: LinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-2 p-2 rounded transition-all transition-discrete ",
        {
          " bg-teal-600 text-slate-100 scale-[1.02] shadow-2xs shadow-black/50":
            pathname === href,
          "hover:bg-slate-300 text-slate-800": pathname !== href,
        },
      )}
    >
      <span>{icon}</span>

      {!isCollapsed && <span className="font-bold">{label}</span>}
    </Link>
  );
}
