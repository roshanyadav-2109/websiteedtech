
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Loader2 } from "lucide-react";

const LoginButton = () => {
  const { user, isLoading, signInWithGoogle, signOut } = useAuth();

  if (isLoading) {
    return (
      <Button disabled variant="outline" className="bg-white">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <Button onClick={signOut} variant="outline" className="bg-white">
        Logout
      </Button>
    );
  }

  return (
    <Button onClick={signInWithGoogle} variant="outline" className="bg-white">
      Login
    </Button>
  );
};

export default LoginButton;
