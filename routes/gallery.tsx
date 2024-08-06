export default async function Gallery() {
    const images: Array<Deno.DirEntry> = [];
    for await (const dirEntry of Deno.readDir("static/images")) {
        if (dirEntry.isFile) images.push(dirEntry);
    }

    return (
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 m-2">
            {images.map(({ name }) => (
                <div>
                    <img
                        class="h-auto max-w-full rounded-lg"
                        src={`images/${name}`}
                    />
                </div>
            ))}
        </div>
    );
}
