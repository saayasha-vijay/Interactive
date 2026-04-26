import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Phone, Mail, ArrowRight, AlertCircle, Info, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { toast } from "sonner";

export default function LandingPage() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Please enter a phone number");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent to your phone!");
  };

  const handleVerifyOTP = () => {
    if (otp === "123456") {
      toast.success("Login successful!");
      navigate('/citizen/dashboard');
    } else {
      toast.error("Invalid OTP. Try 123456");
    }
  };

  const handlePersonnelLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    // Simple mock routing
    if (email.includes('op')) navigate('/operator/dashboard');
    else if (email.includes('sup')) navigate('/supervisor/dashboard');
    else if (email.includes('dis')) navigate('/dispatch/dashboard');
    else navigate('/citizen/dashboard');
  };

  const handleGuestAccess = () => {
    navigate('/citizen/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/30 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-red-600 shadow-[0_0_40px_rgba(220,38,38,0.3)] ring-8 ring-red-600/10 mb-2">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter text-foreground">IND-EMERGENCY</h1>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-60">Smart City Response v4.0</p>
          </div>
        </div>

        <Tabs defaultValue="citizen" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-muted/50 rounded-2xl mb-6">
            <TabsTrigger value="citizen" className="text-sm font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Citizen Login
            </TabsTrigger>
            <TabsTrigger value="personnel" className="text-sm font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Personnel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="citizen" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-400">
            <Card className="border-border bg-card/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-black tracking-tight">Login as Citizen</CardTitle>
                <CardDescription className="text-sm font-medium">Verify your phone for priority assistance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest ml-1 opacity-50">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="phone" 
                          placeholder="+91 99999 99999" 
                          className="h-14 pl-12 border-border bg-background/50 rounded-2xl focus:ring-red-600/20"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button className="w-full h-14 text-lg font-black bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 rounded-2xl transition-all active:scale-[0.98]">
                      Get OTP <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6 flex flex-col items-center py-2">
                    <div className="space-y-2 text-center">
                      <Label className="text-xs font-bold uppercase tracking-widest opacity-50">Enter 6-digit Code</Label>
                      <InputOTP maxLength={6} value={otp} onChange={setOtp} onComplete={handleVerifyOTP}>
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot index={0} className="rounded-xl border-2 h-12 w-10 sm:h-14 sm:w-12 font-bold" />
                          <InputOTPSlot index={1} className="rounded-xl border-2 h-12 w-10 sm:h-14 sm:w-12 font-bold" />
                          <InputOTPSlot index={2} className="rounded-xl border-2 h-12 w-10 sm:h-14 sm:w-12 font-bold" />
                          <InputOTPSlot index={3} className="rounded-xl border-2 h-12 w-10 sm:h-14 sm:w-12 font-bold" />
                          <InputOTPSlot index={4} className="rounded-xl border-2 h-12 w-10 sm:h-14 sm:w-12 font-bold" />
                          <InputOTPSlot index={5} className="rounded-xl border-2 h-12 w-10 sm:h-14 sm:w-12 font-bold" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <div className="flex gap-4 w-full">
                      <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => setOtpSent(false)}>Back</Button>
                      <Button className="flex-1 h-12 bg-red-600 rounded-xl font-bold" onClick={handleVerifyOTP}>Verify</Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4 border-t border-border/50 bg-muted/30 p-6">
                <div className="flex items-start gap-3">
                  <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                    Logged-in citizens receive location-aware dispatch priority and can track incident progress in real-time.
                  </p>
                </div>
              </CardFooter>
            </Card>
            
            <Button 
              variant="outline" 
              onClick={handleGuestAccess}
              className="w-full h-16 text-xl font-black border-2 border-red-600/30 text-red-500 hover:bg-red-600/5 hover:border-red-600 rounded-2xl active:scale-[0.98] transition-all shadow-sm"
            >
              Continue as Guest
            </Button>
          </TabsContent>

          <TabsContent value="personnel" className="animate-in fade-in slide-in-from-bottom-2 duration-400">
            <Card className="border-border bg-card/40 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-black tracking-tight">Personnel Access</CardTitle>
                <CardDescription className="text-sm font-medium">Internal portal for authorized units</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handlePersonnelLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest ml-1 opacity-50">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="operator@city.gov.in" 
                        className="h-14 pl-12 border-border bg-background/50 rounded-2xl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pass" className="text-xs font-bold uppercase tracking-widest ml-1 opacity-50">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="pass" 
                        type="password"
                        placeholder="••••••••" 
                        className="h-14 pl-12 border-border bg-background/50 rounded-2xl"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="w-full h-14 text-lg font-black bg-slate-800 hover:bg-slate-900 rounded-2xl transition-all active:scale-[0.98]">
                    Authorized Login
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="bg-muted/30 p-6 flex justify-center">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                  Access monitored by Cyber Security Division
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer Branding */}
      <div className="mt-12 text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-30">
          Smart City Integrated Response Platform
        </p>
      </div>
    </div>
  );
}