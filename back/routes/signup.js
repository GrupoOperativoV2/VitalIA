const express = require("express");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { password, name, birthDay, birthMonth, birthYear, gender, contact } = req.body;


  if (!password || !name || !birthDay || !birthMonth || !birthYear || !gender || !contact) {
    return res.status(400).json(
      jsonResponse(400, { error: "All fields are required" })
    );
  }
  const dateOfBirth = new Date(birthYear, birthMonth - 1, birthDay);

  try {
    const contactExists = await User.contactExists(contact);

    if (contactExists) {
      return res.status(409).json(
        jsonResponse(409, {
          error: "contact already exists",
        })
      );
    } else {
      const user = new User({
        password, 
        name,
        dateOfBirth, 
        gender,
        contact
      });
      user.save();

      res.json(
        jsonResponse(200, {
          message: "User created successfully",
        })
      );
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creating user",
      })
    );
    //return next(new Error(err.message));
  }
});

module.exports = router;
