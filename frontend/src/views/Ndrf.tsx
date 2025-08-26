import { useState, useEffect, useMemo } from 'react'

function Ndrf() {
  const [messages, setMessages] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [filter, setFilter] = useState('')

  const API_URL = 'http://localhost:3001'

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

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 1500)
    return () => clearInterval(interval)
  }, [])

  const filteredMessages = useMemo(() => {
    if (!filter.trim()) return messages
    const q = filter.toLowerCase()
    return messages.filter(m => m.toLowerCase().includes(q))
  }, [messages, filter])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">NDRF Command</h1>
            <p className="text-gray-400">Real-time emergency feed</p>
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
            isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              isConnected ? 'bg-green-400' : 'bg-red-400'
            }`}></div>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by keyword (e.g. high, medical, flood)"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Live Alerts</h2>
              <span className="text-gray-400 text-sm">{filteredMessages.length} items</span>
            </div>
            <div className="space-y-2 max-h-[32rem] overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No alerts</p>
              ) : (
                filteredMessages.map((message, index) => (
                  <div key={index} className="bg-gray-700 p-3 rounded-lg text-sm">
                    <p>{message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Priority Filters</h2>
            <div className="flex flex-wrap gap-2">
              {['high', 'medical', 'police', 'fire', 'flood', 'rescue'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className="px-3 py-1 rounded-full bg-yellow-600/20 text-yellow-300 hover:bg-yellow-600/30"
                >
                  {tag}
                </button>
              ))}
              <button
                onClick={() => setFilter('')}
                className="px-3 py-1 rounded-full bg-gray-600/40 text-gray-200 hover:bg-gray-600/60"
              >
                Clear
              </button>
            </div>
            <div className="mt-6 text-gray-400 text-sm">
              <p>Backend API: {API_URL} (GET /messages, POST /send)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ndrf