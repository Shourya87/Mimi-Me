export default function CheckoutItem({ item }) {
  if (!item) return null;

  // Cart page
  const isCartItem = !!item.product?.title;

  const title = isCartItem ? item.product.title : item.title;

  const image = isCartItem ? item.product.images?.[0]?.url : item.image;

  const originalPrice = isCartItem ? item.product.price : item.price;

  const finalPrice = isCartItem
    ? item.product.discountPrice || item.product.price
    : item.discountPrice;

  const total = finalPrice * item.quantity;

  return (
    <div className="flex gap-4 border-b border-gray-200 py-3">
      <div className="h-28 w-24 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image || "https://placehold.co/100"}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>

          {/* {item.selectedSize && (
            <p className="text-sm text-gray-500">
              Size: {item.selectedSize}
            </p>
          )}

          {item.selectedColor && (
            <p className="text-sm text-gray-500">
              Color: {item.selectedColor}
            </p>
          )}

          <p className="text-sm text-gray-500">
            Qty: {item.quantity}
          </p> */}
        </div>

        <div>
          {originalPrice !== finalPrice ? (
            <>
              <span className="font-semibold">₹{finalPrice}</span>

              <span className="ml-2 text-sm text-gray-400 line-through">
                ₹{originalPrice}
              </span>
            </>
          ) : (
            <span className="font-semibold">₹{finalPrice}</span>
          )}
        </div>

        <p className="text-sm font-medium">
          Total ₹{total.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
