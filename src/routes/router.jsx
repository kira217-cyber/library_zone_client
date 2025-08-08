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
import DashboardLayouts from "../MainLayouts/DashboardLayouts";
import Statistics from "../pages/Dashboard/Statistics";
import UpdateAnyBook from "../pages/Dashboard/UpdateAnyBook";

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
    element: <PrivetRoute><DashboardLayouts></DashboardLayouts></PrivetRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: (
          <PrivetRoute>
            <Statistics></Statistics>
          </PrivetRoute>
        ),
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
        path: "update-any-book",
        loader: () => axios(`${import.meta.env.VITE_API_URL}/books`),
        element:<PrivetRoute>
          <UpdateAnyBook></UpdateAnyBook>
        </PrivetRoute>
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
