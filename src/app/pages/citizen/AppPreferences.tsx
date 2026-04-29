import { Header } from "../../components/Header";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { 
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
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router";

export default function AppPreferences() {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

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
            
            {/* Theme Toggle */}
            <div 
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="flex items-center justify-between p-3 transition-all cursor-pointer group select-none"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center transition-colors">
                  {isDark
                    ? <Moon className="h-5 w-5 text-blue-400" />
                    : <Sun className="h-5 w-5 text-orange-500" />
                  }
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight">Appearance</p>
                  <p className="text-[10px] opacity-50 font-medium">{isDark ? "Dark Mode" : "Light Mode"}</p>
                </div>
              </div>
              {/* Toggle pill */}
              <div className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${isDark ? 'bg-blue-600' : 'bg-muted border border-border'}`}>
                <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${isDark ? 'left-6' : 'left-1'}`} />
              </div>
            </div>
          </Card>
        </section>

        {/* Dark / Light quick-select buttons */}
        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Theme</h2>
          <Card className="p-4 rounded-[2rem] border-border bg-card/40">
            <div className="flex gap-3">
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${theme === 'dark' ? 'border-blue-600 bg-blue-600/10' : 'border-border opacity-50 hover:opacity-100'}`}
              >
                <Moon className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : ''}`} />
                <span className="text-[10px] font-black uppercase tracking-widest">Dark</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${theme === 'light' ? 'border-orange-500 bg-orange-500/10' : 'border-border opacity-50 hover:opacity-100'}`}
              >
                <Sun className={`h-5 w-5 ${theme === 'light' ? 'text-orange-500' : ''}`} />
                <span className="text-[10px] font-black uppercase tracking-widest">Light</span>
              </button>
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
