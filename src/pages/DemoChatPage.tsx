import Sidebar from "@/components/Sidebar"
import ChatArea from "@/components/ChatArea"
import type { Conversation } from "@/types/conversation"

const DEMO_PAYLOAD = {
    id: "660000000000000000000000",
    email: "demo@novachat.dev",
    exp: 9999999999,
}

const DEMO_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    btoa(JSON.stringify(DEMO_PAYLOAD))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "") +
    ".demo"

const demoConversations: Conversation[] = [
    {
        id: "demo-1",
        title: "Getting started with NovaChat",
        messages: [],
    },
]

/**
 * Static demo view for README screenshots — no backend required.
 */
function DemoChatPage() {
    localStorage.setItem("token", DEMO_TOKEN)

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-foreground">
            <div className="w-72 border-r border-white/10 p-4 shrink-0">
                <Sidebar
                    conversations={demoConversations}
                    activeConversationId="demo-1"
                    setActiveConversationId={() => {}}
                    createNewConversation={() => {}}
                    deleteConversation={() => {}}
                    renameConversation={() => {}}
                />
            </div>

            <div className="flex-1 p-4 min-w-0">
                <ChatArea
                    activeConversation={demoConversations[0]}
                    updateConversationMessages={() => {}}
                    updateConversationTitle={() => {}}
                />
            </div>
        </div>
    )
}

export default DemoChatPage
