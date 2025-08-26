import React, { useState, useEffect } from 'react'

function App() {
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)

  const API_URL = 'http://localhost:3001'

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/messages`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
        setIsConnected(true)
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      setIsConnected(false)
    }
  }

  // Send message to backend
  const sendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      const response = await fetch(`${API_URL}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      })

      if (response.ok) {
        setNewMessage('')
        // Refresh messages after sending
        setTimeout(fetchMessages, 100)
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  // Poll for new messages every 2 seconds
  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2">DisasterNet</h1>
          <p className="text-gray-400">Emergency Communication Network</p>
          <div className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm ${
            isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              isConnected ? 'bg-green-400' : 'bg-red-400'
            }`}></div>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        {/* Messages Container */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 h-96 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Messages ({messages.length})</h2>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No messages yet. Start the conversation!</p>
          ) : (
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-white">{message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Send Message</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your emergency message here..."
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
              disabled={!isConnected}
            />
            <button
              onClick={sendMessage}
              disabled={!isConnected || !newMessage.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Send
            </button>
          </div>
        </div>

        {/* API Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Backend API: {API_URL}</p>
          <p>Endpoints: GET /messages, POST /send</p>
        </div>
      </div>
    </div>
  )
}

export default App