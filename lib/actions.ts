"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { write_client } from "@/sanity/lib/write";

export const createPitch = async (
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      }, 
      pitch,
    };

    const result = await write_client.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

export const createComment = async (form:FormData,id:string)=>{
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  
    
    const {comment} = Object.fromEntries( Array.from(form));

    

    try{
      const commentData = {
        description:comment,
        author: {
          _type: "reference",
          _ref: session?.id,
        }, 
        startup:{
          _type: "reference",
          _ref: id,
        }
    }
    const result = await write_client.create({ _type: "comment", ...commentData });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  }catch(error){
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }

}