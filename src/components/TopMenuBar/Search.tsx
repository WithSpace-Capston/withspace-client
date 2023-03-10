import { OverlayTrigger, Popover } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

function Search() {
  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={
        <Popover>
          <Popover.Body>Search Test Popover</Popover.Body>
        </Popover>
      }
    >
      <h3>
        <AiOutlineSearch /> 검색
      </h3>
    </OverlayTrigger>
  );
}

export default Search;
