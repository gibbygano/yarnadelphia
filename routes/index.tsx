import Carousel from "../islands/Carousel.tsx";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto">
      <div class="max-w-screen-md text-pretty text-lg mx-auto flex flex-col text-center items-center justify-center">
        <Carousel />
      </div>
    </div>
  );
}
