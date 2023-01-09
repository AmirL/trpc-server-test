import { router, publicProcedure } from "../index";
export const testRouter = router({
  hello: publicProcedure.query(() => {
    // This is what you're returning to your client
    return {
      text: `hello world 2`,
    };
  }),
});
