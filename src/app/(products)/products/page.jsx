"use client";
import { useEffect, useState } from "react";
import instance from "@/hooks/axiosInstence";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    instance.get("/allProducts").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>{product.sellerName}</div>
      ))}
    </div>
  );
}
