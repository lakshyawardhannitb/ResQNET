import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Victim from './views/Victim'
import Ndrf from './views/Ndrf'

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-900 text-white min-h-screen">
        <nav className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="font-bold text-red-500">DisasterNet</div>
            <div className="flex items-center gap-4 text-sm">
              <Link className="hover:text-red-400" to="/victim">Victim UI</Link>
              <Link className="hover:text-yellow-400" to="/ndrf">NDRF UI</Link>
              <a className="text-gray-400" href="https://localhost:3001" target="_blank" rel="noreferrer">API</a>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/victim" element={<Victim />} />
          <Route path="/ndrf" element={<Ndrf />} />
          <Route path="*" element={<Navigate to="/victim" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App