import { Router } from 'express'
import { expressRouteAdapter } from './adapters/express-route.adapter'
import { makeSaveCardController } from './factories/controllers/save-card.factory'
import { makeGetCardByIdController } from './factories/controllers/get-card-by-id.factory'
import { makeDeleteCardController } from './factories/controllers/delete-card.factory'

const router = Router()

router.post('/card', expressRouteAdapter(makeSaveCardController()))
router.get('/card/:id', expressRouteAdapter(makeGetCardByIdController()))
router.delete('/card/:id', expressRouteAdapter(makeDeleteCardController()))

export { router }
