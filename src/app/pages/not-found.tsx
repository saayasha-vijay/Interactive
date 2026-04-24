import { Link } from 'react-router';
import { Home, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-6">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent">
          <AlertTriangle className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mb-3 text-4xl font-bold">404</h1>
        <h2 className="mb-2 text-xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-base text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-blue-600 text-base hover:bg-blue-700">
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
