import { rest } from "msw";

const todos = ["idol1", "idol2", "idol3"];

export const handlers = [
  rest.get("/todos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),

  rest.post("/login", (req, res, ctx) => {
    return res(ctx.body({ token: "!@4325" }));
  }),
];
