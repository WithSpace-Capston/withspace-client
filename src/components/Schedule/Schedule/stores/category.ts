import { atom, selector, selectorFamily } from "recoil";
import CategoryButton from "../feed/CategoryButton";
import { ICategory } from "../interfaces/ICategory";

const initialState: ICategory[] = [
  { label: "공부", color: "#AE68EC" },
  { label: "약속", color: "#DC7B82" },
  { label: "할일", color: "#FFDA40" },
];
export const categoryState = atom<ICategory[]>({
  key: "category",
  default: initialState,
});
export const selectTodoItemCategoryColor = selectorFamily<string[], string[]>({
  key: "selectTodoItemCategoryColor",
  get:
    (labels: string[]) =>
    ({ get }) => {
      const category = get(categoryState);
      const result = labels.map(
        (label) => category.filter((v) => v.label === label)[0].color
      );
      return result;
    },
});
