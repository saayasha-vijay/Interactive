import { Header } from "../../components/Header";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { 
  Settings, 
  Languages, 
  Moon, 
  MapPin, 
  Bell, 
  Accessibility, 
  LogOut, 
  RefreshCw,
  ChevronRight,
  Sun
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function AppPreferences() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header title="App Preferences" showBack onBack={() => navigate('/citizen/dashboard')} />
      
      <main className="flex-1 max-w-xl mx-auto w-full px-6 py-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Personalization</h2>
          <Card className="p-4 rounded-[2rem] border-border bg-card/40 divide-y divide-border/50">
            <div className="flex items-center justify-between p-3 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                  <Languages className="h-5 w-5 opacity-60" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight">Language</p>
                  <p className="text-[10px] opacity-50 font-medium">English (United Kingdom)</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 opacity-20" />
            </div>
            
            <div 
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-between p-3 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                  {darkMode ? <Moon className="h-5 w-5 opacity-60" /> : <Sun className="h-5 w-5 text-orange-500" />}
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight">Appearance</p>
                  <p className="text-[10px] opacity-50 font-medium">{darkMode ? "Dark Mode" : "Light Mode"}</p>
                </div>
              </div>
              <div className={`h-5 w-10 rounded-full p-1 transition-colors ${darkMode ? 'bg-blue-600' : 'bg-muted'}`}>
                <div className={`h-3 w-3 rounded-full bg-white transition-all ${darkMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Permissions & Accessibility</h2>
          <Card className="p-4 rounded-[2rem] border-border bg-card/40 divide-y divide-border/50">
            {[
              { icon: MapPin, label: "Location Services", status: "Always Allow", color: "text-green-500" },
              { icon: Bell, label: "Notifications", status: "Enabled", color: "text-green-500" },
              { icon: Accessibility, label: "Accessibility Settings", status: "Standard", color: "opacity-40" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
                    <item.icon className="h-5 w-5 opacity-60" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-tight">{item.label}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${item.color}`}>{item.status}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 opacity-20" />
              </div>
            ))}
          </Card>
        </section>

        <section className="space-y-3 pt-4">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full h-14 rounded-2xl border-2 border-red-600/20 text-red-600 hover:bg-red-600/5 hover:border-red-600 gap-3 font-black uppercase tracking-widest text-xs"
          >
            <RefreshCw className="h-4 w-4" />
            Reset Demo Environment
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full h-12 rounded-xl opacity-50 hover:opacity-100 hover:bg-muted gap-2 font-bold"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </section>

        <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] opacity-20">
          IND-EMERGENCY v4.0.2
        </p>
      </main>
    </div>
  );
}
