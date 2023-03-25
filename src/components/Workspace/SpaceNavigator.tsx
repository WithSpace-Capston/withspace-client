import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";

// axios.defaults.withCredentials = true;

function SpaceNavigator() {
  const params = useParams();

  useEffect(() => {
    const userId = params.userId;
    const userPageApiUrl = `http://ec2-3-35-150-39.ap-northeast-2.compute.amazonaws.com:8080/member/${userId}/space`;
    let spaceId;

    const fetchUserPageInfo = async () => {
      const response = await axios.get(userPageApiUrl);
      spaceId = response.data.data.spaceId;
    };

    fetchUserPageInfo();
  }, [params.userId]);

  return <h1>SpaceNavigator Test</h1>;
}

export default SpaceNavigator;
