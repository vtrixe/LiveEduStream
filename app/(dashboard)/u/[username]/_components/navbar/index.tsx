import { Logo } from "./logo";
import { Actions } from "./actions";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg bg-yellow-300 px-2 lg:px-4 flex justify-between items-center shadow-sm text-black">
      <Logo />
      <Actions />
    </nav>
  );
};