"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BuyingHouse {
    _id: string;
    name: string;
    buyer: string;
    country: string;
    status: string;
}

export default function AdminBuyingHouse() {
    const router = useRouter();
    const [buyinghouses, setBuyinghouses] = useState<BuyingHouse[]>([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        buyer: "",
        country: "",
        status: "active",
    });

    useEffect(() => {
        if (localStorage.getItem("admin") !== "true") {
            router.push("/admin");
        }
        fetchBuyingHouses();
    }, []);

    const fetchBuyingHouses = async () => {
        const res = await fetch("/api/buyinghouse");
        const data = await res.json();
        setBuyinghouses(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/buyinghouse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setForm({ name: "", buyer: "", country: "", status: "active" });
        fetchBuyingHouses();
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        await fetch(`/api/buyinghouse/${id}`, { method: "DELETE" });
        fetchBuyingHouses();
    };

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Manage Buying House</h1>
                    <Link href="/admin/dashboard">
                        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm">
                            ← Dashboard
                        </button>
                    </Link>
                </div>

                {/* Add Form */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Buying House</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            placeholder="Buying House Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            placeholder="Buyer Name"
                            value={form.buyer}
                            onChange={(e) => setForm({ ...form, buyer: e.target.value })}
                            required
                            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            placeholder="Country"
                            value={form.country}
                            onChange={(e) => setForm({ ...form, country: e.target.value })}
                            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#1a9fd4] hover:bg-[#1589b8] text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm"
                        >
                            {loading ? "Adding..." : "Add Buying House"}
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase">Name</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase">Buyer</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase">Country</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buyinghouses.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-8 text-gray-400">No buying houses yet</td>
                                </tr>
                            ) : (
                                buyinghouses.map((bh) => (
                                    <tr key={bh._id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{bh.name}</td>
                                        <td className="px-6 py-4 text-gray-500">{bh.buyer}</td>
                                        <td className="px-6 py-4 text-gray-500">{bh.country}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDelete(bh._id)}
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