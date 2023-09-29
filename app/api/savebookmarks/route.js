import { connectToDB } from "@/app/utils/database";
import { NextResponse } from "next/server";
import User from "@/app/models/user";


export async function POST(req) {
  const { userEmail, bookmarks } = await req.json();

  try {
    await connectToDB();

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (bookmarks && bookmarks.length > 0) {
      user.bookmarks = bookmarks;
      await user.save();
    } else {
      return NextResponse.json({message: 'no bookmarks to add'});
    }

    // console.log('userfound', user )
    return NextResponse.json(
      { message: "user found successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving user bookmarks:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
