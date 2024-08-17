const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");
// const User = require("../models/User");
//get all todos
// router.get("/", auth, async (req, res) => {
//     try {
//         const todos = await Todo.find( req.user.id )
//         res.send(todos)
//     } catch (error) {
//         res.status(500).send({ message: "Error fetching todos", error: error.message })
//     }
// })

// const { Types } = require("mongoose");

// router.get("/:id",  async (req, res) => {
//   try {
//     const userId = req.params.id;//"66b776023b317277c2c9d284"
//     console.log("User ID:", userId); // Log the user ID

//     if (!Types.ObjectId.isValid(userId)) {
//       return res.status(400).send({ error: "Invalid User ID" });
//     }

//     const todos = await Todo.find({ user: Types.ObjectId(userId) });
//     console.log("Todos found:", todos); // Log the todos found

//     if (todos.length === 0) {
//       return res.status(404).send({ message: "No todos found for this user" });
//     }

//     res.send(todos);
//   } catch (error) {
//     console.error("Error fetching todos:", error); // Log the error
//     res.status(500).send({ error: "Server error" });
//   }
// });
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;



router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).send({ error: "Invalid User ID format" });
  }

  try {
    const todos = await Todo.find({ user: new ObjectId(userId) });

    if (todos.length === 0) {
      return res.status(404).send({ message: "No todos found for this user" });
    }

    return res.send(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).send({ error: "Error fetching todos" });
  }
});

//get single todo
router.get("/edit/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    return res.send(todo);
  } catch (error) {
    return res.send({ error: "Error fetching todo" });
  }
})

//create
router.post("/:id", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.params.id;
    const todo = new Todo({
      user,
      title,
      description,
    });
    await todo.save();
    return res.send(todo);
  }
  catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).send({ error: "Error creating todo" });
  }
});

//update
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      title,
      description,
    });
    return res.send(todo);
    // res.status(200).send({ message: "Todo updated successfully" });
  }
  catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).send({ error: "Error updating todo" });
  }
});
//delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    return res.send(todo);
    // res.status(200).send({ message: "Todo deleted successfully" });
  }
  catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).send({ error: "Error deleting todo" });
  }
});
module.exports = router;
