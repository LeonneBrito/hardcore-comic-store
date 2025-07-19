export interface Recipe {
  [key: string]: number
}

export interface CraftableItem {
  id: string
  name: string
  icon: React.ReactNode
  recipe: Recipe
  description: string
}

export interface MaterialPrice {
  [key: string]: number
}
