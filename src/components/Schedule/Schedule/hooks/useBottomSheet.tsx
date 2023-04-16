import { useRecoilState } from 'recoil';
import { ITodoItem } from '../interfaces/ITodoItem';
import { bottomSheetState } from '../stores/bottomSheet';

const useBottomSheet = (initial: boolean) => {
  const [bottomSheet, setBottomSheet] = useRecoilState(bottomSheetState);
  const {isOpen, selectedItem} = bottomSheet;
  const onOpen = (item: ITodoItem) => {
    setBottomSheet({ selectedItem: item, isOpen: true });
  };
  const onDismiss = () => {
    setBottomSheet({ selectedItem: null, isOpen: false });
  };
  return { isOpen, selectedItem, onOpen, onDismiss };
};

export default useBottomSheet;
