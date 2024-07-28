import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";
import exp from "constants";
import { error } from "console";



export async function GET(request: NextRequest,
    {params}:{params:{ id:string}}) {

      const user =   await prisma.user.findUnique({
            where:{
                id:  params.id //这里要传int但是路由是字符串
            }
        })

     if(!user)
        return NextResponse.json({error:'User not found'},{status:404})
     return NextResponse. json(user);
}

export async function  PUT(request:NextRequest, {params}:{params:{id:string}}){
    const body = await request.json();
    const validation = schema.safeParse(body);
    
    const user = await prisma.user.findUnique({
        where: { id: params.id}
    })
    
    if(!validation.success)
        return NextResponse.json(validation.error.errors,{status:400})
    
    if(!user)
        return NextResponse.json({error:'User not found'},{status:404})

    await prisma.user.update({
        where: { id: user.id },
        data:{
            name:body.name,
            email:body.email
        }


    })
    return NextResponse.json({name:body.name, email: body.email},{status:201})
    
    }


export async function DELETE(request:NextRequest,{params}:{params:{id:string}}) {

const user = await prisma.user.findUnique({
    where:{id:params.id}
})

if(!user)
    return NextResponse.json({error:"用户不存在"},{status:404})

await prisma.user.delete({
    where: {id:user.id}
})
    return NextResponse.json({})
    
}