"use client"

import React from 'react'
import { SendHorizontal } from 'lucide-react'
import { createComment } from '@/lib/actions'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CommentForm = ({ id }: { id: string }) => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const form = event.currentTarget as HTMLFormElement;
      const formData = new FormData(form);

      const result = await createComment(formData, id);
      
      if (result.status === "SUCCESS") {
        form.reset();
        toast.success('Comment added successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error('Failed to add comment. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error(error);
    }
  }
    
  return (
    <>
      <form onSubmit={handleSubmit} className='comment-form'>
        <input
          id="comment"
          type="text"
          name="comment"
          placeholder="Add Comment..."
          className="comment-input"
          required
        />
        <div className='flex gap-2'>
          <button type="submit" className="size-10 flex justify-center items-center">
            <SendHorizontal/>
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" />
    </>
  )
}

export default CommentForm