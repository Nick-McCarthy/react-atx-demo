import { getGreenPants } from "@/lib/db";
import type { Pants } from "@/lib/supabase";

export default async function Green() {
  const startTime = performance.now();
  const pants = await getGreenPants();
  const queryTime = (performance.now() - startTime).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 p-4 bg-green-100 rounded-lg">
        <p className="text-green-800">SQLite Query Time: {queryTime}ms</p>
      </div>
      <h1 className="text-3xl font-bold mb-8">
        Green Pants Collection (SQLite)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pants.map((pant) => (
          <div
            key={pant.id}
            className="group flex flex-col h-[600px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image container with fixed aspect ratio */}
            <div className="relative w-full h-[400px] overflow-hidden">
              <img
                src={pant.image_url}
                alt={pant.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content container with flex-grow */}
            <div className="flex flex-col flex-grow p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                {pant.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {pant.description}
              </p>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900">
                      ${pant.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {pant.stock}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {pant.sizes.map((size: string) => (
                      <button
                        key={size}
                        className="px-2 py-1 text-sm rounded-md border bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-md transition-colors duration-300 ${
                    pant.stock > 0
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={pant.stock === 0}
                >
                  {pant.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
