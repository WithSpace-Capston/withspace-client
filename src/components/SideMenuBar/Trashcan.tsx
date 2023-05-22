import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Card } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

import { userInfoState } from "../../contexts/UserInfoState";

const PROXY =
  window.location.hostname === "localhost"
    ? ""
    : "https://api.withspace-api.com";

type TrashcanProps = {
  show: boolean;
  setShow: (s: boolean) => void;
};

function Trashcan(props: TrashcanProps) {
  const navigate = useNavigate();

  const userInfo = useRecoilValue(userInfoState);
  const [pageList, setPageList] = useState<
    {
      pageId: number;
      pageTitle: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchPageList = async () => {
      try {
        const token = localStorage.getItem("withspace_token");

        const fetchSpaceIdRes = await axios.get(
          `${PROXY}/member/${userInfo.id}/space`,
          {
            headers: { "JWT-Authorization": `Bearer ${token}` },
          }
        );
        const spaceId = fetchSpaceIdRes.data.data.spaceId;

        const fetchPageInfoRes = await axios.get(
          `${PROXY}/space/${spaceId}/trashcan`,
          {
            headers: { "JWT-Authorization": `Bearer ${token}` },
          }
        );
        setPageList(fetchPageInfoRes.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchPageList();
  }, [userInfo.id]);

  const restorePage = async (pageId: number) => {
    const token = localStorage.getItem("withspace_token");

    const fetchSpaceIdRes = await axios.get(
      `${PROXY}/member/${userInfo.id}/space`,
      {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      }
    );
    const spaceId = fetchSpaceIdRes.data.data.spaceId;

    await axios.patch(
      `${PROXY}/space/${spaceId}/trashcan/${pageId}/restore`,
      {},
      {
        headers: { "JWT-Authorization": `Bearer ${token}` },
      }
    );

    navigate(`/space/${pageId}`);
    window.location.reload();
  };

  const deletePage = async (pageId: number) => {
    const token = localStorage.getItem("withspace_token");
    await axios.delete(`${PROXY}/page/${pageId}/trashcan`, {
      headers: { "JWT-Authorization": `Bearer ${token}` },
    });
    navigate(`/space/${userInfo.defaultPageId}`);
    window.location.reload();
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>쓰레기통</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PageListWrapper>
          {pageList &&
            pageList.map((page) => {
              return (
                <PageCard body key={page.pageId}>
                  <PageCardContentWrapper>
                    <span className="name">{page.pageTitle}</span>
                    <div>
                      <Button
                        style={{ marginRight: "3px" }}
                        variant="primary"
                        onClick={() => restorePage(page.pageId)}
                      >
                        복구
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deletePage(page.pageId)}
                      >
                        삭제
                      </Button>
                    </div>
                  </PageCardContentWrapper>
                </PageCard>
              );
            })}
        </PageListWrapper>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Trashcan;

const JoinTeamTitleLabel = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`;

const PageListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  margin: 10px 0;
  overflow: scroll;
`;

export const SearchBarWrapper = styled.div`
  display: flex;

  .search-button {
    margin-left: 10px;
    width: 75px;
  }
`;

const PageCard = styled(Card)`
  margin: 2.5px 0;
`;

const PageCardContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .name {
    font-size: 20px;
  }
`;
