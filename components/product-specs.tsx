// export default function ProductSpecs() {
//   const specs = [
//     { label: "Model", value: "#8786867" },
//     { label: "Style", value: "Classic style" },
//     { label: "Certificate", value: "ISO-898921212" },
//     { label: "Size", value: "34mm x 450mm x 19mm" },
//     { label: "Memory", value: "36GB RAM" },
//   ]

//   return (
//     <div className="bg-gray-50 rounded-lg overflow-hidden">
//       <table className="w-full">
//         <tbody>
//           {specs.map((spec, index) => (
//             <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}>
//               <td className="px-4 py-3 text-gray-600 font-medium w-1/3">{spec.label}</td>
//               <td className="px-4 py-3 text-gray-800">{spec.value}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }






interface ProductSpecsProps {
  product: any
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
  const specs = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    { label: "Subcategory", value: product.subcategory },
    { label: "Size", value: product.specifications?.size },
    { label: "Color", value: product.specifications?.color },
    { label: "Material", value: product.specifications?.material },
    { label: "Weight", value: product.specifications?.weight },
    { label: "Dimensions", value: product.specifications?.dimensions },
  ].filter((spec) => spec.value) // Only show specs that have values

  if (specs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No specifications available for this product.</p>
      </div>
    )
  }

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

