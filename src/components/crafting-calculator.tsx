'use client'

import type React from 'react'
import { useState } from 'react'

import {
  craftableItems,
  materialPrices,
  recyclableMaterials,
} from '@/constants'

import { CraftableItems } from './craftable-items'
import { Header } from './header'
import { MaterialsSummary } from './materials-summary'

export default function CraftingCalculator() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

  const calculateTotalMaterials = () => {
    const totals: { [key: string]: number } = {}

    Object.entries(quantities).forEach(([itemId, quantity]) => {
      if (quantity > 0) {
        const item = craftableItems.find((i) => i.id === itemId)
        if (item) {
          Object.entries(item.recipe).forEach(([material, amount]) => {
            totals[material] = (totals[material] || 0) + amount * quantity
          })
        }
      }
    })

    return totals
  }

  const getActiveCraftings = () => {
    return Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => {
        const item = craftableItems.find((i) => i.id === itemId)
        return { item: item!, quantity }
      })
  }

  const calculateTotalCost = () => {
    let totalCost = 0
    Object.entries(quantities).forEach(([itemId, quantity]) => {
      if (quantity > 0) {
        const item = craftableItems.find((i) => i.id === itemId)
        if (item) {
          Object.entries(item.recipe).forEach(([material, amount]) => {
            const price = materialPrices[material]
            if (price) {
              totalCost += price * amount * quantity
            }
          })
        }
      }
    })
    return totalCost
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, quantity),
    }))
  }

  const clearAll = () => {
    setQuantities({})
    setSelectedItem(null)
  }

  const totalMaterials = calculateTotalMaterials()
  const activeCraftings = getActiveCraftings()
  const totalCost = calculateTotalCost()
  const hasMaterials = Object.keys(totalMaterials).length > 0

  const recyclableMats = Object.entries(totalMaterials).filter(([material]) =>
    recyclableMaterials.has(material),
  )
  const directMats = Object.entries(totalMaterials).filter(
    ([material]) => !recyclableMaterials.has(material),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      <Header hasMaterials={hasMaterials} clearAll={clearAll} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <CraftableItems
            quantities={quantities}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            updateQuantity={updateQuantity}
          />
          <MaterialsSummary
            activeCraftings={activeCraftings}
            directMats={directMats}
            hasMaterials={hasMaterials}
            recyclableMaterials={recyclableMaterials}
            recyclableMats={recyclableMats}
            totalCost={totalCost}
          />
        </div>
      </div>
    </div>
  )
}
