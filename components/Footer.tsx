import { TbBrandInstagram, TbHeart } from "@preact-icons/tb";

const Footer = () => {
  return (
    <footer class="flex flex-row footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4 w-full">
      <aside class="grid-flow-col items-center">
        <TbHeart class="text-4xl" />
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>
      <nav class="grid-flow-col gap-4 ml-auto">
        <a
          href="https://www.instagram.com/yarnadelphia/"
          target="_blank"
          rel="noreferrer"
        >
          <TbBrandInstagram class="text-4xl" />
        </a>
      </nav>
    </footer>
  );
};

export { Footer };
