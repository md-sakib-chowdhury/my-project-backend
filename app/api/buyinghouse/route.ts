import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import BuyingHouse from "@/lib/models/BuyingHouse";

export async function GET() {
    await connectDB();
    const buyinghouses = await BuyingHouse.find();
    return NextResponse.json(buyinghouses);
}

export async function POST(request: Request) {
    await connectDB();
    const body = await request.json();
    const buyinghouse = await BuyingHouse.create(body);
    return NextResponse.json(buyinghouse, { status: 201 });
}