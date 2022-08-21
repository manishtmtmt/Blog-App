const { Router } = require("express");

const UserModel = require("../models/User.model");

const profileRouter = Router();

profileRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!req.params.userId)
    return res.status(500).send({ message: "Please try again later" });
  const user = await UserModel.findOne(
    { _id: userId },
    { __v: 0, password: 0 }
  );
  if (!user) return res.status(404).send({ message: "User not found" });
  return res.status(200).send(user);
});

module.exports = profileRouter;
