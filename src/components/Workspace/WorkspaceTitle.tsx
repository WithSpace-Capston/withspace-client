import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";

type WorkspaceTitleProps = {
  title: string | undefined;
};

function WorkspaceTitle(props: WorkspaceTitleProps) {
  const [titleInput, setTitleInput] = useState<string | undefined>("");

  useEffect(() => {
    setTitleInput(props.title);
  }, [props.title]);

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };

  return (
    <TitleInput size="lg">
      <Form.Control
        type="text"
        placeholder="Title"
        value={titleInput}
        onChange={titleChangeHandler}
      />
    </TitleInput>
  );
}

export default WorkspaceTitle;

const TitleInput = styled(InputGroup)`
  height: 50px;
`;
