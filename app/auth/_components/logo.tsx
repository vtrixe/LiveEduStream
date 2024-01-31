import Image from "next/image";
import { Noto_Sans_Georgian } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Noto_Sans_Georgian({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image
          src="/les.svg"
          alt="Gamehub"
          height="80"
          width="80"
        />
      </div>
      <div className={cn(
        "flex flex-col items-center",
        font.className,
      )}>
        <p className="text-xl font-semibold">
     LiveEduStream
        </p>
        <p className="text-sm text-muted-foreground">
          Educational Streaming from the future
        </p>
      </div>
    </div>
  );
};