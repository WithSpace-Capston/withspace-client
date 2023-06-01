import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { editingState } from "../stores/editing";
import CategoryButton from "./CategoryButton";
import InputForm from "./InputForm";

interface Todo {
  id: number;
  text: string;
}

const EasyTodo = () => {

  const category1 = {
    categoryid: 1,
    color: "#AE68EC",
    label: "공부",
  };
  const category2 = {
    categoryid: 2,
    color: "#DC7B82",
    label: "약속",
  };
  const category3 = {
    categoryid: 3,
    color: "#FFDA40",
    label: "할일",
  };

  const setEditing = useSetRecoilState(editingState);

  return (
    <Wrapper>
    <Title>간편입력</Title>
    <Content>
      <CategoryButton category={category1} /> 
      {/* +누르면 더 나오게 변경 */}
      <EasyForm category={category1}></EasyForm>

      <CategoryButton category={category2} />
      <EasyForm category={category2}></EasyForm>

      <CategoryButton category={category3} />
      <EasyForm category={category3}></EasyForm>

    </Content>
  </Wrapper>
  );
};

export default EasyTodo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vh; 
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 100px;
  text-align: center;
`;

const Content = styled.div`
  margin-left: 20px;
`;

const EasyForm = styled(InputForm)`
padding: 20px;
`
