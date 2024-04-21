import { connectDb } from "@/db/dbConfig"; 
import User from "@/models/userModel";
import {NextRequest, NextResponse} from 'next/server'

connectDb()

export async function POST(req: NextRequest){

    try {
        const body = await req.json();
        const {token} = body;
    
        const user = await User.findOne(
        {
            verfiyToken: token,
            verfiyTokenExpiry: {$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 404})
        }

        user.isVerified = true;
        user.verfiyToken = undefined;
        user.verfiyTokenExpiry = undefined;

        await user.save(); 

        return NextResponse.json({message: "User verified successfully"}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}