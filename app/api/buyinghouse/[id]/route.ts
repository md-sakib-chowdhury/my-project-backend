import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import BuyingHouse from "@/lib/models/BuyingHouse";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const buyinghouse = await BuyingHouse.findById(params.id);
    return NextResponse.json(buyinghouse);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const body = await request.json();
    const buyinghouse = await BuyingHouse.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(buyinghouse);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    await connectDB();
    await BuyingHouse.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" });
}