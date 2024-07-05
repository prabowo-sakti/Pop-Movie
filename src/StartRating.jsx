import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const containerStarStyle = {
  display: "flex",
};

const textStyle = {
  lineHeight: "1px",
  margin: "0",
  alignItems: "center", // Ensure text is centered
};

const starStyle = {
  width: "22px",
  height: "48px",
  display: "block",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center", // Ensure star content is centered
};

function Start({ onRate, full, onHoverIn, onHoverOut }) {
  return (
    <span
      style={starStyle}
      onClick={onRate}
      onMouseOver={onHoverIn}
      onMouseOut={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#f1c232"
          stroke="#f1c232"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#f1c232"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

export default function StartRating({ max, onSetRating }) {
  const [rating, setRating] = useState(0);
  const [temptRating, setTemptRating] = useState(0);
  function HandleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <div style={containerStyle}>
      <div style={containerStarStyle}>
        {Array.from({ length: max }, (_, i) => (
          <Start
            key={i}
            onRate={() => HandleRating(i + 1)}
            full={temptRating ? temptRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTemptRating(i + 1)}
            onHoverOut={() => setTemptRating(0)}
          />
        ))}
      </div>
      <p style={textStyle}>{temptRating || rating || ""} Star</p>
    </div>
  );
}

// import { useState } from "react";
// import PropTypes from "prop-types";

// // --- Styling untuk komponen ---
// // (Bagian ini tidak dijelaskan secara detail karena fokus kita pada logika)
// const containerStyle = {
//   display: "flex",
//   alignItems: "center",
//   gap: "16px",
// };

// const containerStarStyle = {
//   display: "flex",
// };

// const textStyle = {
//   lineHeight: "1px",
//   margin: "0",
// };

// const starStyle = {
//   width: "22px",
//   height: "48px",
//   cursor: "pointer",
// };

// // --- Komponen untuk merender satu bintang ---
// function Start({ onRate, full, onMouseEnter, onMouseLeave }) {
//   // onRate: Fungsi yang akan dipanggil saat bintang diklik
//   // full: Boolean yang menentukan apakah bintang harus terisi penuh atau tidak
//   // onMouseEnter: Fungsi yang akan dipanggil saat kursor masuk ke area bintang
//   // onMouseLeave: Fungsi yang akan dipanggil saat kursor keluar dari area bintang

//   return (
//     <span
//       style={starStyle}
//       onClick={onRate} // Panggil onRate saat bintang diklik
//       onMouseEnter={onMouseEnter} // Panggil onMouseEnter saat kursor masuk
//       onMouseLeave={onMouseLeave} // Panggil onMouseLeave saat kursor keluar
//     >
//       {/* Render SVG bintang berdasarkan props `full` */}
//       {full ? (
//         // Jika `full` adalah true, render SVG bintang terisi
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="#f1c232"
//           stroke="#f1c232"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ) : (
//         // Jika `full` adalah false, render SVG bintang kosong
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="#f1c232"
//           strokeWidth="20px"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2px"
//             d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//           />
//         </svg>
//       )}
//     </span>
//   );
// }

// Start.propTypes = {
//   onRate: PropTypes.func.isRequired,
//   full: PropTypes.bool.isRequired,
//   onMouseEnter: PropTypes.func.isRequired,
//   onMouseLeave: PropTypes.func.isRequired,
// };

// // --- Komponen utama untuk sistem rating bintang ---
// export default function StartRating({ max, onSetRating }) {
//   // `max` adalah props yang menentukan jumlah bintang maksimum

//   // Inisialisasi state `ratingInfo` dengan objek yang memiliki dua properti:
//   // - hoveredRating: Menyimpan nilai rating saat di-hover (awalnya null)
//   // - selectedRating: Menyimpan nilai rating yang dipilih (awalnya null)
//   const [ratingInfo, setRatingInfo] = useState({
//     hoveredRating: null,
//     selectedRating: null,
//   });

//   // Fungsi yang akan dipanggil saat bintang diklik
//   function handleStarClick(rating) {
//     // `rating` adalah nilai rating yang diklik (1 sampai `max`)

//     // Perbarui state `ratingInfo` dengan mempertahankan properti sebelumnya
//     // dan mengupdate `selectedRating` dengan nilai `rating` yang baru
//     setRatingInfo({ ...ratingInfo, selectedRating: rating });
//   }

//   return (
//     <div style={containerStyle}>
//       <div style={containerStarStyle}>
//         {/* Render `max` jumlah bintang */}
//         {Array.from({ length: max }, (_, i) => (
//           // Loop dari 0 hingga `max` - 1 (karena indeks array dimulai dari 0)
//           <Start
//             key={i} // Berikan key unik untuk setiap bintang
//             onRate={() => handleStarClick(i + 1)} // Panggil handleStarClick saat bintang diklik, berikan nilai rating (i + 1)
//             full={
//               // Logika untuk menentukan apakah bintang harus terisi atau tidak:
//               // 1. Jika `selectedRating` bukan null (sudah ada rating terpilih):
//               //    - Periksa apakah `selectedRating` lebih besar atau sama dengan indeks bintang saat ini (i + 1)
//               //    - Jika ya, bintang ini dan semua bintang sebelumnya akan terisi penuh.
//               // 2. Jika `selectedRating` adalah null (belum ada rating terpilih):
//               //    - Periksa apakah `hoveredRating` lebih besar atau sama dengan indeks bintang saat ini (i + 1)
//               //    - Jika ya, bintang ini dan semua bintang sebelumnya akan terisi penuh (efek hover).
//               // 3. Jika kedua kondisi di atas false, bintang ini tidak akan terisi.
//               ratingInfo.selectedRating !== null
//                 ? ratingInfo.selectedRating >= i + 1
//                 : ratingInfo.hoveredRating >= i + 1
//             }
//             onMouseEnter={() =>
//               // Saat kursor masuk ke area bintang:
//               // - Perbarui state `ratingInfo` dengan mempertahankan properti sebelumnya
//               //   dan mengupdate `hoveredRating` dengan nilai indeks bintang saat ini (i + 1)
//               setRatingInfo({ ...ratingInfo, hoveredRating: i + 1 })
//             }
//             onMouseLeave={() =>
//               // Saat kursor keluar dari area bintang:
//               // - Perbarui state `ratingInfo` dengan mempertahankan properti sebelumnya
//               //   dan mereset `hoveredRating` menjadi null
//               setRatingInfo({ ...ratingInfo, hoveredRating: null })
//             }
//           />
//         ))}
//       </div>
//       {/* Tampilkan teks yang menunjukkan rating saat ini */}
//       <p style={textStyle}>
//         {/* Gunakan operator `||` (OR) untuk menampilkan nilai rating yang sesuai:
//           1. Jika `selectedRating` bukan null, tampilkan `selectedRating` (rating permanen).
//           2. Jika `selectedRating` adalah null dan `hoveredRating` bukan null, tampilkan `hoveredRating` (efek hover).
//           3. Jika keduanya null, tampilkan "0" (nilai default).
//         */}
//         {ratingInfo.selectedRating || ratingInfo.hoveredRating || 0} /10
//       </p>
//     </div>
//   );
// }

// StartRating.propTypes = {
//   max: PropTypes.number.isRequired,
// };
