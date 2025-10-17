"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { 
  Mic, 
  Trash2, 
  Repeat
} from "lucide-react"

export default function QuantHUDv2() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  
  const [projects] = useState([
    {
      id: "1",
      name: "Structural Steel - Building A",
      client: "ABC Construction",
      location: "Downtown",
      shopRate: 95,
      items: 24,
      totalHours: 156.5,
      status: "active"
    },
    {
      id: "2",
      name: "Rebar Fabrication",
      client: "XYZ Contractors",
      location: "West Side",
      shopRate: 85,
      items: 18,
      totalHours: 89.0,
      status: "active"
    }
  ])

  const [recentItems] = useState([
    {
      id: "1",
      drawing: "DWG-001",
      detail: "Column Base",
      category: "Steel",
      shape: "W-Shape",
      size: "W12x40",
      qty: 4,
      lengthFt: 20.0,
      totalMin: 210
    },
    {
      id: "2",
      drawing: "DWG-002",
      detail: "Beam",
      category: "Steel",
      shape: "W-Shape",
      size: "W18x50",
      qty: 8,
      lengthFt: 30.0,
      totalMin: 420
    },
    {
      id: "3",
      drawing: "DWG-003",
      detail: "Plate",
      category: "Steel",
      shape: "Plate",
      size: "1/2\" x 12\" x 24\"",
      qty: 12,
      lengthFt: null,
      totalMin: 180
    }
  ])

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice recognition would be implemented here
    if (!isListening) {
      setTranscript("Listening...")
    } else {
      setTranscript("")
    }
  }

  const calculateTotals = () => {
    const totalItems = projects.reduce((sum, p) => sum + p.items, 0)
    const totalHours = projects.reduce((sum, p) => sum + p.totalHours, 0)
    const avgRate = projects.reduce((sum, p) => sum + p.shopRate, 0) / projects.length
    const totalRevenue = totalHours * avgRate

    return { totalItems, totalHours, avgRate, totalRevenue }
  }

  const totals = calculateTotals()

  return (
    <div className="min-h-screen bg-[#0a1525] text-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-wider text-cyan-400">QUANT // HUD</h1>
      </div>

      {/* Live Estimate Bar */}
      <div className="mb-6 bg-[#0f1f35] border border-cyan-900/30 rounded-lg p-4">
        <div className="text-xs text-cyan-400 mb-2 tracking-wide">LIVE ESTIMATE</div>
        <div className="flex items-center gap-8 flex-wrap">
          <div>
            <span className="text-xs text-gray-400">TONS</span>
            <div className="text-cyan-400 font-mono text-lg">0.247</div>
          </div>
          <div>
            <span className="text-xs text-gray-400">MH/Ton</span>
            <div className="text-cyan-400 font-mono text-lg">11.01</div>
          </div>
          <div>
            <span className="text-xs text-gray-400">WELD IN</span>
            <div className="text-cyan-400 font-mono text-lg">72</div>
          </div>
          <div>
            <span className="text-xs text-gray-400">MH (Total)</span>
            <div className="text-cyan-400 font-mono text-lg">2.72</div>
          </div>
          <div>
            <span className="text-xs text-gray-400">Labor $</span>
            <div className="text-cyan-400 font-mono text-lg">${totals.totalRevenue.toFixed(2)}</div>
          </div>
          <div>
            <span className="text-xs text-gray-400">Rate</span>
            <div className="text-cyan-400 font-mono text-lg">{totals.avgRate}/hr</div>
          </div>
          <div className="flex-1">
            <span className="text-xs text-gray-400">CONF</span>
            <div className="h-2 bg-gray-700 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-cyan-400" style={{width: '85%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="mb-24 bg-[#0f1f35] border border-cyan-900/30 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0a1525] border-b border-cyan-900/30">
              <tr className="text-cyan-400 text-xs uppercase">
                <th className="p-3 text-left font-medium">
                  <input type="checkbox" className="mr-2" />
                </th>
                <th className="p-3 text-left font-medium">DRAWING</th>
                <th className="p-3 text-left font-medium">DETAIL</th>
                <th className="p-3 text-left font-medium">ITEM</th>
                <th className="p-3 text-left font-medium">SHAPE</th>
                <th className="p-3 text-left font-medium">SIZE</th>
                <th className="p-3 text-left font-medium">LENGTH</th>
                <th className="p-3 text-left font-medium">QTY</th>
                <th className="p-3 text-left font-medium">WEIGHT (LB)</th>
                <th className="p-3 text-left font-medium">WELD (IN)</th>
                <th className="p-3 text-left font-medium">MH TOTAL</th>
                <th className="p-3 text-left font-medium">LABOR COST</th>
                <th className="p-3 text-left font-medium">CATEGORY</th>
                <th className="p-3 text-left font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {recentItems.map((item, idx) => (
                <tr key={item.id} className="border-b border-cyan-900/20 hover:bg-cyan-950/20">
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3 font-mono text-cyan-400">{item.drawing}</td>
                  <td className="p-3">{item.detail}</td>
                  <td className="p-3">Member</td>
                  <td className="p-3">{item.shape}</td>
                  <td className="p-3">{item.size}</td>
                  <td className="p-3">{item.lengthFt ? `${item.lengthFt}'-0"` : '—'}</td>
                  <td className="p-3">{item.qty}</td>
                  <td className="p-3">{idx === 0 ? 468 : idx === 1 ? 20.4 : 5.1}</td>
                  <td className="p-3">{idx === 0 ? 0 : idx === 1 ? 48 : 24}</td>
                  <td className="p-3 font-mono">{(item.totalMin / 60).toFixed(2)}</td>
                  <td className="p-3">${(item.totalMin / 60 * totals.avgRate).toFixed(2)}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">
                    <button className="px-3 py-1 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-400 rounded text-xs">
                      Breakdown
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Transcript Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a1525] border-t border-cyan-900/30 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {/* Left - Transcript */}
            <div>
              <div className="text-xs text-cyan-400 mb-2 tracking-wide">TRANSCRIPT</div>
              <div className="space-y-2 text-sm text-gray-300 font-mono">
                <div>[08:14] Drawing S2.4, detail 2.5, two W12x26 eighteen-foot zero...</div>
                <div>[08:15] Base plate twelve by twelve by half, weld all around quarter fillet.</div>
                <div>[08:16] Cap plate six by six by half, weld all around quarter fillet.</div>
              </div>
              <div className="text-xs text-gray-500 mt-2">1/1 select • R rephrase • X repeat</div>
            </div>
            
            {/* Right - Controls */}
            <div className="flex flex-col items-end justify-end gap-3">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-cyan-900/20 border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/40"
                >
                  <Repeat className="mr-2 h-4 w-4" />
                  Repeat
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-cyan-900/20 border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/40"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <button 
                  onClick={handleVoiceInput}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                    isListening 
                      ? 'bg-red-500/20 ring-4 ring-red-500/50 animate-pulse' 
                      : 'bg-cyan-500/20 ring-4 ring-cyan-500/30 hover:ring-cyan-500/50'
                  }`}
                >
                  <Mic className={`h-8 w-8 ${isListening ? 'text-red-400' : 'text-cyan-400'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

