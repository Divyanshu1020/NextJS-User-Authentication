import { connectDb } from "@/db/dbConfig"; 
import User from "@/models/userModel";
import {NextRequest, NextResponse} from 'next/server'
import { sendEmail } from "@/helpers/mailer";
import bcrypt from 'bcrypt'



connectDb();
export async function POST(request: NextRequest) {
    const body = await request.json();
    const {userName,email, password} = body;
    //validation

    const userIsExists =  await User.findOne({email});
    if(userIsExists){
        NextResponse.json({error:"User is already exists"},{status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        userName,
        email,
        password: hashedPassword
    })
    
    await sendEmail({email, emailType: "verify", userId: newUser._id});

    return NextResponse.json({message: "User created successfully"},{status: 201})

}