// src/controllers/itemsController.ts
import { Request, Response } from "express";
import { items } from "../data/storage";
import { Item, Product, Service, Subscription } from "../models/itemTypes";

const validateItem = (type: string, body: any): string | null => {
  switch (type) {
    case "product":
      if (!body.name || typeof body.name !== "string") {
        return "Name is required and must be a string for products.";
      }
      if (body.price == null || typeof body.price !== "number") {
        return "Price is required and must be a number for products.";
      }
      break;

    case "service":
      if (!body.name || typeof body.name !== "string") {
        return "Name is required and must be a string for services.";
      }
      if (body.duration == null || typeof body.duration !== "number") {
        return "Duration is required and must be a number for services.";
      }
      break;

    case "subscription":
      if (!body.name || typeof body.name !== "string") {
        return "Name is required and must be a string for subscriptions.";
      }
      if (body.price == null || typeof body.price !== "number") {
        return "Price is required and must be a number for subscriptions.";
      }
      if (!body.billingCycle || !["monthly", "yearly"].includes(body.billingCycle)) {
        return "BillingCycle is required and must be 'monthly' or 'yearly' for subscriptions.";
      }
      break;

    default:
      return "Invalid type. Must be 'product', 'service', or 'subscription'.";
  }
  return null;
};


// Get all items grouped by type
export const getItems = (req: Request, res: Response): Response => {
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  return res.status(200).json(groupedItems);
};

// Add a new item
export const addItem = (req: Request, res: Response): Response => {
  const { type, name, price, duration, billingCycle } = req.body;

  if (!type || !name) {
    return res.status(400).json({ error: "Type and name are required fields." });
  }

  // Validate item fields
  const validationError = validateItem(type, req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  // Create a new item based on the type
  const id = (items.length + 1).toString();
  let newItem: Item;

  if (type === "product") {
    newItem = { id, type, name, price } as Product;
  } else if (type === "service") {
    newItem = { id, type, name, duration } as Service;
  } else if (type === "subscription") {
    newItem = { id, type, name, price, billingCycle } as Subscription;
  } else {
    return res.status(400).json({ error: "Invalid type." });
  }

  // Add the item to the in-memory storage
  items.push(newItem);
  return res.status(201).json(newItem);
};
