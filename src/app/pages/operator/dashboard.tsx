import { useState } from 'react';
import { 
  Map as MapIcon, 
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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden lg:h-[calc(100vh-64px)]">
        
        {/* MOBILE ONLY: System Status Section */}
        <div className="lg:hidden p-4 grid grid-cols-2 gap-4 bg-muted/10">
          <StatusSmallCard icon={CheckCircle} title="System Health" value="NOMINAL" color="text-green-500" />
          <StatusSmallCard icon={Truck} title="Active Units" value="12/15" color="text-blue-500" />
        </div>

        {/* MAP SECTION: Top on mobile, Center on desktop */}
        <main className="flex-1 relative bg-slate-900 min-h-[300px] lg:min-h-0 order-1 lg:order-2 overflow-hidden">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
          
          {/* Desktop Overlays (Hidden on mobile) */}
          <div className="hidden lg:flex absolute top-6 left-6 gap-4 z-10">
            <Card className="bg-background/80 backdrop-blur-md border-border p-4 flex items-center gap-4 rounded-2xl shadow-xl">
              <div className="h-10 w-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase opacity-40">System Health</p>
                <p className="text-sm font-bold tracking-tight uppercase">Nominal (100%)</p>
              </div>
            </Card>
            <Card className="bg-background/80 backdrop-blur-md border-border p-4 flex items-center gap-4 rounded-2xl shadow-xl">
              <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Truck className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase opacity-40">Active Units</p>
                <p className="text-sm font-bold tracking-tight uppercase">12/15 Online</p>
              </div>
            </Card>
          </div>

          <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
             <Button variant="secondary" className="rounded-xl h-10 w-10 p-0 bg-background/80 backdrop-blur-md border border-border/50"><MapIcon className="h-4 w-4" /></Button>
             <Button variant="secondary" className="rounded-xl h-10 w-10 p-0 bg-background/80 backdrop-blur-md border border-border/50"><ChevronRight className="h-4 w-4" /></Button>
          </div>

          {/* Unit Markers (Mocks) */}
          <div className="absolute top-[40%] left-[30%] h-4 w-4 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
          <div className="absolute top-[50%] left-[60%] h-4 w-4 bg-red-600 rounded-full border-4 border-white shadow-lg animate-pulse" />
          <div className="absolute top-[20%] left-[80%] h-4 w-4 bg-green-500 rounded-full border-4 border-white shadow-lg animate-pulse" />

          {/* Map Overlay Text */}
          <div className="absolute bottom-4 left-4 z-10">
             <div className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] text-white font-black uppercase tracking-widest">Live: New Delhi NCR</span>
             </div>
          </div>
        </main>

        {/* INCIDENTS PANEL: Below map on mobile, Left on desktop */}
        <aside className="w-full lg:w-96 border-t lg:border-t-0 lg:border-r border-border bg-muted/20 flex flex-col h-[500px] lg:h-full order-2 lg:order-1">
          <div className="p-4 border-b border-border bg-background/50 flex items-center justify-between shrink-0 sticky top-0 z-10">
            <h2 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Activity className="h-4 w-4 text-red-500" />
              Incoming Reports
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
                    <Badge variant={inc.priority === 'Critical' ? 'destructive' : 'secondary'} className="text-[10px] font-bold h-5 uppercase">
                      {inc.priority}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs opacity-70">
                      <MapPin className="h-3 w-3 text-red-500 shrink-0" /> {inc.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs opacity-70">
                      <Clock className="h-3 w-3 shrink-0" /> {inc.time} (Received)
                    </div>
                  </div>
                  <div className="pt-2 flex gap-2">
                    <Button size="sm" className="flex-1 h-10 text-[10px] font-black bg-blue-600 hover:bg-blue-700">ASSIGN UNIT</Button>
                    <Button size="sm" variant="outline" className="h-10 text-[10px] font-black border-border/50">DETAILS</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </aside>

        {/* ACTIVE UNITS: Bottom on mobile, Overlays bottom on desktop */}
        <div className="w-full lg:absolute lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100%-420px)] lg:max-w-5xl z-20 order-3 p-4 lg:p-0">
          <Card className="bg-background/80 lg:backdrop-blur-md border-border rounded-[1.5rem] lg:rounded-[2rem] shadow-2xl overflow-hidden border-2 lg:border">
            <CardHeader className="px-6 py-3 border-b border-border/50 flex flex-row items-center justify-between bg-muted/10">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Field Unit Coordination</CardTitle>
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest h-8 px-4 hidden sm:flex">
                View All <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 lg:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                {units.map((unit) => (
                  <div key={unit.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 hover:border-border transition-all">
                    <div className={`h-10 w-10 lg:h-12 lg:w-12 rounded-xl flex items-center justify-center shrink-0 ${
                      unit.status === 'Available' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      <Truck className="h-5 w-5 lg:h-6 lg:w-6" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-xs lg:text-sm font-bold tracking-tight truncate">{unit.name}</p>
                        <Badge variant="outline" className="text-[8px] font-black uppercase h-4 px-1 shrink-0">{unit.type}</Badge>
                      </div>
                      <p className={`text-[9px] font-black uppercase tracking-widest mt-0.5 ${
                        unit.status === 'Available' ? 'text-green-500' : 'text-orange-500'
                      }`}>{unit.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

function StatusSmallCard({ icon: Icon, title, value, color }: { icon: any, title: string, value: string, color: string }) {
  return (
    <Card className="bg-card border-border p-3 flex items-center gap-3 rounded-xl">
      <div className={`h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0`}>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div>
        <p className="text-[8px] font-black uppercase opacity-40 leading-none mb-1">{title}</p>
        <p className={`text-xs font-black tracking-tight ${color}`}>{value}</p>
      </div>
    </Card>
  );
}