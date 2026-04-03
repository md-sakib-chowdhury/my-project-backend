"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: string;
}

export default function AdminContacts() {
    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        if (localStorage.getItem("admin") !== "true") {
            router.push("/admin");
        }
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const res = await fetch("/api/contact");
        const data = await res.json();
        setContacts(data);
    };

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Contact Messages</h1>
                    <Link href="/admin/dashboard">
                        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm">
                            ← Dashboard
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {contacts.length === 0 ? (
                        <div className="bg-white rounded-2xl p-8 text-center text-gray-400 border border-gray-100">
                            No messages yet
                        </div>
                    ) : (
                        contacts.map((contact) => (
                            <div key={contact._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className="font-bold text-gray-900">{contact.name}</p>
                                        <p className="text-sm text-gray-500">{contact.email}</p>
                                        {contact.phone && (
                                            <p className="text-sm text-gray-500">{contact.phone}</p>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        {new Date(contact.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-xl p-4">
                                    {contact.message}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}