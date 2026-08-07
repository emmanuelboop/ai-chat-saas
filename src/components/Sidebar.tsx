import { Button } from "@/components/ui/button"
import type { Conversation } from "@/types/conversation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getDisplayName, getUserEmail, getUserInitials } from "@/lib/auth"

type SidebarProps = {
    conversations: Conversation[]
    activeConversationId: string
    setActiveConversationId: (id: string) => void
    createNewConversation: () => void
    deleteConversation: (conversationId: string) => void
    renameConversation: (conversationId: string, newTitle: string) => void
}

function Sidebar({
    conversations,
    activeConversationId,
    setActiveConversationId,
    createNewConversation,
    deleteConversation,
    renameConversation,
}: SidebarProps) {
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editingTitle, setEditingTitle] = useState("")
    const navigate = useNavigate()
    const displayName = getDisplayName()
    const email = getUserEmail()
    const initials = getUserInitials()

    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold shadow-md shadow-indigo-500/20">
                    ✦
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight">NovaChat</h1>
                    <p className="text-xs text-muted-foreground">AI Chat SaaS</p>
                </div>
            </div>

            <Button
                onClick={createNewConversation}
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 border-0 shadow-md shadow-indigo-500/20"
            >
                + New Chat
            </Button>

            <div className="flex-1 overflow-y-auto flex flex-col gap-1 -mx-1 px-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-1">
                    Conversations
                </p>
                {conversations.map((conversation) => (
                    <div
                        key={conversation.id}
                        className="flex items-center gap-1 group"
                    >
                        <div
                            onClick={() => setActiveConversationId(conversation.id)}
                            className={`flex-1 px-3 py-2.5 rounded-lg cursor-pointer text-sm truncate transition-colors ${
                                conversation.id === activeConversationId
                                    ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
                                    : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {editingId === conversation.id ? (
                                <input
                                    autoFocus
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            renameConversation(conversation.id, editingTitle.trim() || "New Chat")
                                            setEditingId(null)
                                        }
                                    }}
                                    onBlur={() => {
                                        renameConversation(
                                            conversation.id,
                                            editingTitle.trim() || "New Chat"
                                        )
                                        setEditingId(null)
                                    }}
                                    placeholder="Conversation Title"
                                    className="w-full bg-transparent outline-none"
                                />
                            ) : (
                                conversation.title
                            )}
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                                >
                                    ⋮
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setEditingId(conversation.id)
                                        setEditingTitle(conversation.title)
                                    }}
                                >
                                    Rename
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => {
                                        if (confirm("Delete this conversation?")) {
                                            deleteConversation(conversation.id)
                                        }
                                    }}
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}
            </div>

            <div className="border-t border-white/10 pt-4 mt-auto">
                <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-white/5 mb-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-xs font-bold">
                        {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{displayName}</p>
                        <p className="text-xs text-muted-foreground truncate">{email}</p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full border-white/10 hover:bg-white/5"
                >
                    Sign out
                </Button>
            </div>
        </div>
    )
}

export default Sidebar
