import React from 'react'
import Link from 'next/link';
import { Button } from './button';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Author, Startup } from '@/sanity/types';

export type StartupTypeCard =Omit<Startup,"author"> & {author? :Author}

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    const {
      _createdAt,
      views,
      author,
      title,
      category,
      _id,
      image,
      description,
    } = post;
  
    return (
      <li className="startup-card group">
        <div className="flex-between">
          <p className="startup_card_date">{formatDate(_createdAt)}</p>
          <div className="flex gap-1.5">
            <EyeIcon className="size-6 text-primary" />
            <span className="text-16-medium">{views}</span>
          </div>
        </div>
  
        <div className="flex-between mt-5 gap-5">
          <div className="flex-1">
            <Link href={`/user/${author?._id}`}>
              <p className="text-16-medium line-clamp-1">{author?.name}</p>
            </Link>
            <Link href={`/startup/${_id}`}>
              <h3 className="text-26-semibold line-clamp-1">{title}</h3>
            </Link>
          </div>
          <Link href={`/user/${author?._id}`}>
            <Image
              src="https://images.unsplash.com/photo-1733425999473-8a2ac086ec5b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="hello"
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        </div>
  
        <Link href={`/startup/${_id}`}>
          <p className="startup-card_desc">{description}</p>
  
          <img src={image} alt="placeholder" className="startup-card_img" />
        </Link>
  
        <div className="flex-between gap-3 mt-5">
          <Link href={`/?query=${category?.toLowerCase()}`}>
            <p className="text-16-medium">{category}</p>
          </Link>
          <Button className="startup-card_btn" asChild>
            <Link href={`/startup/${_id}`}>Details</Link>
          </Button>
        </div>
      </li>
    );
  };
  

export default StartupCard