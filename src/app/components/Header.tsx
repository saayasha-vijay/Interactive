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
  Lock
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

export function Header({ title, showBack = false }: { title?: string, showBack?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isCitizen = location.pathname.includes('citizen');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {showBack ? (
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        ) : (
          <SidebarTrigger />
        )}
        <div className="flex items-center gap-2">
          {!showBack && (
            <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
          )}
          <div>
            <h1 className="text-sm font-black tracking-tight uppercase">{title || (isCitizen ? "Citizen Portal" : "Control Room")}</h1>
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">System Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-xl border border-border mr-2">
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
            <DropdownMenuItem className="rounded-xl text-red-500 focus:text-red-500 cursor-pointer" onClick={() => navigate('/')}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function SidebarTrigger() {
  const location = useLocation();
  const isCitizen = location.pathname.includes('citizen');

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
            <div className="h-12 w-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/20">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div className="text-left">
              <SheetTitle className="text-xl font-black tracking-tight">IND-EMERGENCY</SheetTitle>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Unified Response v4.0</p>
            </div>
          </div>
        </SheetHeader>
        
        <div className="p-4 space-y-6">
          <div className="space-y-1">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4 mb-2">Main Menu</h4>
            <SidebarItem icon={Shield} label="Dashboard" active />
            {isCitizen ? (
              <>
                <SidebarItem icon={History} label="My Reports" />
                <SidebarItem icon={Navigation} label="Live Tracking" />
                <SidebarItem icon={Bell} label="Alert Notifications" badge="2" />
              </>
            ) : (
              <>
                <SidebarItem icon={Search} label="Active Incidents" />
                <SidebarItem icon={Users} label="Unit Coordination" />
                <SidebarItem icon={History} label="System Logs" />
              </>
            )}
          </div>

          <div className="space-y-1">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4 mb-2">Security & Help</h4>
            <SidebarItem icon={Lock} label="Safety Settings" />
            <SidebarItem icon={HelpCircle} label="Emergency Contacts" />
            <SidebarItem icon={Settings} label="App Preferences" />
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-border bg-muted/10">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              RK
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold tracking-tight">Rajesh Kumar</p>
              <p className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">Verified Citizen</p>
            </div>
            <LogOut className="h-4 w-4 opacity-40" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SidebarItem({ icon: Icon, label, active = false, badge }: { icon: any, label: string, active?: boolean, badge?: string }) {
  return (
    <Button 
      variant="ghost" 
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

function Users({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
