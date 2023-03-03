export default function Header() {
  return (
    <header className="bg-red-500 py-2 mb-4">
      <div className="container">
        <figure className="flex items-center gap-x-3">
          <img src="/pokemon-logo.svg" />
          <figcaption>
            <h2 className="text-white font-bold tracking-wide">
              Online Shopping
            </h2>
          </figcaption>
        </figure>
      </div>
    </header>
  )
}
