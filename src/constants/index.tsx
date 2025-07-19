import {
  BookOpen,
  Eraser,
  FileText,
  Package,
  Palette,
  Printer,
  SprayCan,
  Trash2,
  Volume2,
} from 'lucide-react'

import type { CraftableItem, MaterialPrice } from '@/types'

export const materialPrices: MaterialPrice = {
  'Lata de Tinta': 1000,
  'Lata Vazia': 1000,
  'Cartucho de Tinta': 100,
}

export const craftableItems: CraftableItem[] = [
  {
    id: 'speaker-box',
    name: 'Caixa de Som',
    icon: <Volume2 className="w-8 h-8" />,
    recipe: { Sucatas: 250, Plásticos: 250 },
    description: 'Sistema de som de alta qualidade para sua configuração',
  },
  {
    id: 'spray-can',
    name: 'Lata de Spray',
    icon: <SprayCan className="w-8 h-8" />,
    recipe: { 'Lata de Tinta': 1, 'Lata Vazia': 1 },
    description: 'Perfeito para arte de rua e grafite',
  },
  {
    id: 'spray-remover',
    name: 'Removedor de Spray',
    icon: <Eraser className="w-8 h-8" />,
    recipe: { Sucatas: 50, Borrachas: 50, Plásticos: 50 },
    description: 'Limpe grafites indesejados',
  },
  {
    id: 'flyer',
    name: 'Panfleto',
    icon: <FileText className="w-8 h-8" />,
    recipe: { Papéis: 35 },
    description: 'Divulgue seus eventos',
  },
  {
    id: 'magazine',
    name: 'Revista',
    icon: <BookOpen className="w-8 h-8" />,
    recipe: { Papéis: 50, 'Cartucho de Tinta': 1 },
    description: 'Publicação de quadrinhos underground',
  },
]

export const materialIcons: { [key: string]: React.ReactNode } = {
  Sucatas: <Trash2 className="w-4 h-4" />,
  Plásticos: <Package className="w-4 h-4" />,
  'Lata de Tinta': <Palette className="w-4 h-4" />,
  'Lata Vazia': <SprayCan className="w-4 h-4" />,
  Borrachas: <Eraser className="w-4 h-4" />,
  Papéis: <FileText className="w-4 h-4" />,
  'Cartucho de Tinta': <Printer className="w-4 h-4" />,
}

export const recyclableMaterials = new Set([
  'Sucatas',
  'Plásticos',
  'Borrachas',
  'Papéis',
])
