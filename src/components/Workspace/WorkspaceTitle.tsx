import { useRecoilState } from "recoil";
import { Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";

import { spaceState } from "./recoil/SpaceState";

function WorkspaceTitle() {
  const [space, setSpace] = useRecoilState(spaceState);

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpace({ ...space, title: event.target.value });
  };

  return (
    <TitleInput size="lg">
      <Form.Control
        type="text"
        placeholder="Title"
        value={space.title}
        onChange={titleChangeHandler}
      />
    </TitleInput>
  );
}

export default WorkspaceTitle;

const TitleInput = styled(InputGroup)`
  height: 50px;
`;
