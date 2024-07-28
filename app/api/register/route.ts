// 【注册用户】

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"; // 用于验证信息是否符合规范
import bcrypt from "bcrypt";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body); // 实际上运用的是zod的能力
  if (!validation.success)
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });

  const user = await prisma.user.findUnique({ where: { email: body.email } });

  // 用户已存在
  if (user) return NextResponse.json({ error: "user already exists" }, { status: 400 });

  // 若无其他错误，可以注册。
// 1. 用bcrypt 生成hashed密码。
// 2. 用prisma 在数据库里创建一个新用户，记录邮件名和密码。
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json({ email: newUser.email });
}
