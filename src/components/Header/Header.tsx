import "./Header.css"
export default function Header() {
  return (
    <header>
      <div className="container">
        <figure>
          <img src="/pokemon-logo.svg" />
          <figcaption>
            <h2>Online Shopping</h2>
          </figcaption>
        </figure>
      </div>
    </header>
  )
}
