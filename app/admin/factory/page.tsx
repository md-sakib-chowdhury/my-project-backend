"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Factory {
    _id: string;
    name: string;
    location: string;
    capacity: number;
    machinery: string;
    status: string;
}

export default function AdminFactory() {
    const router = useRouter();
    const [factories, setFactories] = useState<Factory[]>([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        location: "",
        capacity: "",
        machinery: "",
        status: "active",
    });

    useEffect(() => {
        if (localStorage.getItem("admin") !== "true") {
            router.push("/admin");
        }
        fetchFactories();
    }, []);

    const fetchFactories = async () => {
        const res = await fetch("/api/factory");
        const data = await res.json();
        setFactories(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/factory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setForm({ name: "", location: "", capacity: "", machinery: "", status: "active" });
        fetchFactories();
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        await fetch(`/api/factory/${id}`, { method: "DELETE" });
        fetchFactories();
    };

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Manage Factory</h1>
                    <Link href="/admin/dashboard">
                        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm">
                            ← Dashboard
                        </button>
                    </Link>
                </div>

                {/* Add Form */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Factory</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            placeholder="Factory Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            placeholder="Location"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            required
                            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            placeholder="Capacity"
                            type="number"
                            value={form.capacity}
                            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            placeholder="Machinery"
                            value={form.machinery}
                            onChange={(e) => setForm({ ...form, machinery: e.target.value })}
                            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="sm:col-span-2 bg-[#1a9fd4] hover:bg-[#1589b8] text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm"
                        >
                            {loading ? "Adding..." : "Add Factory"}
                        </button>
                    </form>
                </div>

                {/* Factory List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase">Name</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase">Location</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase">Status</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {factories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-gray-400">No factories yet</td>
                                </tr>
                            ) : (
                                factories.map((factory) => (
                                    <tr key={factory._id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{factory.name}</td>
                                        <td className="px-6 py-4 text-gray-500">{factory.location}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">{factory.status}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDelete(factory._id)}
                                                className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}