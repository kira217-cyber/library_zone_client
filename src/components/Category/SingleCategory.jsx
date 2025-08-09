import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";

const SingleCategory = () => {
  const { name } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_URL}/books?category=${name}`)
      .then((res) => {
        setBooks(res.data);
        const filteredBooks = res.data.filter(
          (book) => book.category.toLowerCase() === name.toLowerCase()
        );
        setBooks(filteredBooks);
      })
      .catch((err) => console.log(err));
  }, [name]);

  return (
    <div className="max-w-6xl mx-auto p-4 pt-20">
      <h2 className="text-3xl font-bold mb-6">Books in: {name}</h2>
      {books.length === 0 ? (
        <p>No books found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow p-4 rounded-md space-y-2"
            >
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-lg font-bold">{book.name}</h3>
              <p>Author: {book.author}</p>
              <p>Category: {book.category}</p>

              <button className="bg-[#2563EB] hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                <Link to={`/bookDetails/${book._id}`}>View Details</Link>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleCategory;
