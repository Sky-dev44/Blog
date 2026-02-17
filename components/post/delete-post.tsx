"use client";

import { DeletePostButtonProps } from "@/lib/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  return (
    <>
      <Button variant={"destructive"} size={"sm"}>
        <Trash2 className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </>
  );
}
