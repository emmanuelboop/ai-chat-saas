import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    
    async function handleLogin() {
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }
        const response = await fetch(
            "http://localhost:5000/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",},
                body: JSON.stringify({
                    email,
                    password,
                }), 
            }
        )
        const data = await response.json();
        if (!response.ok) {
            alert(data.message);
            return;
        }
        localStorage.setItem("token", data.token);
        navigate("/chat");
        console.log(data);
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">

            <div className="w-full max-w-md p-8 border border-gray-800 rounded-xl">

                <h1 className="text-3xl font-bold mb-6">
                    Login
                </h1>

                <div className="flex flex-col gap-4">

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="p-3 rounded bg-gray-900"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="p-3 rounded bg-gray-900"
                    />


                    <Button
                        onClick={handleLogin}>
                        Login
                    </Button>

                </div>

            </div>

        </div>
    );
}

export default LoginPage;