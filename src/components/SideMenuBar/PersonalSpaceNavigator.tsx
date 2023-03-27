import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Accordion } from "react-bootstrap";

type PageListType = {
  pageId: number;
  title: string;
}[];

type PersonalSpaceNavigatorType = {
  userId: number | undefined;
};

function PersonalSpaceNavigator(props: PersonalSpaceNavigatorType) {
  const navigate = useNavigate();

  const [pageList, setPageList] = useState<PageListType | undefined>();

  // useEffect(() => {
  //   const fetchPersonalSpaceList = async () => {
  //     const response = await axios.get(
  //       `https://withspace-1a085-default-rtdb.firebaseio.com/space/1.json`
  //     );
  //     const pageList = response.data.data.pageList;
  //     setPageList(pageList);
  //   };

  //   fetchPersonalSpaceList();
  // }, []);

  useEffect(() => {
    const fetchPersonalPageInfoApi = `http://ec2-3-35-150-39.ap-northeast-2.compute.amazonaws.com/member/${props.userId}/space`;
    const fetchPersonPageInfo = async () => {
      const response = await axios.get(fetchPersonalPageInfoApi);
      const pageList = response.data.data;
      console.log(pageList);
    };

    fetchPersonPageInfo();
  }, [props.userId]);

  const testSpaceToWorkspaceHandler = () => {
    navigate(`/${props.userId}/space`);
  };

  const testSpaceToCalendarHandler = () => {
    navigate(`/${props.userId}/calendar`);
  };

  return (
    <>
      <Accordion.Item eventKey="0">
        <h5 onClick={testSpaceToWorkspaceHandler}>작업공간</h5>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <h5 onClick={testSpaceToCalendarHandler}>스케줄</h5>
      </Accordion.Item>
    </>
  );
}

export default PersonalSpaceNavigator;
