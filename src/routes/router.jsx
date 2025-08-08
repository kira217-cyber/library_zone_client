import { createBrowserRouter } from "react-router";
import RootLayouts from "../MainLayouts/RootLayouts";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddBook from "../pages/AddBook";
import PrivetRoute from "./PrivetRoute";
import AllBooks from "../pages/AllBooks";
import BookDetails from "../pages/BookDetails";
import BorrowedBooks from "../pages/BorrowedBooks";
import UpdateBook from "../pages/UpdateBook";
import axios from "axios";
import ErrorPage from "../pages/ErrorPage";
import SingleCategory from "../components/Category/SingleCategory";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "about",
        Component: AboutUs,
      },
      {
        path:"profile",
        Component:Profile
      },
      {
        path: "allBooks",
        loader: () => axios(`${import.meta.env.VITE_API_URL}/books`),
        element: <AllBooks></AllBooks>,
      },
      {
        path: "/updateBook/:id",
        loader: ({ params }) =>
          axios(`${import.meta.env.VITE_API_URL}/books/${params.id}`),
        element: (
          <PrivetRoute>
            <UpdateBook></UpdateBook>
          </PrivetRoute>
        ),
      },
      {
        path: "/bookDetails/:id",
        loader: ({ params }) =>
          axios(`${import.meta.env.VITE_API_URL}/books/${params.id}`),
        element: <BookDetails></BookDetails>,
      },

      {
        path: "/category/:name",
        element: <SingleCategory></SingleCategory>,
      },
    ],
  },
  {
    path: "dashboard",
    children: [
      {
        index: true,
        element: <h1>Dashboard Home</h1>,
      },
      {
        path: "borrowedBooks",
        element: (
          <PrivetRoute>
            <BorrowedBooks></BorrowedBooks>
          </PrivetRoute>
        ),
      },
      {
        path: "updateBook/:id",
        loader: ({ params }) =>
          axios(`${import.meta.env.VITE_API_URL}/books/${params.id}`),
        element: (
          <PrivetRoute>
            <UpdateBook></UpdateBook>
          </PrivetRoute>
        ),
      },
      {
        path: "addBook",
        element: (
          <PrivetRoute>
            <AddBook></AddBook>
          </PrivetRoute>
        ),
      },
    ],
  },
]);
