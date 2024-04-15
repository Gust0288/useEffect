import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://kea-alt-del.dk/t7/api/products?start=" + count * 10
      );
      const data = await res.json();
      console.log(data);
      setProducts((old) => [...old, ...data]);
    }
    getData();
  }, [count]);
  return (
    <>
      <h1>{products.length}</h1>
      {products.length === 0 && <p>loading......</p>}
      {products.map((product) => (
        <article key={product.id}>
          <h2>{product.productdisplayname}</h2>
          <img
            src={`https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`}
            alt=""
          />
        </article>
      ))}
      <button onClick={() => setCount((o) => o + 1)}>Load more</button>
    </>
  );
}

export default App;
