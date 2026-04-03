import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import BuyingHouse from "@/lib/models/BuyingHouse";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    const buyinghouse = await BuyingHouse.findById(id);
    return NextResponse.json(buyinghouse);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const buyinghouse = await BuyingHouse.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(buyinghouse);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    await BuyingHouse.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
}