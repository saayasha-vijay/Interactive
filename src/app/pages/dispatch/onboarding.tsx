import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Truck, Shield, CheckCircle, MapPin, Radio } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

export default function DispatchOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [unitType, setUnitType] = useState('');
  const [acknowledged, setAcknowledged] = useState({
    safety: false,
    communication: false,
    equipment: false,
  });

  const handleComplete = () => {
    navigate('/dispatch/dashboard');
  };

  const allAcknowledged = acknowledged.safety && acknowledged.communication && acknowledged.equipment;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-lg px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
            <Truck className="h-9 w-9" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Dispatch Unit</h1>
          <p className="text-base text-muted-foreground">Mobile field operations</p>
        </div>

        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full ${s <= step ? 'bg-green-600' : 'bg-accent'}`}
            />
          ))}
        </div>

        {/* Step Content */}
        <Card className="border-2 border-border bg-card p-6">
          {step === 1 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Unit Identification</h2>
              <p className="mb-6 text-base text-muted-foreground">
                Select your unit type to configure your mobile interface:
              </p>
              <div className="space-y-3">
                <div
                  onClick={() => setUnitType('ambulance')}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    unitType === 'ambulance'
                      ? 'border-green-600 bg-green-600/10'
                      : 'border-border bg-muted hover:border-input'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-2xl">
                      🚑
                    </div>
                    <div>
                      <p className="font-semibold">Medical / Ambulance</p>
                      <p className="text-sm text-muted-foreground">Emergency medical services</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setUnitType('fire')}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    unitType === 'fire'
                      ? 'border-green-600 bg-green-600/10'
                      : 'border-border bg-muted hover:border-input'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-2xl">
                      🚒
                    </div>
                    <div>
                      <p className="font-semibold">Fire Department</p>
                      <p className="text-sm text-muted-foreground">Fire suppression and rescue</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setUnitType('police')}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    unitType === 'police'
                      ? 'border-green-600 bg-green-600/10'
                      : 'border-border bg-muted hover:border-input'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-2xl">
                      🚔
                    </div>
                    <div>
                      <p className="font-semibold">Police Services</p>
                      <p className="text-sm text-muted-foreground">Law enforcement and security</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!unitType}
                className="mt-6 w-full bg-green-600 py-6 text-base hover:bg-green-700"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Field Safety Protocols</h2>
              <p className="mb-6 text-base text-muted-foreground">
                Confirm your understanding of field operations protocols:
              </p>
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-muted p-5">
                  <div className="mb-3 flex items-start gap-3">
                    <Checkbox
                      id="safety"
                      checked={acknowledged.safety}
                      onCheckedChange={(checked) =>
                        setAcknowledged({ ...acknowledged, safety: checked === true })
                      }
                    />
                    <Label htmlFor="safety" className="text-base font-semibold">
                      Personal & Scene Safety
                    </Label>
                  </div>
                  <p className="ml-8 text-sm text-muted-foreground">
                    I will prioritize personal safety and assess scene conditions before entering.
                    I will request backup when necessary.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted p-5">
                  <div className="mb-3 flex items-start gap-3">
                    <Checkbox
                      id="communication"
                      checked={acknowledged.communication}
                      onCheckedChange={(checked) =>
                        setAcknowledged({ ...acknowledged, communication: checked === true })
                      }
                    />
                    <Label htmlFor="communication" className="text-base font-semibold">
                      Continuous Communication
                    </Label>
                  </div>
                  <p className="ml-8 text-sm text-muted-foreground">
                    I will maintain contact with control room and provide regular status updates
                    throughout the incident response.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted p-5">
                  <div className="mb-3 flex items-start gap-3">
                    <Checkbox
                      id="equipment"
                      checked={acknowledged.equipment}
                      onCheckedChange={(checked) =>
                        setAcknowledged({ ...acknowledged, equipment: checked === true })
                      }
                    />
                    <Label htmlFor="equipment" className="text-base font-semibold">
                      Equipment & Vehicle Status
                    </Label>
                  </div>
                  <p className="ml-8 text-sm text-muted-foreground">
                    I confirm that my vehicle and equipment are operational and ready for deployment.
                    I will report any equipment issues immediately.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1 border-2 border-input py-6 text-base">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!allAcknowledged}
                  className="flex-1 bg-green-600 py-6 text-base hover:bg-green-700"
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
              <h2 className="mb-2 text-xl font-semibold">Ready for Dispatch</h2>
              <p className="mb-8 text-base text-muted-foreground">
                Your mobile unit interface is configured and ready for field operations.
              </p>
              <div className="mb-8 rounded-lg border border-border bg-muted p-5 text-left">
                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold">
                  <Shield className="h-5 w-5 text-green-500" />
                  Mobile Interface Features:
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-gray-500" />
                    Real-time navigation to incident locations
                  </li>
                  <li className="flex items-start gap-2">
                    <Radio className="h-4 w-4 flex-shrink-0 text-gray-500" />
                    Direct communication with control room
                  </li>
                  <li className="flex items-start gap-2">
                    <Truck className="h-4 w-4 flex-shrink-0 text-gray-500" />
                    Quick status updates (En Route, On Scene, Resolved)
                  </li>
                </ul>
              </div>
              <Button onClick={handleComplete} className="w-full bg-green-600 py-6 text-base hover:bg-green-700">
                Start Field Operations
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
