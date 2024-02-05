"use server";

import { Metadata } from "next";
import { PostContainer } from "./container";

export const metadata: Metadata = {
  title: "작품 올리기",
};

export default async function PostPage() {
  return <PostContainer />;
}
