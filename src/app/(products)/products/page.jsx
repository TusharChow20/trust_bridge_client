"use client";
import { useEffect, useState } from "react";
import instance from "@/hooks/axiosInstence";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    instance.get("/allProducts").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-3">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product._id} className="w-full">
            <Image
              src={product.image}
              width={400}
              height={300}
              className="w-full h-48 object-contain"
              alt={product.title}
            />
            <CardHeader>
              <CardAction className={"flex flex-col"}>
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="secondary">{product.condition}</Badge>
              </CardAction>

              <CardTitle>{product.title}</CardTitle>

              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <div className="flex justify-between px-4">
              <h1 className="font-bold text-blue-700">Price</h1>
              <p>{product.price}tk</p>
            </div>
            <CardFooter>
              <Button className="w-full ">Buy Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
