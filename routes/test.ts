import { publicProcedure, router } from "../trpc";

export const testRouter = router({
  hello: publicProcedure.query(() => {
    // This is what you're returning to your client
    return {
      text: `hello world 2`,
    };
  }),
});
