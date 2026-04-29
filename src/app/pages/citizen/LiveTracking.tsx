import { Header } from "../../components/Header";
import { Card } from "../../components/ui/card";
import { MapPin, Navigation, Clock, ShieldCheck, CheckCircle2, Radio } from "lucide-react";

export default function LiveTracking() {
  const steps = [
    { label: "Reported", status: "completed", time: "10:30 AM" },
    { label: "Assigned", status: "completed", time: "10:32 AM" },
    { label: "En route", status: "active", time: "10:35 AM" },
    { label: "Arrived", status: "pending", time: "" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header title="Live Tracking" showBack />
      
      <main className="flex-1 max-w-xl mx-auto w-full px-6 py-8 space-y-6">
        {/* Map Placeholder */}
        <div className="relative aspect-square w-full rounded-[2.5rem] bg-muted overflow-hidden border border-border shadow-inner flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
          <div className="relative flex flex-col items-center gap-3 opacity-30">
            <Navigation className="h-12 w-12 animate-pulse" />
            <p className="text-xs font-black uppercase tracking-widest">Map View Unavailable</p>
          </div>
          
          {/* Mock Markers */}
          <div className="absolute top-1/4 left-1/3 h-4 w-4 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] ring-4 ring-red-600/20" />
          <div className="absolute bottom-1/3 right-1/4 h-4 w-4 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] ring-4 ring-blue-600/20" />
        </div>

        {/* Tracking Details */}
        <Card className="p-6 rounded-[2rem] border-border bg-card/40 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-red-600/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-tighter opacity-40">Assigned Unit</p>
                <h3 className="text-lg font-black tracking-tight">Alpha-7 (Ambulance)</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-tighter opacity-40">ETA</p>
              <h3 className="text-xl font-black tracking-tight text-red-600">4 Mins</h3>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex justify-between items-center px-2">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                    step.status === 'completed' ? 'bg-green-500 text-white' : 
                    step.status === 'active' ? 'bg-blue-600 text-white animate-pulse' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> : <Radio className="h-4 w-4" />}
                  </div>
                  <div className="text-center">
                    <p className={`text-[9px] font-black uppercase tracking-tighter ${step.status === 'pending' ? 'opacity-30' : ''}`}>{step.label}</p>
                    {step.time && <p className="text-[8px] font-medium opacity-50">{step.time}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
