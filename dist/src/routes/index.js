import { Router } from "express";
import { authRoute } from "./auth.route";
export const apiRoute = Router();
apiRoute.get("/", (_req, res) => {
    return res.status(200).json({
        message: "My Study Life API",
    });
});
apiRoute.use("/auth", authRoute);
//# sourceMappingURL=index.js.map