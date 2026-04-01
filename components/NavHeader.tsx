import { asset } from "fresh/runtime";
import { CartMenu } from "@/islands/CartMenu.tsx";

interface props {
  isHomepage?: boolean;
}

const NavHeader = ({ isHomepage = false }: props) => {
  const headerImg = asset("/header.svg");

  return (
    <header class="sticky">
      <div class="navbar bg-base-100 shadow-sm">
        <div class="navbar-start" />
        <div class="navbar-center">
          <a class="btn btn-ghost h-full" href="/">
            <img width={231} height={114} src={headerImg} />
          </a>
        </div>
        <div class="navbar-end">{!isHomepage && <CartMenu />}</div>
      </div>
    </header>
  );
};

export { NavHeader };
