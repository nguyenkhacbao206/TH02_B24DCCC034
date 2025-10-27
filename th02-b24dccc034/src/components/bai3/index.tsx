import React, { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  id: number;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  published_at: string;
}

const Bai3 = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("https://api.spaceflightnewsapi.net/v4/articles?limit=10");
        setArticles(res.data.results);
      } catch {
        setErr("Không thể tải danh sách tin tức!");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (err) return <p style={{ color: "red" }}>{err}</p>;

  return (
    <div>
      <h1>Danh sách tin tức</h1>
      {articles.map((a) => (
        <div key={a.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>{a.title}</h3>
          <img src={a.image_url} alt={a.title} style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} />
          <p>{a.summary.length > 120 ? a.summary.slice(0, 120) + "..." : a.summary}</p>
          <p>🕓 {new Date(a.published_at).toLocaleString("vi-VN")}</p>
          <a href={a.url} target="_blank" rel="noopener noreferrer">
            Xem bài gốc
          </a>
        </div>
      ))}
    </div>
  );
};

export default Bai3;
