import { useLogout } from "@/shared/hooks/useLogout";

export default function LogoutBtn() {
  const logout = useLogout();
  return (
    <button
      type="button"
      onClick={logout}
      className="absolute bottom-0 py-4 left-[50%] translate-x-[-50%] bg-[#555] w-full"
    >
      Log Out
    </button>
  );
}
