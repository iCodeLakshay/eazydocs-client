import { useUser } from "@/Utils/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserRetrivingLoader from "@/components/Others/UserRetrivingLoader";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return <UserRetrivingLoader />;
  if (!user) return null; // Will redirect in useEffect

  return children;
}