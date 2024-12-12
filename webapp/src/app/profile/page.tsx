import { getSession } from "@/actions";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }
return (
    <div>Profile</div>
  )
}

export default Profile