import type { Dispatch } from 'react'
import type { ArrowPram } from '../types/ArrowPram'
import styles from './PramCards.module.css'

type PramCardsType = {
  setArrowPrams: Dispatch<React.SetStateAction<ArrowPram[]>>
  arrowPrams: ArrowPram[]
}

type PramCardType = {
  setArrowPrams: Dispatch<React.SetStateAction<ArrowPram[]>>
  arrowPram: ArrowPram
}

export default function PramCards({ arrowPrams, setArrowPrams }: PramCardsType) {
  return (
    <div className={styles.pramCards}>
      {arrowPrams.map(pram => (
        <div key={crypto.randomUUID()}>
          {
            pram.matrix
              ? <PramCardMatrix arrowPram={pram} setArrowPrams={setArrowPrams} />
              : <PramCardPositionAndRotation arrowPram={pram} setArrowPrams={setArrowPrams} />
          }
        </div>
      ))}
    </div>
  )
}

function PramCardMatrix({ arrowPram, setArrowPrams }: PramCardType) {
  if (!arrowPram.matrix) {
    return null
  }

  const rotationX = Math.atan2(arrowPram.matrix.elements[9], arrowPram.matrix.elements[10])
  const rotationY = Math.atan2(-arrowPram.matrix.elements[8], Math.sqrt(arrowPram.matrix.elements[9] ** 2 + arrowPram.matrix.elements[10] ** 2))
  const rotationZ = Math.atan2(arrowPram.matrix.elements[4], arrowPram.matrix.elements[0])
  return (
    <div className={styles.card}>
      <div className={styles.cardColumn}>
        <h2>Position</h2>
        <p>
          X:
          {arrowPram.matrix?.elements[12].toFixed(5)}
        </p>
        <p>
          Y:
          {arrowPram.matrix?.elements[13].toFixed(5)}
        </p>
        <p>
          Z:
          {arrowPram.matrix?.elements[14].toFixed(5)}
        </p>
      </div>
      <div className={styles.cardColumn}>
        <h2>Rotation</h2>
        <p>
          X:
          {rotationX.toFixed(5)}
        </p>
        <p>
          Y:
          {rotationY.toFixed(5)}
        </p>
        <p>
          Z:
          {rotationZ.toFixed(5)}
        </p>
      </div>
      <div className={styles.deleteButton}>
        <button
          type="button"
          onClick={() => {
            setArrowPrams(prev => prev.filter(pram => pram.id !== arrowPram.id))
          }}
        >
          ❌
        </button>
      </div>
    </div>
  )
}

function PramCardPositionAndRotation({ arrowPram, setArrowPrams }: PramCardType) {
  return (
    <div className={styles.card}>
      <div className={styles.cardColumn}>
        <h2>Position</h2>
        <p>
          X:
          {arrowPram.position?.x.toFixed(5)}
        </p>
        <p>
          Y:
          {arrowPram.position?.y.toFixed(5)}
        </p>
        <p>
          Z:
          {arrowPram.position?.z.toFixed(5)}
        </p>
      </div>
      <div className={styles.cardColumn}>
        <h2>Rotation</h2>
        <p>
          X:
          {arrowPram.rotation?.x.toFixed(5)}
        </p>
        <p>
          Y:
          {arrowPram.rotation?.y.toFixed(5)}
        </p>
        <p>
          Z:
          {arrowPram.rotation?.z.toFixed(5)}
        </p>
      </div>
      <div className={styles.deleteButton}>
        <button
          type="button"
          onClick={() => {
            setArrowPrams(prev => prev.filter(pram => pram.id !== arrowPram.id))
          }}
        >
          ❌
        </button>
      </div>
    </div>
  )
}
