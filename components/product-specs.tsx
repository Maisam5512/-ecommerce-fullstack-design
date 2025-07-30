export default function ProductSpecs() {
  const specs = [
    { label: "Model", value: "#8786867" },
    { label: "Style", value: "Classic style" },
    { label: "Certificate", value: "ISO-898921212" },
    { label: "Size", value: "34mm x 450mm x 19mm" },
    { label: "Memory", value: "36GB RAM" },
  ]

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      <table className="w-full">
        <tbody>
          {specs.map((spec, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}>
              <td className="px-4 py-3 text-gray-600 font-medium w-1/3">{spec.label}</td>
              <td className="px-4 py-3 text-gray-800">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
