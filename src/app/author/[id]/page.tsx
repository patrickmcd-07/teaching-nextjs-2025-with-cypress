import { getDb } from "@/lib/db";
import Link from "next/link";

export default async function AuthorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const db = getDb();

  const authorId = Number(params.id);
  if (Number.isNaN(authorId)) {
    return (
      <main className="p-6">
        <p>Invalid Author id</p>
        <Link href="/" data-cy="back-home" className="link">Back to home</Link>
      </main>
    );
  }

  const author = await db
    .selectFrom("authors")
    .selectAll()
    .where("id", "=", authorId)
    .executeTakeFirst();

  if (!author) {
    return (
      <main className="p-6">
        <p>Author not found</p>
        <Link href="/" data-cy="back-home" className="link">Back to home</Link>
      </main>
    );
  }

  const albums = await db
    .selectFrom("albums")
    .selectAll()
    .where("author_id", "=", author.id)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[24px] row-start-2 w-full max-w-3xl">
        <h1 data-cy="author-name" className="text-3xl font-bold">
          {author.name}
        </h1>

        <p className="mb-4">Bio: {author.bio}</p>

        <section>
          <h2 className="text-xl font-semibold mb-2">Albums</h2>
          <ul className="list-disc pl-6">
            {albums.map((album) => (
              <li key={album.id}>
                <Link href={`/album/${album.id}`} className="link">
                  {album.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6">
          <Link href="/" data-cy="back-home" className="link">
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
