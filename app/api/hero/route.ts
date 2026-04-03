import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Hero from "@/lib/models/Hero";

export async function GET() {
    await connectDB();
    const hero = await Hero.findOne();
    return NextResponse.json(hero);
}

export async function POST(request: Request) {
    await connectDB();
    const body = await request.json();
    const hero = await Hero.create(body);
    return NextResponse.json(hero, { status: 201 });
}

export async function PUT(request: Request) {
    await connectDB();
    const body = await request.json();
    const hero = await Hero.findOneAndUpdate({}, body, { new: true, upsert: true });
    return NextResponse.json(hero);
}