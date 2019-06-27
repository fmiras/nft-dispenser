export function createFloor(): Entity {
  const floor = new Entity()
  floor.addComponentOrReplace(
    new GLTFShape('assets/models/FloorBasePebbles_01/FloorBasePebbles_01.glb')
  )
  floor.addComponentOrReplace(
    new Transform({
      position: new Vector3(8, 0, 8),
      rotation: new Quaternion(0, 0, 0, 1),
      scale: new Vector3(1, 1, 1)
    })
  )
  return floor
}
