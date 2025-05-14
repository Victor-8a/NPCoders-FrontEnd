import { ArrowLeft, Send, Paperclip, Smile } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ChatDetailPage({ params }: { params: { id: string } }) {
  // Datos de ejemplo para el chat actual
  const chatId = Number.parseInt(params.id)

  const currentChat = {
    id: chatId,
    name: chatId === 1 ? "Gwen Tennyson" : chatId === 3 ? "Abuelo Max" : "Usuario",
    avatar: "/placeholder.svg?height=50&width=50",
    online: true,
    lastSeen: "Hace 5 minutos",
  }

  // Mensajes de ejemplo
  const messages = [
    {
      id: 1,
      sender: "them",
      text: "Hola Ben, ¿cómo va todo con el Omnitrix?",
      time: "10:30",
    },
    {
      id: 2,
      sender: "me",
      text: "Todo bien, aunque a veces se transforma en el alien equivocado.",
      time: "10:32",
    },
    {
      id: 3,
      sender: "them",
      text: "Deberías pedirle ayuda a Azmuth para que lo revise.",
      time: "10:33",
    },
    {
      id: 4,
      sender: "me",
      text: "Sí, tienes razón. Lo intentaré contactar pronto.",
      time: "10:35",
    },
    {
      id: 5,
      sender: "them",
      text: "Por cierto, ¿has visto algún actividad extraña últimamente? Hay rumores de que Vilgax está de vuelta.",
      time: "10:40",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col text-white bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-emerald-500/70 p-4 shadow-lg shadow-emerald-500/10">
        <div className="max-w-2xl mx-auto flex items-center">
          <Link href="/chats" className="mr-4 p-2 rounded-full hover:bg-emerald-500/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-emerald-400" />
          </Link>

          <div className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5">
                <div className="absolute inset-0.5 rounded-full bg-gray-900">
                  <Image
                    src={currentChat.avatar || "/placeholder.svg"}
                    alt={currentChat.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <h1 className="font-bold text-lg text-white">{currentChat.name}</h1>
              <p className="text-xs text-emerald-400">{currentChat.online ? "En línea" : currentChat.lastSeen}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === "me"
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-br-none"
                    : "bg-gray-800 text-white rounded-bl-none border border-emerald-600/20"
                }`}
              >
                <p>{message.text}</p>
                <span
                  className={`text-xs block mt-1 ${message.sender === "me" ? "text-emerald-200" : "text-gray-400"}`}
                >
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-emerald-600/30 bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full text-emerald-400 hover:bg-emerald-500/10 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>

            <div className="flex-1 bg-gray-800/60 rounded-full border border-emerald-600/30 px-4 py-2 focus-within:border-emerald-500/50 transition-colors">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="w-full bg-transparent outline-none text-white"
              />
            </div>

            <button className="p-2 rounded-full text-emerald-400 hover:bg-emerald-500/10 transition-colors">
              <Smile className="w-5 h-5" />
            </button>

            <button className="p-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:opacity-90 transition-opacity">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
