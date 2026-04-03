"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") {
            localStorage.setItem("admin", "true");
            router.push("/admin/dashboard");
        } else {
            setError("Wrong password!");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Admin Login</h1>
                <p className="text-gray-500 text-sm mb-6">Alliance Sourcing BD</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#1a9fd4] hover:bg-[#1589b8] text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm"
                    >
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
}