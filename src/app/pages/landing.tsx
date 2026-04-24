import { Link } from 'react-router';
import { UserCircle, Radio, Eye, Truck, Shield, AlertTriangle, Phone } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function LandingPage() {
  const roles = [
    {
      id: 'citizen',
      title: 'Citizen',
      description: 'Report emergencies and track status',
      icon: UserCircle,
      color: 'bg-blue-600 hover:bg-blue-700',
      path: '/citizen/onboarding',
    },
    {
      id: 'operator',
      title: 'Control Room Operator',
      description: 'Monitor and coordinate emergency response',
      icon: Radio,
      color: 'bg-red-600 hover:bg-red-700',
      path: '/operator/onboarding',
    },
    {
      id: 'supervisor',
      title: 'Supervisor',
      description: 'Oversight and analytics dashboard',
      icon: Eye,
      color: 'bg-purple-600 hover:bg-purple-700',
      path: '/supervisor/onboarding',
    },
    {
      id: 'dispatch',
      title: 'Dispatch Unit',
      description: 'Field response and incident management',
      icon: Truck,
      color: 'bg-green-600 hover:bg-green-700',
      path: '/dispatch/onboarding',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b-2 border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-xl bg-red-600">
              <Shield className="h-9 w-9 sm:h-11 sm:w-11" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold">Smart City Emergency Management</h1>
              <p className="text-lg sm:text-xl text-muted-foreground mt-1">Integrated Response Platform for India</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Emergency Numbers Banner */}
        <div className="mb-8 sm:mb-10 rounded-xl border-4 border-red-600 bg-red-600/20 p-5 sm:p-8">
          <div className="mb-4 sm:mb-5 flex flex-col sm:flex-row items-center gap-3">
            <Phone className="h-8 w-8 sm:h-10 sm:w-10 text-red-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-red-400 text-center sm:text-left">Emergency Helpline Numbers</h2>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-card p-4 sm:p-5 border-2 border-red-700 hover:border-red-500 transition-all cursor-pointer active:scale-95">
              <p className="text-4xl sm:text-5xl font-bold text-red-400 mb-2">100</p>
              <p className="text-lg sm:text-xl font-semibold text-foreground">Police</p>
            </div>
            <div className="rounded-lg bg-card p-4 sm:p-5 border-2 border-orange-700 hover:border-orange-500 transition-all cursor-pointer active:scale-95">
              <p className="text-4xl sm:text-5xl font-bold text-orange-400 mb-2">101</p>
              <p className="text-lg sm:text-xl font-semibold text-foreground">Fire Services</p>
            </div>
            <div className="rounded-lg bg-card p-4 sm:p-5 border-2 border-blue-700 hover:border-blue-500 transition-all cursor-pointer active:scale-95">
              <p className="text-4xl sm:text-5xl font-bold text-blue-400 mb-2">102</p>
              <p className="text-lg sm:text-xl font-semibold text-foreground">Ambulance</p>
            </div>
            <div className="rounded-lg bg-card p-4 sm:p-5 border-2 border-green-700 hover:border-green-500 transition-all cursor-pointer active:scale-95">
              <p className="text-4xl sm:text-5xl font-bold text-green-400 mb-2">112</p>
              <p className="text-lg sm:text-xl font-semibold text-foreground">Emergency (All)</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row items-start gap-4 sm:gap-5 rounded-xl border-3 border-yellow-600 bg-yellow-600/15 p-5 sm:p-8">
          <AlertTriangle className="h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0 text-yellow-400" />
          <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-3">Mission-Critical System</h2>
            <p className="text-base sm:text-xl leading-relaxed text-muted-foreground">
              This platform coordinates emergency response across Fire Services, Police, and Medical Services
              throughout India. Select your role to access the appropriate interface.
            </p>
            <div className="mt-4 sm:mt-5 rounded-lg bg-card p-4 sm:p-5 border-2 border-input">
              <p className="text-base sm:text-lg font-semibold text-yellow-400 mb-2">Additional Emergency Contacts:</p>
              <div className="grid gap-2 text-sm sm:text-base text-muted-foreground">
                <p>• Women's Helpline: <span className="font-bold text-foreground">1091</span></p>
                <p>• Child Helpline: <span className="font-bold text-foreground">1098</span></p>
                <p>• Disaster Management: <span className="font-bold text-foreground">108</span></p>
                <p>• Railway Helpline: <span className="font-bold text-foreground">139</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="mb-8 sm:mb-10">
          <h2 className="mb-3 text-2xl sm:text-3xl font-bold">Select Your Role</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">Choose the interface that matches your responsibilities</p>
        </div>

        <div className="grid gap-5 sm:gap-8 md:grid-cols-2">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Link key={role.id} to={role.path} className="group">
                <Card className="h-full border-3 border-border bg-card p-6 sm:p-10 transition-all hover:border-ring hover:bg-muted hover:scale-[1.02] active:scale-[0.98]">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className={`flex h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 items-center justify-center rounded-xl ${role.color} transition-all`}>
                      <Icon className="h-9 w-9 sm:h-11 sm:w-11 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold text-foreground">{role.title}</h3>
                      <p className="mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed text-muted-foreground">{role.description}</p>
                      <Button
                        variant="outline"
                        className="border-3 border-input bg-accent text-base sm:text-lg px-5 sm:px-6 py-5 sm:py-6 hover:bg-accent/80 hover:border-ring active:scale-95 transition-all font-semibold text-foreground"
                      >
                        Continue as {role.title}
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* System Status */}
        <div className="mt-8 sm:mt-12 rounded-xl border-2 border-border bg-card p-5 sm:p-8">
          <div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
            <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-green-500 animate-pulse"></div>
            <h3 className="text-xl sm:text-2xl font-bold">System Status: Operational</h3>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
            <div className="rounded-lg bg-muted p-5 sm:p-6 border-2 border-border hover:border-input transition-all">
              <p className="text-base sm:text-lg text-muted-foreground mb-2">Active Incidents</p>
              <p className="text-4xl sm:text-5xl font-bold text-foreground">24</p>
            </div>
            <div className="rounded-lg bg-muted p-5 sm:p-6 border-2 border-border hover:border-input transition-all">
              <p className="text-base sm:text-lg text-muted-foreground mb-2">Units Deployed</p>
              <p className="text-4xl sm:text-5xl font-bold text-foreground">18</p>
            </div>
            <div className="rounded-lg bg-muted p-5 sm:p-6 border-2 border-border hover:border-input transition-all">
              <p className="text-base sm:text-lg text-muted-foreground mb-2">Response Time Avg.</p>
              <p className="text-4xl sm:text-5xl font-bold text-foreground">4.2 <span className="text-xl sm:text-2xl">min</span></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}