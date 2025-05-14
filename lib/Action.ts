"use server";
import { auth } from "@/auth";
import { writeclient } from "@/sanity/lib/write-client";
import { image } from "@uiw/react-md-editor";
import slugify from "slugify";
import { parseServerActionResponse } from "./utils";
import { signIn } from "@/auth";


export const createPitch= async(state:any, form:FormData,pitch:String)=>{
const session = await auth();

if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

const{title,description,category,link} = Object.fromEntries(
    Array.from(form).filter(([key])=>key!="pitch")

)

const slug = slugify(title as string ,{lower:true,strict:true});

try{
    const startup={
        title,
        description,
        category,
        image:link,
        slug:{
            _type:slug,
            current:slug,


        },
        author:{
            _type:"reference",
            _ref:session?.id
        },

        pitch,


    }

    const result = await writeclient.create({_type:"startup",...startup});



    return parseServerActionResponse({
        ...result,
        error:"",
        status:"SUCCESS",

    })
    
}catch(error){
    console.log(error);

    return parseServerActionResponse({
        error:JSON.stringify(error),
        status:"Error"
    })
    

}


}

export const updatePitch = async (
  state: any,
  form: FormData,
  pitch: string,
  postId: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const updatedPost = await writeclient
      .patch(postId)
      .set({
        title,
        description,
        category,
        image: link,
        slug: {
          _type: "slug",
          current: slug,
        },
        pitch,
      })
      .commit();

    return parseServerActionResponse({
      ...updatedPost,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Update failed", error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};

