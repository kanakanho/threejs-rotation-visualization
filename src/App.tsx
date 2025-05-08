import type { ArrowPram } from './types/ArrowPram'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import * as THREE from 'three'
import { z } from 'zod'
import styles from './App.module.css'
import InputArrowPram from './components/InputArrowPram'
import PramCards from './components/PramCards'
import useThreeBase from './three/useThreeBase'

const zMatrix = z.array(z.array(z.number()).length(16).nonempty())

export default function App() {
  const [arrowPrams, setArrowPrams] = useState<ArrowPram[]>([])
  const canvasRef = useThreeBase(arrowPrams)
  const [search] = useSearchParams()

  useEffect(() => {
    const matrixString = search.get('matrix')
    if (matrixString) {
      try {
        const matrixData = JSON.parse(matrixString)
        const matrixArray = zMatrix.parse(matrixData)

        // 新しい矢印データを作成
        const newArrows = matrixArray.map(matrix => ({
          id: crypto.randomUUID(),
          matrix: new THREE.Matrix4().fromArray(matrix),
          color: 0xFFFFFF,
        }))

        // 状態を一括更新
        // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
        setArrowPrams(prev => [...prev, ...newArrows])
      }
      catch (error) {
        alert('Invalid matrix data. Please check the format.')
        console.error('Invalid matrix data:', error)
      }
    }
  }, [search])

  return (
    <main className={styles.app}>
      <div className={styles.threeCanvasBox}>
        <canvas ref={canvasRef} />
      </div>
      <div className={styles.floatMenu}>
        <InputArrowPram setArrowPrams={setArrowPrams} />
        <PramCards arrowPrams={arrowPrams} setArrowPrams={setArrowPrams} />
      </div>
    </main>
  )
}
