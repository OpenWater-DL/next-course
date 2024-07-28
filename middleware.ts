export {default} from 'next-auth/middleware'


export const config = {
    // * : zero or more
    //+ : one or more
    // ?: zero or one
    matcher:['/dashboard/:path*']
}

// 用来保护一些路由，只有登录用户才能看到