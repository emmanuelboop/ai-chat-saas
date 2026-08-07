import { Button } from "@/components/ui/button"

type ChatInputProps = {
    input: string
    setInput: React.Dispatch<React.SetStateAction<string>>
    handleSendMessage: () => void
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    isLoading: boolean
}

function ChatInput({
    input,
    setInput,
    handleSendMessage,
    handleKeyDown,
    isLoading,
}: ChatInputProps) {
    return (
        <div className="flex gap-3 max-w-3xl mx-auto">
            <input
                type="text"
                placeholder="Ask anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all placeholder:text-muted-foreground"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                onKeyDown={handleKeyDown}
            />
            <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="px-6 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 border-0 shadow-md shadow-indigo-500/20 disabled:opacity-50"
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Streaming
                    </span>
                ) : (
                    "Send"
                )}
            </Button>
        </div>
    )
}

export default ChatInput
