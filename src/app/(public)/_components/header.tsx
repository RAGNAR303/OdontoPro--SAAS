"use client";
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
import Image from "next/image";
import Logo from "../../../../public/logo-odonto.png";
import Avatar from "../../../../public/foto1.png";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { LogIn, LogsIcon, Menu } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { handleRegister } from "@/app/(public)/_actions/login";
export function Header() {
  const [open, setOpen] = useState(false);

  const { data: session, status } = useSession();

  async function handlelogin() {
    await handleRegister("GitHub");
  }

  const link = [
    {
      href: "#clinics",
      label: "Profissionais",
    },
    {
      href: "#contacts",
      label: "Contatos",
    },
  ];

  const Linkscomponents = () => (
    <>
      {link.map((link) => (
        <div key={link.href} className="flex gap-2">
          <Button
            variant={"ghost"}
            onClick={() => setOpen(false)}
            className={"hover:bg-transparent active:bg-transparent"}
          >
            <Link href={link.href} className="font-bold">
              {link.label}
            </Link>
          </Button>
        </div>
      ))}
      {status === "loading" ? (
        <Button className="px-8 bg-teal-600 hover:bg-teal-500 rounded-full font-black ">
          Carregando...
        </Button>
      ) : session ? (
        <Link href={"/dashboard"}>
          <Button className="px-8 bg-teal-600 hover:bg-teal-500 rounded-full font-black ">
            Painel
          </Button>
        </Link>
      ) : (
        <Button
          onClick={handlelogin}
          className="px-8 bg-teal-600 hover:bg-teal-500 rounded-full font-black "
        >
          <LogIn /> Fazer login
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed w-full top-0 z-98 bg-slate-200 shadow-2xs shadow-black/20 px-3 rounded-b-2xl">
      <nav className=" container flex justify-between items-center mx-auto">
        <Link href={"#"}>
          <Image src={Logo} alt="logo-odonto" width={200} />
        </Link>

        <div className="hidden md:flex items-center gap-2 ">
          <Linkscomponents />

          {session && session.user && (
            <Image
              src={session.user?.image!}
              alt="logo-odonto"
              width={40}
              height={40}
              className="rounded-full shadow shadow-black/50"
            />
          )}
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className={"flex md:hidden"}>
            <Menu
              size={30}
              className="hover:bg-slate-50 duration-300 rounded"
            />
          </SheetTrigger>
          <SheetContent
            className={
              "px-4 py-7  flex items-center  md:hidden bg-slate-200 z-99"
            }
          >
            <SheetHeader>
              <div className="flex gap-2 items-center">
                <LogsIcon />
                <p className="font-extrabold text-xl">Menu</p>
              </div>
            </SheetHeader>
            <SheetDescription
              className={"flex items-center justify-center flex-col gap-2"}
            >
              <Image
                src={Avatar}
                alt="logo-odonto"
                width={100}
                className="rounded-full shadow shadow-black/50"
              />
            </SheetDescription>
            <Linkscomponents />
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
