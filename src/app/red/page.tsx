"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Pants } from "@/lib/supabase";

export default function Red() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [pants, setPants] = useState<Pants[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPants() {
      try {
        const { data, error } = await supabase
          .from("pants")
          .select("*")
          .eq("category", "red")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPants(data || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching pants"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPants();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Premium Pants Collection</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pants.map((pant) => (
          <div
            key={pant.id}
            className="group flex flex-col h-[600px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full h-[400px] overflow-hidden">
              <img
                src={pant.image_url}
                alt={pant.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>

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
                    {pant.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-2 py-1 text-sm rounded-md border ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
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
