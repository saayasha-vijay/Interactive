import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Download,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Header } from '../../components/Header';
import { Badge } from '../../components/ui/badge';

const data = [
  { name: '08:00', value: 400 },
  { name: '10:00', value: 300 },
  { name: '12:00', value: 600 },
  { name: '14:00', value: 800 },
  { name: '16:00', value: 500 },
  { name: '18:00', value: 900 },
  { name: '20:00', value: 400 },
];

const incidentTypeData = [
  { name: 'Police', value: 40, color: '#3b82f6' },
  { name: 'Medical', value: 30, color: '#22c55e' },
  { name: 'Fire', value: 20, color: '#f97316' },
  { name: 'Other', value: 10, color: '#a855f7' },
];

const responseTimeData = [
  { day: 'Mon', avg: 4.2 },
  { day: 'Tue', avg: 4.5 },
  { day: 'Wed', avg: 3.8 },
  { day: 'Thu', avg: 4.1 },
  { day: 'Fri', avg: 4.9 },
  { day: 'Sat', avg: 5.2 },
  { day: 'Sun', avg: 4.0 },
];

export default function SupervisorDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-8 animate-in fade-in duration-500">
        {/* Top Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Avg. Response Time" value="4.2m" trend="+12%" up icon={Clock} />
          <StatCard title="Total Incidents (24h)" value="156" trend="-5%" icon={AlertTriangle} />
          <StatCard title="Resolution Rate" value="98.2%" trend="+0.4%" up icon={ShieldCheck} />
          <StatCard title="Active Resources" value="42/50" trend="Stable" icon={TrendingUp} />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-[2rem] border-border shadow-xl overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-black tracking-tight">Incident Volume Trends</CardTitle>
                  <CardDescription className="text-xs font-bold uppercase tracking-widest opacity-60">Real-time load monitoring</CardDescription>
                </div>
                <Button variant="outline" size="icon" className="rounded-xl h-10 w-10"><Calendar className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-4 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', backgroundColor: '#1e293b' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#dc2626" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-border shadow-xl overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-black tracking-tight">Response Time (min)</CardTitle>
                  <CardDescription className="text-xs font-bold uppercase tracking-widest opacity-60">7-Day performance tracking</CardDescription>
                </div>
                <Button variant="outline" size="icon" className="rounded-xl h-10 w-10"><Filter className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-4 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: 'rgba(255,255,255,0.4)' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', backgroundColor: '#1e293b' }}
                  />
                  <Bar dataKey="avg" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
          <Card className="rounded-[2rem] border-border shadow-xl col-span-1 lg:col-span-1 overflow-hidden">
             <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black tracking-tight text-center">Emergency Mix</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 h-[250px] flex flex-col items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incidentTypeData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {incidentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#1e293b' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 w-full mt-4">
                {incidentTypeData.map(item => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-border shadow-xl col-span-1 lg:col-span-2 overflow-hidden bg-slate-900 text-white border-none">
            <CardHeader className="p-8">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-black tracking-tight">System Report</CardTitle>
                  <CardDescription className="text-slate-400 font-medium">Monthly performance summary</CardDescription>
                </div>
                <Button className="bg-white text-slate-900 hover:bg-slate-200 rounded-2xl font-bold px-6 h-12">
                  <Download className="mr-2 h-4 w-4" /> Export PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-1">
                  <p className="text-4xl font-black tracking-tighter">99.9%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Uptime</p>
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-black tracking-tighter">1,240</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Calls</p>
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-black tracking-tighter">12.5s</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Dispatch Lag</p>
                </div>
              </div>
              <div className="mt-8 p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-bold tracking-tight">Compliance Status: ACTIVE</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ISO 27001 Certified Environment</p>
                  </div>
                </div>
                <ArrowUpRight className="h-6 w-6 text-slate-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, trend, up = false, icon: Icon }: { title: string, value: string, trend: string, up?: boolean, icon: any }) {
  return (
    <Card className="rounded-[2rem] border-border shadow-xl group hover:scale-[1.02] transition-all">
      <CardContent className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="h-12 w-12 rounded-2xl bg-muted group-hover:bg-red-600/10 transition-all flex items-center justify-center">
            <Icon className="h-6 w-6 text-foreground group-hover:text-red-600 transition-all" />
          </div>
          <Badge variant="ghost" className={`flex items-center gap-1 font-black ${up ? 'text-green-500' : 'text-red-500'}`}>
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend}
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{title}</p>
          <p className="text-4xl font-black tracking-tighter">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
