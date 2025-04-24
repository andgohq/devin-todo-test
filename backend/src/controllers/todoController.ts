import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Todo } from "../models/Todo";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const todoRepository = AppDataSource.getRepository(Todo);
    
    const todos = await todoRepository.find({
      where: { ownerId: user.id },
      order: { createdAt: "DESC" }
    });
    
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = (req as any).user;
    
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { id, ownerId: user.id }
    });
    
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const user = (req as any).user;
    
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = todoRepository.create({
      title,
      description,
      completed: false,
      ownerId: user.id
    });
    
    await todoRepository.save(todo);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;
    const user = (req as any).user;
    
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { id, ownerId: user.id }
    });
    
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    
    await todoRepository.save(todo);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = (req as any).user;
    
    const todoRepository = AppDataSource.getRepository(Todo);
    const todo = await todoRepository.findOne({
      where: { id, ownerId: user.id }
    });
    
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
    await todoRepository.remove(todo);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
