// Bonus
function getImageUrl(photo) {
  const fileId =
    photo["files.thumb"]?.id ||
    photo["files.hqFile"]?.id ||
    photo["files.webFile"]?.id;

  if (!fileId) return null;

  return `https://monumenta-backoffice.niovity.com/openaccess/files/floating/data/${fileId}/payload`;
}

export default function Results({ photos, hasSearched }) {
  if (hasSearched && !photos.length) {
    return <p className="status-message">No results found</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {photos.map((photo) => {
        const captionEl =
          photo.caption.find((c) => c.key === "el")?.value || "";
        const photographerName =
          photo.photographer?.name?.find((n) => n.key === "el")?.value || "";
        const date = photo.date_tekmiriosi
          ? new Date(photo.date_tekmiriosi).toLocaleDateString("el-GR")
          : "";
        const imageUrl = getImageUrl(photo);
        return (
          <div
            key={photo.id}
            className="relative w-full h-80 lg:h-90 rounded-xl overflow-hidden shadow-xl border-2 border-transparent hover:border-indigo-600 shadow-indigo-400/40 hover:shadow-indigo-600/40"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={captionEl}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100">
                No Image
              </div>
            )}

            <div className="absolute inset-0 bg-black/40 hover:bg-black/80 text-white p-4 flex flex-col justify-end">
              <ul className="space-y-1">
                <li>
                  <strong>ID:</strong> {photo.id}
                </li>
                <li>
                  <strong>Caption:</strong> {captionEl}
                </li>
                <li>
                  <strong>Date:</strong> {date}
                </li>
                <li>
                  <strong>Photographer:</strong> {photographerName}
                </li>

                <li>
                  <strong>depictedSubject: </strong> {photo.depictedSubject}
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
