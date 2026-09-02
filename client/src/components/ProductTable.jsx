import { Pencil, Trash2 } from "lucide-react";
import formatCurrency from "../utils/formatCurrency";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-4 font-semibold">Image</th>
            <th className="text-left px-6 py-4 font-semibold">Name</th>
            <th className="text-left px-6 py-4 font-semibold">Brand</th>
            <th className="text-left px-6 py-4 font-semibold">Price</th>
            <th className="text-left px-6 py-4 font-semibold">Stock</th>
            <th className="text-center px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                {/* Image */}
                <td className="px-6 py-4">
                  <img
                    src={product.images[0].url || "/placeholder.png"}
                    alt={product.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>

                {/* Name */}
                <td className="px-6 py-4 font-medium">{product.title}</td>

                {/* Brand */}
                <td className="px-6 py-4">{product.brand}</td>

                {/* Price */}
                <td className="px-6 py-4">{formatCurrency(product.discountPrice)}</td>

                {/* Stock */}
                <td className="px-6 py-4">{product.stock}</td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 rounded-lg bg-blue-500 transition-colors text-white hover:bg-blue-600"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(product)}
                      className="p-2 rounded-lg bg-red-500 transition-colors text-white hover:bg-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-8 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
