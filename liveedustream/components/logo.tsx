import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Noto_Serif_Georgian } from "next/font/google";

import { cn } from "@/lib/utils";

const headingFont = Noto_Serif_Georgian({ subsets: ["latin"] });

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          src="/les.svg"
          alt="Logo"
          height={30}
          width={30}
        />
        <p className={cn(
          "text-lg text-neutral-700 pb-1",
          headingFont.className,
        )}>
          LiveEduStream
        </p>
      </div>
    </Link>
  );
};