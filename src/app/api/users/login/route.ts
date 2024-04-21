import { connectDb } from "@/db/dbConfig"; 
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

connectDb();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found or does not exist" }, { status: 404 });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json({ message: "Password is incorrect" }, { status: 401 });
        }

        const jwtToken = await jwt.sign(
            { email: user.email, id: user._id }, 
            process.env.JWT_SECRET!, 
            { expiresIn: "1d" }
        );

        const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
        response.cookies.set("token", jwtToken, {
            httpOnly: true,
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
