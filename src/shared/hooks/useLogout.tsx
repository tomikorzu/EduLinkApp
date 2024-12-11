import { useContext } from "react";
import { AuthContext } from "../providers/auth";
import { useRouter } from "next/navigation";
import { AlertContext } from "../providers/alert";

export function useLogout() {
  const { setIsAuthenticate } = useContext(AuthContext)!;
  const { showAlert } = useContext(AlertContext)!;

  const router = useRouter();
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsAuthenticate(false);
    showAlert("Logout successfully", false);
    router.push("/login");
  };
  return logout;
}
