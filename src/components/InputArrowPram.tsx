import type { Dispatch } from 'react'
import type { ArrowPram } from '../types/ArrowPram'
import { useState } from 'react'
import * as THREE from 'three'
import styles from './InputArrowPram.module.css'

type InputArrowPramsProps = {
  setArrowPrams: Dispatch<React.SetStateAction<ArrowPram[]>>
}

type InputArrowPramProps = {
  setArrowPrams: Dispatch<React.SetStateAction<ArrowPram[]>>
  setIsInputMatrix: Dispatch<React.SetStateAction<boolean>>
}

const colors = [
  0xFF0000, // Red
  0x00FF00, // Green
  0x0000FF, // Blue
  0xFFFF00, // Yellow
  0xFF00FF, // Magenta
  0x00FFFF, // Cyan
]

export default function InputArrowPram({ setArrowPrams }: InputArrowPramsProps) {
  const [isInputMatrix, setIsInputMatrix] = useState(false)

  return (
    <>
      {
        isInputMatrix
          ? (
              <InputArrowPramMatrix setArrowPrams={setArrowPrams} setIsInputMatrix={setIsInputMatrix} />
            )
          : (
              <InputArrowPramPositionAndRotation setArrowPrams={setArrowPrams} setIsInputMatrix={setIsInputMatrix} />
            )
      }
    </>
  )
}

function InputArrowPramMatrix({ setArrowPrams, setIsInputMatrix }: InputArrowPramProps) {
  const [matrix, setMatrix] = useState<number[][]>([])

  const handleAddArrow = () => {
    const newArrow: ArrowPram = {
      id: crypto.randomUUID(),
      matrix: new THREE.Matrix4().fromArray(matrix.flat()),
      color: 0xFFFFFF,
    }
    setArrowPrams(prev => [...prev, newArrow])
    setMatrix([])
  }

  return (
    <div className={styles.inputArrowPramMatrix}>
      <button type="button" onClick={() => setIsInputMatrix(false)}>P&R</button>
      <div>
        <h2>
          Matrix:
        </h2>
      </div>
      <textarea
        onChange={(e) => {
          const data = JSON.parse(e.target.value)
          setMatrix(data)
        }}
      />
      <button type="button" onClick={handleAddArrow}>Add Arrow</button>
    </div>
  )
}

function InputArrowPramPositionAndRotation({ setArrowPrams, setIsInputMatrix }: InputArrowPramProps) {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const [color, setColor] = useState(0xFFFFFF)
  const handleAddArrow = () => {
    if (color === 0xFFFFFF) {
      const randomIndex = Math.floor(Math.random() * colors.length)
      setColor(colors[randomIndex])
    }
    const newArrow: ArrowPram = {
      id: crypto.randomUUID(),
      position: new THREE.Vector3(position.x, position.y, position.z),
      rotation: new THREE.Vector3(rotation.x, rotation.y, rotation.z),
      color,
    }
    setArrowPrams(prev => [...prev, newArrow])
    setPosition({ x: 0, y: 0, z: 0 })
    setRotation({ x: 0, y: 0, z: 0 })
    setColor(0xFFFFFF)
  }

  return (
    <div className={styles.inputArrowPram}>
      <button type="button" onClick={() => setIsInputMatrix(true)}>M</button>
      <div>
        <div>
          <h2>
            Position X:
          </h2>
        </div>
        <input
          type="number"
          value={position.x}
          onChange={e => setPosition({ ...position, x: Number.parseFloat(e.target.value) })}
        />
        <h2>
          Position Y:
        </h2>
        <input
          type="number"
          value={position.y}
          onChange={e => setPosition({ ...position, y: Number.parseFloat(e.target.value) })}
        />
        <h2>
          Position Z:
        </h2>
        <input
          type="number"
          value={position.z}
          onChange={e => setPosition({ ...position, z: Number.parseFloat(e.target.value) })}
        />
      </div>
      <div>
        <h2>
          Rotation X:
        </h2>
        <input
          type="number"
          value={rotation.x}
          onChange={e => setRotation({ ...rotation, x: Number.parseFloat(e.target.value) })}
        />
        <h2>
          Rotation Y:
        </h2>
        <input
          type="number"
          value={rotation.y}
          onChange={e => setRotation({ ...rotation, y: Number.parseFloat(e.target.value) })}
        />
        <h2>
          Rotation Z:
        </h2>
        <input
          type="number"
          value={rotation.z}
          onChange={e => setRotation({ ...rotation, z: Number.parseFloat(e.target.value) })}
        />
      </div>
      <div>
        <h2>
          Color:
        </h2>
        <input
          type="color"
          value={`#${color.toString(16).padStart(6, '0')}`}
          onChange={e => setColor(Number.parseInt(e.target.value.slice(1), 16))}
        />
      </div>
      <button type="button" onClick={handleAddArrow}>Add Arrow</button>
    </div>
  )
}
