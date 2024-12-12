import Image from "next/image";
import React from "react";
import { formatDate } from "@/lib/utils";



const Comment = ({ comment }: { comment: any }) => {
  const { description, author, _createdAt } = comment;

  return (
    <div className="flex items-start space-x-3 p-2">
      <Image
        src={author.image}
        alt="author"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="bg-primary-100 p-4 rounded-xl">
        <div className="text-xs text-gray-600 mb-1">{formatDate(_createdAt)}</div>
        <div className="text-sm text-gray-800">{description}</div>
      </div>
      
    </div>
  );
};

export default Comment;
