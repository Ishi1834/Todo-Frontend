import { useContext } from "react";
import { LoggedInContext } from "../Contexts/LoggedInContext";
import Profile from "../Components/Account/Profile";
import Registration from "../Components/Account/Registration";

export default function AccountPage() {
  const { userLoggedIn } = useContext(LoggedInContext);

  if (userLoggedIn) {
    return <Profile />;
  }
  return <Registration />;
}
