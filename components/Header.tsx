export default () => {
    return (
        <header class="border-sky-900 dark:border-sky-500 sticky h-36 top-0 z-[1] bg-gradient-to-r from-blue-400 via-pink-200 to-red-400">
            <div class="max-w-screen grid-cols-5 h-36 flex p-4 bg-[url('/crochet.svg')] bg-no-repeat bg-right bg-contain mix-blend-overlay justify-end items-end">
                <a
                    href="/"
                    class="md:col-start-4 md:col-end-5 col-start-3 col-end-4"
                >
                    <span class="md:text-2xl sm:text-xl font-semibold whitespace-nowrap dark:text-white [text-shadow:_6px_6px_6px_var(--tw-shadow-color)] shadow-indigo-700">
                        YARNADELPHIA
                    </span>
                </a>
            </div>
        </header>
    );
};
