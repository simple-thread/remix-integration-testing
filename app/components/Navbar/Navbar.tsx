import { NavLink } from "remix";

type Props = {};

export function navLinkStyles({ isActive }: { isActive: boolean }) {
  return isActive ? "text-tomato" : undefined;
}

export const Navbar: React.FC<Props> = () => {
  return (
    <nav className="w-full  bg-sand py-3 font-nunito">
      <div className="container mx-auto flex items-center">
        <div className="flex-grow-0">Swolmodoro</div>
        <div className="flex w-full flex-1 justify-end">
          <NavLink to={"/start"} className={navLinkStyles} end>
            Start
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
