import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Factory from "@/lib/models/Factory";

export async function GET() {
    await connectDB();
    const factories = await Factory.find();
    return NextResponse.json(factories);
}

export async function POST(request: Request) {
    await connectDB();
    const body = await request.json();
    const factory = await Factory.create(body);
    return NextResponse.json(factory, { status: 201 });
}