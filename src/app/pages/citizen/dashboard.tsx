import { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  Heart, 
  Flame, 
  Wind, 
  Shield,
  Activity,
  Zap,
  Info,
  Layers
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Header } from '../../components/Header';
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
  number: string;
  icon: any;
  color: string;
  subServices: EmergencyService[];
}

export default function CitizenDashboard() {
  const [view, setView] = useState<'overview' | 'detail'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<EmergencyCategory | null>(null);
  const [selectedService, setSelectedService] = useState<EmergencyService | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const categories: EmergencyCategory[] = [
    {
      id: 'police',
      title: 'Police',
      number: '100',
      icon: Shield,
      color: 'text-blue-500',
      subServices: [
        { id: 'p1', name: 'Robbery / Theft', number: '100', description: 'Immediate police intervention' },
        { id: 'p2', name: 'Assault / Violence', number: '100', description: 'Emergency police response' },
        { id: 'p3', name: 'Missing Person', number: '100', description: 'Report a missing individual' },
        { id: 'p4', name: 'Cybercrime', number: '1930', description: 'Cyber Cell assistance' },
        { id: 'p-other', name: 'Other Emergency', number: '100', description: 'Connects you to the nearest police station based on your location.' },
      ]
    },
    {
      id: 'medical',
      title: 'Medical',
      number: '102',
      icon: Heart,
      color: 'text-green-500',
      subServices: [
        { id: 'm1', name: 'Heart Attack', number: '108', description: 'Critical life support' },
        { id: 'm2', name: 'Accident Injury', number: '102', description: 'Ambulance dispatch' },
        { id: 'm3', name: 'Unconscious Person', number: '108', description: 'Emergency medical aid' },
        { id: 'm-other', name: 'Other Emergency', number: '102', description: 'Connects you to the nearest hospital or emergency medical service.' },
      ]
    },
    {
      id: 'fire',
      title: 'Fire',
      number: '101',
      icon: Flame,
      color: 'text-orange-500',
      subServices: [
        { id: 'f1', name: 'Fire', number: '101', description: 'Fire brigade dispatch' },
        { id: 'f2', name: 'Gas Leak', number: '101', description: 'Hazardous leak response' },
        { id: 'f3', name: 'Explosion', number: '101', description: 'Critical incident response' },
        { id: 'f-other', name: 'Other Emergency', number: '101', description: 'Connects you to the nearest fire and rescue unit.' },
      ]
    },
    {
      id: 'disaster',
      title: 'Disaster',
      number: '108',
      icon: Wind,
      color: 'text-slate-500',
      subServices: [
        { id: 'd1', name: 'Flood', number: '108', description: 'Disaster management' },
        { id: 'd2', name: 'Earthquake', number: '108', description: 'Response teams' },
        { id: 'd-other', name: 'Other Emergency', number: '108', description: 'Connects you to the nearest disaster response team.' },
      ]
    },
    {
      id: 'others',
      title: 'Others',
      number: '112',
      icon: Layers,
      color: 'text-purple-500',
      subServices: [
        { id: 'o1', name: 'Utility Failure', number: '1912', description: 'Power/Water supply issues' },
        { id: 'o2', name: 'Animal Rescue', number: '1962', description: 'Animal welfare/emergency' },
        { id: 'o3', name: 'Social Support', number: '1091', description: 'Women/Child helpline' },
        { id: 'o-other', name: 'Other Emergency', number: '112', description: 'Connects you to the nearest relevant support service.' },
      ]
    }
  ];

  const handleCategoryClick = (cat: EmergencyCategory) => {
    setSelectedCategory(cat);
    setView('detail');
  };

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
    const sosService: EmergencyService = {
      id: 'sos',
      name: 'Universal Emergency',
      number: '112',
      description: 'Police, Fire, and Medical coordination'
    };
    handleCallRequest(sosService);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="bg-yellow-500 text-black text-center font-black py-2 text-sm">
        TEST: THIS IS THE ACTIVE CITIZEN DASHBOARD
      </div>
      <Header 
        title={view === 'detail' ? `${selectedCategory?.title} Services` : "Citizen Dashboard"} 
        showBack={view === 'detail'} 
        onBack={() => setView('overview')}
      />
      
      <main className="flex-1 max-w-xl mx-auto w-full px-6 py-8 animate-in fade-in duration-500 overflow-x-hidden">
        {view === 'overview' ? (
          <div className="space-y-12">
            {/* SOS Section */}
            <div className="flex flex-col items-center gap-6">
              <Button 
                onClick={handleSOS}
                className="h-52 w-52 sm:h-64 sm:w-64 rounded-full bg-red-600 hover:bg-red-700 shadow-[0_0_60px_rgba(220,38,38,0.4)] ring-[16px] ring-red-600/10 active:scale-95 transition-all flex flex-col gap-2 group"
              >
                <ShieldAlert className="h-20 w-20 sm:h-24 sm:w-24 animate-pulse text-white" />
                <span className="text-4xl font-black tracking-tighter text-white">SOS</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80 text-white">Call 112</span>
              </Button>
              <div className="text-center space-y-1">
                <p className="text-sm font-black tracking-tight">UNIVERSAL EMERGENCY</p>
                <p className="text-xs text-muted-foreground font-medium opacity-60">Sends location + Instant Dispatch</p>
              </div>
            </div>

            {/* Primary Numbers Grid */}
            <div className="space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Direct Services</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <Card 
                    key={cat.id} 
                    className="border-border bg-card/40 hover:bg-muted/50 transition-all cursor-pointer group rounded-3xl p-6 relative overflow-hidden"
                    onClick={() => handleCategoryClick(cat)}
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <cat.icon className="h-16 w-16" />
                    </div>
                    <div className="space-y-4 relative z-10">
                      <div className={`h-12 w-12 rounded-2xl bg-muted group-hover:bg-background flex items-center justify-center transition-all`}>
                        <cat.icon className={`h-6 w-6 ${cat.color}`} />
                      </div>
                      <div>
                        <p className="text-2xl font-black tracking-tighter leading-none">{cat.number}</p>
                        <p className="text-xs font-bold uppercase tracking-wider opacity-60 mt-1">{cat.title}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Community/Alerts */}
            <Card className="rounded-3xl border-border bg-yellow-600/5 p-6 border-dashed border-2">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-yellow-600/20 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold tracking-tight">Weather Alert: Heavy Rain</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Avoid Waterlogged areas in Central Delhi. Emergency teams are on standby.</p>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-400">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-2xl font-black tracking-tight uppercase">{selectedCategory?.title} Services</h2>
            </div>

            <div className="grid gap-3">
              {selectedCategory?.subServices.map((service) => (
                <Card 
                  key={service.id} 
                  className="border-border bg-card/40 hover:bg-card/80 transition-all cursor-pointer group rounded-3xl overflow-hidden"
                  onClick={() => handleCallRequest(service)}
                >
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <Activity className={`h-4 w-4 shrink-0 ${selectedCategory.color}`} />
                        <p className="font-bold text-lg tracking-tight leading-tight">{service.name}</p>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium pr-4 leading-relaxed">{service.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-2xl font-black tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity">{service.number}</span>
                      <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-red-600/10 group-hover:bg-red-600 transition-all text-red-600 group-hover:text-white shadow-sm">
                        <PhoneCall className="h-5 w-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-6">
              <div className="rounded-3xl bg-muted/30 p-6 flex items-start gap-4 border border-border">
                <Info className="h-5 w-5 opacity-40 shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                  Reporting via {selectedCategory?.title} dashboard automatically alerts the nearest units and shares your real-time coordinates.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Confirmation Modal */}
      <Dialog open={isCallModalOpen} onOpenChange={setIsCallModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-[340px] rounded-[2.5rem] p-8 border-border shadow-2xl">
          <DialogHeader className="space-y-6">
            <div className="mx-auto h-24 w-24 rounded-full bg-red-600/10 flex items-center justify-center ring-8 ring-red-600/5">
              <PhoneCall className="h-12 w-12 text-red-600 animate-bounce" />
            </div>
            <div className="text-center space-y-3">
              <DialogTitle className="text-3xl font-black tracking-tighter uppercase leading-none">Confirm Call</DialogTitle>
              <DialogDescription className="text-sm font-medium leading-relaxed">
                Emergency call to <span className="font-black text-foreground">"{selectedService?.name}"</span>. 
                <br />
                <span className="mt-2 block text-xs opacity-70 italic">{selectedService?.description}</span>
                <br />
                Line: <span className="font-black text-red-600 text-xl tracking-tighter">{selectedService?.number}</span>
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-4 pt-6 sm:flex-col sm:space-x-0">
            <Button 
              onClick={confirmCall}
              className="w-full h-16 rounded-[1.5rem] bg-red-600 hover:bg-red-700 text-xl font-black tracking-tight shadow-lg shadow-red-600/20"
            >
              CALL NOW
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsCallModalOpen(false)}
              className="w-full h-12 rounded-[1rem] font-bold opacity-60 hover:opacity-100 hover:bg-muted"
            >
              Dismiss
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}