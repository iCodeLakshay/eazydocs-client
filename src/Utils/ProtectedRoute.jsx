import { useUser } from "@/Utils/userContext";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div><LoaderCircle className="size-5 animate-spin" /></div>;
  if (!user) return null; // Or a spinner

  return children;
}