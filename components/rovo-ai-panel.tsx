"use client"

import { useState, useEffect, useRef } from "react"

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
}

const suggestionPrompts = [
  {
    id: 1,
    text: "What should I work on next?",
  },
  {
    id: 2,
    text: "Take Jira issue description and align it to best-practice.",
  },
  {
    id: 3,
    text: "List Jira issues that are currently \"In Progress\" and group them by assignee.",
  },
]

const sampleResponses: { [key: string]: string } = {
  "What should I work on next?": "Based on your current workload and priorities, I recommend:\n\n1. **Complete the user authentication module** - This is blocking 3 other features\n2. **Review the API documentation** - Your team needs this finalized\n3. **Test the payment integration** - This has been pending for 2 days\n\nWould you like me to provide more details on any of these items?",
  "Take Jira issue description and align it to best-practice.": "I can help align your Jira issues to best practices. Here are the key improvements:\n\n✓ Use clear, action-oriented titles\n✓ Include acceptance criteria\n✓ Add story points for estimation\n✓ Link related issues\n✓ Use proper labels and tags\n\nWould you like me to analyze specific issues?",
  "List Jira issues that are currently \"In Progress\" and group them by assignee.": "Here are your current 'In Progress' issues grouped by assignee:\n\n**John Smith (3 issues)**\n- API Integration Setup\n- Database Schema Migration\n- Error Handling Implementation\n\n**Sarah Johnson (2 issues)**\n- UI Component Library\n- Responsive Design Testing\n\n**Team Lead (1 issue)**\n- Project Documentation\n\nTotal: 6 issues in progress",
}

const agents = [
  {
    id: 1,
    name: "Work Item Planner",
    icon: "orange",
  },
  {
    id: 2,
    name: "Job Listing Assistant",
    icon: "yellow",
  },
  {
    id: 3,
    name: "Release Notes Drafter",
    icon: "blue",
  },
]

const chatHistory = [
  {
    id: 1,
    text: "HOw many issue i have created in last 3 weeks",
  },
  {
    id: 2,
    text: "How many issue i create in last 2 week?",
  },
]

