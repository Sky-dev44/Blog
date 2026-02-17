"use client";

import { DeletePostButtonProps } from "@/lib/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deletePost } from "@/actions/post-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deletePost(postId);
      if (result.success) {
        toast(result.message);
        router.push("/");
        router.refresh();
      } else {
        toast(result.message);
      }
    } catch (e) {
      toast("An error occured while deleting the post ");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        disabled={isDeleting}
        onClick={handleDelete}
        variant={"destructive"}
        size={"sm"}
        className="cursor-pointer"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </>
  );
}
