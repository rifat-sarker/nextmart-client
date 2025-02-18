import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/AuthService";

export default async function HomePage() {
  const user = await getCurrentUser()
  console.log(user);
  return (
    <div>
      <h1>Welcome to nextmart home page</h1>
    </div>
  );
};
