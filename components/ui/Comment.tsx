import Image from 'next/image';
import React from 'react'

const Comment = ({comment}:{comment:any}) => {

  const {description, author} = comment;

  
  return (
    <>
        <div className='flex justify-center items-center'>
            <div className='w-[10%]'>

              <Image src={author.image} alt='author' width={48} height={48} className='rounded-full'/>
              </div>
            <div className='w-[90%] flex items-start bg-primary-100 p-3 rounded-xl'>
              {description}
                

            </div>
        </div>
    </>
  )
}

export default Comment