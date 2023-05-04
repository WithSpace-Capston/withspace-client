import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
      pageList = [];
      let searchPageId = params.pageId;
      const token = localStorage.getItem("withspace_token");
      while (true) {
        const response = await axios.get(`/page/${searchPageId}`, {
          headers: { Authorization: token },
        });
        pageList.unshift({
          id: response.data.pageId,
          title: response.data.pageTitle,
        });
        if (response.data.parentPageId === null) break;
        searchPageId = response.data.parentPageId;
      }
    };

    createPageList();
  }, [params.pageId]);

  return (
    <BreadcrumbWrapper>
      {pageList.map((page) => {
        return (
          <div key={page.id}>
            <span>/</span>
            <BreadcrubItem
              $active={page.id.toString() === params.pageId}
              onClick={() => navigate(`/space/${page.id}`)}
            >
              {page.title}
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
  }
`;
