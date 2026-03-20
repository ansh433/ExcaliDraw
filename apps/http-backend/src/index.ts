import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from "./middleware.js";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Incoming Origin:", origin);
    console.log("Allowed Origins:", allowedOrigins);

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log("❌ BLOCKED BY CORS");
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.post("/signup", async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Incorrect inputs" });
        return;
    }
    try {
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 5);
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.username,
                password: hashedPassword,
                name: parsedData.data.name
            }
        });
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        res.json({ token });
    } catch(e) {
        res.status(411).json({ message: "User already exists with this username" });
    }
});

app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Incorrect inputs" });
        return;
    }
    const user = await prismaClient.user.findFirst({
        where: { email: parsedData.data.username }
    });
    if (!user) {
        res.status(403).json({ message: "Not authorized" });
        return;
    }
    const passwordMatch = await bcrypt.compare(parsedData.data.password, user.password);
    if (!passwordMatch) {
        res.status(403).json({ message: "Not authorized" });
        return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token });
});

app.post("/room", middleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Incorrect inputs" });
        return;
    }
    const userId = (req as any).userId;
    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        });
        res.json({ roomId: room.id, slug: room.slug });
    } catch(e) {
        res.status(411).json({ message: "Room already exists with this name" });
    }
});

app.get("/rooms", middleware, async (req, res) => {
    const userId = (req as any).userId;
    try {
        const rooms = await prismaClient.room.findMany({
            where: { adminId: userId },
            orderBy: { createdAt: "desc" }
        });
        res.json({ rooms });
    } catch(e) {
        res.status(500).json({ message: "Failed to fetch rooms" });
    }
});

app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: { roomId },
            orderBy: { id: "desc" },
            take: 1000
        });
        res.json({ messages });
    } catch(e) {
        res.status(500).json({ messages: [] });
    }
});

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: { slug }
    });
    res.json({ room });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`http-backend running on port ${PORT}`);
});