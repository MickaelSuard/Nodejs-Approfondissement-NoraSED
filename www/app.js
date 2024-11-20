const { server } = require("../server");
const config = require("../config");
const mongoose = require("mongoose");

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Erreur de connexion à MongoDB :", err);
});

db.once("open", () => {
  console.log("Base de données connectée");

  server.listen(config.port, () => {
    console.log(`L'application tourne sur le port ${config.port}`);
  });
});
