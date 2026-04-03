import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Factory from "@/lib/models/Factory";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    const factory = await Factory.findById(id);
    return NextResponse.json(factory);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const factory = await Factory.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(factory);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    await Factory.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
}