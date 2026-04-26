import { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Phone, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Shield, 
  ArrowRight,
  User,
  MessageSquare,
  FileText
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Header } from '../../components/Header';
import { Badge } from '../../components/ui/badge';

export default function DispatchDashboard() {
  const [activeIncident, setActiveIncident] = useState({
    id: 'INC-204',
    type: 'Fire',
    priority: 'Critical',
    location: 'Block C, Nehru Place, New Delhi',
    distance: '1.2 km',
    eta: '4 mins',
    caller: 'Anita Sharma',
    details: 'Third floor smoke detected. Residents evacuating.',
    status: 'assigned' // 'assigned' | 'enroute' | 'arrived' | 'completed'
  });

  const handleStatusUpdate = (newStatus: any) => {
    setActiveIncident({ ...activeIncident, status: newStatus });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pb-24">
      <Header title="Field Dispatch" />
      
      <main className="flex-1 max-w-md mx-auto w-full px-6 py-8 space-y-8 animate-in fade-in duration-500">
        {/* Navigation/Map Placeholder */}
        <Card className="rounded-[2.5rem] border-border shadow-2xl overflow-hidden aspect-video bg-slate-900 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Navigation className="h-12 w-12 text-blue-500 animate-pulse" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-border/50 shadow-lg">
             <div className="flex items-center gap-3">
               <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                 <Navigation className="h-5 w-5" />
               </div>
               <div>
                 <p className="text-sm font-black tracking-tight">{activeIncident.distance}</p>
                 <p className="text-[10px] font-bold uppercase opacity-50">Remaining</p>
               </div>
             </div>
             <div className="text-right">
               <p className="text-sm font-black tracking-tight text-blue-500">{activeIncident.eta}</p>
               <p className="text-[10px] font-bold uppercase opacity-50">Estimated</p>
             </div>
          </div>
        </Card>

        {/* Incident Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className="bg-red-600 text-[10px] font-black tracking-widest h-6 uppercase px-3">
              {activeIncident.priority}
            </Badge>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{activeIncident.id}</p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter leading-tight">{activeIncident.type} EMERGENCY</h2>
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold leading-relaxed">{activeIncident.location}</p>
            </div>
          </div>
        </div>

        {/* Detailed Panels */}
        <div className="grid gap-4">
          <Card className="rounded-3xl border-border bg-muted/30">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-background flex items-center justify-center">
                  <User className="h-6 w-6 opacity-40" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Reporter</p>
                  <p className="text-base font-bold tracking-tight">{activeIncident.caller}</p>
                </div>
                <Button size="icon" variant="outline" className="rounded-xl h-12 w-12 border-border/50 text-green-500">
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Description</p>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{activeIncident.details}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-14 rounded-2xl border-border bg-card/40 flex items-center gap-2 font-bold transition-all hover:bg-muted">
              <MessageSquare className="h-4 w-4" /> Comms
            </Button>
            <Button variant="outline" className="h-14 rounded-2xl border-border bg-card/40 flex items-center gap-2 font-bold transition-all hover:bg-muted">
              <FileText className="h-4 w-4" /> Reports
            </Button>
          </div>
        </div>
      </main>

      {/* Floating Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-xl border-t border-border">
        <div className="max-w-md mx-auto">
          {activeIncident.status === 'assigned' && (
            <Button 
              onClick={() => handleStatusUpdate('enroute')}
              className="w-full h-16 rounded-[1.5rem] bg-blue-600 hover:bg-blue-700 text-lg font-black tracking-tight shadow-xl shadow-blue-600/20"
            >
              EN ROUTE <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          )}
          {activeIncident.status === 'enroute' && (
            <Button 
              onClick={() => handleStatusUpdate('arrived')}
              className="w-full h-16 rounded-[1.5rem] bg-orange-600 hover:bg-orange-700 text-lg font-black tracking-tight shadow-xl shadow-orange-600/20"
            >
              MARK AS ARRIVED
            </Button>
          )}
          {activeIncident.status === 'arrived' && (
            <Button 
              onClick={() => handleStatusUpdate('completed')}
              className="w-full h-16 rounded-[1.5rem] bg-green-600 hover:bg-green-700 text-lg font-black tracking-tight shadow-xl shadow-green-600/20"
            >
              MARK AS COMPLETED <CheckCircle2 className="ml-2 h-6 w-6" />
            </Button>
          )}
          {activeIncident.status === 'completed' && (
            <div className="flex items-center justify-center gap-3 p-4 rounded-[1.5rem] bg-green-600/10 border-2 border-green-600/20">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              <p className="text-lg font-black tracking-tight text-green-600 uppercase">Task Successfully Closed</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}