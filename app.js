const express = require("express");
const app = express();
const server = require("http").Server(app);
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 5050;
const io = require("socket.io")(server);
const djdata_filepath = __dirname + "/public/djdata.json";
const data_db_filepath = __dirname + "/public/data_db2.json";

// Statische Dateien bereitstellen (z. B. HTML-, CSS-, JS-Dateien)
//app.use(express.static('public'));
app.use("/", express.static("public"));

// sendFile will go here
app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/djnow_overlay", function (req, res) {
  res.sendFile(`${__dirname}/public/djnow_overlay.html`);
});

app.get("/djnext_overlay", function (req, res) {
  res.sendFile(`${__dirname}/public/djnext_overlay.html`);
});

app.get("/settings_dock", function (req, res) {
  res.sendFile(`${__dirname}/public/settings_dock.html`);
});

app.get('/load_data_db', (req, res) => {
	let data = fs.readFileSync(data_db_filepath);
	data = JSON.parse(data);
	res.json(data);
})


app.use(express.json());
app.post("/djdata_put", (req, res) => {
  req.body;
  //console.log('TESTPUT: ' + JSON.stringify(req.body));
  res.json(req.body);
  //fs.writeFile(djdata_filepath, req.body);
  //let content = JSON.stringify(req.body);
  fs.writeFileSync(djdata_filepath, JSON.stringify(req.body, null, 4));
});

app.use(express.json());
app.post("/save_data_db", (req, res) => {
  req.body;
  res.json(req.body);
  fs.writeFileSync(data_db_filepath, JSON.stringify(req.body, null, 4));
});

// Socket.IO-Ereignisbehandlung
io.on("connection", (socket) => {
  // Hier können Sie auf Socket.IO-Ereignisse reagieren
  socket.on("remoteControl", (data) => {
    // Aktionen für die Fernsteuerung durchführen
    // ...

    // Beispiel: Eine Nachricht an das andere Fenster senden
    io.emit("remoteControl", data);
  });
});

// Server starten
server.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
  console.log("Öffne: http://localhost:" + port + "/ in deinem Browser.");
});
