const fs = require("fs");

const { handleStatusCode } = require("./httpStatus");

// Đường dẫn tới file JSON xuất ra bởi Newman
const filePath = "./report_BE.json";

// Đọc file JSON
const result = () => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    try {
      // Parse dữ liệu JSON
      const jsonData = JSON.parse(data);

      // Lấy các execution từ file JSON
      const executions = jsonData.run.executions;

      // Lặp qua từng execution để lấy giá trị code
      executions.forEach((execution) => {
        const response = execution.response;
        const requestError = execution.requestError;
        if (response) {
          const code = response.code;
          handleStatusCode(code);
        } else if (requestError) {
          handleStatusCode(requestError.code);
        }
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
};

module.exports = { result };
