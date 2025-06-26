// import { Bar } from "react-chartjs-2";
// import { useEffect, useState, useMemo } from "react";
// import API from "../api";

// export default function ProgressChart() {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     API.get("/habit")
//       .then((res) => {
//         setData(
//           res.data.map((h) => ({
//             title: h.title,
//             count: h.streaks.length,
//           }))
//         );
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load chart data. Please login again.");
//       });
//   }, []);

//   const chartData = useMemo(
//     () => ({
//       labels: data.map((d) => d.title),
//       datasets: [
//         {
//           label: "Streak Count",
//           data: data.map((d) => d.count),
//           backgroundColor: "#2ecc71",
//         },
//       ],
//     }),
//     [data]
//   );

//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!data.length) return <p>Loading chart data...</p>;

//   return (
//     <div>
//       <h3>Progress Overview</h3>
//       <Bar data={chartData} />
//     </div>
//   );
// }
