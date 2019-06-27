export function createAxieMachine(): Entity {
  const axieMachine = new Entity()
  const axieMachineModel = new Entity()
  axieMachineModel.setParent(axieMachine)
  axieMachineModel.addComponent(new GLTFShape('assets/models/vending-machine2/scene2.gltf'))
  axieMachineModel.addComponent(
    new Transform({
      scale: new Vector3(0.5, 0.5, 0.5),
      rotation: Quaternion.Euler(0, 180, 0)
    })
  )

  const axieLogoTexture = new Texture('assets/images/axie-logo.png')
  const axieLogoMaterial = new BasicMaterial()
  axieLogoMaterial.texture = axieLogoTexture

  const axieLogo = new Entity()
  axieLogo.setParent(axieMachine)
  axieLogo.addComponent(new PlaneShape())
  axieLogo.addComponent(axieLogoMaterial)
  axieLogo.addComponent(
    new Transform({
      position: new Vector3(-0.2, 2.4, -0.55),
      rotation: Quaternion.Euler(0, 0, 180),
      scale: new Vector3(0.45 * 2.19, 0.45, 0.45 * 2.19)
    })
  )
  return axieMachine
}
