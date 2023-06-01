import { ICategory } from './ICategory';
import { ITodoItem } from './ITodoItem';

export interface IBottomSheet {
  selectedCategory: ICategory | null;
  selectedItem: ITodoItem | null;
  isOpen: boolean;
}