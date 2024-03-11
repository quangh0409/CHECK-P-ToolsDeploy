const newman = require("newman"); // Import thư viện newman

// Định nghĩa collection và environment
const collection = require("./TestUrlError.postman_collection.json"); // Đường dẫn tới file collection Postman
//const environment = require('./your-environment.json'); // Đường dẫn tới file environment Postman

const { result } = require("./S_or_F");
// Chạy bộ test với custom reporter
newman.run(
  {
    collection: collection,
    reporters: ["cli", "json", "html"], // Sử dụng cả json và html reporter
    reporter: {
      html: { export: "./report_FE.html" },
      json: { export: "./report_BE.json" },
    }, // Xuất kết quả dưới dạng file HTML
  },
  function (err) {
    if (err) {
      throw err;
    }
    // Hiển thị số lượng lỗi server
    result();
  }
);
