import mongoose from "mongoose";

export async function connectDb() {
    try {
        await mongoose.connect(`${process.env.MONGO_URL!}/NextJS-Authentication`)

        mongoose.connection.on("connected", () => console.log("Connected to db"));

        mongoose.connection.on("error", (error) => {
            console.log("Error while connecting to db" + error)
            process.exit()
        });

    } catch (error: any) {
        console.log("Error while connecting to db", error);
    }
}