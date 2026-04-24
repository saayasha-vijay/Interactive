import { useState } from 'react';
import { useNavigate } from 'react-router';
import { UserCircle, MapPin, Bell, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';

export default function CitizenOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [permissions, setPermissions] = useState({
    location: false,
    notifications: false,
  });

  const handleComplete = () => {
    navigate('/citizen/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <div className="mx-auto mb-4 sm:mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-blue-600">
            <UserCircle className="h-9 w-9 sm:h-11 sm:w-11" />
          </div>
          <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl font-bold">Welcome, Citizen</h1>
          <p className="text-lg sm:text-xl text-muted-foreground">Let's set up your emergency reporting access</p>
        </div>

        {/* Progress */}
        <div className="mb-8 sm:mb-10 flex items-center justify-center gap-2 sm:gap-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 sm:h-3 w-20 sm:w-24 rounded-full transition-all ${
                s <= step ? 'bg-blue-600' : 'bg-accent'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <Card className="border-3 border-border bg-card p-6 sm:p-10">
          {step === 1 && (
            <div>
              <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl font-bold text-foreground">About This Platform</h2>
              <div className="space-y-4 sm:space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  The Smart City Emergency Management platform connects you directly with emergency
                  services across India including:
                </p>
                <ul className="ml-6 sm:ml-8 space-y-2 sm:space-y-3 list-disc text-lg sm:text-xl text-foreground">
                  <li>Fire Services (101)</li>
                  <li>Police Services (100)</li>
                  <li>Medical Emergency Services (102)</li>
                  <li>National Emergency Response (112)</li>
                </ul>
                <div className="mt-6 sm:mt-8 rounded-xl border-4 border-red-600 bg-red-600/15 p-5 sm:p-6">
                  <p className="text-lg sm:text-xl font-bold text-red-400 leading-relaxed">
                    For life-threatening emergencies, always call 112 (National Emergency Number) or the specific service number first
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setStep(2)} 
                className="mt-8 sm:mt-10 w-full bg-blue-600 py-6 sm:py-7 text-lg sm:text-xl hover:bg-blue-700 active:scale-95 transition-all font-semibold"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl font-bold text-foreground">Permissions</h2>
              <p className="mb-6 sm:mb-8 text-lg sm:text-xl text-muted-foreground">
                We need the following permissions to provide you with the best emergency response:
              </p>
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-start gap-4 sm:gap-5 rounded-xl border-2 border-border bg-muted p-5 sm:p-7 hover:border-input transition-all">
                  <MapPin className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 text-blue-400" />
                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-3 sm:gap-4">
                      <Checkbox
                        id="location"
                        checked={permissions.location}
                        onCheckedChange={(checked) =>
                          setPermissions({ ...permissions, location: checked === true })
                        }
                        className="h-6 w-6 border-2 border-input"
                      />
                      <Label htmlFor="location" className="text-lg sm:text-xl font-bold text-foreground cursor-pointer">
                        Location Access
                      </Label>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      Allows emergency services to locate you quickly and dispatch the nearest available unit
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:gap-5 rounded-xl border-2 border-border bg-muted p-5 sm:p-7 hover:border-input transition-all">
                  <Bell className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 text-blue-400" />
                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-3 sm:gap-4">
                      <Checkbox
                        id="notifications"
                        checked={permissions.notifications}
                        onCheckedChange={(checked) =>
                          setPermissions({ ...permissions, notifications: checked === true })
                        }
                        className="h-6 w-6 border-2 border-input"
                      />
                      <Label htmlFor="notifications" className="text-lg sm:text-xl font-bold text-foreground cursor-pointer">
                        Push Notifications
                      </Label>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      Receive real-time updates on your incident status and emergency alerts in your area
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  onClick={() => setStep(1)} 
                  variant="outline" 
                  className="flex-1 border-3 border-input py-6 sm:py-7 text-lg sm:text-xl font-semibold hover:bg-accent active:scale-95 transition-all text-foreground"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!permissions.location || !permissions.notifications}
                  className="flex-1 bg-blue-600 py-6 sm:py-7 text-lg sm:text-xl hover:bg-blue-700 active:scale-95 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="mx-auto mb-5 sm:mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-green-600">
                <CheckCircle className="h-11 w-11 sm:h-14 sm:w-14" />
              </div>
              <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold text-foreground">You're All Set!</h2>
              <p className="mb-8 sm:mb-10 text-lg sm:text-xl leading-relaxed text-muted-foreground">
                Your citizen account is ready. You can now report emergencies and track their status.
              </p>
              <div className="mb-8 sm:mb-10 rounded-xl border-2 border-border bg-muted p-6 sm:p-8 text-left">
                <h3 className="mb-4 sm:mb-5 text-lg sm:text-xl font-bold text-foreground">Quick Tips:</h3>
                <ul className="space-y-2 sm:space-y-3 text-base sm:text-lg leading-relaxed text-muted-foreground">
                  <li>• Provide accurate location information</li>
                  <li>• Include photos or videos when safe to do so</li>
                  <li>• Stay on the platform for updates from responders</li>
                  <li>• You'll receive estimated arrival times</li>
                </ul>
              </div>
              <Button 
                onClick={handleComplete} 
                className="w-full bg-blue-600 py-6 sm:py-7 text-lg sm:text-xl hover:bg-blue-700 active:scale-95 transition-all font-semibold"
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}