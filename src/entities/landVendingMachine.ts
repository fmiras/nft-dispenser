import { approveMana, vend } from '../eth'

export function createLandMachine(): Entity {
  const landMachine = new Entity()
  const landMachineModel = new Entity()
  landMachineModel.setParent(landMachine)
  landMachineModel.addComponent(new GLTFShape('assets/models/vending-machine/scene3.gltf'))
  landMachineModel.addComponent(
    new Transform({
      scale: new Vector3(0.015, 0.015, 0.015),
      rotation: Quaternion.Euler(0, 180, 0)
    })
  )

  const dclLogoTexture = new Texture('assets/images/dcl-logo.png')
  const dclLogoMaterial = new BasicMaterial()
  dclLogoMaterial.texture = dclLogoTexture

  const dclLogo = new Entity()
  dclLogo.setParent(landMachine)
  dclLogo.addComponent(new PlaneShape())
  dclLogo.addComponent(dclLogoMaterial)
  dclLogo.addComponent(
    new Transform({
      position: new Vector3(0, 2.2, -0.6),
      rotation: Quaternion.Euler(0, 0, 180),
      scale: new Vector3(0.75, 0.75, 0.75)
    })
  )

  let approved = false
  const onClickManaApprove = new OnClick(() => {
    if (!approved) {
      approveMana()
      approved = true
    } else {
      vend()
    }
  })

  landMachineModel.addComponent(onClickManaApprove)
  dclLogo.addComponent(onClickManaApprove)
  return landMachine
}
