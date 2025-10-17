"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { 
  Mic, 
  Trash2, 
  Save, 
  Repeat, 
  FileSpreadsheet, 
  FileText, 
  HelpCircle,
  TrendingUp,
  DollarSign,
  Clock,
  Package,
  Plus
} from "lucide-react"

export default function QuantHUDv2() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [projects, setProjects] = useState([
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

  const [recentItems, setRecentItems] = useState([
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
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Quant HUD v2.5</h1>
        <p className="text-muted-foreground">Real-time Fabrication Project Dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              {totals.totalItems} total items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.totalHours.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Shop Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totals.avgRate.toFixed(0)}/hr</div>
            <p className="text-xs text-muted-foreground">
              Per labor hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totals.totalRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            <p className="text-xs text-muted-foreground">
              Estimated labor value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Voice Input Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Voice Command / Quick Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              placeholder="Type or use voice to add items..." 
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="flex-1"
            />
            <Button 
              variant={isListening ? "destructive" : "default"}
              size="icon"
              onClick={handleVoiceInput}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {isListening && (
            <div className="mt-4">
              <Progress value={33} className="mb-2" />
              <p className="text-sm text-muted-foreground">Listening for voice input...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant="default">
          <Save className="mr-2 h-4 w-4" />
          Save Project
        </Button>
        <Button variant="outline">
          <Repeat className="mr-2 h-4 w-4" />
          Sync Data
        </Button>
        <Button variant="outline">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export Excel
        </Button>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quant HUD Help</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Voice Commands</h4>
                <p className="text-sm text-muted-foreground">
                  Click the microphone to start voice input. Say commands like "Add beam W12x40" or "Show project summary"
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Quick Entry</h4>
                <p className="text-sm text-muted-foreground">
                  Type directly into the input field to quickly add items to your current project
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Keyboard Shortcuts</h4>
                <p className="text-sm text-muted-foreground">
                  Ctrl+S: Save | Ctrl+E: Export | Ctrl+N: New Item
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="destructive" className="ml-auto">
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>

      {/* Projects Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Shop Rate</TableHead>
                <TableHead className="text-right">Items</TableHead>
                <TableHead className="text-right">Total Hours</TableHead>
                <TableHead className="text-right">Est. Revenue</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell className="text-right">${project.shopRate}/hr</TableCell>
                  <TableCell className="text-right">{project.items}</TableCell>
                  <TableCell className="text-right">{project.totalHours.toFixed(1)}</TableCell>
                  <TableCell className="text-right">
                    ${(project.totalHours * project.shopRate).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                      {project.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Drawing</TableHead>
                <TableHead>Detail</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Shape</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Length (ft)</TableHead>
                <TableHead className="text-right">Total Min</TableHead>
                <TableHead className="text-right">Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.drawing}</TableCell>
                  <TableCell>{item.detail}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.shape}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell className="text-right">{item.qty}</TableCell>
                  <TableCell className="text-right">{item.lengthFt || '-'}</TableCell>
                  <TableCell className="text-right">{item.totalMin}</TableCell>
                  <TableCell className="text-right">{(item.totalMin / 60).toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

