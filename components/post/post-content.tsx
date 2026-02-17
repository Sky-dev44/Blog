import { PostContentProps } from "@/lib/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeletePostButton from "./delete-post";

export default function PostContent({ post, isAuthor }: PostContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{post?.title}</CardTitle>

        <CardDescription>
          By {post.author.name} - {formatDate(post.createdAt)}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-lg mb-6">{post.description}</p>
        <p className="text-muted-foreground text-4xl mb-6">{post.content}</p>
      </CardContent>

      {isAuthor && (
        <CardFooter className="space-x-3">
          <div className="flex gap-2">
            <Button asChild variant={"outline"} size={"sm"}>
              <Link href={`/post/edit/${post.slug}`}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
          </div>
          <DeletePostButton postId={post.id} />
        </CardFooter>
      )}
    </Card>
  );
}
