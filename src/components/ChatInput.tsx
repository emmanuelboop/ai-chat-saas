import { Button } from "@/components/ui/button"

type ChatInputProps = {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleSendMessage: () => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    isLoading: boolean;
}

function ChatInput({
    input, setInput, handleSendMessage, handleKeyDown, isLoading
}: ChatInputProps) {
    return (
        <div className="flex gap-2">

            <input
                type="text"
                placeholder="Ask anything..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                onKeyDown={handleKeyDown}
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
                {isLoading ? "Thinking..." : "Send"}
            </Button>
        </div>
    )
}

export default ChatInput;