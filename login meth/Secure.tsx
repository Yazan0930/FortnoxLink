import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getProfile } from "../utils/AuthProvider";

function Secure() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<User | null>(null);

  interface User {
    Me: {
        Name: string;
        Email: string;
        SysAdmin: boolean;
    }
  }

  const getUserDetails = async (accessToken: string): Promise<void> => {
    const res = await getProfile("me", accessToken);
    setUserDetails(res);
  }
  
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      navigate("/");
    } else {
      getUserDetails(accessToken);
      console.log(userDetails);
    }
  }, [navigate]);


  return (
    <>
      {userDetails && userDetails.Me ? (
        <div className="user-profile">
          <div className="card">
            <p>Welcome</p>
            <h1 className="name">{userDetails.Me.Name}</h1>
            <p className="email">{userDetails.Me.Email}</p>
            <p className="sysadmin">{userDetails.Me.SysAdmin ? "SysAdmin" : "Not a SysAdmin"}</p>
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  )
}

export default Secure