type ItemBlockProps = {
  title: string
  content: [string, string | number | null][]
}

export default function ItemBlock({ title, content }: ItemBlockProps) {
  return (
    <div>
      <h3 className="text-lg font-bold">{title}</h3>
      <ul>
        {content.map(([key, value]) => (
          <li key={key}>
            {key} {value && <b>{value}</b>}
          </li>
        ))}
      </ul>
    </div>
  )
}
