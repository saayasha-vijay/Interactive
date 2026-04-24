import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Radio, Shield, CheckCircle, Headphones, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';

export default function OperatorOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [acknowledged, setAcknowledged] = useState({
    protocols: false,
    dataPrivacy: false,
    accountability: false,
  });

  const handleComplete = () => {
    navigate('/operator/dashboard');
  };

  const allAcknowledged = acknowledged.protocols && acknowledged.dataPrivacy && acknowledged.accountability;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600">
            <Radio className="h-9 w-9" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Control Room Operator</h1>
          <p className="text-base text-muted-foreground">Mission-critical system orientation</p>
        </div>

        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full ${s <= step ? 'bg-red-600' : 'bg-accent'}`}
            />
          ))}
        </div>

        {/* Step Content */}
        <Card className="border-2 border-border bg-card p-8">
          {step === 1 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Your Role & Responsibilities</h2>
              <div className="space-y-4 text-base text-muted-foreground">
                <p>
                  As a Control Room Operator, you are the central coordination point for all emergency
                  response operations. Your decisions directly impact public safety.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-lg border border-border bg-muted p-4">
                    <Shield className="h-6 w-6 flex-shrink-0 text-red-500" />
                    <div>
                      <p className="font-semibold">Incident Monitoring</p>
                      <p className="text-sm text-muted-foreground">
                        Track all incoming incidents in real-time and assess priority levels
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-border bg-muted p-4">
                    <Radio className="h-6 w-6 flex-shrink-0 text-red-500" />
                    <div>
                      <p className="font-semibold">Resource Dispatch</p>
                      <p className="text-sm text-muted-foreground">
                        Coordinate and deploy appropriate emergency units to incidents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-border bg-muted p-4">
                    <Headphones className="h-6 w-6 flex-shrink-0 text-red-500" />
                    <div>
                      <p className="font-semibold">Communication Hub</p>
                      <p className="text-sm text-muted-foreground">
                        Maintain contact with field units and coordinate inter-agency response
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={() => setStep(2)} className="mt-8 w-full bg-red-600 py-6 text-base hover:bg-red-700">
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">System Protocols</h2>
              <p className="mb-6 text-base text-muted-foreground">
                Please acknowledge that you understand the following critical protocols:
              </p>
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-muted p-6">
                  <div className="mb-3 flex items-start gap-3">
                    <Checkbox
                      id="protocols"
                      checked={acknowledged.protocols}
                      onCheckedChange={(checked) =>
                        setAcknowledged({ ...acknowledged, protocols: checked === true })
                      }
                    />
                    <Label htmlFor="protocols" className="text-base font-semibold">
                      Emergency Response Protocols
                    </Label>
                  </div>
                  <p className="ml-8 text-sm text-muted-foreground">
                    I understand that I must follow established protocols for incident classification,
                    priority assessment, and unit dispatch. Deviations must be logged and justified.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted p-6">
                  <div className="mb-3 flex items-start gap-3">
                    <Checkbox
                      id="dataPrivacy"
                      checked={acknowledged.dataPrivacy}
                      onCheckedChange={(checked) =>
                        setAcknowledged({ ...acknowledged, dataPrivacy: checked === true })
                      }
                    />
                    <Label htmlFor="dataPrivacy" className="text-base font-semibold">
                      Data Privacy & Confidentiality
                    </Label>
                  </div>
                  <p className="ml-8 text-sm text-muted-foreground">
                    I will handle all citizen data, incident information, and communications with strict
                    confidentiality. Unauthorized disclosure is prohibited.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted p-6">
                  <div className="mb-3 flex items-start gap-3">
                    <Checkbox
                      id="accountability"
                      checked={acknowledged.accountability}
                      onCheckedChange={(checked) =>
                        setAcknowledged({ ...acknowledged, accountability: checked === true })
                      }
                    />
                    <Label htmlFor="accountability" className="text-base font-semibold">
                      Operational Accountability
                    </Label>
                  </div>
                  <p className="ml-8 text-sm text-muted-foreground">
                    All actions taken in this system are logged and auditable. I am accountable for
                    decisions made during my shift.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1 border-2 border-input py-6 text-base">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!allAcknowledged}
                  className="flex-1 bg-red-600 py-6 text-base hover:bg-red-700"
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
              <h2 className="mb-2 text-xl font-semibold">Orientation Complete</h2>
              <p className="mb-8 text-base text-muted-foreground">
                You are authorized to access the Control Room console.
              </p>
              <div className="mb-8 rounded-lg border-2 border-yellow-600 bg-yellow-600/10 p-6">
                <div className="mb-3 flex items-center justify-center gap-2 text-yellow-500">
                  <AlertTriangle className="h-6 w-6" />
                  <h3 className="text-base font-semibold">Before You Begin</h3>
                </div>
                <ul className="space-y-2 text-left text-sm text-muted-foreground">
                  <li>• Verify your communication equipment is functioning</li>
                  <li>• Review current active incidents from previous shift</li>
                  <li>• Check system status and any pending alerts</li>
                  <li>• Log your shift start time in the system</li>
                </ul>
              </div>
              <Button onClick={handleComplete} className="w-full bg-red-600 py-6 text-base hover:bg-red-700">
                Enter Control Room
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
