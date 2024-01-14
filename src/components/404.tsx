"use client";

import Error from "next/error";

export function NotFoundComponent() {
  return <Error statusCode={404} />;
}
