import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import http from "http";

import { testRouter } from "./routes/test";
import { publicProcedure, router } from "./trpc";

// const testRouter = router({
//   hello: publicProcedure.query(() => {
//     // This is what you're returning to your client
//     return {
//       text: `hello world 2`,
//     };
//   }),
// });

const appRouter = router({
  test: testRouter,
  greeting: publicProcedure.query(() => {
    // This is what you're returning to your client
    return {
      text: `hello world"}`,
    };
  }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// create handler
const handler = createHTTPHandler({
  router: appRouter,
  createContext() {
    console.log("context");
    return {};
  },
});

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }
  handler(req, res);
});

server.listen(2022);

console.log("started");
