import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loading from "../shared/Loading";



const UpdateAnyBook = () => {
    const [loading, setLoading] = useState(false);
  const allBooks = useLoaderData();
  const books = allBooks.data;

  const [viewType, setViewType] = useState("card");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // নতুন state

  // ফিল্টার লজিক
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
          <h2 className="text-2xl font-bold text-[#2563EB]">Update Any Books</h2>
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

        {/* Search Bar (শুধু Card View এর জন্য) */}
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
                    {book.quantity > 0
                      ? "✅ Available"
                      : "❌ Not Available"}
                  </p>
                  <div className="mt-auto flex justify-between gap-2 pt-4">
                    <Link
                      to={`/dashboard/updateBook/${book._id}`}
                      className="w-full text-center bg-green-600 text-white py-1 rounded hover:bg-green-700 transition"
                    >
                      Update Book
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No books found.
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
                        View Details
                      </Link>
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

export default UpdateAnyBook;
