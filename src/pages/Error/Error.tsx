import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import Header from "../../components/Header/Header"

export default function ErrorPage() {
  let error = useRouteError()
  let errorMessage

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText
  }

  return (
    <section id="error-page">
      <Header />
      <div className="container">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{errorMessage}</i>
        </p>
      </div>
    </section>
  )
}
