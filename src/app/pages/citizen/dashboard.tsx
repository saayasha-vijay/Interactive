import { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  PhoneCall, 
  ChevronRight, 
  AlertTriangle, 
  Heart, 
  Flame, 
  Wind, 
  MoreHorizontal,
  Shield,
  LifeBuoy,
  Users,
  Info,
  X,
  Phone
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../components/ui/dialog';

interface EmergencyService {
  id: string;
  name: string;
  number: string;
  description: string;
}

interface EmergencyCategory {
  id: string;
  title: string;
  icon: any;
  color: string;
  services: EmergencyService[];
}

export default function CitizenDashboard() {
  const [location, setLocation] = useState('Detecting location...');
  const [status, setStatus] = useState<'normal' | 'alert'>('normal');
  const [selectedService, setSelectedService] = useState<EmergencyService | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  useEffect(() => {
    // Mock location detection
    const timer = setTimeout(() => {
      setLocation('Connaught Place, New Delhi');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const categories: EmergencyCategory[] = [
    {
      id: 'safety',
      title: 'Safety (Police)',
      icon: Shield,
      color: 'bg-blue-600',
      services: [
        { id: 'police-1', name: 'Robbery / Theft', number: '100', description: 'Immediate police assistance' },
        { id: 'police-2', name: 'Assault / Violence', number: '100', description: 'Emergency police response' },
        { id: 'police-3', name: 'Cybercrime', number: '1930', description: 'Cyber Cell help' },
      ]
    },
    {
      id: 'health',
      title: 'Health (Medical)',
      icon: Heart,
      color: 'bg-green-600',
      services: [
        { id: 'health-1', name: 'Heart Attack', number: '108', description: 'Critical medical support' },
        { id: 'health-2', name: 'Accident Injuries', number: '102', description: 'Ambulance dispatch' },
        { id: 'health-3', name: 'Mental Health Crisis', number: '9152987821', description: 'Mpower Helpline' },
      ]
    },
    {
      id: 'fire',
      title: 'Fire & Rescue',
      icon: Flame,
      color: 'bg-orange-600',
      services: [
        { id: 'fire-1', name: 'Fire Emergency', number: '101', description: 'Fire brigade dispatch' },
        { id: 'fire-2', name: 'Gas Leak', number: '101', description: 'Hazardous leak response' },
      ]
    },
    {
      id: 'disaster',
      title: 'Disaster',
      icon: Wind,
      color: 'bg-slate-800',
      services: [
        { id: 'dis-1', name: 'Flood / Waterlogging', number: '108', description: 'Disaster management' },
        { id: 'dis-2', name: 'Earthquake Relief', number: '108', description: 'NDRF coordination' },
      ]
    },
    {
      id: 'others',
      title: 'Others (Social/Utility)',
      icon: LifeBuoy,
      color: 'bg-purple-600',
      services: [
        { id: 'other-1', name: 'Child Abuse', number: '1098', description: 'Childline assistance' },
        { id: 'other-2', name: 'Women in Distress', number: '1091', description: 'Women helpline' },
        { id: 'other-3', name: 'Animal Rescue', number: '1962', description: 'NGO/Vet support' },
      ]
    }
  ];

  const handleCallRequest = (service: EmergencyService) => {
    setSelectedService(service);
    setIsCallModalOpen(true);
  };

  const confirmCall = () => {
    if (selectedService) {
      window.location.href = `tel:${selectedService.number}`;
    }
    setIsCallModalOpen(false);
  };

  const handleSOS = () => {
    // SOS Logic: Call 112 and simulate sending location
    const sosService: EmergencyService = {
      id: 'sos',
      name: 'All-in-One Emergency',
      number: '112',
      description: 'Global emergency number for India'
    };
    handleCallRequest(sosService);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Status Bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-3 w-3">
            <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${status === 'normal' ? 'bg-green-500' : 'bg-red-500'}`} />
            <div className={`relative h-3 w-3 rounded-full ${status === 'normal' ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider opacity-70">System Active</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold opacity-90">
          <MapPin className="h-4 w-4 text-red-500" />
          {location}
        </div>
      </div>

      <main className="max-w-xl mx-auto px-6 pt-8 space-y-10">
        {/* Primary Action: SOS */}
        <div className="text-center space-y-4">
          <Button 
            onClick={handleSOS}
            className="h-48 w-48 sm:h-56 sm:w-56 rounded-full bg-red-600 hover:bg-red-700 shadow-[0_0_50px_rgba(220,38,38,0.3)] ring-[12px] ring-red-600/10 active:scale-95 transition-all flex flex-col gap-2 group"
          >
            <ShieldAlert className="h-16 w-16 sm:h-20 sm:w-20 animate-pulse text-white" />
            <span className="text-3xl font-black tracking-tighter text-white">SOS</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 text-white">Tap for 112</span>
          </Button>
          <p className="text-xs text-muted-foreground font-medium max-w-[200px] mx-auto leading-relaxed">
            Instant 112 call and real-time location sharing with nearest dispatch units.
          </p>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="secondary" className="h-16 rounded-2xl flex flex-col gap-1 items-center justify-center bg-muted/40 hover:bg-muted/60 border border-border shadow-sm">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Report Incident</span>
          </Button>
          <Button variant="secondary" className="h-16 rounded-2xl flex flex-col gap-1 items-center justify-center bg-muted/40 hover:bg-muted/60 border border-border shadow-sm">
            <PhoneCall className="h-5 w-5 text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Global Services</span>
          </Button>
        </div>

        {/* Emergency Categories */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] opacity-40">Categories</h2>
            <Info className="h-4 w-4 opacity-30" />
          </div>

          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.id} className="space-y-3">
                <div className="flex items-center gap-3 ml-1">
                  <div className={`h-8 w-8 rounded-lg ${cat.color} flex items-center justify-center`}>
                    <cat.icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{cat.title}</h3>
                </div>
                
                <div className="grid gap-2">
                  {cat.services.map((service) => (
                    <Card key={service.id} className="border-border bg-card/40 hover:bg-card/80 transition-all cursor-pointer group rounded-2xl" onClick={() => handleCallRequest(service)}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-bold text-base tracking-tight">{service.name}</p>
                          <p className="text-xs text-muted-foreground font-medium">{service.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-black text-foreground opacity-30 group-hover:opacity-100 transition-opacity">{service.number}</span>
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-muted group-hover:bg-red-600 transition-all`}>
                            <Phone className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      <Dialog open={isCallModalOpen} onOpenChange={setIsCallModalOpen}>
        <DialogContent className="max-w-[320px] rounded-3xl p-8 border-border">
          <DialogHeader className="space-y-4">
            <div className="mx-auto h-20 w-20 rounded-full bg-red-600/10 flex items-center justify-center">
              <PhoneCall className="h-10 w-10 text-red-600 animate-bounce" />
            </div>
            <div className="text-center space-y-2">
              <DialogTitle className="text-2xl font-black tracking-tight">Confirm Call?</DialogTitle>
              <DialogDescription className="text-sm font-medium leading-relaxed">
                You are about to call <span className="font-bold text-foreground">"{selectedService?.name}"</span> at <span className="font-black text-red-600 text-lg">{selectedService?.number}</span>.
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-3 pt-4 sm:flex-col sm:space-x-0">
            <Button 
              onClick={confirmCall}
              className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-lg font-black tracking-tight"
            >
              Call {selectedService?.number}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsCallModalOpen(false)}
              className="w-full h-12 rounded-2xl font-bold opacity-60 hover:opacity-100"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Access Floating Footer */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-slate-900 text-white rounded-3xl p-3 shadow-2xl ring-1 ring-white/10 flex items-center justify-between">
          <div className="flex -space-x-2 ml-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center">
                <Users className="h-3 w-3 opacity-50" />
              </div>
            ))}
            <div className="h-8 w-8 rounded-full border-2 border-slate-900 bg-red-600 flex items-center justify-center text-[10px] font-black">
              +12
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Help Nearby</p>
          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-2xl bg-white/10 hover:bg-white/20">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}