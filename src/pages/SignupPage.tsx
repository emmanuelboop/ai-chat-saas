import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { API_URL } from "@/api/config"

function SignupPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSignup() {
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }
        if (!email || !password) {
            alert("Please fill in all fields")
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()
            if (!response.ok) {
                alert(data.message || "Signup failed")
                return
            }
            localStorage.setItem("token", data.token)
            navigate("/chat")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-foreground flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
            </div>

            <div className="relative w-full max-w-md p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold shadow-lg shadow-indigo-500/25">
                        ✦
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Create account</h1>
                        <p className="text-sm text-muted-foreground">Get started with NovaChat</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Confirm password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                        />
                    </div>

                    <Button
                        onClick={handleSignup}
                        disabled={isLoading}
                        className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 border-0 shadow-md shadow-indigo-500/20"
                    >
                        {isLoading ? "Creating account..." : "Create account"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
