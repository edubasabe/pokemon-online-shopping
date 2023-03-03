import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "../pages/Error/Error"
import Home from "../pages/Home/Home"
import Pokemon from "../pages/Pokemon/Pokemon"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "pokemon/:pokemonId",
    element: <Pokemon />,
    errorElement: <ErrorPage />,
  },
])

export default router
