const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const getUserInfo = require("../lib/getUserInfo");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { contact, password } = req.body;
  console.log(contact, password)

  try {
    let user = new User();
    const contactExists = await User.contactExists(contact);

    if (contactExists) {
      user = await User.findOne({ contact: contact });

      const passwordCorrect = await user.isCorrectPassword(
        password,
        user.password
      );

      if (passwordCorrect) {
        const accessToken = user.createAccessToken();
        const refreshToken = await user.createRefreshToken();

        console.log({ accessToken, refreshToken });

        return res.json(
          jsonResponse(200, {
            accessToken,
            refreshToken,
            user: getUserInfo(user),
          })
        );
      } else {
        //res.status(401).json({ error: "username and/or password incorrect" });

        return res.status(401).json(
          jsonResponse(401, {
            error: "username and/or password incorrect",
          })
        );
      }
    } else {
      return res.status(401).json(
        jsonResponse(401, {
          error: "username does not exist",
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
