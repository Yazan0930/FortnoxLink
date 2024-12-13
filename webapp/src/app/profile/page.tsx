import { getSession, logout } from "@/actions";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getSession();
  if (session && session.user) {
    return (
        <div>
            <h1>Welcome {session.user.name}</h1>
            <p>Email: {session.user.email}</p>
            <p>Sysadmin: {session.user.sysadmin ? "Yes" : "No"}</p>
        </div>
    );
  }
}

export default Profile