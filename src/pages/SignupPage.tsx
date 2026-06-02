import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"



function SignupPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();

    async function handleSignup() {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }
        console.log({ email, password, })

        const response = await fetch(
            "http://localhost:5000/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        )

        const data = await response.json()
        if (!response.ok) {
            alert(data.message || "Signup failed");
            return;
        }
        localStorage.setItem("token", data.token)

        navigate("/chat")
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">

            <div className="w-full max-w-md p-8 border border-gray-800 rounded-xl">

                <h1 className="text-3xl font-bold mb-6">
                    Create Account
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

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        className="p-3 rounded bg-gray-900"
                    />

                    <Button
                        onClick={handleSignup}>
                        Create Account
                    </Button>

                </div>

            </div>

        </div>
    );
}

export default SignupPage;
