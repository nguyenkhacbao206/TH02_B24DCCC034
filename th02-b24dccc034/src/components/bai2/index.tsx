import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

interface Student {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
}


const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const getsinhvien = async () => {
      try {
        const response = await axios.get<Student[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setStudents(response.data);
      } catch {
        setErr("Không thể tải danh sách sinh viên!");
      } finally {
        setLoading(false);
      }
    };
    getsinhvien();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (err) return <p>{err}</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Danh sách sinh viên</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {students.map((s) => (
          <li
            key={s.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              margin: "10px auto",
              maxWidth: "500px",
              padding: "15px",
              background: "#f9f9f9",
            }}
          >
            <h3>{s.name}</h3>
            <p>Email: {s.email}</p>
            <Link
              to={`${s.id}`}
              style={{
                color: "white",
                background: "#007bff",
                padding: "6px 12px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              Xem chi tiết
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


const Trangchitiet = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getchitiet = async () => {
      try {
        const res = await axios.get<Student>(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setStudent(res.data);
      } catch {
        alert("Không thể tải chi tiết sinh viên!");
      } finally {
        setLoading(false);
      }
    };
    getchitiet();
  }, [id]);

  if (loading) return <p>Đang tải chi tiết...</p>;
  if (!student) return <p>Không tìm thấy sinh viên!</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Thông tin chi tiết sinh viên</h2>
      <p><strong>Họ tên:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Điện thoại:</strong> {student.phone}</p>
      <p><strong>Website:</strong> {student.website}</p>

      <button
        onClick={() => navigate("/bai2")}
        style={{
          background: "#007bff",
          color: "white",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Quay lại danh sách
      </button>
    </div>
  );
};


const Bai2 = () => {
  return (
    <Routes>
      <Route path="/" element={<Students />} />
      <Route path=":id" element={<Trangchitiet />} />
    </Routes>
  );
};

export default Bai2;
