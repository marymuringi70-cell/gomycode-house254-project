# TODO - Phase 2 (Server-side development) with separate commits

## Phase 2.1 - Server Bootstrap
- [ ] Verify `server/tsconfig.json` emits to `dist`.
- [ ] Wire `server/src/index.ts` with cors, express.json, route mounting, fallback error handler.
- [ ] Confirm `server/src/config/db.ts` uses `process.env.MONGODB_URI` and connects via mongoose.
- [ ] Run smallest backend build/start check.
- [ ] Commit (Step 2.1 only).

## Phase 2.2 - Data Models
- [ ] Implement `server/src/models/User.ts` per required schema.
- [ ] Implement `server/src/models/Property.ts` per required schema.
- [ ] Typecheck/build server.
- [ ] Commit (Step 2.2 only).

## Phase 2.3 - Authentication Flow
- [ ] Add bcrypt hashing (10 salt rounds).
- [ ] Add JWT issuance (JWT_SECRET, 7-day expiry).
- [ ] Add bearer token `authMiddleware` attaching `req.user`.
- [ ] Ensure auth routes are wired.
- [ ] Build server.
- [ ] Commit (Step 2.3 only).

## Phase 2.4 - Property REST Handlers
- [ ] Implement `GET /api/properties` filtering.
- [ ] Implement `POST /api/properties` landlord/admin authorization.
- [ ] Implement `PUT /api/properties/:id` owner-only updates.
- [ ] Implement `DELETE /api/properties/:id` owner-only deletes.
- [ ] Build server.
- [ ] Commit (Step 2.4 only).

## Phase 2.5 - Cloudinary Uploads
- [ ] Add multer memory upload middleware.
- [ ] Implement Cloudinary upload service returning absolute URLs.
- [ ] Wire upload into property create/update flows only as needed.
- [ ] Build server.
- [ ] Commit (Step 2.5 only).

## Phase 2.6 - Client API Wiring
- [ ] Update `client/src/services/api.ts` to use axios + `VITE_API_URL`.
- [ ] Add token persistence/header injection.
- [ ] Update call sites as required to compile and match response shapes.
- [ ] Build client.
- [ ] Commit (Step 2.6 only).

