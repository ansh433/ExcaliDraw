import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;

    const shapes = messages.map((x: { message: string }) => {
        try {
            const messageData = JSON.parse(x.message);
            return messageData.shape;
        } catch {
            return null;
        }
    }).filter(Boolean);

    return shapes;
}

export async function getRooms(): Promise<{ id: number; slug: string; createdAt: string }[]> {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${HTTP_BACKEND}/rooms`, {
        headers: { authorization: token ?? "" }
    });
    return res.data.rooms;
}

export async function createRoom(name: string): Promise<{ roomId: number; slug: string }> {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${HTTP_BACKEND}/room`, { name }, {
        headers: { authorization: token ?? "" }
    });
    return res.data;
}

export async function signin(username: string, password: string): Promise<string> {
    const res = await axios.post(`${HTTP_BACKEND}/signin`, { username, password });
    return res.data.token;
}

export async function signup(username: string, password: string, name: string): Promise<string> {
    const res = await axios.post(`${HTTP_BACKEND}/signup`, { username, password, name });
    return res.data.token;
}