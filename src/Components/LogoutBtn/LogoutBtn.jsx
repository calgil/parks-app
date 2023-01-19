export const LogoutButton = () => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        console.log("logout");
      }}
    >
      Logout
    </button>
  );
};
