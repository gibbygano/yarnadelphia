import { TbBrandInstagram, TbHeart } from "@preact-icons/tb";

const Footer = () => {
  return (
    <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
      <aside class="grid-flow-col items-center">
        <TbHeart class="text-4xl" />
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
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
