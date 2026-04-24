import { useState } from 'react';
import { Link } from 'react-router';
import {
  Eye,
  TrendingUp,
  TrendingDown,
  Users,
  AlertCircle,
  Clock,
  Activity,
  Menu,
  Bell,
  Download,
  Calendar,
  MapPin,
  Filter,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

interface AgencyActivity {
  agency: string;
  icon: string;
  activeIncidents: number;
  unitsDeployed: number;
  avgResponseTime: string;
  status: 'normal' | 'elevated' | 'critical';
}

export default function SupervisorDashboard() {
  const [timeRange, setTimeRange] = useState('24h');

  const metrics: Metric[] = [
    { label: 'Active Incidents', value: '24', change: '+3', trend: 'up' },
    { label: 'Units Deployed', value: '18', change: '-2', trend: 'down' },
    { label: 'Avg Response Time', value: '4.2 min', change: '-0.5', trend: 'down' },
    { label: 'System Uptime', value: '99.97%', change: '+0.02', trend: 'up' },
  ];

  const agencies: AgencyActivity[] = [
    {
      agency: 'Fire Department',
      icon: '🚒',
      activeIncidents: 8,
      unitsDeployed: 6,
      avgResponseTime: '3.8 min',
      status: 'normal',
    },
    {
      agency: 'Police Services',
      icon: '🚔',
      activeIncidents: 12,
      unitsDeployed: 9,
      avgResponseTime: '4.5 min',
      status: 'elevated',
    },
    {
      agency: 'Medical Services',
      icon: '🚑',
      activeIncidents: 4,
      unitsDeployed: 3,
      avgResponseTime: '4.1 min',
      status: 'normal',
    },
  ];

  const recentIncidents = [
    {
      id: 'INC-2401',
      type: 'fire',
      priority: 'critical',
      location: '456 Oak Avenue',
      responseTime: '3.2 min',
      agency: 'Fire',
      status: 'in-progress',
    },
    {
      id: 'INC-2402',
      type: 'medical',
      priority: 'high',
      location: '789 Pine Street',
      responseTime: '4.1 min',
      agency: 'Medical',
      status: 'resolved',
    },
    {
      id: 'INC-2403',
      type: 'police',
      priority: 'medium',
      location: 'Main St & 5th Ave',
      responseTime: '5.3 min',
      agency: 'Police',
      status: 'in-progress',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-600';
      case 'elevated':
        return 'bg-yellow-600';
      case 'critical':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Supervisor Dashboard</h1>
                <p className="text-xs text-muted-foreground">Executive Oversight</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 border-2 border-input bg-accent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-2 border-input bg-accent text-foreground">
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="border-2 border-input">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs">
                2
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <Card key={metric.label} className="border-2 border-border bg-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-1 text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-semibold">{metric.value}</p>
                  </div>
                  {metric.trend === 'up' ? (
                    <TrendingUp className={`h-5 w-5 ${metric.label.includes('Uptime') || metric.label.includes('Incidents') ? 'text-green-500' : 'text-red-500'}`} />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown className={`h-5 w-5 ${metric.label.includes('Response') || metric.label.includes('Deployed') ? 'text-green-500' : 'text-red-500'}`} />
                  ) : null}
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs">
                  <span className={metric.change.startsWith('+') ? 'text-muted-foreground' : 'text-muted-foreground'}>
                    {metric.change} from previous period
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Agency Status */}
          <Card className="border-2 border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Inter-Agency Status</h2>
              <Button variant="outline" size="sm" className="border-2 border-input">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="space-y-3">
              {agencies.map((agency) => (
                <div
                  key={agency.agency}
                  className="flex items-center gap-4 rounded-lg border border-border bg-muted p-4"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-2xl">
                    {agency.icon}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="font-semibold">{agency.agency}</h3>
                      <Badge className={`${getStatusColor(agency.status)} text-xs`}>
                        {agency.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Active Incidents</p>
                        <p className="font-semibold">{agency.activeIncidents}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Units Deployed</p>
                        <p className="font-semibold">{agency.unitsDeployed}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Response</p>
                        <p className="font-semibold">{agency.avgResponseTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Tabs for detailed views */}
          <Tabs defaultValue="incidents" className="space-y-4">
            <TabsList className="bg-card">
              <TabsTrigger value="incidents">Recent Incidents</TabsTrigger>
              <TabsTrigger value="coordination">Coordination Timeline</TabsTrigger>
              <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="incidents" className="space-y-4">
              <Card className="border-2 border-border bg-card p-6">
                <h2 className="mb-4 text-xl font-semibold">Recent Incidents</h2>
                <div className="space-y-3">
                  {recentIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-muted p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-xl">
                          {incident.type === 'fire' ? '🚒' : incident.type === 'medical' ? '🚑' : '🚔'}
                        </div>
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <p className="font-semibold">{incident.id}</p>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                incident.status === 'resolved'
                                  ? 'border-green-600 text-green-500'
                                  : 'border-orange-600 text-orange-500'
                              }`}
                            >
                              {incident.status}
                            </Badge>
                          </div>
                          <div className="flex gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {incident.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Response: {incident.responseTime}
                            </span>
                            <span>{incident.agency}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="coordination" className="space-y-4">
              <Card className="border-2 border-border bg-card p-6">
                <h2 className="mb-4 text-xl font-semibold">Inter-Agency Coordination Timeline</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="h-full w-0.5 bg-accent"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="mb-1 text-sm font-semibold">Multi-Agency Response Initiated</p>
                      <p className="text-xs text-muted-foreground">15 mins ago</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Fire and Medical units coordinating on structure fire at 456 Oak Avenue
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Badge variant="outline" className="text-xs border-red-600 text-red-500">
                          Fire Dept
                        </Badge>
                        <Badge variant="outline" className="text-xs border-blue-600 text-blue-500">
                          Medical
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-sm">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="h-full w-0.5 bg-accent"></div>
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="mb-1 text-sm font-semibold">Command Structure Established</p>
                      <p className="text-xs text-muted-foreground">32 mins ago</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Incident command assigned to Fire Chief Martinez for downtown incident cluster
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-sm">
                        <Activity className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-sm font-semibold">Resource Reallocation</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        2 police units reassigned to support traffic management for medical emergency
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <Card className="border-2 border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold">Response Time Trends</h3>
                  <div className="flex h-48 items-center justify-center rounded-lg border border-border bg-muted">
                    <div className="text-center text-gray-500">
                      <Activity className="mx-auto mb-2 h-8 w-8" />
                      <p className="text-sm">Line chart: Response times over time</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                    <div>
                      <p className="text-muted-foreground">Current</p>
                      <p className="font-semibold">4.2 min</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Target</p>
                      <p className="font-semibold">4.0 min</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Best</p>
                      <p className="font-semibold text-green-500">3.8 min</p>
                    </div>
                  </div>
                </Card>

                <Card className="border-2 border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold">Incident Distribution</h3>
                  <div className="flex h-48 items-center justify-center rounded-lg border border-border bg-muted">
                    <div className="text-center text-gray-500">
                      <Activity className="mx-auto mb-2 h-8 w-8" />
                      <p className="text-sm">Pie chart: Incidents by type</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                    <div>
                      <p className="text-muted-foreground">🚔 Police</p>
                      <p className="font-semibold">50%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">🚒 Fire</p>
                      <p className="font-semibold">33%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">🚑 Medical</p>
                      <p className="font-semibold">17%</p>
                    </div>
                  </div>
                </Card>

                <Card className="border-2 border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold">Resource Utilization</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-muted-foreground">Fire Units</span>
                        <span className="font-semibold">60%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-accent">
                        <div className="h-2 w-[60%] rounded-full bg-red-600"></div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-muted-foreground">Police Units</span>
                        <span className="font-semibold">75%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-accent">
                        <div className="h-2 w-[75%] rounded-full bg-blue-600"></div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-muted-foreground">Medical Units</span>
                        <span className="font-semibold">40%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-accent">
                        <div className="h-2 w-[40%] rounded-full bg-green-600"></div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="border-2 border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold">System Health</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-border bg-muted p-3">
                      <span className="text-sm">Control Room Console</span>
                      <Badge className="bg-green-600 text-xs">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border bg-muted p-3">
                      <span className="text-sm">Dispatch System</span>
                      <Badge className="bg-green-600 text-xs">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border bg-muted p-3">
                      <span className="text-sm">Citizen Portal</span>
                      <Badge className="bg-green-600 text-xs">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border bg-muted p-3">
                      <span className="text-sm">Communication Network</span>
                      <Badge className="bg-green-600 text-xs">Operational</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* System Alerts */}
          <Card className="border-2 border-yellow-600 bg-yellow-600/10 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 flex-shrink-0 text-yellow-500" />
              <div className="flex-1">
                <h3 className="mb-1 font-semibold text-yellow-500">System Alert</h3>
                <p className="text-sm text-muted-foreground">
                  Police unit utilization at 75%. Consider activating reserve units if demand increases.
                </p>
                <div className="mt-3 flex gap-3">
                  <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-500">
                    Acknowledge
                  </Button>
                  <Button size="sm" variant="outline" className="border-input">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
