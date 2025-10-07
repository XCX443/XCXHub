const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// ใช้ middleware ตัวเดียว แทน app.get("*")
app.use((req, res) => {
  const requestedPath = path.normalize(req.path).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(__dirname, requestedPath);

  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();

      // 🔹 ถ้าเป็น .html → ให้เบราว์เซอร์ render ตามปกติ
      if (ext === ".html") {
        res.type("text/html; charset=utf-8");
        return res.send(fs.readFileSync(filePath, "utf8"));
      }

      // 🔹 ถ้าเป็น text-based อื่น ๆ → แสดงเป็น raw text
      if ([".txt", ".js", ".lua", ".json", ".md", ".css", ".xml", ".py"].includes(ext)) {
        res.type("text/plain; charset=utf-8");
        return res.send(fs.readFileSync(filePath, "utf8"));
      }

      // 🔹 ถ้าเป็น binary (รูปภาพ/อื่น ๆ) → ส่งไฟล์ตรง ๆ
      return res.sendFile(filePath);
    }

    // 🔹 ถ้าเป็น directory → แสดงรายชื่อไฟล์
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      const files = fs.readdirSync(filePath);
      const links = files
        .map(f => `<li><a href="${path.join(req.path, f)}">${f}</a></li>`)
        .join("");
      return res.send(`<h2>📁 Index of ${req.path}</h2><ul>${links}</ul>`);
    }

    // 🔹 ถ้าไม่เจอไฟล์ → 404
    res.status(404).send("404 Not Found");
  } catch (err) {
    console.error(err);
    res.status(500).send("500 Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
