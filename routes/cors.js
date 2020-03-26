const express = require("express");
const cors = require("cors");
const app = express();

const whitelist = [
  "http://localhost:3000",
  "https://localhost:3443",
  "http://localhost:3000",
  "http://localhost:1234"
];
let corsOptionsDelegate = {
  origin: "http://localhost:1234",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type",
  credentials: true
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
