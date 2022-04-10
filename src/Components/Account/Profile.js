import { useEffect, useContext, useState } from "react";
import { UserTokenContext } from "../../Contexts/LoggedInContext";
import api from "../../API/todos";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { userToken } = useContext(UserTokenContext);
  // to get the profile information api/v1/user/

  useEffect(() => {
    const getUser = async () => {
      const config = {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      };
      try {
        const response = await api.get("user/", config);
        setProfile(response.data[0]);
      } catch (err) {
        console.log(err);
        console.log(err.response);
      }
    };
    getUser();
  }, [userToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  if (profile === {}) {
    return (
      <div className="container my-4 text-center">
        <h2>loading...</h2>
      </div>
    );
  }
  return (
    <div className="container my-4 text-center">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="card my-2 p-3">
          <div className="card-body">
            <h4>Username</h4> <div>{profile.username}</div>
          </div>
          <div className="card-body">
            <h4>Email</h4>
            <div>{profile.email}</div>
          </div>
          <div className="card-body">
            <h4>First name</h4> <div>{profile.first_name}</div>
          </div>
          <div className="card-body">
            <h4>Last name</h4> <div>{profile.last_name}</div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Save
        </button>
      </form>
    </div>
  );
}
