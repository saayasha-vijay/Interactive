import { useState } from 'react';
import { Link } from 'react-router';
import {
  Radio,
  AlertCircle,
  MapPin,
  Clock,
  Send,
  Phone,
  Filter,
  Search,
  ChevronRight,
  User,
  Menu,
  Bell,
  Play,
  Pause,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Textarea } from '../../components/ui/textarea';

interface Incident {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  type: 'fire' | 'medical' | 'police' | 'other';
  status: 'pending' | 'dispatched' | 'in-progress' | 'resolved';
  description: string;
  location: string;
  reportedBy: string;
  timestamp: string;
  assignedUnits?: string[];
}

interface Unit {
  id: string;
  type: 'ambulance' | 'fire' | 'police';
  status: 'available' | 'dispatched' | 'on-scene' | 'unavailable';
  location: string;
}

export default function OperatorDashboard() {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [isDispatchOpen, setIsDispatchOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [incidents] = useState<Incident[]>([
    {
      id: 'INC-2401',
      priority: 'critical',
      type: 'fire',
      status: 'pending',
      description: 'Structure fire with people trapped',
      location: '456 Oak Avenue, Building B',
      reportedBy: 'John Doe',
      timestamp: '2 mins ago',
    },
    {
      id: 'INC-2402',
      priority: 'high',
      type: 'medical',
      status: 'dispatched',
      description: 'Cardiac arrest, CPR in progress',
      location: '789 Pine Street, Apt 301',
      reportedBy: 'Jane Smith',
      timestamp: '5 mins ago',
      assignedUnits: ['AMB-12', 'AMB-08'],
    },
    {
      id: 'INC-2403',
      priority: 'medium',
      type: 'police',
      status: 'in-progress',
      description: 'Traffic accident, minor injuries',
      location: 'Main St & 5th Ave intersection',
      reportedBy: 'Mike Johnson',
      timestamp: '12 mins ago',
      assignedUnits: ['POL-45'],
    },
  ]);

  const [units] = useState<Unit[]>([
    { id: 'AMB-12', type: 'ambulance', status: 'dispatched', location: '789 Pine Street' },
    { id: 'AMB-08', type: 'ambulance', status: 'dispatched', location: '789 Pine Street' },
    { id: 'AMB-15', type: 'ambulance', status: 'available', location: 'Station 3' },
    { id: 'FIRE-03', type: 'fire', status: 'available', location: 'Station 1' },
    { id: 'FIRE-07', type: 'fire', status: 'available', location: 'Station 2' },
    { id: 'POL-45', type: 'police', status: 'on-scene', location: 'Main St & 5th' },
    { id: 'POL-22', type: 'police', status: 'available', location: 'Precinct 4' },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-600';
      case 'medium':
        return 'bg-yellow-600';
      case 'low':
        return 'bg-blue-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'border-yellow-600 text-yellow-500';
      case 'dispatched':
        return 'border-blue-600 text-blue-500';
      case 'in-progress':
        return 'border-orange-600 text-orange-500';
      case 'resolved':
        return 'border-green-600 text-green-500';
      default:
        return 'border-ring text-gray-500';
    }
  };

  const getUnitStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-600';
      case 'dispatched':
        return 'bg-blue-600';
      case 'on-scene':
        return 'bg-orange-600';
      case 'unavailable':
        return 'bg-gray-600';
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
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b-2 border-border bg-card">
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-600">
                <Radio className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Control Room Console</h1>
                <p className="text-base text-muted-foreground">Operator ID: OP-4782 | Shift: Day</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={isPaused ? 'default' : 'destructive'}
              size="sm"
              onClick={() => setIsPaused(!isPaused)}
              className="text-base px-5 py-5 font-semibold"
            >
              {isPaused ? <Play className="mr-2 h-5 w-5" /> : <Pause className="mr-2 h-5 w-5" />}
              {isPaused ? 'Resume' : 'Pause Intake'}
            </Button>
            <Button variant="ghost" size="icon" className="relative h-12 w-12">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-sm font-bold">
                7
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="h-12 w-12">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Incidents */}
        <div className="flex w-full flex-col border-r border-border lg:w-2/5">
          {/* Controls */}
          <div className="border-b border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search incidents..."
                  className="border-2 border-input bg-accent pl-10"
                />
              </div>
              <Button variant="outline" size="icon" className="border-2 border-input">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="default" className="flex-1 bg-red-600 text-xs hover:bg-red-700">
                Critical (1)
              </Button>
              <Button size="sm" variant="outline" className="flex-1 border-input text-xs">
                High (1)
              </Button>
              <Button size="sm" variant="outline" className="flex-1 border-input text-xs">
                All (3)
              </Button>
            </div>
          </div>

          {/* Incidents List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {incidents.map((incident) => (
                <Card
                  key={incident.id}
                  className={`cursor-pointer border-2 p-4 transition-all ${
                    selectedIncident === incident.id
                      ? 'border-red-600 bg-red-600/10'
                      : 'border-border bg-card hover:border-input'
                  }`}
                  onClick={() => setSelectedIncident(incident.id)}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Badge className={`${getPriorityColor(incident.priority)} text-xs`}>
                      {incident.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={`${getStatusColor(incident.status)} text-xs`}>
                      {incident.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="mb-2 flex items-start gap-2">
                    <span className="text-xl">{getTypeIcon(incident.type)}</span>
                    <div className="flex-1">
                      <h3 className="mb-1 text-sm font-semibold">{incident.id}</h3>
                      <p className="text-sm text-muted-foreground">{incident.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {incident.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {incident.timestamp}
                    </div>
                  </div>
                  {incident.assignedUnits && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {incident.assignedUnits.map((unit) => (
                        <Badge key={unit} variant="outline" className="text-xs border-blue-600 text-blue-500">
                          {unit}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Details & Map */}
        <div className="hidden flex-1 flex-col lg:flex">
          {selectedIncident ? (
            <Tabs defaultValue="details" className="flex flex-1 flex-col">
              <div className="border-b border-border bg-card px-4">
                <TabsList className="bg-transparent">
                  <TabsTrigger value="details" className="data-[state=active]:bg-accent">
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="map" className="data-[state=active]:bg-accent">
                    Map View
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="data-[state=active]:bg-accent">
                    Timeline
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="details" className="flex-1 overflow-y-auto p-6">
                {incidents
                  .filter((inc) => inc.id === selectedIncident)
                  .map((incident) => (
                    <div key={incident.id} className="space-y-6">
                      {/* Priority Alert */}
                      {incident.priority === 'critical' && (
                        <div className="flex items-start gap-3 rounded-lg border-2 border-red-600 bg-red-600/10 p-4">
                          <AlertCircle className="h-6 w-6 flex-shrink-0 text-red-500" />
                          <div>
                            <h3 className="font-semibold text-red-500">CRITICAL INCIDENT</h3>
                            <p className="text-sm text-muted-foreground">Immediate dispatch required</p>
                          </div>
                        </div>
                      )}

                      {/* Incident Info */}
                      <Card className="border-2 border-border bg-card p-6">
                        <h3 className="mb-4 text-lg font-semibold">Incident Information</h3>
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Incident ID</p>
                            <p className="font-semibold">{incident.id}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Type</p>
                            <p className="font-semibold capitalize">{incident.type} Emergency</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Description</p>
                            <p className="font-semibold">{incident.description}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Location</p>
                            <p className="font-semibold">{incident.location}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Reported By</p>
                            <p className="font-semibold">{incident.reportedBy}</p>
                          </div>
                        </div>
                      </Card>

                      {/* Dispatch Actions */}
                      <Card className="border-2 border-border bg-card p-6">
                        <h3 className="mb-4 text-lg font-semibold">Dispatch</h3>
                        {incident.status === 'pending' ? (
                          <Dialog open={isDispatchOpen} onOpenChange={setIsDispatchOpen}>
                            <DialogTrigger asChild>
                              <Button className="w-full bg-red-600 text-base hover:bg-red-700">
                                <Send className="mr-2 h-4 w-4" />
                                Dispatch Units
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="border-2 border-border bg-card text-foreground sm:max-w-xl">
                              <DialogHeader>
                                <DialogTitle>Dispatch Units to {incident.id}</DialogTitle>
                                <DialogDescription>Select units to dispatch and provide instructions.</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <p className="mb-2 text-sm font-semibold">Available Units</p>
                                  <div className="space-y-2">
                                    {units
                                      .filter((u) => u.status === 'available')
                                      .map((unit) => (
                                        <div
                                          key={unit.id}
                                          className="flex items-center justify-between rounded-lg border border-border bg-muted p-3"
                                        >
                                          <div>
                                            <p className="font-semibold">{unit.id}</p>
                                            <p className="text-xs text-muted-foreground">{unit.location}</p>
                                          </div>
                                          <Button size="sm" variant="outline" className="border-input">
                                            Select
                                          </Button>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="mb-2 text-sm font-semibold">Dispatch Instructions</p>
                                  <Textarea
                                    placeholder="Additional instructions for responding units..."
                                    className="border-2 border-input bg-accent"
                                    rows={3}
                                  />
                                </div>
                                <div className="flex gap-3">
                                  <Button
                                    variant="outline"
                                    onClick={() => setIsDispatchOpen(false)}
                                    className="flex-1 border-2 border-input"
                                  >
                                    Cancel
                                  </Button>
                                  <Button className="flex-1 bg-red-600 hover:bg-red-700">Confirm Dispatch</Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Assigned Units:</p>
                            {incident.assignedUnits?.map((unit) => (
                              <div
                                key={unit}
                                className="flex items-center justify-between rounded-lg border border-border bg-muted p-3"
                              >
                                <p className="font-semibold">{unit}</p>
                                <Button size="sm" variant="ghost">
                                  <Phone className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </Card>

                      {/* Communication */}
                      <Card className="border-2 border-border bg-card p-6">
                        <h3 className="mb-4 text-lg font-semibold">Communication</h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start border-2 border-input">
                            <Phone className="mr-2 h-4 w-4" />
                            Call Reporter
                          </Button>
                          <Button variant="outline" className="w-full justify-start border-2 border-input">
                            <Send className="mr-2 h-4 w-4" />
                            Send Update
                          </Button>
                        </div>
                      </Card>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="map" className="flex-1 overflow-hidden">
                <div className="relative h-full w-full bg-card">
                  {/* Map Placeholder */}
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-3 h-12 w-12 text-muted-foreground/80" />
                      <p className="text-muted-foreground">Interactive map view</p>
                      <p className="text-sm text-gray-500">Shows incident location and unit positions</p>
                    </div>
                  </div>
                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 rounded-lg border border-border bg-card p-4">
                    <p className="mb-2 text-xs font-semibold">Legend</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-600"></div>
                        <span className="text-muted-foreground">Incident Location</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-600"></div>
                        <span className="text-muted-foreground">Available Units</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                        <span className="text-muted-foreground">Dispatched Units</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs">1</div>
                      <div className="h-full w-0.5 bg-accent"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="mb-1 text-sm font-semibold">Incident Reported</p>
                      <p className="text-xs text-muted-foreground">2 mins ago</p>
                      <p className="mt-1 text-xs text-gray-500">Reported by John Doe via mobile app</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs">2</div>
                      <div className="h-full w-0.5 bg-accent"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="mb-1 text-sm font-semibold">Received by Control Room</p>
                      <p className="text-xs text-muted-foreground">2 mins ago</p>
                      <p className="mt-1 text-xs text-gray-500">Auto-classified as Critical priority</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs">3</div>
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-sm font-semibold text-gray-500">Awaiting Dispatch</p>
                      <p className="text-xs text-muted-foreground">Pending operator action</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex flex-1 items-center justify-center bg-card">
              <div className="text-center text-gray-500">
                <AlertCircle className="mx-auto mb-3 h-12 w-12" />
                <p>Select an incident to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}