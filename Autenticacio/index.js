import express from "express";
import { PORT, SECRET_JWT_KEY } from "./config.js";
import { UserRepository } from "./user-repository.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => console.log(`Obert en el port ${PORT}`));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  //const {user} = req.session
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const id = await UserRepository.create({ username, password });
    res.send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
