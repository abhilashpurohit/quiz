#!/usr/bin/env node
/* Minimal zero-dependency static server for local testing.
   localStorage, canvas share, and clipboard need a real http origin, so preview
   the build with this (or `python3 -m http.server`), never via file://.  */
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "docs");
const PORT = process.env.PORT || 8000;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

http.createServer(function (req, res) {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  let filePath = path.join(DIR, urlPath);
  if (!filePath.startsWith(DIR)) { res.writeHead(403); res.end("Forbidden"); return; }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }
  fs.readFile(filePath, function (err, data) {
    if (err) {
      // Serve the built 404 page (with a 404 status) like GitHub Pages does,
      // so the root and unknown paths behave the same locally.
      fs.readFile(path.join(DIR, "404.html"), function (e2, nf) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end(e2 ? "Not found: " + urlPath : nf);
      });
      return;
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, function () {
  console.log("Serving docs/ at http://localhost:" + PORT + "  (Ctrl+C to stop)");
});
