const db = require("@prisma/client");
const express = require("express");

const prisma = new db.PrismaClient();

const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    console.log("get");
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch {
    return res.status(500, "Server Error");
  }
});

app.post("/users", async (req, res) => {
  const input = req.body;

  const newUser = await prisma.user.create({
    data: {
      name: input.name,
    },
  });

  return res.status(200).json(newUser);
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return res.status(404).json("User not found");
  }

  await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return res.status(200);
});

app.listen(4000);
