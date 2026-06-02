import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"


function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">

            <h1 className="text-5xl font-bold">
                AI Chat SaaS
            </h1>

            <p className="text-gray-400">
                Chat with AI using GPT models
            </p>

            <div className="flex gap-4">
                <Button
                    onClick={() =>
                        navigate("/signup")
                    }
                >
                    Get Started
                </Button>

                <Button
                    variant="secondary"
                    onClick={() =>
                        navigate("/login")
                    }
                >
                    Login
                </Button>
            </div>

        </div>
    );
}

export default HomePage;