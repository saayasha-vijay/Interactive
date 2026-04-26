import { useState } from 'react';
import { 
  Shield, 
  Map as MapIcon, 
  List, 
  Radio, 
  AlertCircle, 
  Truck, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Filter,
  Activity,
  User,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Header } from '../../components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface Incident {
  id: string;
  type: 'Fire' | 'Medical' | 'Police' | 'Disaster';
  priority: 'Critical' | 'High' | 'Medium';
  location: string;
  time: string;
  status: 'Pending' | 'Dispatched' | 'On Scene' | 'Resolved';
  caller: string;
}

interface Unit {
  id: string;
  name: string;
  status: 'Available' | 'En Route' | 'On Scene' | 'Out of Service';
  type: 'Ambulance' | 'Fire Truck' | 'Patrol Car';
}

export default function OperatorDashboard() {
  const [activeIncidents, setActiveIncidents] = useState<Incident[]>([
    { id: 'INC-204', type: 'Fire', priority: 'Critical', location: 'Block C, Nehru Place', time: '14:45', status: 'Pending', caller: 'Anita Sharma' },
    { id: 'INC-205', type: 'Medical', priority: 'High', location: 'Terminal 3, IGI Airport', time: '14:42', status: 'Dispatched', caller: 'Security Desk' },
    { id: 'INC-206', type: 'Police', priority: 'Medium', location: 'Sector 15, Rohini', time: '14:40', status: 'On Scene', caller: 'Passerby' },
  ]);

  const [units, setUnits] = useState<Unit[]>([
    { id: 'U-101', name: 'AMB-01', status: 'En Route', type: 'Ambulance' },
    { id: 'U-102', name: 'FIRE-04', status: 'Available', type: 'Fire Truck' },
    { id: 'U-103', name: 'POL-12', status: 'On Scene', type: 'Patrol Car' },
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden h-screen">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Incidents */}
        <aside className="w-96 border-r border-border bg-muted/20 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-background/50 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Activity className="h-4 w-4 text-red-500" />
              Live Incidents
            </h2>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Filter className="h-4 w-4 opacity-50" /></Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeIncidents.map((inc) => (
              <Card key={inc.id} className={`border-l-4 rounded-xl cursor-pointer hover:bg-muted/40 transition-all ${
                inc.priority === 'Critical' ? 'border-l-red-600' : inc.priority === 'High' ? 'border-l-orange-500' : 'border-l-blue-500'
              }`}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black opacity-40">{inc.id}</p>
                      <h3 className="text-sm font-bold tracking-tight">{inc.type} Emergency</h3>
                    </div>
                    <Badge variant={inc.priority === 'Critical' ? 'destructive' : 'secondary'} className="text-[10px] font-bold h-5">
                      {inc.priority}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs opacity-70">
                      <MapPin className="h-3 w-3 text-red-500" /> {inc.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs opacity-70">
                      <Clock className="h-3 w-3" /> {inc.time} (Received)
                    </div>
                    <div className="flex items-center gap-2 text-xs opacity-70">
                      <User className="h-3 w-3" /> {inc.caller}
                    </div>
                  </div>
                  <div className="pt-2 flex gap-2">
                    <Button size="sm" className="flex-1 h-8 text-[10px] font-black bg-blue-600">ASSIGN UNIT</Button>
                    <Button size="sm" variant="outline" className="h-8 text-[10px] font-black">DETAILS</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </aside>

        {/* Main Content: Map View */}
        <main className="flex-1 relative bg-slate-900 overflow-hidden">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
          
          {/* Floating Map Overlays */}
          <div className="absolute top-6 left-6 flex gap-4">
            <Card className="bg-background/80 backdrop-blur-md border-border p-4 flex items-center gap-4 rounded-2xl shadow-xl">
              <div className="h-10 w-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase opacity-40">System Health</p>
                <p className="text-sm font-bold tracking-tight">NOMINAL (100%)</p>
              </div>
            </Card>
            <Card className="bg-background/80 backdrop-blur-md border-border p-4 flex items-center gap-4 rounded-2xl shadow-xl">
              <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Truck className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase opacity-40">Active Units</p>
                <p className="text-sm font-bold tracking-tight">12/15 ONLINE</p>
              </div>
            </Card>
          </div>

          <div className="absolute top-6 right-6 flex flex-col gap-2">
             <Button variant="secondary" className="rounded-xl h-12 w-12 p-0 bg-background/80 backdrop-blur-md"><MapIcon className="h-5 w-5" /></Button>
             <Button variant="secondary" className="rounded-xl h-12 w-12 p-0 bg-background/80 backdrop-blur-md"><ChevronRight className="h-5 w-5" /></Button>
          </div>

          {/* Unit Markers (Mocks) */}
          <div className="absolute top-[40%] left-[30%] h-4 w-4 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
          <div className="absolute top-[50%] left-[60%] h-4 w-4 bg-red-600 rounded-full border-4 border-white shadow-lg animate-pulse" />
          <div className="absolute top-[20%] left-[80%] h-4 w-4 bg-green-500 rounded-full border-4 border-white shadow-lg animate-pulse" />

          {/* Bottom Panel: Unit Status */}
          <div className="absolute bottom-6 left-6 right-6">
            <Card className="bg-background/80 backdrop-blur-md border-border rounded-[2rem] shadow-2xl overflow-hidden">
              <CardHeader className="px-8 py-4 border-b border-border/50 flex flex-row items-center justify-between bg-muted/10">
                <CardTitle className="text-xs font-black uppercase tracking-[0.2em] opacity-50">Field Units Status</CardTitle>
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest h-8 px-4">View All Units <ExternalLink className="ml-2 h-3 w-3" /></Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  {units.map((unit) => (
                    <div key={unit.id} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-border transition-all">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        unit.status === 'Available' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                      }`}>
                        <Truck className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-bold tracking-tight">{unit.name}</p>
                          <Badge variant="outline" className="text-[8px] font-black uppercase h-4 px-1.5">{unit.type}</Badge>
                        </div>
                        <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${
                          unit.status === 'Available' ? 'text-green-500' : 'text-orange-500'
                        }`}>{unit.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}