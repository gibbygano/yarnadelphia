import { asset } from "fresh/runtime";
import { CartMenu } from "@/islands/CartMenu.tsx";

const NavHeader = () => {
  const headerImg = asset("/header.svg");

  return (
    <header class="sticky">
      <div class="navbar bg-base-100 shadow-sm">
        <div class="navbar-start" />
        <div class="navbar-center">
          <a class="btn btn-ghost h-full" href="/">
            <img src={headerImg} />
          </a>
        </div>
        <div class="navbar-end">
          <CartMenu />
        </div>
      </div>
    </header>
  );
};

export { NavHeader };
