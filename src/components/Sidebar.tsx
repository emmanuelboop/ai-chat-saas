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

type SidebarProps = {
    conversations: Conversation[];
    activeConversationId: string;
    setActiveConversationId: (id: string) => void;
    createNewConversation: () => void;
    deleteConversation: (conversationId: string) => void;
    renameConversation: (conversationId: string, newTitle: string) => void;
}

function Sidebar({ conversations, activeConversationId, setActiveConversationId,
    createNewConversation, deleteConversation, renameConversation
}: SidebarProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState("");
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">
            AI Chat
        </h1>
        <Button onClick={createNewConversation}>
            New Chat
        </Button>

        <div className="flex flex-col gap-2">
            {conversations.map((conversation) => (
                <div
                    key={conversation.id}
                    className="flex items-center gap-2"
                >
                    <div
                        onClick={() =>
                            setActiveConversationId(conversation.id)
                        }
                        className={`flex-1 p-3 rounded-lg cursor-pointer ${conversation.id === activeConversationId
                            ? "bg-gray-700"
                            : "hover:bg-gray-800"
                            }`}
                    >
                        {editingId === conversation.id ? (
                            <input
                                autoFocus
                                type="text"
                                value={editingTitle}
                                onChange={(e) =>
                                    setEditingTitle(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        renameConversation(conversation.id, editingTitle.trim() || "New Chat");
                                        setEditingId(null);
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
                            />) : (
                            conversation.title
                        )
                        }
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                            >
                                ⋮
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => {
                                    setEditingId(conversation.id)
                                    setEditingTitle(conversation.title)
                                }
                                }
                            >
                                Rename
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => {
                                    if (
                                        confirm(
                                            "Delete this conversation?"
                                        )
                                    ) {
                                        deleteConversation(
                                            conversation.id
                                        )
                                    }
                                }}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            ))}
            <Button
                variant="destructive"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    </div>
}

export default Sidebar;