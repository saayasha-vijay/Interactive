import { useState } from 'react';
import { Link } from 'react-router';
import {
  Truck,
  Navigation,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  Radio,
  Menu,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';

interface Assignment {
  id: string;
  type: 'fire' | 'medical' | 'police';
  priority: 'critical' | 'high' | 'medium';
  description: string;
  location: string;
  distance: string;
  eta: string;
  status: 'assigned' | 'en-route' | 'on-scene';
  instructions?: string;
}

export default function DispatchDashboard() {
  const [unitStatus, setUnitStatus] = useState<'available' | 'en-route' | 'on-scene' | 'unavailable'>(
    'en-route'
  );
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [currentAssignment] = useState<Assignment>({
    id: 'INC-2401',
    type: 'fire',
    priority: 'critical',
    description: 'Structure fire with people trapped',
    location: '456 Oak Avenue, Building B',
    distance: '1.2 mi',
    eta: '3 mins',
    status: 'en-route',
    instructions: 'Multiple residents reported trapped on 3rd floor. Request backup from Station 2.',
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-600';
      case 'medium':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-600';
      case 'en-route':
        return 'bg-blue-600';
      case 'on-scene':
        return 'bg-orange-600';
      case 'unavailable':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  const statusOptions: Array<'available' | 'en-route' | 'on-scene' | 'unavailable'> = [
    'available',
    'en-route',
    'on-scene',
    'unavailable',
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Mobile Header */}
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold">Unit FIRE-03</h1>
              <p className="text-xs text-muted-foreground">Station 1 - Squad A</p>
            </div>
          </Link>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Status Bar */}
      <div className={`${getStatusColor(unitStatus)} px-4 py-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 animate-pulse rounded-full bg-white"></div>
            <span className="text-sm font-semibold uppercase">Status: {unitStatus.replace('-', ' ')}</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="text-foreground hover:bg-white/20">
                Change
              </Button>
            </DialogTrigger>
            <DialogContent className="border-2 border-border bg-card text-foreground">
              <DialogHeader>
                <DialogTitle>Update Unit Status</DialogTitle>
                <DialogDescription>Select your current status to update control room.</DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    onClick={() => {
                      setUnitStatus(status);
                    }}
                    variant={unitStatus === status ? 'default' : 'outline'}
                    className={`w-full justify-start ${
                      unitStatus === status ? getStatusColor(status) : 'border-2 border-input'
                    }`}
                  >
                    {status.replace('-', ' ').toUpperCase()}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {/* Active Assignment */}
        {currentAssignment && (
          <div className="mb-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Active Assignment</h2>
              <Badge className={`${getPriorityColor(currentAssignment.priority)}`}>
                {currentAssignment.priority.toUpperCase()}
              </Badge>
            </div>

            <Card className="border-2 border-red-600 bg-red-600/10 p-4">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-3xl">
                  🚒
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-sm font-semibold text-muted-foreground">{currentAssignment.id}</p>
                  <h3 className="mb-2 text-lg font-bold">{currentAssignment.description}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      {currentAssignment.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-red-500" />
                      ETA: {currentAssignment.eta} • Distance: {currentAssignment.distance}
                    </div>
                  </div>
                </div>
              </div>

              {currentAssignment.instructions && (
                <div className="mb-4 rounded-lg border border-yellow-600 bg-yellow-600/10 p-3">
                  <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-yellow-500">
                    <AlertCircle className="h-4 w-4" />
                    Dispatch Instructions
                  </div>
                  <p className="text-sm text-muted-foreground">{currentAssignment.instructions}</p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button size="lg" className="bg-blue-600 text-base hover:bg-blue-700">
                  <Navigation className="mr-2 h-5 w-5" />
                  Navigate
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-input text-base">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Control
                </Button>
              </div>
            </Card>

            {/* Status Update Buttons */}
            <div className="grid gap-3">
              {currentAssignment.status === 'en-route' && (
                <Button
                  size="lg"
                  onClick={() => setUnitStatus('on-scene')}
                  className="w-full bg-orange-600 py-6 text-base hover:bg-orange-700"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Arrived On Scene
                </Button>
              )}
              {currentAssignment.status === 'on-scene' && (
                <>
                  <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="w-full bg-green-600 py-6 text-base hover:bg-green-700">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Mark Resolved
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="border-2 border-border bg-card text-foreground">
                      <DialogHeader>
                        <DialogTitle>Resolve Incident</DialogTitle>
                        <DialogDescription>Provide a summary of the incident resolution.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="mb-2 block text-sm font-semibold">Incident Report</label>
                          <Textarea
                            placeholder="Brief summary of actions taken and outcome..."
                            className="border-2 border-input bg-accent"
                            rows={4}
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setIsUpdateOpen(false)}
                            className="flex-1 border-2 border-input"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              setIsUpdateOpen(false);
                              setUnitStatus('available');
                            }}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            Submit & Mark Available
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-input py-6 text-base"
                  >
                    Request Backup
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Map View */}
        <Card className="mb-4 border-2 border-border bg-card p-4">
          <h3 className="mb-3 text-base font-semibold">Map View</h3>
          <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
            <div className="text-center text-gray-500">
              <MapPin className="mx-auto mb-2 h-10 w-10" />
              <p className="text-sm">Real-time navigation map</p>
              <p className="text-xs">Shows route to incident location</p>
            </div>
          </div>
        </Card>

        {/* Communication */}
        <Card className="border-2 border-border bg-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <Radio className="h-5 w-5 text-green-500" />
            <h3 className="text-base font-semibold">Communication</h3>
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start border-2 border-input">
              <Phone className="mr-2 h-4 w-4" />
              Contact Control Room
            </Button>
            <Button variant="outline" className="w-full justify-start border-2 border-input">
              <Radio className="mr-2 h-4 w-4" />
              Request Coordination
            </Button>
          </div>
        </Card>

        {/* Recent Messages */}
        <Card className="mt-4 border-2 border-border bg-card p-4">
          <h3 className="mb-3 text-base font-semibold">Recent Messages</h3>
          <div className="space-y-2">
            <div className="rounded-lg border border-border bg-muted p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Control Room</span>
                <span className="text-xs text-gray-500">2 mins ago</span>
              </div>
              <p className="text-sm text-muted-foreground">Backup en route. ETA 5 minutes.</p>
            </div>
            <div className="rounded-lg border border-border bg-muted p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Dispatch</span>
                <span className="text-xs text-gray-500">8 mins ago</span>
              </div>
              <p className="text-sm text-muted-foreground">Medical unit AMB-12 also assigned to location.</p>
            </div>
          </div>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <div className="border-t border-border bg-card px-4 py-3">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg bg-green-600 p-3">
            <p className="font-semibold">Status</p>
            <p className="text-foreground/80">{unitStatus}</p>
          </div>
          <div className="rounded-lg bg-accent p-3">
            <p className="font-semibold text-muted-foreground">Today</p>
            <p className="text-foreground">8 Incidents</p>
          </div>
          <div className="rounded-lg bg-accent p-3">
            <p className="font-semibold text-muted-foreground">Shift</p>
            <p className="text-foreground">3h 24m</p>
          </div>
        </div>
      </div>
    </div>
  );
}