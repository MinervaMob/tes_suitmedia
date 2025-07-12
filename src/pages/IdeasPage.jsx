import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

export default function IdeasPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('-published_at');
  const [totalItems, setTotalItems] = useState(0);
  const [paginationLinks, setPaginationLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/ideas?page[number]=${page}&page[size]=${size}&append[]=small_image&append[]=medium_image&sort=${sort}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );
        console.log('API response:', res.data);

        setPosts(res.data.data);
        setTotalItems(res.data.meta?.total ?? 100);
        setPaginationLinks(res.data.meta?.links ?? []); 
      } catch (err) {
        console.error('Gagal fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size, sort]);

  const start = (page - 1) * size + 1;
  const end = Math.min(page * size, totalItems);

  return (
    <main className="pt-28 px-4 max-w-7xl mx-auto">
      {/* Filter section */}
      <div className="flex justify-between items-center mb-6">
        <div>Showing {start} - {end} of {totalItems}</div>
        <div className="flex gap-4">
          <select
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPage(1);
            }}
            className="border px-2 py-1 rounded"
          >
            {[10, 20, 50].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No data found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className="flex flex-wrap justify-center items-center mt-8 gap-2">
        {paginationLinks.map((link, index) => {
          const label = link.label
            .replace('&laquo;', '«')
            .replace('&raquo;', '»')
            .replace(/&nbsp;/g, ' ');

          const isDisabled = link.url === null;
          const isActive = link.active;

          return (
            <button
              key={index}
              disabled={isDisabled}
              onClick={() => {
                const urlParams = new URLSearchParams(link.url?.split('?')[1]);
                const newPage = parseInt(urlParams.get('page[number]'), 10);
                if (!isNaN(newPage)) setPage(newPage);
              }}
              className={`px-3 py-1 border rounded ${
                isActive
                  ? 'bg-orange-500 text-white font-semibold'
                  : 'bg-white text-gray-700 hover:bg-orange-100'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </main>
  );
}
