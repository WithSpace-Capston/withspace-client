import { useRecoilState, useSetRecoilState } from "recoil";
import { Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";

import { spaceState, spaceEditedState } from "./recoil/SpaceState";

function WorkspaceTitle() {
  const [space, setSpace] = useRecoilState(spaceState);
  const setSpaceEdited = useSetRecoilState(spaceEditedState);

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpaceEdited(true);
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
