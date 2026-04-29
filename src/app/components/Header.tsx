import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { 
  Menu, 
  Bell, 
  User, 
  MapPin, 
  ChevronLeft, 
  Shield, 
  Search,
  LogOut,
  Settings,
  HelpCircle,
  History,
  Navigation,
  Lock,
  LayoutDashboard,
  FileText,
  Activity,
  Radio,
  Map as MapIcon,
  TrendingUp,
  BarChart3,
  ShieldAlert
} from 'lucide-react';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useAuth, UserRole } from '../context/AuthContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function Header({ title, showBack = false, onBack }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, logout } = useAuth();

  const getDashboardTitle = () => {
    if (title) return title;
    switch (role) {
      case 'citizen': return "Citizen Dashboard";
      case 'operator': return "Operator Dashboard";
      case 'supervisor': return "Supervisor Dashboard";
      case 'dispatch': return "Dispatch Dashboard";
      default: return "Emergency Portal";
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {showBack ? (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack || (() => navigate(-1))} 
            className="rounded-xl"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        ) : (
          <SidebarTrigger />
        )}
        <div className="flex items-center gap-2">
          {!showBack && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="h-10 w-10 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center p-0 group relative transition-all active:scale-90"
              title="Reset Demo"
            >
              <Shield className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap uppercase tracking-widest">
                Reset Demo
              </span>
            </Button>
          )}
          <div className="min-w-0">
            <h1 className="text-[11px] sm:text-sm font-black tracking-tight uppercase truncate">{getDashboardTitle()}</h1>
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest truncate">System Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-xl border border-border mr-2">
          <MapPin className="h-3.5 w-3.5 text-red-500" />
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Connaught Place, DL</span>
        </div>
        
        <Button variant="ghost" size="icon" className="rounded-xl relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-600 rounded-full" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl bg-muted/50">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
            <DropdownMenuLabel className="font-bold px-2 py-1.5">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-xl cursor-pointer">
              <User className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl cursor-pointer">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" /> Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-xl text-red-500 focus:text-red-500 cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function SidebarTrigger() {
  const { role, isGuest, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const menuItems: Record<string, { icon: any, label: string, active?: boolean, path?: string }[]> = {
    citizen: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/citizen/dashboard" },
      { icon: History, label: "My Reports", path: "/citizen/reports" },
      { icon: Navigation, label: "Live Tracking", path: "/citizen/tracking" },
      { icon: Lock, label: "Safety Settings", path: "/citizen/safety" },
      { icon: HelpCircle, label: "Emergency Contacts", path: "/citizen/contacts" },
      { icon: Settings, label: "App Preferences", path: "/citizen/preferences" },
    ],
    operator: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/operator/dashboard" },
      { icon: Activity, label: "Live Incidents", path: "/operator/dashboard" },
      { icon: Radio, label: "Unit Management", path: "/operator/dashboard" },
      { icon: FileText, label: "Reports Queue", path: "/operator/dashboard" },
      { icon: ShieldAlert, label: "System Status", path: "/operator/dashboard" },
      { icon: User, label: "Profile", path: "/operator/dashboard" },
    ],
    dispatch: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dispatch/dashboard" },
      { icon: FileText, label: "Assigned Tasks", path: "/dispatch/dashboard" },
      { icon: MapIcon, label: "Navigation / Map", path: "/dispatch/dashboard" },
      { icon: Activity, label: "Status Updates", path: "/dispatch/dashboard" },
      { icon: User, label: "Profile", path: "/dispatch/dashboard" },
    ],
    supervisor: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/supervisor/dashboard" },
      { icon: BarChart3, label: "Analytics", path: "/supervisor/dashboard" },
      { icon: FileText, label: "Reports Overview", path: "/supervisor/dashboard" },
      { icon: TrendingUp, label: "System Performance", path: "/supervisor/dashboard" },
      { icon: User, label: "Profile", path: "/supervisor/dashboard" },
    ],
  };

  const currentMenu = menuItems[role || 'citizen'] || menuItems.citizen;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 border-r border-border">
        <SheetHeader className="p-6 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleLogout}
              className="h-12 w-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all active:scale-90 group"
              title="Reset Demo"
            >
              <Shield className="h-7 w-7 text-white group-hover:scale-110 transition-transform" />
            </button>
            <div className="text-left">
              <SheetTitle className="text-xl font-black tracking-tight">IND-EMERGENCY</SheetTitle>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Unified Response v4.0</p>
            </div>
          </div>
        </SheetHeader>
        
        <div className="p-4 space-y-6">
          <div className="space-y-1">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4 mb-2">Main Menu</h4>
            {currentMenu.map((item, idx) => (
              <SheetTrigger asChild key={idx}>
                <SidebarItem 
                  icon={item.icon} 
                  label={item.label} 
                  active={location.pathname === item.path}
                  onClick={() => item.path && navigate(item.path)} 
                />
              </SheetTrigger>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-border bg-muted/10">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {role?.slice(0, 1).toUpperCase() || 'C'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] font-bold opacity-50 uppercase tracking-tighter truncate">
                {isGuest ? 'Guest User' : `Verified ${role || 'Citizen'}`}
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SidebarItem({ icon: Icon, label, active = false, badge, onClick }: { icon: any, label: string, active?: boolean, badge?: string, onClick?: () => void }) {
  return (
    <Button 
      variant="ghost" 
      onClick={onClick}
      className={`w-full justify-start h-12 rounded-2xl gap-3 px-4 transition-all ${active ? 'bg-red-600/10 text-red-600 hover:bg-red-600/15' : 'hover:bg-muted opacity-70 hover:opacity-100'}`}
    >
      <Icon className={`h-5 w-5 ${active ? 'text-red-600' : ''}`} />
      <span className="text-sm font-bold tracking-tight">{label}</span>
      {badge && (
        <span className="ml-auto bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Button>
  );
}
