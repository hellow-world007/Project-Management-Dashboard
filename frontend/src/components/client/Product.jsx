import { useState } from "react";

const Product = ({ product }) => {
  const {
    category,
    name,
    price,
    description,
    rating,
    productStat: { productId, yearlySalesTotal, yearlyTotalSoldUnits },
  } = product;
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="bg-[#e0e0e0] dark:bg-[#21295c] font-inter rounded-lg px-4 py-6 transition-all duration-300">
      <div className="text-sm text-[#666666] dark:text-[#858585] pb-2">
        {category}
      </div>
      <h3 className="text-xl font-semibold text-dark-grey dark:text-[#f0f0f0]">
        {name}
      </h3>
      <p className="text-xl font-bold text-[#666666] dark:text-gray-300">
        ${price}
      </p>
      <p className="text-sm text-dark-grey dark:text-[#f0f0f0] mt-2">
        {description}
      </p>
      <div className="mt-3 flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-6 w-6 ${
              rating >= i + 1
                ? "text-[#f1c40f]" // Full star
                : rating > i && rating < i + 1
                ? "text-[#f1c40f]" // Half star
                : "text-[#f0f0f0] dark:text-[#c2c2c2]" // Empty star
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            {rating >= i + 1 ? ( // Full star
              <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
            ) : rating > i && rating < i + 1 ? ( // Half star
              <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2v15.27z" />
            ) : (
              // Empty star
              <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
            )}
          </svg>
        ))}
      </div>

      <button
        onClick={() => setShowMore(!showMore)}
        className="mt-4 text-dark-grey dark:text-[#f0f0f0] btn-ghost"
      >
        {showMore ? "SEE LESS" : "SEE MORE"}
      </button>

      {showMore && (
        <div className="flex flex-col justify-center mt-4 text-sm text-dark-grey dark:text-[#f0f0f0]">
          <p>id: {productId}</p>
          <p className="capitalize">
            supply left:{" "}
            {Number(yearlySalesTotal) - Number(yearlyTotalSoldUnits)}
          </p>
          <p className="capitalize">
            yearly sales this year: {yearlySalesTotal}
          </p>
          <p className="capitalize">
            yearly units sold this year: {yearlyTotalSoldUnits}
          </p>
        </div>
      )}
    </div>
  );
};

export default Product;
