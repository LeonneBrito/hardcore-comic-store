'use client'
import { Button } from './ui/button'

export function Header({
  hasMaterials,
  clearAll,
}: {
  hasMaterials: boolean
  clearAll: () => void
}) {
  return (
    <div className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-red-500 tracking-tight mb-2">
              HARDCORE
            </h1>
            <p className="text-zinc-400 text-lg">
              Loja de Quadrinhos • Calculadora de Craft
            </p>
          </div>
          {hasMaterials && (
            <Button
              variant="outline"
              onClick={clearAll}
              className="border-zinc-700 hover:bg-zinc-800 bg-transparent text-zinc-300 hover:text-zinc-100 px-6 py-2"
            >
              Limpar Tudo
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
