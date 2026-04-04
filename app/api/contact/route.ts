import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/lib/models/Contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
}

export async function POST(request: Request) {
    await connectDB();
    const body = await request.json();

    // MongoDB তে save করো
    const contact = await Contact.create(body);

    // Email পাঠাও
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "mdsakibchowdhuryofficial00@gmail.com",
        subject: `New Contact Message from ${body.name}`,
        html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p>${body.message}</p>
    `,
    });

    return NextResponse.json(contact, { status: 201 });
}