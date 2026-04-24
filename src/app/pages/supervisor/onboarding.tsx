import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, Shield, CheckCircle, BarChart3, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';

export default function SupervisorOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [understood, setUnderstood] = useState({
    oversight: false,
    reporting: false,
    authority: false,
  });

  const handleComplete = () => {
    navigate('/supervisor/dashboard');
  };

  const allUnderstood = understood.oversight && understood.reporting && understood.authority;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
            <Eye className="h-9 w-9" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Supervisor Access</h1>
          <p className="text-base text-muted-foreground">Executive oversight and analytics platform</p>
        </div>

        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full ${s <= step ? 'bg-purple-600' : 'bg-accent'}`}
            />
          ))}
        </div>

        {/* Step Content */}
        <Card className="border-2 border-border bg-card p-8">
          {step === 1 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Supervisory Overview</h2>
              <div className="space-y-4 text-base text-muted-foreground">
                <p>
                  As a Supervisor, you have elevated access to monitor system-wide operations, review
                  performance metrics, and coordinate inter-agency emergency response.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-lg border border-border bg-muted p-4">
                    <BarChart3 className="h-6 w-6 flex-shrink-0 text-purple-500" />
                    <div>
                      <p className="font-semibold">Performance Analytics</p>
                      <p className="text-sm text-muted-foreground">
                        Access real-time and historical data on response times, resource utilization, and incident outcomes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-border bg-muted p-4">
                    <Users className="h-6 w-6 flex-shrink-0 text-purple-500" />
                    <div>
                      <p className="font-semibold">Inter-Agency Coordination</p>
                      <p className="text-sm text-muted-foreground">
                        Monitor collaborative operations across fire, police, and medical services
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-border bg-muted p-4">
                    <Shield className="h-6 w-6 flex-shrink-0 text-purple-500" />
                    <div>
                      <p className="font-semibold">Operational Oversight</p>
                      <p className="text-sm text-muted-foreground">
                        Review operator actions, incident classifications, and system alerts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={() => setStep(2)} className="mt-8 w-full bg-purple-600 py-6 text-base hover:bg-purple-700">
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Supervisory Responsibilities</h2>
              <p className="mb-6 text-base text-muted-foreground">
                Please confirm your understanding of supervisory responsibilities:
              </p>
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-muted p-6">
                  <div className="mb-3 flex items-start gap-3">
                    <Checkbox
                      id="oversight"
                      checked={understood.oversight}
                      onCheckedChange={(checked) =>
                        setUnderstood({ ...understood, oversight: checked === true })
                      }
                    />
                    <Label htmlFor="oversight" className="text-base font-semibold">
                      Operational Oversight
                    </Label>
                  </div>
                  <p className="ml-8 text-sm text-muted-foreground">
                    I understand that I am responsible for monitoring system operations, identifying performance
                    gaps, and ensuring protocol compliance across all operational units.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted p-6">
                  <div className="mb-3 flex items-start gap-3">
                    <Checkbox
                      id="reporting"
                      checked={understood.reporting}
                      onCheckedChange={(checked) =>
                        setUnderstood({ ...understood, reporting: checked === true })
                      }
                    />
                    <Label htmlFor="reporting" className="text-base font-semibold">
                      Reporting & Documentation
                    </Label>
                  </div>
                  <p className="ml-8 text-sm text-muted-foreground">
                    I will generate and review performance reports, incident summaries, and system health
                    indicators for executive and government stakeholders.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted p-6">
                  <div className="mb-3 flex items-start gap-3">
                    <Checkbox
                      id="authority"
                      checked={understood.authority}
                      onCheckedChange={(checked) =>
                        setUnderstood({ ...understood, authority: checked === true })
                      }
                    />
                    <Label htmlFor="authority" className="text-base font-semibold">
                      Decision Authority
                    </Label>
                  </div>
                  <p className="ml-8 text-sm text-muted-foreground">
                    I have the authority to override dispatch decisions, escalate incidents, and coordinate
                    major emergency operations requiring multi-agency response.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1 border-2 border-input py-6 text-base">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!allUnderstood}
                  className="flex-1 bg-purple-600 py-6 text-base hover:bg-purple-700"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-600">
                <CheckCircle className="h-11 w-11" />
              </div>
              <h2 className="mb-2 text-xl font-semibold">Access Granted</h2>
              <p className="mb-8 text-base text-muted-foreground">
                You now have full access to the supervisor dashboard and analytics platform.
              </p>
              <div className="mb-8 rounded-lg border border-border bg-muted p-6 text-left">
                <h3 className="mb-3 text-base font-semibold">Your Dashboard Includes:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Real-time operational metrics and KPIs</li>
                  <li>• Inter-agency coordination timeline</li>
                  <li>• Resource allocation and utilization reports</li>
                  <li>• Performance analytics and trends</li>
                  <li>• System health and alert monitoring</li>
                </ul>
              </div>
              <Button onClick={handleComplete} className="w-full bg-purple-600 py-6 text-base hover:bg-purple-700">
                Access Supervisor Dashboard
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
