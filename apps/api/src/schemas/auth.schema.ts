import { t } from "elysia";

export const startSessionBody = t.Object({
    email: t.String({ format: "email" }),
});
