const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/user", async (req, res) => {
  const user = new User(req.body);
  //  creating instance of userModel
  // const user = new User({
  //   fisrtName: "Virat",
  //   lastName: "Kohli",
  //   age: 35,
  //   gender: "Male",
  // });
  try {
    await user.save(); // save to the database
    res.send("Data Saved to DB");
  } catch {
    (err) => console.log("Error");
  }
});
app.get("/feed", async (req, res) => {
  const userid = req.body._id;
  const user = await User.findById(userid);
  res.send(user);
});

app.delete("/user", async (req, res) => {
  const userID = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userID);
    res.send("deleted");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    console.log(updatedUser);
    res.send("data  updated");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
connectDB()
  .then(() => {
    console.log("DBConnection");
    app.listen(7777, () => {
      console.log("connected to 7777");
    });
  })
  .catch((err) => console.log("UnSuccessfull"));
