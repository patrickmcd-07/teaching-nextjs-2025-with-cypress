import { getDb } from "@/lib/db";
import Link from "next/link";

function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${`${seconds}`.padStart(2, "0")}`;
}

export default async function AlbumDetail({
  params,
}: {
  params: { id: string };
}) {
  const db = getDb();
  const albumId = Number(params.id);

  if (Number.isNaN(albumId)) {
    return (
      <main className="p-6">
        <p>Invalid Album id</p>
        <Link href="/" data-cy="back-home" className="link">
          Back to home
        </Link>
      </main>
    );
  }

  const album = await db
    .selectFrom("albums")
    .innerJoin("authors", "authors.id", "albums.author_id")
    .select([
      "albums.id",
      "albums.name",
      "albums.release_date",
      "authors.name as author_name",
      "authors.id as author_id",
    ])
    .where("albums.id", "=", albumId)
    .executeTakeFirst();

  if (!album) {
    return (
      <main className="p-6">
        <p>Album not found</p>
        <Link href="/" data-cy="back-home" className="link">
          Back to home
        </Link>
      </main>
    );
  }

  const songs = await db
    .selectFrom("songs")
    .selectAll()
    .where("album_id", "=", albumId)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[24px] row-start-2 w-full max-w-3xl">
        <h1 data-cy="album-detail-title" className="text-3xl font-bold">
          {album.name}
        </h1>

        <div className="text-lg">
          by{" "}
          <Link
            href={`/author/${album.author_id}`}
            data-cy="album-detail-author-link"
            className="link"
          >
            {album.author_name}
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, i) => (
                <tr key={song.id}>
                  <td>{i + 1}</td>
                  <td>{song.name}</td>
                  <td>{formatDuration(song.duration)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <Link href="/" data-cy="back-home" className="link">
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
