import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Phone, Mail, ArrowRight, AlertCircle, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';

export default function LandingPage() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Post-login we'd determine the role. For now, default to citizen dashboard.
    navigate('/citizen/dashboard');
  };

  const handleGuestAccess = () => {
    navigate('/citizen/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Awareness Banner */}
      <div className="w-full max-w-md mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="bg-blue-600/10 border-2 border-blue-600/20 rounded-2xl p-4 flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-400">One-time Awareness</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Complete your profile in advance for quicker help during emergencies. We use your pre-saved details to assist dispatchers.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-600/20 ring-4 ring-red-600/10">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Secure Access</h1>
            <p className="text-muted-foreground">Smart City Emergency Management Platform</p>
          </div>
        </div>

        <Card className="border-border bg-card/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="pb-4">
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-11 p-1 bg-muted">
                <TabsTrigger value="phone" className="text-sm font-semibold">Phone</TabsTrigger>
                <TabsTrigger value="email" className="text-sm font-semibold">Email</TabsTrigger>
              </TabsList>
              
              <div className="mt-6">
                <TabsContent value="phone" className="mt-0 animate-in fade-in-50 duration-300">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium ml-1">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="phone" 
                          placeholder="+91 99999 99999" 
                          className="h-12 pl-10 border-border bg-background transition-all focus:ring-2 focus:ring-red-600/20"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button className="w-full h-12 text-base font-semibold bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all">
                      Get OTP <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="email" className="mt-0 animate-in fade-in-50 duration-300">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium ml-1">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          type="email"
                          placeholder="name@example.com" 
                          className="h-12 pl-10 border-border bg-background transition-all focus:ring-2 focus:ring-red-600/20"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button className="w-full h-12 text-base font-semibold bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all">
                      Continue with Email <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
              </div>
            </Tabs>
          </CardHeader>
          
          <CardContent className="pt-2">
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-3 text-muted-foreground font-medium">Or for immediate help</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleGuestAccess}
              className="w-full h-14 text-lg font-bold border-2 border-red-600/50 text-red-500 hover:bg-red-600/5 hover:border-red-600 active:scale-[0.98] transition-all"
            >
              Continue as Guest
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pb-8">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
              <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground font-medium">
                Logged-in users get faster location-based emergency assistance and incident history.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Footer Info */}
      <div className="mt-auto py-8 text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold opacity-50">
          Smart City Integrated Response Platform
        </p>
      </div>
    </div>
  );
}