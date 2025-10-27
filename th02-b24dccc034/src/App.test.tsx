import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Bai1 from "./components/bai1";
import Bai2 from "./components/bai2";
import Bai3 from "./components/bai3";

const App = () => {
  return (
    <div>
      {/* Thanh menu */}
      <nav
        style={{
          background: "#007bff",
          color: "white",
          padding: "10px 20px",
          display: "flex",
          gap: "20px",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Trang chủ
        </Link>
        <Link to="/bai1" style={{ color: "white", textDecoration: "none" }}>
          Bài 1
        </Link>
        <Link to="/bai2" style={{ color: "white", textDecoration: "none" }}>
          Bài 2
        </Link>
        <Link to="/bai3" style={{ color: "white", textDecoration: "none" }}>
          Bài 3
        </Link>
      </nav>

      {/* Các route */}
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  background: "#fff",
                  padding: "30px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  maxWidth: "900px",
                  margin: "20px auto",
                }}
              >
                <h2>Bài thực hành 02:</h2>
                <p>
                  - Mục tiêu: Áp dụng các kiến thức React như Props, State,
                  Lifecycle, Axios, Typescript, React Router.
                </p>
                <p>
                  - Sinh viên push code lên Github và add thầy vào repo đúng cú
                  pháp.
                </p>
                <h3>Bài 1: Ứng dụng thời tiết</h3>
                <h3>Bài 2: Ứng dụng danh sách sinh viên</h3>
                <h3>Bài 3: Ứng dụng xem tin tức</h3>
                <p>
                  <b>Yêu cầu:</b> Toàn bộ bài sử dụng typescript, bắt buộc sử dụng các thư viện: axios, react-router-dom, cả 3 bài trong cùng 1 project, mỗi bài là một component.
                </p>
              </div>
            </div>
          }
        />
        <Route path="/bai1/*" element={<Bai1 />} />
        <Route path="/bai2/*" element={<Bai2 />} />
        <Route path="/bai3" element={<Bai3 />} />
      </Routes>
    </div>
  );
};

export default App;
