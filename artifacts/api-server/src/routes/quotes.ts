import { Router, type IRouter } from "express";
import { handleQuoteRequest } from "@workspace/quote-mail";

const router: IRouter = Router();
router.post("/quotes", async (req, res): Promise<void> => {
  const result = await handleQuoteRequest({
    method: req.method,
    origin: req.get("origin"),
    host: req.get("host") ?? "",
    contentType: req.get("content-type"),
    clientIp: req.ip ?? req.socket.remoteAddress ?? "unknown",
    body: req.body,
  });
  res.setHeader("Cache-Control", "no-store");
  res.status(result.status).json(result.body);
});
export default router;
