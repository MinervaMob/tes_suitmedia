export default function PostCard({ post }) {
  const { title, published_at, small_image, medium_image } = post;

  const date = new Date(published_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imageObj =
    Array.isArray(small_image) && small_image.length > 0
      ? small_image[0]
      : Array.isArray(medium_image) && medium_image.length > 0
      ? medium_image[0]
      : null;

  const imageUrl = imageObj?.url;

  return (
    <div className="rounded shadow p-4">
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        className="w-full aspect-[3/2] object-cover rounded"
        onError={(e) => {
          e.target.src = '/fallback.jpg'; 
        }}
      />
      <p className="text-xs text-gray-500 mt-2">{date}</p>
      <h3 className="text-sm font-semibold mt-1 line-clamp-3">{title}</h3>
    </div>
  );
}
