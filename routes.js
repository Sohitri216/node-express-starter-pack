const fs = require("fs");
const { brotliDecompressSync } = require("zlib");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      `<html><body><div>Welcome to the Home Page</div><form action="/create-user" method="POST"><input type="text" name="create-user" placeholder="Enter user name"/><button type="submit">Submit</button></form></body></html>`
    );
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      `<html><body><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li><li>User 5</li><li>User 6</li></ul></body></html>`
    );
    res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      fs.writeFile("user.txt", parsedBody.split("=")[1], (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

module.exports.handler = requestHandler;
