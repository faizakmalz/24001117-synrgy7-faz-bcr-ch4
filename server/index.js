const http = require('http');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIRECTORY = path.join(__dirname, '../public');

const getContentType = (filePath) => {
    const ext = path.extname(filePath);
    switch (ext) {
      case ".html":
        return "text/html";
      case ".css":
        return "text/css";
      case ".js":
        return "text/javascript";
      case ".json":
        return "application/json";
      case ".png":
        return "image/png";
      case ".svg":
        return "image/svg+xml";
      case ".jpg":
      case ".jpeg":
        return "image/jpeg";
      default:
        return "";
    }
  };
  

const onRequest = (req, res) => {
    if (req.method === "GET" && req.url.startsWith("/public/")) {
      const reqUrl = req.url.split("/").slice(2).join("/");
      console.log(reqUrl);
      const filePath = path.join("./public", reqUrl);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("File not found!");
        } else {
          const contentType = getContentType(filePath);
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
      return;
    }
    if (req.url === "/") {
      if (req.method === "GET") {
        // menampilkan file index.html pada folder public
        const filePath = path.join(__dirname, "..", "public", "index.example.html");
        console.log(filePath);
        try {
          const content = fs.readFileSync(filePath, "utf-8");
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content);
        } catch (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          console.log(error);
          res.end("Internal Server Error");
        }
        console.log("done");
      } else {
        response.writeHead(405, { "Content-Type": "text/plain" });
        response.end("Method not allowed!");
      }
      return;
    }
    if (req.url === "/cars") {
      if (req.method === "GET") {
        // menampilkan file index.html pada folder public
        const filePath = path.join(__dirname, "..", "public", "carss.html");
        console.log(filePath);
        try {
          const content = fs.readFileSync(filePath, "utf-8");
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content);
        } catch (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          console.log(error);
          res.end("Error");
        }
        console.log("berhasil");
      }
      return;
    }
  
  };
const server = http.createServer(onRequest);

server.listen(8100, 'localhost', () => {
    console.log(`Server is running at http://localhost:8100`);
});
