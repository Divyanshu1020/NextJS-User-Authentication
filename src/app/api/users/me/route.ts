import { connectDb } from "@/db/dbConfig"; 
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from 'next/server'


connectDb();

export async function GET(request: NextRequest) {
    try {
        
        const userId = await getUserIdFromToken(request)

        const user = await User.findById(userId).select("-password");

        if(!user) {
            return NextResponse.json({message: "User not found"}, {status: 404})
        }

        return NextResponse.json(user, {status: 200})
    } catch (error: any) {
        NextResponse.json({message: error.message}, {status: 500})
    }
}