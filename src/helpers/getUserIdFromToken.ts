import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getUserIdFromToken = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";

        if (!token) {
            throw new Error("Token not found")
        }

        const { id } = await jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        return id
    } catch (error: any) {
        throw new Error(error.message)
    }
}