export function RovoAIPanel({ isOpen, onClose }: RovoAIPanelProps) {
  const [inputValue, setInputValue] = useState("")
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputValue,
    }

    setMessages(prev => [...prev, userMessage])

    // Add streaming assistant message
    const userInput = inputValue
    setTimeout(() => {
      const response = sampleResponses[userInput] || "I'm here to help! Please provide more details about what you need, and I'll do my best to assist you with your Jira workflow and project management."
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: '',
        isStreaming: true,
      }

      setMessages(prev => [...prev, assistantMessage])

      // Stream the response character by character
      let charIndex = 0
      const streamInterval = setInterval(() => {
        if (charIndex < response.length) {
          setMessages(prev => {
            const newMessages = [...prev]
            const lastMessage = newMessages[newMessages.length - 1]
            if (lastMessage && lastMessage.type === 'assistant') {
              lastMessage.content += response[charIndex]
            }
            return newMessages
          })
          charIndex++
        } else {
          clearInterval(streamInterval)
          setMessages(prev => {
            const newMessages = [...prev]
            const lastMessage = newMessages[newMessages.length - 1]
            if (lastMessage && lastMessage.type === 'assistant') {
              lastMessage.isStreaming = false
            }
            return newMessages
          })
        }
      }, 15) // Adjust speed (milliseconds per character)
    }, 500)

    setInputValue("")
  }

  const handleSuggestionClick = (text: string) => {
    setInputValue(text)
  }

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "fixed top-14 right-0 h-[calc(100vh-56px)] bg-card border-l border-border shadow-xl z-50 flex transition-transform duration-300 w-[420px]",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Side Menu - Inside the panel */}
      <div
        className={cn(
          "absolute inset-0 bg-card z-10 flex flex-col transition-all duration-300",
          isSideMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Side Menu Header */}
        <div className="p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 cursor-pointer hover:bg-accent"
            onClick={() => setIsSideMenuOpen(false)}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>

        {/* New Chat */}
        <div className="px-4 py-2">
          <button className="flex items-center gap-3 w-full text-left hover:bg-accent rounded-lg px-3 py-2 cursor-pointer transition-colors">
            <Edit2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground">New chat</span>
          </button>
        </div>

        {/* Agents Section */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Agents</span>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 cursor-pointer hover:bg-accent">
              <Plus className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </div>
          <div className="space-y-1 ml-4">
            {agents.map((agent) => (
              <button
                key={agent.id}
                className="flex items-center gap-3 w-full text-left hover:bg-accent rounded-lg px-3 py-2 cursor-pointer transition-colors"
              >
                <div className={cn(
                  "w-5 h-5 rounded flex items-center justify-center",
                  agent.icon === "orange" && "bg-orange-500",
                  agent.icon === "yellow" && "bg-yellow-500",
                  agent.icon === "blue" && "bg-blue-500"
                )}>
                  <span className="text-white text-[10px] font-bold">
                    {agent.icon === "orange" ? "W" : agent.icon === "yellow" ? "J" : "R"}
                  </span>
                </div>
                <span className="text-sm text-foreground">{agent.name}</span>
              </button>
            ))}
            <button className="flex items-center gap-3 w-full text-left hover:bg-accent rounded-lg px-3 py-2 cursor-pointer transition-colors">
              <AlignJustify className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">View all agents</span>
            </button>
          </div>
        </div>

        {/* Chats Section */}
        <div className="px-4 py-2 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Chats</span>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 cursor-pointer hover:bg-accent">
              <Plus className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </div>
          <div className="ml-4">
            <p className="text-xs text-muted-foreground px-3 py-2">This past month</p>
            <div className="space-y-1">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className="flex items-center gap-3 w-full text-left hover:bg-accent rounded-lg px-3 py-2 cursor-pointer transition-colors"
                >
                  <span className="text-sm text-foreground truncate">{chat.text}</span>
                </button>
              ))}
              <button className="flex items-center gap-3 w-full text-left hover:bg-accent rounded-lg px-3 py-2 cursor-pointer transition-colors">
                <AlignJustify className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">View all conversations</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 cursor-pointer hover:bg-accent"
              onClick={() => setIsSideMenuOpen(true)}
            >
              <Menu className="h-4 w-4 text-muted-foreground" />
            </Button>
            <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80">
              <div className="w-6 h-6 rounded flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-semibold text-foreground">Rovo</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer hover:bg-accent">
              <Edit2 className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer hover:bg-accent">
              <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer hover:bg-accent">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 cursor-pointer hover:bg-accent"
              onClick={onClose}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {messages.length === 0 ? (
            // Initial State
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              {/* Rovo Logo */}
              <div className="mb-6">
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <circle cx="20" cy="32" r="14" fill="#0052CC" />
                    <circle cx="44" cy="20" r="12" fill="#FFAB00" />
                    <circle cx="44" cy="44" r="10" fill="#36B37E" />
                    <circle cx="32" cy="38" r="8" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>

              {/* Greeting */}
              <h2 className="text-2xl font-semibold text-foreground mb-8">
                How can I help, PATEL?
              </h2>

              {/* Suggestion Prompts */}
              <div className="w-full space-y-3">
                {suggestionPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors text-left"
                    onClick={() => handleSuggestionClick(prompt.text)}
                  >
                    <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Chat Messages
            <div className="flex flex-col gap-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.type === 'assistant' && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 mt-1">
                      <Sparkles className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm max-w-[280px] break-words",
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.isStreaming && (
                      <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse rounded-sm" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Context Section */}
        

        {/* Input Section */}
        <div className="p-4 border-t border-border">
          <div className="bg-secondary rounded-lg p-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              placeholder="Write a prompt, @someone, or use / for actions"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none min-h-[60px]"
              rows={2}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer hover:bg-accent">
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 cursor-pointer hover:bg-accent">
                  <Settings2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <Button 
                size="icon" 
                className={cn(
                  "h-7 w-7 rounded-full cursor-pointer",
                  inputValue ? "bg-primary hover:bg-primary/90" : "bg-muted"
                )}
                disabled={!inputValue}
                onClick={handleSubmit}
              >
                <Send className="h-4 w-4 text-primary-foreground" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 text-center border-t border-border">
          <a href="#" className="text-xs text-muted-foreground hover:underline cursor-pointer inline-flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full border border-muted-foreground flex items-center justify-center text-[8px]">i</span>
            Uses AI. Verify results.
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
