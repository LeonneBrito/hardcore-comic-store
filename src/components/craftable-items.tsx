'use client'
import { ChevronDown, ChevronRight, FileText, Package } from 'lucide-react'

import { craftableItems, materialIcons } from '@/constants'

import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Separator } from './ui/separator'

interface CraftableItemsProps {
  quantities: Record<string, number>
  setSelectedItem: (id: string | null) => void
  selectedItem: string | null
  updateQuantity: (id: string, quantity: number) => void
}

export function CraftableItems({
  quantities,
  setSelectedItem,
  selectedItem,
  updateQuantity,
}: CraftableItemsProps) {
  return (
    <div className="lg:col-span-2">
      <h2 className="text-2xl font-semibold mb-8 text-zinc-200 flex items-center gap-3">
        <Package className="w-6 h-6 text-red-400" />
        Itens Craftáveis
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {craftableItems.map((item) => (
          <Card
            key={item.id}
            className={`bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-zinc-600 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
              selectedItem === item.id
                ? 'ring-2 ring-red-500/50 border-red-500/50 shadow-lg shadow-red-500/20'
                : ''
            }`}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedItem(selectedItem === item.id ? null : item.id)
            }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="text-red-400 p-2 bg-red-500/10 rounded-lg">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl text-zinc-100">
                      {item.name}
                    </CardTitle>
                    {selectedItem === item.id ? (
                      <ChevronDown className="w-5 h-5 text-zinc-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </CardHeader>

            {selectedItem === item.id && (
              <CardContent className="pt-0">
                <Separator className="mb-6 bg-zinc-700" />
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Receita:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(item.recipe).map(([material, amount]) => (
                      <Badge
                        key={material}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 px-3 py-1 text-sm"
                      >
                        <span className="mr-2">{materialIcons[material]}</span>
                        {amount} {material}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm text-zinc-400 font-medium whitespace-nowrap">
                    Quantidade:
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={quantities[item.id] || 0}
                    onChange={(e) =>
                      updateQuantity(
                        item.id,
                        Number.parseInt(e.target.value) || 0,
                      )
                    }
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                    className="bg-zinc-800 border-zinc-600 text-zinc-100 focus:border-red-500 focus:ring-red-500/20"
                    placeholder="0"
                  />
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
