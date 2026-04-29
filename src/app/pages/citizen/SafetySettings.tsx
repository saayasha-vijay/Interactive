import { Header } from "../../components/Header";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Lock, Smartphone, Share2, VolumeX, Users, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SafetySettings() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState("5 sec");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header title="Safety Settings" showBack onBack={() => navigate('/citizen/dashboard')} />
      
      <main className="flex-1 max-w-xl mx-auto w-full px-6 py-8 space-y-6">
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">SOS Controls</h2>
          
          <Card className="p-4 rounded-[2rem] border-border bg-card/40 space-y-1">
            {[
              { icon: Smartphone, label: "Quick SOS Gesture", description: "Press power button 5 times", active: true },
              { icon: Share2, label: "Auto-share Location", description: "Share real-time GPS with contacts", active: true },
              { icon: VolumeX, label: "Silent SOS Mode", description: "Discrete alerts without UI feedback", active: false },
              { icon: Users, label: "Alert Emergency Contacts", description: "Notify saved contacts on SOS", active: true },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-muted group-hover:bg-background flex items-center justify-center">
                    <item.icon className={`h-5 w-5 ${item.active ? 'text-red-600' : 'opacity-40'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-tight">{item.label}</p>
                    <p className="text-[10px] opacity-50 font-medium">{item.description}</p>
                  </div>
                </div>
                <div className={`h-5 w-10 rounded-full p-1 transition-colors ${item.active ? 'bg-red-600' : 'bg-muted'}`}>
                  <div className={`h-3 w-3 rounded-full bg-white transition-all ${item.active ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>
            ))}
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Countdown Timer</h2>
          <Card className="p-4 rounded-[2rem] border-border bg-card/40">
            <div className="flex gap-2">
              {["3 sec", "5 sec", "10 sec"].map((time) => (
                <button 
                  key={time}
                  onClick={() => setCountdown(time)}
                  className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${countdown === time ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-muted opacity-50 hover:opacity-100'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </Card>
        </section>

        <section className="pt-4">
          <Button variant="ghost" className="w-full h-14 rounded-2xl border-2 border-dashed border-border opacity-50 hover:opacity-100 gap-2 font-bold">
            <Lock className="h-4 w-4" />
            Security Audit Log
            <ChevronRight className="h-4 w-4 ml-auto" />
          </Button>
        </section>
      </main>
    </div>
  );
}
