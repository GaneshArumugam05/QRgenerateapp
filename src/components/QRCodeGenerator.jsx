// import React from "react";
// import { QRCodeCanvas } from "qrcode.react";

// const PortfolioQRCode = () => {
//     const portfolioURL = "https://ganesharumugam05.github.io/portfolio/";

//     return (
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <h2>Scan to Visit My Portfolio</h2>
//             <QRCodeCanvas
//                 value={portfolioURL}
//                 size={200} // Size of the QR Code
//                 bgColor={"#ffffff"} // Background color
//                 fgColor={"#000000"} // Foreground color
//                 level={"H"} // Error correction level
//             />
//         </div>
//     );
// };

// export default PortfolioQRCode;

import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [qrValue, setQrValue] = useState("");
  const qrRef = useRef(null);

  const handleGenerateQR = () => {
    if (url.trim() === "") {
      alert("Please enter a valid URL.");
      return;
    }
    setQrValue(url);
  };

  const handleDownloadQR = () => {
    if (!qrValue) {
      alert("Please generate a QR code first.");
      return;
    }

    const canvas = qrRef.current.querySelector("canvas");
    const imageURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-80 p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex space-x-4">
        <button
          onClick={handleGenerateQR}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          Generate QR
        </button>
        <button
          onClick={handleDownloadQR}
          className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
        >
          Download QR Code
        </button>
      </div>

      {qrValue && (
        <div
          ref={qrRef}
          className="mt-6 p-4 border border-gray-300 rounded-md bg-white"
        >
          <QRCodeCanvas
            value={qrValue}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
          />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
