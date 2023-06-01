import { useRecoilState } from "recoil";
import { ICategory } from "../interfaces/ICategory";
import { ITodoItem } from "../interfaces/ITodoItem";
import { bottomSheetState } from "../stores/bottomSheet";

const useBottomSheet = (initial: boolean) => {
  const [bottomSheet, setBottomSheet] = useRecoilState(bottomSheetState);
  const { isOpen, selectedItem } = bottomSheet;
  const onOpen = (item: ITodoItem) => {
    setBottomSheet({
      selectedItem: item,
      selectedCategory: null,
      isOpen: true,
    });
  };
  const onCategory = (category: ICategory) => {
    setBottomSheet({
      selectedCategory: category,
      selectedItem: null,
      isOpen: true,
    });
  };
  const onDismiss = () => {
    setBottomSheet({
      selectedItem: null,
      selectedCategory: null,
      isOpen: false,
    });
  };
  return { isOpen, selectedItem, onOpen, onDismiss, onCategory };
};

export default useBottomSheet;
