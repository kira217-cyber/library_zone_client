import axios from "axios";
import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";

const UpdateBook = () => {
  const updateBook = useLoaderData();
  const navigate = useNavigate();

  const initialBook = updateBook.data;

  const { _id, name, author, category, rating, description, image, quantity } =
    initialBook;

  const categories = [
    "Novel",
    "Thriller",
    "History",
    "Drama",
    "Sci-Fi",
    "Fantasy",
    "Biography",
    "Adventure",
  ];

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());

    // Convert string values to appropriate types
    updatedData.rating = Number(updatedData.rating);
    updatedData.quantity = Number(updatedData.quantity);

    axios
      .put(`${import.meta.env.VITE_API_URL}/books/${_id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount) {
          console.log("Updated:", res.data);
          toast.success("Book updated successfully!");

          navigate("/dashboard/update-any-book");
        }
      })
      .catch((error) => {
        toast.error("Update failed.");
        console.error("Update error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-[#2563EB] mb-6">
          Update Book
        </h2>

        <form
          onSubmit={handleUpdate}
          className="grid gap-4 grid-cols-1 sm:grid-cols-2"
        >
          {/* Book Cover */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Book Cover URL
            </label>
            <input
              type="text"
              name="image"
              defaultValue={image}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Book Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Book Title</label>
            <input
              type="text"
              name="name"
              defaultValue={name}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Author Name
            </label>
            <input
              type="text"
              name="author"
              defaultValue={author}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              defaultValue={quantity}
              min="0"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              defaultValue={category}
              className="w-full border rounded px-3 py-2"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Rating (1-5)
            </label>
            <input
              type="number"
              name="rating"
              defaultValue={rating}
              min="1"
              max="5"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              defaultValue={description}
              className="w-full border rounded px-3 py-2"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full hover:cursor-pointer bg-[#2563EB] text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
