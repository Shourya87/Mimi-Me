import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  const { title, slug, price, discountPrice, images } = product;

  return (
    <div className="min-h-screen flex justify-center bg-gray-500 p-10 ">  
        <div className="max-w-sm">
          <div className="w-2xs h-[80%] flex justify-center items-center bg-gray-300">
            
            {/* Product Card */}
            <div className="w-[90%] h-[90%] bg-white overflow-hidden rounded-xl shadow-md duration-300 hover:-translate-y-1 hover:shadow-xl">

              {/* Product Image */}
              <Link to={`/products/${product.slug}`}>
                <img 
                src={product.images.url}
                alt={product.title}
                className="h-72 w-full object-cover"
                />
              </Link>

              {/* Product Details */}
              <div className="space-y-3 p-4">
                {/* Product Title */}
                <Link to={`/product/${product.slug}`}>
                <h2 className="line-clamp-2 text-lg font-semibold text-gray-800 hover:text-pink-600">
                  {product.title}
                </h2>
                </Link>

                
                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-pink-600">
                    ₹{product.discountPrice}
                  </span>

                  {product.discountPrice < product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.price}
                    </span>
                  )}
                </div>


                {/* Discount Percentage */}
                {product.discountPrice < product.price && (
                  <p className="text-sm font-medium text-green-600">
                    {Math.round(
                      ((product.price - product.discountPrice) / product.price) * 100
                    )}
                    % OFF
                  </p>
                )}


                {/* View Product Button */}
                <Link
                  to={`/products/${product.slug}`}
                  className="block rounded-lg bg-pink-600 px-4 py-2 text-center font-medium text-white transition hover:bg-pink-800"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}