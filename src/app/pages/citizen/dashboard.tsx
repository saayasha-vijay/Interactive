import { useState } from 'react';
import { Link } from 'react-router';
import {
  UserCircle,
  AlertCircle,
  MapPin,
  Clock,
  Plus,
  Phone,
  ImageIcon,
  ChevronRight,
  Home,
  Bell,
  Menu,
  X,
  Settings,
  LogOut,
  User,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

interface Incident {
  id: string;
  type: 'fire' | 'medical' | 'police' | 'other';
  status: 'pending' | 'dispatched' | 'in-progress' | 'resolved';
  description: string;
  location: string;
  timestamp: string;
  estimatedArrival?: string;
}

export default function CitizenDashboard() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
  });

  const [incidents] = useState<Incident[]>([
    {
      id: '1',
      type: 'fire',
      status: 'in-progress',
      description: 'Smoke coming from building',
      location: '123 Main St',
      timestamp: '10:45 AM',
      estimatedArrival: '2 mins',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReportOpen(false);
    // Form submission would happen here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600';
      case 'dispatched':
        return 'bg-blue-600';
      case 'in-progress':
        return 'bg-orange-600';
      case 'resolved':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fire':
        return '🚒';
      case 'medical':
        return '🚑';
      case 'police':
        return '🚔';
      default:
        return '🚨';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b-2 border-border bg-card relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-blue-600">
                <UserCircle className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold">Citizen Portal</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Rajesh Kumar</p>
              </div>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="icon" className="relative h-10 w-10 sm:h-12 sm:w-12 hover:bg-accent active:scale-95 transition-all">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-red-600 text-xs sm:text-sm font-bold">
                  3
                </span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 sm:h-12 sm:w-12 hover:bg-accent active:scale-95 transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-full z-50 mt-0 w-full sm:w-80 border-b-2 sm:border-l-2 border-border bg-card shadow-xl">
            <div className="p-4">
              <div className="mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Rajesh Kumar</p>
                    <p className="text-sm text-muted-foreground">rajesh.kumar@email.com</p>
                  </div>
                </div>
              </div>
              <nav className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base hover:bg-accent active:scale-95 transition-all h-12 text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="mr-3 h-5 w-5" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base hover:bg-accent active:scale-95 transition-all h-12 text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base hover:bg-accent active:scale-95 transition-all h-12 text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HelpCircle className="mr-3 h-5 w-5" />
                  Help & Support
                </Button>
                <div className="pt-2 border-t border-border">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base hover:bg-red-900/20 active:scale-95 transition-all h-12 text-red-400 hover:text-red-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Emergency Action */}
        <Card className="mb-6 sm:mb-8 border-4 border-red-600 bg-red-600/15 p-5 sm:p-8">
          <div className="flex flex-col items-center gap-4 sm:gap-6 text-center md:flex-row md:text-left">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
              <Phone className="h-9 w-9 sm:h-11 sm:w-11" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2 text-xl sm:text-2xl font-bold text-foreground">Life-Threatening Emergency?</h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">For immediate danger, always call emergency services directly</p>
              <div className="mt-3 flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
                <a 
                  href="tel:100" 
                  className="rounded-lg bg-red-700 hover:bg-red-600 active:scale-95 transition-all px-3 sm:px-4 py-2 text-base sm:text-lg font-bold text-foreground"
                >
                  Police: 100
                </a>
                <a 
                  href="tel:101" 
                  className="rounded-lg bg-red-700 hover:bg-red-600 active:scale-95 transition-all px-3 sm:px-4 py-2 text-base sm:text-lg font-bold text-foreground"
                >
                  Fire: 101
                </a>
                <a 
                  href="tel:102" 
                  className="rounded-lg bg-red-700 hover:bg-red-600 active:scale-95 transition-all px-3 sm:px-4 py-2 text-base sm:text-lg font-bold text-foreground"
                >
                  Medical: 102
                </a>
                <a 
                  href="tel:112" 
                  className="rounded-lg bg-red-700 hover:bg-red-600 active:scale-95 transition-all px-3 sm:px-4 py-2 text-base sm:text-lg font-bold text-foreground"
                >
                  All: 112
                </a>
              </div>
            </div>
          </div>
        </Card>

        {/* Report New Incident */}
        <div className="mb-6 sm:mb-8">
          <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="w-full bg-blue-600 py-6 sm:py-8 text-lg sm:text-xl hover:bg-blue-700 active:scale-95 transition-all md:w-auto font-bold">
                <Plus className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Report New Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="border-3 border-border bg-card text-foreground sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl">Report New Incident</DialogTitle>
                <DialogDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                  Please provide as much detail as possible to help emergency services respond effectively.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div>
                  <Label htmlFor="type" className="mb-2 sm:mb-3 block text-lg sm:text-xl font-bold text-foreground">
                    Incident Type *
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="border-3 border-input bg-accent h-12 sm:h-14 text-base sm:text-lg text-foreground">
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent className="border-3 border-input bg-accent text-foreground">
                      <SelectItem value="fire" className="text-base sm:text-lg py-3 text-foreground hover:bg-secondary">🚒 Fire Emergency</SelectItem>
                      <SelectItem value="medical" className="text-base sm:text-lg py-3 text-foreground hover:bg-secondary">🚑 Medical Emergency</SelectItem>
                      <SelectItem value="police" className="text-base sm:text-lg py-3 text-foreground hover:bg-secondary">🚔 Police Emergency</SelectItem>
                      <SelectItem value="other" className="text-base sm:text-lg py-3 text-foreground hover:bg-secondary">🚨 Other Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location" className="mb-2 sm:mb-3 block text-lg sm:text-xl font-bold text-foreground">
                    Location *
                  </Label>
                  <div className="flex gap-2 sm:gap-3">
                    <Input
                      id="location"
                      placeholder="Enter address or landmark"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="border-3 border-input bg-accent h-12 sm:h-14 text-base sm:text-lg text-foreground"
                    />
                    <Button type="button" variant="outline" className="border-3 border-input h-12 sm:h-14 w-12 sm:w-14 hover:bg-accent active:scale-95 transition-all">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                  </div>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground">Or use current location</p>
                </div>

                <div>
                  <Label htmlFor="description" className="mb-2 sm:mb-3 block text-lg sm:text-xl font-bold text-foreground">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what's happening..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border-3 border-input bg-accent text-base sm:text-lg text-foreground"
                  />
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground">Be as specific as possible</p>
                </div>

                <div>
                  <Label className="mb-2 sm:mb-3 block text-lg sm:text-xl font-bold text-foreground">Attachments (Optional)</Label>
                  <Button type="button" variant="outline" className="w-full border-3 border-input h-12 sm:h-14 text-base sm:text-lg hover:bg-accent active:scale-95 transition-all text-foreground">
                    <ImageIcon className="mr-2 sm:mr-3 h-5 w-5" />
                    Add Photos or Videos
                  </Button>
                </div>

                <div className="rounded-xl border-2 border-yellow-600 bg-yellow-600/15 p-4 sm:p-5">
                  <p className="text-base sm:text-lg font-semibold text-yellow-400">
                    ✓ Your location will be shared with emergency services
                  </p>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsReportOpen(false)}
                    className="flex-1 border-3 border-input h-12 sm:h-14 text-base sm:text-lg font-semibold hover:bg-accent active:scale-95 transition-all text-foreground"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!formData.type || !formData.location || !formData.description}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all h-12 sm:h-14 text-base sm:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Report
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Active Incidents */}
        <div className="mb-6">
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">Your Active Incidents</h2>
          {incidents.length === 0 ? (
            <Card className="border-3 border-border bg-card p-8 sm:p-12 text-center">
              <Home className="mx-auto mb-4 h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/80" />
              <p className="text-lg sm:text-xl text-muted-foreground">No active incidents</p>
            </Card>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {incidents.map((incident) => (
                <Card key={incident.id} className="border-3 border-border bg-card p-5 sm:p-7 hover:border-input transition-all">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-3xl sm:text-4xl">
                      {getTypeIcon(incident.type)}
                    </div>
                    <div className="flex-1 w-full">
                      <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                        <Badge className={`${getStatusColor(incident.status)} text-sm sm:text-base px-2 sm:px-3 py-1 text-foreground`}>
                          {incident.status.toUpperCase()}
                        </Badge>
                        {incident.estimatedArrival && (
                          <Badge variant="outline" className="border-2 border-green-600 text-green-400 text-sm sm:text-base px-2 sm:px-3 py-1">
                            ETA: {incident.estimatedArrival}
                          </Badge>
                        )}
                      </div>
                      <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-foreground">{incident.description}</h3>
                      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 text-sm sm:text-base text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                          {incident.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                          {incident.timestamp}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 hover:bg-accent active:scale-95 transition-all self-start sm:self-center">
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                  </div>
                  {incident.status === 'in-progress' && (
                    <div className="mt-4 sm:mt-5 rounded-xl border-2 border-blue-600 bg-blue-600/15 p-4 sm:p-5">
                      <p className="text-base sm:text-lg leading-relaxed text-blue-300">
                        <AlertCircle className="mr-2 inline h-4 w-4 sm:h-5 sm:w-5" />
                        Unit #42 is en route to your location. Stay safe and remain at the scene if possible.
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Emergency Alerts */}
        <Card className="border-3 border-border bg-card p-5 sm:p-7">
          <div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
            <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Active Alerts in Your Area</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="rounded-xl border-2 border-border bg-muted p-4 sm:p-6 hover:border-input transition-all">
              <p className="mb-2 text-base sm:text-lg font-bold text-foreground">Severe Weather Warning</p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">Heavy rain expected. Avoid low-lying areas. Updated 30 mins ago</p>
            </div>
            <div className="rounded-xl border-2 border-border bg-muted p-4 sm:p-6 hover:border-input transition-all">
              <p className="mb-2 text-base sm:text-lg font-bold text-foreground">Road Closure</p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">MG Road closed between 5th and 7th Cross. Use alternate routes.</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}