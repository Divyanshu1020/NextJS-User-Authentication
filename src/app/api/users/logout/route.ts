import { connectDb } from "@/db/dbConfig"; 
import {NextRequest, NextResponse} from 'next/server'


connectDb();

export async function GET(request: NextRequest) {
    try {
        
        const response = NextResponse.json({message: "Logout successfully"}, {status: 200}).cookies.delete("token");

        return response
    } catch (error: any) {
        NextResponse.json({message: error.message}, {status: 500})
    }
}