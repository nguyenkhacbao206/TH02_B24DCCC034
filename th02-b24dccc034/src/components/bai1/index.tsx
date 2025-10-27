import React, { useState } from "react";
import axios from "axios";

interface WeatherData {
  current_condition: {
    temp_C: string;
    weatherDesc: { value: string }[];
  }[];
}

const Bai1 = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) {
      setError("Vui lòng nhập tên thành phố!");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await axios.get<WeatherData>(
        `https://wttr.in/${city}?format=j1`
      );
      setWeather(response.data);
    } catch {
      setError("Không lấy được dữ liệu thời tiết!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40, fontFamily: "sans-serif" }}>
      <h1>Ứng dụng Thời tiết</h1>

      <input
        type="text"
        placeholder="Nhập tên thành phố..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #ccc",
          width: 200,
          marginRight: 10,
        }}
      />
      <button
        onClick={getWeather}
        style={{
          padding: "8px 16px",
          borderRadius: 8,
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Xem thời tiết
      </button>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            border: "1px solid #ddd",
            display: "inline-block",
            borderRadius: 10,
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>{city.toUpperCase()}</h2>
          <p>
             Nhiệt độ: <strong>{weather.current_condition[0].temp_C}°C</strong>
          </p>
          <p>
             Trạng thái:{" "}
            <strong>{weather.current_condition[0].weatherDesc[0].value}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Bai1;
