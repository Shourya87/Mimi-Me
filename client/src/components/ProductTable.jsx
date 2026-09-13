import { Pencil, Trash2 } from "lucide-react";

import formatCurrency from "../utils/formatCurrency";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#eadfd5] bg-[#fffaf7] shadow-[0_8px_30px_rgba(109,91,77,0.05)]">
      <table className="w-full min-w-[850px]">
        <thead className="border-b border-[#eadfd5] bg-[#f5eee8]">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Image
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Name
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Brand
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Price
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Stock
            </th>

            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#7d6b5d]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#eee3db]">
          {products?.length > 0 ? (
            products.map((product) => (
              <tr
                key={product._id}
                className="transition-colors hover:bg-[#fcf5f1]"
              >
                {/* Image */}
                <td className="px-6 py-4">
                  <img
                    src={product.images?.[0]?.url || "/placeholder.png"}
                    alt={product.title}
                    className="h-16 w-16 rounded-xl border border-[#eadfd5] object-cover"
                  />
                </td>

                {/* Name */}
                <td className="px-6 py-4">
                  <span className="font-semibold text-[#6d5b4d]">
                    {product.title}
                  </span>
                </td>

                {/* Brand */}
                <td className="px-6 py-4 text-sm text-[#756457]">
                  {product.brand || "—"}
                </td>

                {/* Price */}
                <td className="px-6 py-4 font-medium text-[#b9786d]">
                  {formatCurrency(
                    product.discountPrice ?? product.price ?? 0,
                  )}
                </td>

                {/* Stock */}
                <td className="px-6 py-4">
                  <span
                    className={`font-medium ${
                      product.stock > 0
                        ? "text-[#527762]"
                        : "text-[#ad6258]"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      aria-label={`Edit ${product.title}`}
                      className="rounded-lg border border-[#dfc2b3] bg-[#f8eee9] p-2 text-[#a66f63] transition hover:bg-[#eeddd5] hover:text-[#8e5b50]"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(product)}
                      aria-label={`Delete ${product.title}`}
                      className="rounded-lg border border-[#e5c8c4] bg-[#f7e7e4] p-2 text-[#ad6258] transition hover:bg-[#eed4d0] hover:text-[#944d44]"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="py-12 text-center text-sm text-[#9a8879]"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}