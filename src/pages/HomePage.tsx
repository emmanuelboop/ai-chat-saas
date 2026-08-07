import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function HomePage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-foreground flex flex-col items-center justify-center gap-8 p-6 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
            </div>

            <div className="relative text-center max-w-2xl">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-3xl font-bold shadow-xl shadow-indigo-500/25 mb-6">
                    ✦
                </div>

                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent">
                    NovaChat
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-2">
                    A modern AI chat platform built with React, Express, and OpenAI
                </p>

                <p className="text-sm text-muted-foreground/70 mb-8">
                    Real-time streaming · Persistent conversations · JWT authentication
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                        onClick={() => navigate("/signup")}
                        className="px-8 py-5 text-base bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 border-0 shadow-lg shadow-indigo-500/25"
                    >
                        Get Started Free
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => navigate("/login")}
                        className="px-8 py-5 text-base border-white/10 hover:bg-white/5"
                    >
                        Sign In
                    </Button>
                </div>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full mt-4">
                {[
                    { title: "Streaming AI", desc: "Token-by-token responses in real time" },
                    { title: "Smart Memory", desc: "Conversations saved to MongoDB" },
                    { title: "Secure Auth", desc: "JWT-based user authentication" },
                ].map((feature) => (
                    <div
                        key={feature.title}
                        className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center"
                    >
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage
