import { Button } from "../../../components/ui/button";
import doctorHero from "../../../../public/doctor-hero.png";
import Image from "next/image";

export function Hero() {
  return (
    <section className="py-20 md:py-0">
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8  pb-4 md:pb-0">
        <main className="flex items-center justify-center">
          <article className="max-w-2xl space-y-6 flex flex-col justify-center text-center md:text-start ">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl ">
              Encontre os melhores profissionais em um único local!
            </h1>
            <p className="text-base lg:text-xl text-zinc-600">
              Nós somos uma plataforma para profissionais da saúde com foco em
              agilizar seu atendimento de forma simplificada e organizada.
            </p>
            <Button className="px-12 py-4 text-xl bg-teal-600 hover:bg-teal-500 rounded-full font-bold md:w-fit duration-300 transition hover:scale-[1.02]  shadow-xs shadow-black/30 border-0 ">
              Profissionais disponíveis
            </Button>
          </article>
          <div className="w-full  relative hidden md:flex">
            <Image
              src={doctorHero}
              alt="doctor-hero"
              priority
              quality={100}
              width={450}
              height={150}
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </main>
      </div>
    </section>
  );
}
