"use client";

import { Empty } from "@/components/ui";

export default function Error({ error, reset }) {
  return <Empty label="Something went wrong." error={error} reset={reset} />;
}
