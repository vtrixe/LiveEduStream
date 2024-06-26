import { Logo } from "./logo";
import { Actions } from "./actions";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-white px-2 lg:px-4 flex justify-between items-center shadow-sm border border-[#2D2E35]">
      <Logo />
      <Actions />
    </nav>
  );
};
