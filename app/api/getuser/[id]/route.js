import { connectToDB } from "@/app/utils/database";
import { NextResponse } from "next/server";
import User from "@/app/models/user";

export async function GET(request, { params }) {
    
    const userEmail = params.id;

  try {
    await connectToDB();
    const userData = await User.findOne({ email: userEmail });
    return NextResponse.json({ userData }, { status: 200 });

  } catch (error) {

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
