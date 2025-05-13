import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await isAuthenticated(); // verify token properly on server (Node.js)

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <p>This is your dashboard.</p>
    </div>
  );
}
