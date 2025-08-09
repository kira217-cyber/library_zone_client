import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Loading from "../shared/Loading";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

const UpdateMyBook = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [viewType, setViewType] = useState("card");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch only my books from server
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${API_URL}/my-books?email=${user.email}`)
        .then((res) => {
          setBooks(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);


 
// Delete book handler 
const handleDelete = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2563EB",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${API_URL}/books/${id}`);
        if (res.data.success) {
          setBooks((prev) => prev.filter((book) => book._id !== id));
          Swal.fire("Deleted!", "Book deleted successfully!", "success");
        } else {
          Swal.fire("Failed!", "Failed to delete book!", "error");
        }
      } catch (err) {
        Swal.fire("Error!", "Error deleting book!", "error");
      }
    }
  });
};

  // Filter logic
  const filteredBooks = books.filter((book) => {
    const matchesAvailability = showAvailableOnly ? book.quantity > 0 : true;
    const matchesSearch = book.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesAvailability && matchesSearch;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen pt-20 px-4 py-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-[#2563EB]">Update My Books</h2>
          <div className="flex gap-4 flex-wrap">
            <select
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
              className="border hover:cursor-pointer px-3 py-2 rounded text-gray-700"
            >
              <option value="card">Card View</option>
              <option value="table">Table View</option>
            </select>

            <button
              onClick={() => setShowAvailableOnly((prev) => !prev)}
              className={`px-4 py-2 hover:cursor-pointer rounded text-white transition ${
                showAvailableOnly ? "bg-green-600" : "bg-[#2563EB]"
              }`}
            >
              {showAvailableOnly ? "Show All Books" : "Show Available Books"}
            </button>
          </div>
        </div>

        {/* Search Bar (Card View only) */}
        {viewType === "card" && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by book name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-1/2 border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
        )}

        {/* Card View */}
        {viewType === "card" && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col"
                >
                  <img
                    src={book.image}
                    alt={book.name}
                    className="h-48 w-full object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-3">{book.name}</h3>
                  <p className="text-sm text-gray-600">👤 {book.author}</p>
                  <p className="text-sm">📚 {book.category}</p>
                  <p className="text-sm">⭐ {book.rating}</p>
                  <p className="text-sm">
                    {book.quantity > 0 ? "✅ Available" : "❌ Not Available"}
                  </p>
                  <div className="mt-auto flex flex-col gap-2 pt-4">
                    <Link
                      to={`/dashboard/updateBook/${book._id}`}
                      className="w-full text-center bg-green-600 text-white py-1 rounded hover:bg-green-700 transition hover:cursor-pointer"
                    >
                      Update Book
                    </Link>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/myBookDetails/${book._id}`)
                      }
                      className="w-full text-center bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition hover:cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="w-full text-center bg-red-600 text-white py-1 rounded hover:bg-red-700 transition hover:cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full mt-5 text-2xl font-bold">
                You have not added a book yet!
              </p>
            )}
          </div>
        )}

        {/* Table View */}
        {viewType === "table" && (
          <div className="overflow-x-auto mt-4">
            <table className="w-full border text-left text-sm">
              <thead className="bg-[#2563EB] text-white">
                <tr>
                  <th className="p-2">Image</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Author</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Rating</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book._id} className="border-b hover:bg-gray-100">
                    <td className="p-2">
                      <img
                        src={book.image}
                        alt={book.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-2">{book.name}</td>
                    <td className="p-2">{book.author}</td>
                    <td className="p-2">{book.category}</td>
                    <td className="p-2">{book.rating}</td>
                    <td className="p-2">{book.quantity}</td>
                    <td className="p-2 space-x-2">
                      <Link
                        to={`/dashboard/updateBook/${book._id}`}
                        className="bg-green-600 hover:cursor-pointer text-white px-2 py-1 rounded hover:bg-green-700 transition text-xs"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() =>
                          navigate(`/dashboard/myBookDetails/${book._id}`)
                        }
                        className="bg-blue-600 hover:cursor-pointer text-white px-2 py-1 rounded hover:bg-blue-700 transition text-xs"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="bg-red-600 hover:cursor-pointer text-white px-2 py-1 rounded hover:bg-red-700 transition text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateMyBook;
