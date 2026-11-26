import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const todoSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { collection: "todos" },
);
const TodoModel = mongoose.model("TodoModel", todoSchema);
const STATES = ["disconnected", "connected", "connecting", "disconnecting"];
export default function Lab6(app) {
  const getConnection = (req, res) => {
    const readyState = mongoose.connection.readyState;
    res.json({
      readyState,
      state: STATES[readyState] ?? "unknown",
      database: mongoose.connection.name,
    });
  };
  const findTodos = async (req, res) => {
    const { completed } = req.query;
    const filter = completed !== undefined ? { completed: completed === "true" } : {};
    res.json(await TodoModel.find(filter));
  };
  const findTodoById = async (req, res) => {
    res.json(await TodoModel.findById(req.params.id));
  };
  const createTodo = async (req, res) => {
    const todo = await TodoModel.create({ ...req.body, _id: uuidv4() });
    res.json(todo);
  };
  const updateTodo = async (req, res) => {
    const { _id, ...updates } = req.body;
    const todo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true },
    );
    res.json(todo);
  };
  const deleteTodo = async (req, res) => {
    res.json(await TodoModel.deleteOne({ _id: req.params.id }));
  };
  app.get("/lab6/connection", getConnection);
  app.get("/lab6/todos", findTodos);
  app.post("/lab6/todos", createTodo);
  app.get("/lab6/todos/:id", findTodoById);
  app.put("/lab6/todos/:id", updateTodo);
  app.delete("/lab6/todos/:id", deleteTodo);
}