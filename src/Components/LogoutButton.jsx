import { useAuth } from "../providers/auth.provider";

export const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <button
      onClick={() => {
        logout();
      }}
    >
      Logout
    </button>
  );
};
