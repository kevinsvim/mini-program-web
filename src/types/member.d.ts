export namespace MemberTypes {

    /**
     * 登录请求类型
     */
    export interface LoginReqType {
        loginType: number
        username: string
        password: string
        code: string
    }

    /**
     * 登录响应类型
     */
    export interface LoginResType {
        id: number
        username: string
        avatar: string
        access_token: string
        expire_in: number
        refresh_token: string
    }
}
