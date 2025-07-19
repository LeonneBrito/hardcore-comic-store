'use client'
import { Package, Recycle } from 'lucide-react'

import { materialIcons, materialPrices } from '@/constants'
import type { CraftableItem } from '@/types'

import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'

interface MaterialsSummaryProps {
  activeCraftings: { item: CraftableItem; quantity: number }[]
  directMats: [string, number][]
  hasMaterials: boolean
  recyclableMaterials: Set<string>
  recyclableMats: [string, number][]
  totalCost: number
}

export function MaterialsSummary({
  activeCraftings,
  directMats,
  hasMaterials,
  recyclableMaterials,
  recyclableMats,
  totalCost,
}: MaterialsSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
          {activeCraftings.length > 0 && (
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <Recycle className="w-5 h-5 text-green-400" />
                  Craftings Planejados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeCraftings.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-red-400">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-zinc-200">
                          {quantity}x {item.name}
                        </h4>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
                        Materiais necessários:
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(item.recipe).map(
                          ([material, amount]) => {
                            const totalAmount = amount * quantity
                            const isRecyclable =
                              recyclableMaterials.has(material)
                            return (
                              <div key={material} className="text-xs">
                                <Badge
                                  variant="outline"
                                  className={`${isRecyclable ? 'border-green-500/50 text-green-400' : 'border-blue-500/50 text-blue-400'} bg-transparent`}
                                >
                                  <span className="mr-1">
                                    {materialIcons[material]}
                                  </span>
                                  {totalAmount} {material}
                                  {materialPrices[material] && (
                                    <span className="ml-2 text-yellow-400">
                                      ($
                                      {(
                                        materialPrices[material] * totalAmount
                                      ).toLocaleString()}
                                      )
                                    </span>
                                  )}
                                </Badge>
                                {isRecyclable && (
                                  <div className="text-xs text-zinc-500 mt-1 ml-1">
                                    ou {totalAmount} Mat. Reciclado
                                  </div>
                                )}
                              </div>
                            )
                          },
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-zinc-100 flex items-center gap-2">
                <Package className="w-5 h-5 text-red-400" />
                Total de Materiais
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hasMaterials ? (
                <div className="space-y-6">
                  {directMats.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
                        <Package className="w-4 h-4" />
                        Materiais Diretos
                      </h4>
                      <div className="space-y-3">
                        {directMats.map(([material, amount]) => (
                          <div
                            key={material}
                            className="p-4 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg border border-zinc-600"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-blue-400 p-2 bg-blue-500/10 rounded">
                                  {materialIcons[material]}
                                </span>
                                <span className="text-zinc-200 font-medium">
                                  {material}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge
                                  variant="outline"
                                  className="border-blue-500/50 text-blue-400 bg-blue-500/10 px-3 py-1"
                                >
                                  {amount.toLocaleString()}
                                </Badge>
                                {materialPrices[material] && (
                                  <Badge
                                    variant="outline"
                                    className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10 px-2 py-1 ml-2"
                                  >
                                    $
                                    {(
                                      materialPrices[material] * amount
                                    ).toLocaleString()}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {directMats.length > 0 && recyclableMats.length > 0 && (
                    <Separator className="bg-zinc-700" />
                  )}

                  {recyclableMats.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
                        <Recycle className="w-4 h-4" />
                        Materiais Recicláveis
                      </h4>
                      <div className="space-y-3">
                        {recyclableMats.map(([material, amount]) => (
                          <div
                            key={material}
                            className="p-4 bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-lg border border-zinc-600"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <span className="text-green-400 p-2 bg-green-500/10 rounded">
                                  {materialIcons[material]}
                                </span>
                                <span className="text-zinc-200 font-medium">
                                  {material}
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="border-green-500/50 text-green-400 bg-green-500/10 px-3 py-1"
                              >
                                {amount.toLocaleString()}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-500 bg-zinc-800/50 p-2 rounded border border-zinc-700">
                              <Recycle className="w-3 h-3 text-green-400" />
                              <span>
                                Alternativa:{' '}
                                <strong className="text-green-400">
                                  {amount.toLocaleString()}
                                </strong>{' '}
                                Material Reciclado (troca 1:1)
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-500 text-lg">
                    Selecione itens e quantidades
                  </p>
                  <p className="text-zinc-600 text-sm">
                    para ver os materiais necessários
                  </p>
                </div>
              )}
              {totalCost > 0 && (
                <>
                  <Separator className="bg-zinc-700 my-6" />
                  <div className="p-4 bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 rounded-lg border border-yellow-500/30">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                        💰 Custo Total
                      </h4>
                      <div className="text-2xl font-bold text-yellow-400">
                        ${totalCost.toLocaleString()}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 mt-2">
                      Apenas materiais com preço definido
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
