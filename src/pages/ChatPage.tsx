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
  } = useConversations();

  const activeConversation = conversations.find((conversation) =>
    conversation.id === activeConversationId
  );

  

  

  return (
    <div className="flex h-screen bg-black text-white">

      <div className="w-64 border-r border-gray-800 p-4">
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          setActiveConversationId={setActiveConversationId}
          createNewConversation={createNewConversation}
          deleteConversation={deleteConversation}
          renameConversation={renameConversation}
        />
      </div>

      <div className="flex-1 p-4">
        <ChatArea activeConversation={activeConversation}
          updateConversationMessages={updateConversationMessages}
          updateConversationTitle={updateConversationTitle}
        />
      </div>

    </div>
  )
}

export default ChatPage