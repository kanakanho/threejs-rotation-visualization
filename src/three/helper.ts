import * as THREE from 'three'

export function affineMatrixArrow(
  scene: THREE.Scene,
  affine: THREE.Matrix4 = new THREE.Matrix4().set(0.86602540378, -0.5, 0, -1, 0.5, 0.86602540378, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1),
  color: number = 0xFFFFFF,
) {
  const arrowGroup = arrow()

  // 中心に点を追加
  const geometry = new THREE.SphereGeometry(0.05, 32, 32)
  const material = new THREE.MeshBasicMaterial({ color })
  const sphere = new THREE.Mesh(geometry, material)
  sphere.position.copy(new THREE.Vector3(0, 0, 0))
  arrowGroup.add(sphere)

  // 矢印の位置と回転を設定
  arrowGroup.position.copy(new THREE.Vector3(affine.elements[12], affine.elements[13], affine.elements[14]))
  const rotation = new THREE.Euler(
    Math.atan2(affine.elements[9], affine.elements[10]),
    Math.atan2(-affine.elements[8], Math.sqrt(affine.elements[9] ** 2 + affine.elements[10] ** 2)),
    Math.atan2(affine.elements[4], affine.elements[0]),
  )
  arrowGroup.rotation.set(rotation.x, rotation.y, rotation.z)

  // シーンに矢印を追加
  scene.add(arrowGroup)
}

function arrow(): THREE.Group {
  // 矢印の初期地点を指定
  const arrowOriginPosition = new THREE.Vector3(0, 0, 0)

  // ローカル座標系での各軸方向のベクトルを計算
  const arrowXDirection = new THREE.Vector3(1, 0, 0)
  const arrowYDirection = new THREE.Vector3(0, 1, 0)
  const arrowZDirection = new THREE.Vector3(0, 0, 1)

  // 矢印の長さを指定
  const arrowLength = 1

  // 矢印ヘルパーを作成
  const arrowX = new THREE.ArrowHelper(
    arrowXDirection.clone().normalize(),
    arrowOriginPosition,
    arrowLength,
    0xFF0000,
    0.2,
    0.1,
  )
  const arrowY = new THREE.ArrowHelper(
    arrowYDirection.clone().normalize(),
    arrowOriginPosition,
    arrowLength,
    0x00FF00,
    0.2,
    0.1,
  )
  const arrowZ = new THREE.ArrowHelper(
    arrowZDirection.clone().normalize(),
    arrowOriginPosition,
    arrowLength,
    0x0000FF,
    0.2,
    0.1,
  )

  // グループを作成して矢印を追加
  const group = new THREE.Group()
  group.add(arrowX)
  group.add(arrowY)
  group.add(arrowZ)
  group.position.copy(arrowOriginPosition)

  return group
}

export function addArrow(
  scene: THREE.Scene,
  position: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
  rotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
  color: number = 0xFFFFFF,
) {
  const arrowGroup = arrow()

  // 中心に点を追加
  const geometry = new THREE.SphereGeometry(0.05, 32, 32)
  const material = new THREE.MeshBasicMaterial({ color })
  const sphere = new THREE.Mesh(geometry, material)
  sphere.position.copy(new THREE.Vector3(0, 0, 0))
  arrowGroup.add(sphere)

  // 矢印の位置と回転を設定
  arrowGroup.position.copy(position)
  arrowGroup.rotation.set(rotation.x, rotation.y, rotation.z)

  // シーンに矢印を追加
  scene.add(arrowGroup)
}

export function addGrid(scene: THREE.Scene) {
  // グリッドヘルパーを作成
  const gridHelper = new THREE.GridHelper(10, 10, 0x0000FF, 0x808080) // サイズ10、分割数10

  // シーンにグリッドを追加
  scene.add(gridHelper)
}

export function addAxes(scene: THREE.Scene) {
  // 軸ヘルパーを作成
  const axesHelper = new THREE.AxesHelper(5) // サイズ5

  // シーンに軸を追加
  scene.add(axesHelper)
}

export function sphere(scene: THREE.Scene) {
  // 球体ジオメトリとマテリアルを作成
  const geometry = new THREE.SphereGeometry(0.1, 32, 32)
  const material = new THREE.MeshBasicMaterial({ color: 0x0077FF })
  const sphere = new THREE.Mesh(geometry, material)

  // シーンに球体を追加
  scene.add(sphere)
}
