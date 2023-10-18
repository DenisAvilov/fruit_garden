export interface Category {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
}

export interface CategoryAndSubCategories {
  id: number;
  name: string;
  subcategories: SubCategory[];
}