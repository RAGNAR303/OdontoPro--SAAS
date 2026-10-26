import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";
export function Footer() {
  const date = new Date();

  const redeSocial = [
    {
      href: "#",
      icon: <FaFacebook />,
    },
    {
      href: "#",
      icon: <IoLogoWhatsapp />,
    },
    {
      href: "#",
      icon: <RiInstagramFill />,
    },
    {
      href: "#",
      icon: <SiGmail />,
    },
  ];

  return (
    <footer id="contacts" className="py-6">
      <div className="flex gap-2 items-center justify-center">
        {redeSocial.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className="text-2xl  md:text-3xl text-slate-200  bg-teal-600 hover:bg-teal-500 rounded-full p-2 shadow-xs shadow-black/30 duration-300 transition hover:scale-[1.02]"
          >
            {link.icon}
          </Link>
        ))}
      </div>
      <p className="text-center italic p-3 text-sm">
        Todos direitos reservados @{date.getFullYear()} - Designed bY Thiago
        gonçalves
      </p>
    </footer>
  );
}
