import { createFloor } from './entities/floor'
import { createLandMachine } from './entities/landVendingMachine'
import { createAxieMachine } from './entities/axieVendingMachine'

const floor = createFloor()
engine.addEntity(floor)

// LAND Vending Machine
const landMachine = createLandMachine()
landMachine.addComponent(
  new Transform({
    position: new Vector3(5, 0, 10)
  })
)
engine.addEntity(landMachine)

// AXIE Vending Machine
const axieMachine = createAxieMachine()
axieMachine.addComponent(
  new Transform({
    position: new Vector3(11, 0, 10)
  })
)
engine.addEntity(axieMachine)
