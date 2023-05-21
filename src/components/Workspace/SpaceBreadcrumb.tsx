import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function WorkspaceBreadcrumb() {
  const params = useParams();
  const navigate = useNavigate();

  const [pageList, setPageList] = useState<
    { pageId: number; pageTitle: string }[]
  >([]);

  useEffect(() => {
    const createPageList = async () => {
      try {
        const token = localStorage.getItem("withspace_token");
        const response = await axios.get(`/page/${params.pageId}/hierarchy`, {
          headers: { "JWT-Authorization": `Bearer ${token}` },
        });
        setPageList(response.data);
      } catch (err: any) {
        console.log(err);
      }
    };

    createPageList();
  }, [params.pageId]);

  return (
    <BreadcrumbWrapper>
      {pageList.map((page) => {
        return (
          <div key={page.pageId}>
            <span>/</span>
            <BreadcrubItem
              $active={page.pageId.toString() === params.pageId}
              onClick={() => navigate(`/space/${page.pageId}`)}
            >
              {page.pageTitle}
            </BreadcrubItem>
          </div>
        );
      })}
    </BreadcrumbWrapper>
  );
}

export default WorkspaceBreadcrumb;

const BreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px 10px;
  font-size: 20px;
`;

const BreadcrubItem = styled.span<{ $active: boolean }>`
  margin-left: 5px;
  background-color: ${(props) => (props.$active ? "whitesmoke" : "white")};
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
`;
