"use server";
import { auth } from "@/auth";
import { writeclient } from "@/sanity/lib/write-client";
import { image } from "@uiw/react-md-editor";
import slugify from "slugify";
import { parseServerActionResponse } from "./utils";


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