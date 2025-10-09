import express from "express";
import { PORT, SECRET_JWT_KEY } from "./config.js";
import { UserRepository } from "./user-repository.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.set("view engine", "ejs");
//Endpoints
app.get("/", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const id = await UserRepository.create({ username, password });
    res.send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.get("/protected", (req, res) => {
  res.render("protected");
});
app.post("/login", async (req, res) => {
    const {username,password}=req.body
    const id = await UserRepository.create({ username, password });
    try{

    }catch{

    }

});
app.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});
