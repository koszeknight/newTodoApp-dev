export interface Items {
   // id: number;
    todoText?: string;
    expiredDate? :string;
    isCompleted: boolean ; // Default value


}

const defaultItem: Items = {
    todoText: '',
    isCompleted: false, // Default value
  };
