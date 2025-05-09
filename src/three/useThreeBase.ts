import type { RefObject } from 'react'
import type { ArrowPram } from '../types/ArrowPram'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { addArrow, addAxes, addGrid, affineMatrixArrow } from './helper'

export default function useThreeBase(arrowPrams: ArrowPram[]): RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  useEffect(() => {
    if (!canvasRef.current)
      return

    // シーンを作成
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 3
    camera.position.y = 3
    camera.position.x = 3

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current || undefined,
    })
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight)
    if (window.innerWidth < 1200) {
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // ウィンドウサイズ変更時の処理
    const handleResize = () => {
      // カメラのアスペクト比を更新
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      // レンダラーのサイズを更新
      renderer.setSize(window.innerWidth * 0.8, window.innerHeight)
      if (window.innerWidth < 1200) {
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener('resize', handleResize)

    // OrbitControls を作成してカメラに適用
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true // 慣性を有効化
    controls.dampingFactor = 0.05 // 慣性の強さ

    addGrid(scene)
    addAxes(scene)

    // アニメーションループ
    function animate() {
      requestAnimationFrame(animate)

      // カメラコントロールを更新
      controls.update()
      renderer.render(scene, camera)
    }

    // アニメーション開始
    animate()

    // クリーンアップ関数
    return () => {
      // イベントリスナーを削除
      window.removeEventListener('resize', handleResize)

      // レンダラーを破棄
      renderer.dispose()
    }
  }, [])

  // arrows の変更を監視してシーンを更新
  useEffect(() => {
    if (!sceneRef.current)
      return

    const scene = sceneRef.current

    // 既存の矢印を削除
    for (const child of scene.children) {
      if (child.type === 'Group') {
        scene.remove(child)
      }
    }

    // 新しい矢印を追加
    for (const arrowPram of arrowPrams) {
      if (arrowPram.matrix) {
        affineMatrixArrow(scene, arrowPram.matrix, arrowPram.color)
      }
      else {
        addArrow(scene, arrowPram.position, arrowPram.rotation, arrowPram.color)
      }
    }
  }, [arrowPrams])

  return canvasRef
}
