import { useRecoilState } from "recoil";
import { Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";

import { spaceState } from "./recoil/SpaceState";

function WorkspaceTitle() {
  const [space, setSpace] = useRecoilState(spaceState);

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpace({ ...space, title: event.target.value, edited: true });
  };

  return (
    <TitleInput size="lg">
      <FormControl
        type="text"
        placeholder="Title"
        value={space.title || ""}
        onChange={titleChangeHandler}
      />
    </TitleInput>
  );
}

export default WorkspaceTitle;

const TitleInput = styled(InputGroup)`
  height: 50px;
`;

const FormControl = styled(Form.Control)`
  &:focus {
    box-shadow: none;
  }
`;
