"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import BidCalendar from './BidCalendar'
import { 
  Mic, 
  Trash2, 
  Repeat,
  Maximize2,
  Minimize2,
  Settings,
  Copy
} from "lucide-react"

interface ProjectData {
  id: string;
  name: string;
  client?: string;
  location?: string;
  projectType?: string;
  estimateNumber?: string;
  estimator?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  units?: string;
  shopRate: number;
  bidDueAt?: string | null;
}

export default function QuantHUDv2() {
  const [isListening, setIsListening] = useState(false)
  const [density, setDensity] = useState<'compact' | 'comfortable'>('compact')
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  // Current project (in real app, this would be loaded from API)
  const [currentProject, setCurrentProject] = useState<ProjectData>({
    id: 'demo-project-id',
    name: 'Structural Steel - Building A',
    client: 'ABC Construction',
    location: 'Downtown',
    projectType: 'Structural Steel',
    estimateNumber: 'EST-2024-001',
    estimator: 'John Smith',
    contactName: 'Jane Doe',
    contactEmail: 'jane.doe@abc-const.com',
    contactPhone: '(555) 123-4567',
    units: 'Imperial',
    shopRate: 95,
    bidDueAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days from now
  })
  
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
  }

  const copyProjectInfo = () => {
    const info = `Project: ${currentProject.name}
Type: ${currentProject.projectType || '—'}
Estimate #: ${currentProject.estimateNumber || '—'}
GC: ${currentProject.client || '—'}
Contact: ${currentProject.contactName || '—'} (${currentProject.contactEmail || '—'})
Phone: ${currentProject.contactPhone || '—'}
Location: ${currentProject.location || '—'}
Bid Due: ${currentProject.bidDueAt ? new Date(currentProject.bidDueAt).toLocaleString() : '—'}`;
    
    navigator.clipboard.writeText(info);
  }

  const getBidDueStatus = () => {
    if (!currentProject.bidDueAt) return null;
    const dueDate = new Date(currentProject.bidDueAt);
    const now = new Date();
    const hoursUntilDue = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursUntilDue < 0) return { color: 'text-red-400 bg-red-500/20', label: 'OVERDUE' };
    if (hoursUntilDue <= 24) return { color: 'text-amber-400 bg-amber-500/20', label: '< 24 hrs' };
    if (hoursUntilDue <= 48) return { color: 'text-yellow-400 bg-yellow-500/20', label: '< 48 hrs' };
    return { color: 'text-cyan-400 bg-cyan-500/20', label: '' };
  }

  const saveProjectSettings = async (updatedProject: ProjectData) => {
    // In real app: await fetch('/api/projects', { method: 'PATCH', body: JSON.stringify(updatedProject) })
    setCurrentProject(updatedProject);
    setSettingsOpen(false);
  }

  const calculateTotals = () => {
    const totalItems = projects.reduce((sum, p) => sum + p.items, 0)
    const totalHours = projects.reduce((sum, p) => sum + p.totalHours, 0)
    const avgRate = projects.reduce((sum, p) => sum + p.shopRate, 0) / projects.length
    const totalRevenue = totalHours * avgRate

    return { totalItems, totalHours, avgRate, totalRevenue }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatNumber = (value: number, decimals = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value)
  }

  const totals = calculateTotals()
  const padding = density === 'compact' ? 'p-2' : 'p-4'

  const bidDueStatus = getBidDueStatus();

  return (
    <div className="min-h-screen bg-[#0a1525] text-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-wider text-cyan-400">QUANT // HUD</h1>
      </div>

      {/* Project Admin Strip */}
      <div className="mb-6 rounded-lg border border-cyan-900/30 bg-[#0f1f35] overflow-hidden">
        <div className="bg-[#0a1525] px-4 py-2 border-b border-cyan-900/30">
          <div className="text-xs text-cyan-400 tracking-wide font-semibold">PROJECT ADMIN</div>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2 text-sm flex-1">
              <div className="text-cyan-200 font-medium text-lg">{currentProject.name}</div>
              <div className="text-gray-400">
                <span className="text-gray-500">GC:</span> {currentProject.client || '—'} · 
                <span className="text-gray-500 ml-2">Contact:</span> {currentProject.contactName || '—'} 
                ({currentProject.contactEmail || '—'}) · {currentProject.contactPhone || '—'}
              </div>
              <div className="text-gray-400">
                <span className="text-gray-500">Type:</span> {currentProject.projectType || '—'} · 
                <span className="text-gray-500 ml-2">Estimator:</span> {currentProject.estimator || '—'} · 
                <span className="text-gray-500 ml-2">Est. #:</span> {currentProject.estimateNumber || '—'}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm">
                <div className="text-gray-500 text-xs mb-1">Bid Due:</div>
                <div className={`px-3 py-1.5 rounded font-mono text-sm ${bidDueStatus?.color || 'text-cyan-400 bg-cyan-500/20'}`}>
                  {currentProject.bidDueAt ? (
                    <>
                      {new Date(currentProject.bidDueAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                      {bidDueStatus?.label && (
                        <span className="ml-2 text-xs">({bidDueStatus.label})</span>
                      )}
                    </>
                  ) : '—'}
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={copyProjectInfo}
                className="bg-cyan-900/20 border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/40"
              >
                <Copy className="mr-2 h-3 w-3" />
                Copy Info
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSettingsOpen(true)}
                className="bg-cyan-900/20 border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/40"
              >
                <Settings className="mr-2 h-3 w-3" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Calendar */}
      <div className="mb-6">
        <BidCalendar projectId={currentProject.id} />
      </div>

      {/* Live Estimate Bar */}
      <div className="mb-6 bg-[#0f1f35] border border-cyan-900/30 rounded-lg overflow-hidden">
        <div className="bg-[#0a1525] px-4 py-2 border-b border-cyan-900/30">
          <div className="text-xs text-cyan-400 tracking-wide font-semibold">LIVE ESTIMATE</div>
        </div>
        <div className="p-4" aria-live="polite" aria-atomic="true">
          <div className="flex items-center gap-8 flex-wrap">
            <div>
              <span className="text-xs text-gray-400">TONS</span>
              <div className="text-cyan-400 font-mono text-lg">{formatNumber(0.247, 3)}</div>
            </div>
            <div>
              <span className="text-xs text-gray-400">MH/Ton</span>
              <div className="text-cyan-400 font-mono text-lg">{formatNumber(11.01, 2)}</div>
            </div>
            <div>
              <span className="text-xs text-gray-400">WELD IN</span>
              <div className="text-cyan-400 font-mono text-lg">72</div>
            </div>
            <div>
              <span className="text-xs text-gray-400">MH (Total)</span>
              <div className="text-cyan-400 font-mono text-lg">{formatNumber(2.72, 2)}</div>
            </div>
            <div>
              <span className="text-xs text-gray-400">Labor $</span>
              <div className="text-cyan-400 font-mono text-lg">{formatCurrency(totals.totalRevenue)}</div>
            </div>
            <div className="ml-auto">
              <span className="text-xs text-gray-400">Rate</span>
              <div className="text-cyan-400 font-mono text-lg">${formatNumber(totals.avgRate, 0)}/hr</div>
            </div>
            <div className="w-48">
              <span className="text-xs text-gray-400">CONF</span>
              <div className="h-2 bg-gray-700 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-cyan-400 transition-all" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setDensity(density === 'compact' ? 'comfortable' : 'compact')}
          className="flex items-center gap-2 px-3 py-1.5 bg-cyan-900/20 border border-cyan-900/30 text-cyan-400 hover:bg-cyan-900/40 rounded text-xs transition-colors"
          aria-label="Toggle table density"
        >
          {density === 'compact' ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          {density === 'compact' ? 'Comfortable' : 'Compact'}
        </button>
      </div>

      {/* Main Table */}
      <TooltipProvider>
        <div className="mb-24 bg-[#0f1f35] border border-cyan-900/30 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#0a1525] border-b border-cyan-900/30 sticky top-0 z-10">
                <tr className="text-cyan-400 text-xs uppercase">
                  <th className={`${padding} text-left font-medium sticky left-0 bg-[#0a1525] z-20`}>
                    <input type="checkbox" className="mr-2" aria-label="Select all rows" />
                  </th>
                  <th className={`${padding} text-left font-medium sticky left-12 bg-[#0a1525] z-20`}>DRAWING</th>
                  <th className={`${padding} text-left font-medium sticky left-32 bg-[#0a1525] z-20`}>DETAIL</th>
                  <th className={`${padding} text-left font-medium`}>ITEM</th>
                  <th className={`${padding} text-left font-medium`}>SHAPE</th>
                  <th className={`${padding} text-left font-medium`}>SIZE</th>
                  <th className={`${padding} text-right font-medium`}>LENGTH</th>
                  <th className={`${padding} text-right font-medium`}>QTY</th>
                  <th className={`${padding} text-right font-medium`}>WEIGHT (LB)</th>
                  <th className={`${padding} text-right font-medium`}>WELD (IN)</th>
                  <th className={`${padding} text-right font-medium`}>
                    <Tooltip>
                      <TooltipTrigger className="underline decoration-dotted">MH TOTAL</TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Total labor minutes ÷ 60</p>
                      </TooltipContent>
                    </Tooltip>
                  </th>
                  <th className={`${padding} text-right font-medium`}>
                    <Tooltip>
                      <TooltipTrigger className="underline decoration-dotted">LABOR COST</TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">MH Total × Shop Rate</p>
                      </TooltipContent>
                    </Tooltip>
                  </th>
                  <th className={`${padding} text-left font-medium`}>CATEGORY</th>
                  <th className={`${padding} text-left font-medium`}>ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {recentItems.map((item, idx) => (
                  <tr 
                    key={item.id} 
                    className={`border-b border-cyan-900/20 hover:bg-cyan-500/10 hover:shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all ${
                      idx % 2 === 1 ? 'bg-white/[0.02]' : ''
                    }`}
                  >
                    <td className={`${padding} sticky left-0 bg-inherit z-10`}>
                      <input type="checkbox" aria-label={`Select ${item.drawing}`} />
                    </td>
                    <td className={`${padding} font-mono text-cyan-400 sticky left-12 bg-inherit z-10`}>{item.drawing}</td>
                    <td className={`${padding} sticky left-32 bg-inherit z-10`}>{item.detail}</td>
                    <td className={padding}>Member</td>
                    <td className={padding}>{item.shape}</td>
                    <td className={padding}>{item.size}</td>
                    <td className={`${padding} text-right`}>{item.lengthFt ? `${item.lengthFt}'-0"` : '—'}</td>
                    <td className={`${padding} text-right font-mono`}>{item.qty}</td>
                    <td className={`${padding} text-right font-mono`}>
                      {formatNumber(idx === 0 ? 468 : idx === 1 ? 20.4 : 5.1, 1)}
                    </td>
                    <td className={`${padding} text-right font-mono`}>{idx === 0 ? 0 : idx === 1 ? 48 : 24}</td>
                    <td className={`${padding} text-right font-mono text-cyan-300`}>
                      {formatNumber(item.totalMin / 60, 2)}
                    </td>
                    <td className={`${padding} text-right font-mono text-green-400`}>
                      {formatCurrency(item.totalMin / 60 * totals.avgRate)}
                    </td>
                    <td className={padding}>{item.category}</td>
                    <td className={padding}>
                      <button 
                        className="px-3 py-1 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-400 rounded text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            // Handle breakdown action
                          }
                        }}
                        aria-label={`View breakdown for ${item.drawing}`}
                      >
                        Breakdown
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TooltipProvider>

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

      {/* Project Settings Modal */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-4xl bg-[#0a1525] border-cyan-900/30 text-cyan-100">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">Project Settings</DialogTitle>
          </DialogHeader>
          <ProjectSettingsForm 
            project={currentProject} 
            onSave={saveProjectSettings} 
            onCancel={() => setSettingsOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Project Settings Form Component
function ProjectSettingsForm({ 
  project, 
  onSave, 
  onCancel 
}: { 
  project: ProjectData; 
  onSave: (project: ProjectData) => void; 
  onCancel: () => void;
}) {
  const [local, setLocal] = useState<ProjectData>(project);

  const handleSave = () => {
    onSave(local);
  };

  return (
    <div className="space-y-6">
      {/* Identity */}
      <div>
        <h3 className="text-sm font-semibold text-cyan-400 mb-3">Project Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Project Name</label>
            <Input
              value={local.name}
              onChange={e => setLocal(v => ({ ...v, name: e.target.value }))}
              className="bg-[#0f1f35] border-cyan-900/30 text-cyan-100"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Project Type</label>
            <Input
              value={local.projectType || ''}
              onChange={e => setLocal(v => ({ ...v, projectType: e.target.value }))}
              placeholder="e.g., Structural Steel"
              className="bg-[#0f1f35] border-cyan-900/30 text-cyan-100"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Estimate #</label>
            <Input
              value={local.estimateNumber || ''}
              onChange={e => setLocal(v => ({ ...v, estimateNumber: e.target.value }))}
              placeholder="EST-2024-001"
              className="bg-[#0f1f35] border-cyan-900/30 text-cyan-100"
            />
          </div>
        </div>
      </div>

      {/* GC + Contact */}
      <div>
        <h3 className="text-sm font-semibold text-cyan-400 mb-3">General Contractor & Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">General Contractor (Client)</label>
            <Input
              value={local.client || ''}
              onChange={e => setLocal(v => ({ ...v, client: e.target.value }))}
              placeholder="ABC Construction"
              className="bg-[#0f1f35] border-cyan-900/30 text-cyan-100"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Contact Name</label>
            <Input
              value={local.contactName || ''}
              onChange={e => setLocal(v => ({ ...v, contactName: e.target.value }))}
              placeholder="John Doe"
              className="bg-[#0f1f35] border-cyan-900/30 text-cyan-100"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Contact Email</label>
            <Input
              type="email"
              value={local.contactEmail || ''}
              onChange={e => setLocal(v => ({ ...v, contactEmail: e.target.value }))}
              placeholder="contact@gc.com"
              className="bg-[#0f1f35] border-cyan-900/30 text-cyan-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Contact Phone</label>
            <Input
              value={local.contactPhone || ''}
              onChange={e => setLocal(v => ({ ...v, contactPhone: e.target.value }))}
              placeholder="(555) 123-4567"
              className="bg-[#0f1f35] border-cyan-900/30 text-cyan-100"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Location</label>
            <Input
              value={local.location || ''}
              onChange={e => setLocal(v => ({ ...v, location: e.target.value }))}
              placeholder="Downtown"
              className="bg-[#0f1f35] border-cyan-900/30 text-cyan-100"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Estimator</label>
            <Input
              value={local.estimator || ''}
              onChange={e => setLocal(v => ({ ...v, estimator: e.target.value }))}
              placeholder="Your Name"
              className="bg-[#0f1f35] border-cyan-900/30 text-cyan-100"
            />
          </div>
        </div>
      </div>

      {/* Rates & Deadlines */}
      <div>
        <h3 className="text-sm font-semibold text-cyan-400 mb-3">Rates & Deadlines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Shop Rate ($/hr)</label>
            <Input
              type="number"
              value={local.shopRate}
              onChange={e => setLocal(v => ({ ...v, shopRate: parseFloat(e.target.value) || 0 }))}
              className="bg-[#0f1f35] border-cyan-900/30 text-cyan-100"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Units</label>
            <select
              value={local.units || 'Imperial'}
              onChange={e => setLocal(v => ({ ...v, units: e.target.value }))}
              className="w-full px-3 py-2 rounded bg-[#0f1f35] border border-cyan-900/30 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="Imperial">Imperial</option>
              <option value="Metric">Metric</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Bid Due Date & Time</label>
            <Input
              type="datetime-local"
              value={local.bidDueAt ? new Date(local.bidDueAt).toISOString().slice(0, 16) : ''}
              onChange={e => setLocal(v => ({ 
                ...v, 
                bidDueAt: e.target.value ? new Date(e.target.value).toISOString() : null 
              }))}
              className="bg-[#0f1f35] border-cyan-900/30 text-cyan-100"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-cyan-900/30">
        <Button
          variant="outline"
          onClick={onCancel}
          className="bg-transparent border-cyan-900/30 text-gray-400 hover:bg-cyan-900/20"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}

