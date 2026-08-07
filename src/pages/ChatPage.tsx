import Sidebar from "@/components/Sidebar"
import ChatArea from "@/components/ChatArea"
import { useConversations } from "@/hooks/useConversations"

function ChatPage() {
    const {
        conversations,
        activeConversationId,
        setActiveConversationId,
        createNewConversation,
        updateConversationTitle,
        updateConversationMessages,
        deleteConversation,
        renameConversation,
    } = useConversations()

    const activeConversation = conversations.find(
        (conversation) => conversation.id === activeConversationId
    )

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-foreground">
            <div className="w-72 border-r border-white/10 p-4 shrink-0">
                <Sidebar
                    conversations={conversations}
                    activeConversationId={activeConversationId}
                    setActiveConversationId={setActiveConversationId}
                    createNewConversation={createNewConversation}
                    deleteConversation={deleteConversation}
                    renameConversation={renameConversation}
                />
            </div>

            <div className="flex-1 p-4 min-w-0">
                <ChatArea
                    activeConversation={activeConversation}
                    updateConversationMessages={updateConversationMessages}
                    updateConversationTitle={updateConversationTitle}
                />
            </div>
        </div>
    )
}

export default ChatPage
