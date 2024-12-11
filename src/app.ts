import express from "express";
import itemsRoutes from "./routes/items";

const app = express();
app.use(express.json());
app.use("/api", itemsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
