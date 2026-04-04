"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductItem {
    name: string;
    img: string;
}

interface Subcategory {
    name: string;
    items: ProductItem[];
}

interface BuyingHouse {
    _id: string;
    name: string;
    buyer: string;
    country: string;
    status: string;
    category: string;
    subcategories: Subcategory[];
}

export default function AdminBuyingHouse() {
    const router = useRouter();
    const [buyinghouses, setBuyinghouses] = useState<BuyingHouse[]>([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        buyer: "",
        country: "",
        category: "knitwear",
        status: "active",
    });
    const [subcategories, setSubcategories] = useState([
        { name: "", items: [{ name: "", img: "" }] }
    ]);

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

    const handleAddSubcategory = () => {
        setSubcategories([...subcategories, { name: "", items: [{ name: "", img: "" }] }]);
    };

    const handleSubcategoryName = (index: number, value: string) => {
        const updated = [...subcategories];
        updated[index].name = value;
        setSubcategories(updated);
    };

    const handleAddItem = (subIndex: number) => {
        const updated = [...subcategories];
        updated[subIndex].items.push({ name: "", img: "" });
        setSubcategories(updated);
    };

    const handleItemChange = (subIndex: number, itemIndex: number, field: string, value: string) => {
        const updated = [...subcategories];
        updated[subIndex].items[itemIndex] = { ...updated[subIndex].items[itemIndex], [field]: value };
        setSubcategories(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/buyinghouse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, subcategories }),
        });
        setForm({ name: "", buyer: "", country: "", category: "knitwear", status: "active" });
        setSubcategories([{ name: "", items: [{ name: "", img: "" }] }]);
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="knitwear">Knitwear</option>
                                <option value="woven">Woven</option>
                            </select>
                        </div>

                        {/* Subcategories */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-700 mb-2">Product Subcategories</h3>
                            {subcategories.map((sub, subIndex) => (
                                <div key={subIndex} className="border border-gray-200 rounded-xl p-4 mb-3">
                                    <input
                                        placeholder="Subcategory Name (e.g. T-Shirt)"
                                        value={sub.name}
                                        onChange={(e) => handleSubcategoryName(subIndex, e.target.value)}
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {sub.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="grid grid-cols-2 gap-2 mb-2">
                                            <input
                                                placeholder="Product Name"
                                                value={item.name}
                                                onChange={(e) => handleItemChange(subIndex, itemIndex, "name", e.target.value)}
                                                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <input
                                                placeholder="Image URL"
                                                value={item.img}
                                                onChange={(e) => handleItemChange(subIndex, itemIndex, "img", e.target.value)}
                                                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleAddItem(subIndex)}
                                        className="text-sm text-blue-500 hover:text-blue-700"
                                    >
                                        + Add Product
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddSubcategory}
                                className="text-sm text-blue-500 hover:text-blue-700"
                            >
                                + Add Subcategory
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1a9fd4] hover:bg-[#1589b8] text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm"
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
                                <th className="text-left px-6 py-4 text-xs font-bold text-gray-600 uppercase">Category</th>
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
                                        <td className="px-6 py-4 text-gray-500">{bh.category}</td>
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