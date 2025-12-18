"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  
  const fetchProducts = () => {
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const createProduct = async () => {
    if (!name || !price) {
      alert("이름과 가겨을 모두 입력하십시오");
      return;
    }

    await fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price: Number(price),
      }),
    });

    setName("");
    setPrice("");
    fetchProducts(); 
  };

  return (
    <main style={{ padding: "20px" }}>
      <h1>상품 등록</h1>

      <input
        placeholder="상품명"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="가격"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={createProduct}>등록</button>

      <hr />

      <h2>상품 목록</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price}
          </li>
        ))}
      </ul>
    </main>
  );
}
