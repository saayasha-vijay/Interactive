import { Header } from "../../components/Header";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { History, Activity, Clock, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router";

export default function MyReports() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'past'>('ongoing');

  const reports = [
    {
      id: "REP-1234",
      type: "Medical Emergency",
      dateTime: "29 Apr 2024, 10:30 AM",
      location: "Connaught Place, Delhi",
      status: "En route",
      isOngoing: true
    },
    {
      id: "REP-5678",
      type: "Police Assistance",
      dateTime: "28 Apr 2024, 02:15 PM",
      location: "Hauz Khas, Delhi",
      status: "Resolved",
      isOngoing: false
    }
  ];

  const filteredReports = reports.filter(r => activeTab === 'ongoing' ? r.isOngoing : !r.isOngoing);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header title="My Reports" showBack onBack={() => navigate('/citizen/dashboard')} />
      
      <main className="flex-1 max-w-xl mx-auto w-full px-6 py-8 space-y-6">
        <div className="flex p-1 bg-muted rounded-2xl">
          <button 
            onClick={() => setActiveTab('ongoing')}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'ongoing' ? 'bg-background shadow-sm' : 'opacity-50'}`}
          >
            Ongoing
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'past' ? 'bg-background shadow-sm' : 'opacity-50'}`}
          >
            Past
          </button>
        </div>

        <div className="space-y-4">
          {filteredReports.length > 0 ? filteredReports.map((report) => (
            <Card key={report.id} className="p-5 rounded-[2rem] border-border bg-card/40 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-tighter opacity-40">{report.id}</p>
                  <h3 className="text-lg font-black tracking-tight">{report.type}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${report.status === 'Resolved' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                  {report.status}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 opacity-70">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">{report.dateTime}</span>
                </div>
                <div className="flex items-center gap-2 opacity-70">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">{report.location}</span>
                </div>
              </div>

              {report.isOngoing && (
                <Button 
                  onClick={() => navigate('/citizen/live-tracking')}
                  className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 font-bold gap-2"
                >
                  <Activity className="h-4 w-4" />
                  Track Live
                </Button>
              )}
            </Card>
          )) : (
            <div className="py-20 text-center opacity-40">
              <History className="h-12 w-12 mx-auto mb-4" />
              <p className="text-sm font-bold">No reports found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
