import { useState, useRef, useEffect } from 'react'
    import { Input } from '../components/ui/input'
    import { Button } from '../components/ui/button'
    import { Icons } from '../components/icons'
    import { useChatStore } from '../store/chat'
    import { ChatMessage } from '../components/chat-message'
    import { ScrollArea } from '../components/ui/scroll-area'

    export function Chat() {
      const [input, setInput] = useState('')
      const chatBottomRef = useRef(null)
      const { messages, addMessage, sendMessage } = useChatStore()

      useEffect(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, [messages])

      const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!input) return
        addMessage({ role: 'user', content: input })
        setInput('')
        await sendMessage(input)
      }

      return (
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 mb-4">
            <div className="p-4">
              {messages.map((message, i) => (
                <ChatMessage key={i} message={message} />
              ))}
              <div ref={chatBottomRef} />
            </div>
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter your message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit" disabled={!input}>
                <Icons.chat className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </form>
        </div>
      )
    }
