import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/api/products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("ELECTRONIC");
  const [loading, setLoading] = useState(false);

  // 🔹 상품 목록 조회
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.error("목록 조회 실패", e);
    }
  };

  // 🔹 최초 1회 로딩
  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 상품 등록
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert("상품명과 가격을 입력하세요");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          category, // ✅ enum 그대로
        }),
      });

      if (!res.ok) {
        throw new Error("등록 실패");
      }

      // 입력값 초기화
      setName("");
      setPrice("");
      setCategory("ELECTRONIC");

      // ✅ 다시 조회 → 화면 즉시 갱신
      fetchProducts();
    } catch (e) {
      alert("상품 등록 중 오류 발생");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        📦 상품 관리
      </h1>

      {/* 🔹 상품 등록 */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-10 items-center">
        <input
          className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none"
          placeholder="상품명"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none"
          placeholder="가격"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="ELECTRONIC">전자기기</option>
          <option value="LIVING">생활용품</option>
          <option value="ETC">기타</option>
        </select>

        <button
          disabled={loading}
          className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-600"
        >
          {loading ? "등록중..." : "등록"}
        </button>
      </form>

      {/* 🔹 상품 목록 */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-700 text-left">
            <th className="py-2">ID</th>
            <th>상품명</th>
            <th>가격</th>
            <th>카테고리</th>
            <th>생성일</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              key={p.id}
              className="border-b border-zinc-800 hover:bg-zinc-800"
            >
              <td className="py-2">{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString()}</td>
              <td>{p.category}</td>
              <td>{p.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
