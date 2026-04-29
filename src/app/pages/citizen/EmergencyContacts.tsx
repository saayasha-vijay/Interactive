import { Header } from "../../components/Header";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { UserPlus, Phone, User, Trash2, Edit2, ShieldAlert } from "lucide-react";

export default function EmergencyContacts() {
  const contacts = [
    { name: "Rahul Sharma", phone: "+91 98765 43210", relation: "Brother" },
    { name: "Anita Vijay", phone: "+91 87654 32109", relation: "Mother" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header title="Emergency Contacts" showBack />
      
      <main className="flex-1 max-w-xl mx-auto w-full px-6 py-8 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Saved Contacts</h2>
          <Button size="sm" variant="ghost" className="rounded-xl h-8 text-[10px] font-black uppercase tracking-widest gap-1 text-red-600">
            <UserPlus className="h-3 w-3" />
            Add New
          </Button>
        </div>

        <div className="space-y-4">
          {contacts.map((contact, idx) => (
            <Card key={idx} className="p-5 rounded-[2rem] border-border bg-card/40 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                  <User className="h-6 w-6 opacity-40" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">{contact.name}</h3>
                  <div className="flex items-center gap-2 opacity-60">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-600">{contact.relation}</span>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="text-xs font-medium">{contact.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-background">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-red-600/10 text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 rounded-[2.5rem] border-border bg-red-600/5 border-dashed border-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-red-600" />
              <p className="text-sm font-bold tracking-tight">SOS Alerts</p>
            </div>
            <div className="h-6 w-12 rounded-full p-1 bg-red-600">
              <div className="h-4 w-4 rounded-full bg-white translate-x-6" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed pr-4">
            When enabled, an SMS with your live location will be sent to all emergency contacts whenever you trigger an SOS.
          </p>
        </Card>
      </main>
    </div>
  );
}
