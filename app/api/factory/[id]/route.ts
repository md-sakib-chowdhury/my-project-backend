import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Factory from "@/lib/models/Factory";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const factory = await Factory.findById(params.id);
    return NextResponse.json(factory);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const body = await request.json();
    const factory = await Factory.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(factory);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    await connectDB();
    await Factory.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" });
}