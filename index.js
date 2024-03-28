const express = require("express");
const app = express();
const path = require("path");
const QRCode = require("qrcode");
const port = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engin", "ejs");

let myurl="";


app.post("/data", (req, res) => {
  const { text } = req.body;
  QRCode.toFile('public/images/output.png',text, (err, url)=> {
    myurl = url;
  });
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index.ejs", { myurl });
});
app.listen(port, () => {
  console.log(`App running on port number ${port}`);
});
