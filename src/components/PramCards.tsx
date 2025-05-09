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
  const rotationMax = 180
  const rotationMin = -180
  const rotationStep = 0.01

  return (
    <div className={styles.card}>
      <div className={styles.cardColumn}>
        <h2>Position</h2>
        <div>
          <p>
            X:
            {arrowPram.position?.x.toFixed(5) ?? '0.00000'}
          </p>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.01"
            value={arrowPram.position?.x ?? 0}
            onChange={(e) => {
              const newValue = Number(e.target.value)
              setArrowPrams(prev =>
                prev.map(pram =>
                  pram.id === arrowPram.id
                    ? {
                        ...pram,
                        position: pram.position?.clone().setX(newValue),
                      }
                    : pram,
                ),
              )
            }}
          />
        </div>
        <div>
          <p>
            Y:
            {arrowPram.position?.y.toFixed(5) ?? '0.00000'}
          </p>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.01"
            value={arrowPram.position?.y ?? 0}
            onChange={(e) => {
              const newValue = Number(e.target.value)
              setArrowPrams(prev =>
                prev.map(pram =>
                  pram.id === arrowPram.id
                    ? {
                        ...pram,
                        position: pram.position?.clone().setY(newValue),
                      }
                    : pram,
                ),
              )
            }}
          />
        </div>
        <div>
          <p>
            Z:
            {arrowPram.position?.z.toFixed(5) ?? '0.00000'}
          </p>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.01"
            value={arrowPram.position?.z ?? 0}
            onChange={(e) => {
              const newValue = Number(e.target.value)
              setArrowPrams(prev =>
                prev.map(pram =>
                  pram.id === arrowPram.id
                    ? {
                        ...pram,
                        position: pram.position?.clone().setZ(newValue),
                      }
                    : pram,
                ),
              )
            }}
          />
        </div>
      </div>
      <div className={styles.cardColumn}>
        <h2>Rotation</h2>
        <div>
          <p>
            X:
            {(arrowPram.rotation?.x ?? 0).toFixed(5)}
          </p>
          <input
            type="range"
            min={rotationMin}
            max={rotationMax}
            step={rotationStep}
            value={(arrowPram.rotation?.x ?? 0) * (180 / Math.PI)}
            onChange={(e) => {
              const newValue = (Number(e.target.value) * Math.PI) / 180
              setArrowPrams(prev =>
                prev.map(pram =>
                  pram.id === arrowPram.id
                    ? {
                        ...pram,
                        rotation: pram.rotation?.clone().setX(newValue),
                      }
                    : pram,
                ),
              )
            }}
          />
        </div>
        <div>
          <p>
            Y:
            {(arrowPram.rotation?.y ?? 0).toFixed(5)}
          </p>
          <input
            type="range"
            min={rotationMin}
            max={rotationMax}
            step={rotationStep}
            value={(arrowPram.rotation?.y ?? 0) * (180 / Math.PI)}
            onChange={(e) => {
              const newValue = (Number(e.target.value) * Math.PI) / 180
              setArrowPrams(prev =>
                prev.map(pram =>
                  pram.id === arrowPram.id
                    ? {
                        ...pram,
                        rotation: pram.rotation?.clone().setY(newValue),
                      }
                    : pram,
                ),
              )
            }}
          />
        </div>
        <div>
          <p>
            Z:
            {(arrowPram.rotation?.z ?? 0).toFixed(5)}
          </p>
          <input
            type="range"
            min={rotationMin}
            max={rotationMax}
            step={rotationStep}
            value={(arrowPram.rotation?.z ?? 0) * (180 / Math.PI)}
            onChange={(e) => {
              const newValue = (Number(e.target.value) * Math.PI) / 180
              setArrowPrams(prev =>
                prev.map(pram =>
                  pram.id === arrowPram.id
                    ? {
                        ...pram,
                        rotation: pram.rotation?.clone().setZ(newValue),
                      }
                    : pram,
                ),
              )
            }}
          />
        </div>
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
