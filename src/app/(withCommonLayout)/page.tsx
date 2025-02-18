"use client";
import { useUser } from "@/context/UserContext";

export default function HomePage() {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <h1>Welcome to nextmart home page</h1>
    </div>
  );
}
