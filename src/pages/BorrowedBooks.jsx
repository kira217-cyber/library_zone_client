import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Loading from "./shared/Loading";

const BorrowedBooks = () => {
  const { user } = useAuth();
  const [borrowed, setBorrowed] = useState([]);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/borrowed/${user.email}`,{
          headers:{
            authorization:`Bearer ${user.accessToken}`
          }
        })
        .then((res) => {
          setBorrowed(res.data); // Save borrowed books
          setLoading(true)
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleReturn = (bookId) => {
    // Simulate return by removing from UI

    axios
      .delete(`${import.meta.env.VITE_API_URL}/borrowed/${bookId}`)
      .then((res) => {
        console.log(res.data);
        setBorrowed((prev) => prev.filter((book) => book._id !== bookId));
        toast.success("Book returned successfully!");
      })
      .catch((err) => {
        console.log(err);
      });

    // Optionally, show console message for simulating quantity update
    console.log(`Book with ID ${bookId} returned (simulate +1 quantity).`);
  };

  if (!loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-[#2563EB] mb-6">
        My Borrowed Books
      </h2>

      {borrowed.length === 0 ? (
        <p className="text-center text-gray-600">
          You have not borrowed any books.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowed.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
            >
              <img
                src={book.image}
                alt={book.name}
                className="h-48 w-full object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-4">{book.name}</h3>
              <p className="text-gray-600">Category: {book.category}</p>
              <p className="text-gray-600">
                <span className="font-semibold">Borrowed Date:</span>{" "}
                {new Date(book.borrowedDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Return Date:</span>{" "}
                {new Date(book.returnDate).toLocaleDateString()}
              </p>

              <button
                onClick={() => handleReturn(book._id)}
                className="mt-auto hover:cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mt-4"
              >
                Return
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
