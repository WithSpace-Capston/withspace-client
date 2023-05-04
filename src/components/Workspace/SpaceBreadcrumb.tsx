import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import styled from "styled-components";
import axios from "axios";

let pageList: {
  id: number;
  title: string;
}[] = [];

function WorkspaceBreadcrumb() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const createPageList = async () => {
      const token = localStorage.getItem("withspace_token");
      while (true) {
        const response = await axios.get(`/page/${params.pageId}`, {
          headers: { Authorization: token },
        });
        pageList.unshift({
          id: response.data.pageId,
          title: response.data.pageTitle,
        });
        if (response.data.parentPageId === null) break;
      }
    };

    createPageList();
  }, [params.pageId]);

  return (
    <BreadcrumbWrapper>
      {pageList.map((page) => {
        return (
          <>
            <BsArrowRightShort />
            <BreadcrubItem
              $active={page.id.toString() === params.pageId}
              onClick={() => navigate(`/space/${page.id}`)}
            >
              {page.title}
            </BreadcrubItem>
          </>
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
  }
`;
