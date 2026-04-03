"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({
        factories: 0,
        buyinghouses: 0,
        contacts: 0,
        teams: 0,
    });

    useEffect(() => {
        if (localStorage.getItem("admin") !== "true") {
            router.push("/admin");
        }
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const [f, b, c, t] = await Promise.all([
            fetch("/api/factory").then(r => r.json()),
            fetch("/api/buyinghouse").then(r => r.json()),
            fetch("/api/contact").then(r => r.json()),
            fetch("/api/team").then(r => r.json()),
        ]);
        setStats({
            factories: f.length,
            buyinghouses: b.length,
            contacts: c.length,
            teams: t.length,
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("admin");
        router.push("/admin");
    };

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Factories", count: stats.factories, color: "bg-blue-500" },
                        { label: "Buying Houses", count: stats.buyinghouses, color: "bg-green-500" },
                        { label: "Contacts", count: stats.contacts, color: "bg-yellow-500" },
                        { label: "Team", count: stats.teams, color: "bg-purple-500" },
                    ].map((item) => (
                        <div key={item.label} className={`${item.color} text-white rounded-2xl p-6`}>
                            <p className="text-3xl font-extrabold">{item.count}</p>
                            <p className="text-sm mt-1 text-white/80">{item.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { label: "Manage Factory", href: "/admin/factory" },
                        { label: "Manage Buying House", href: "/admin/buyinghouse" },
                        { label: "View Contacts", href: "/admin/contacts" },
                    ].map((item) => (
                        <Link key={item.label} href={item.href}>
                            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
                                <p className="text-lg font-bold text-gray-900">{item.label}</p>
                                <p className="text-sm text-gray-500 mt-1">Click to manage →</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}