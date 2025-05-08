"use server";
import { auth } from "@/auth";
import { error } from "console";

export const createPitch= async(state:any, form:FormData,pitch:String)=>{
const session = await auth();
if(!session){
    return {
        error:"Not signed in",
        status:error
    }
}


}