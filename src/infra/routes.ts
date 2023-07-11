import { Router } from 'express'
import { expressRouteAdapter } from './adapters/express-route.adapter'
import { makeSaveCardController } from './factories/controllers/save-card.factory'
import { makeGetCardByIdController } from './factories/controllers/get-card-by-id.factory'
import { makeDeleteCardController } from './factories/controllers/delete-card.factory'
import { makeAuthenticateController } from './factories/controllers/authenticate.factory'
import { makeAuthenticationMiddleware } from './factories/middlewares/authentication.factory'
import { expressMiddlewareAdapter } from './adapters/express-middleware.adapter'

const router = Router()

router.post('/auth', expressRouteAdapter(makeAuthenticateController()))

router.post('/card', expressMiddlewareAdapter(makeAuthenticationMiddleware()), expressRouteAdapter(makeSaveCardController()))
router.get('/card/:id', expressMiddlewareAdapter(makeAuthenticationMiddleware()), expressRouteAdapter(makeGetCardByIdController()))
router.delete('/card/:id', expressMiddlewareAdapter(makeAuthenticationMiddleware()), expressRouteAdapter(makeDeleteCardController()))

export { router }
