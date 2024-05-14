import type { MemberTypes } from "../../src/types/member"
import type { ApiTypes } from "../../src/types/api"

export default [
  {
    url: '/unsecured/user/login',
    method: 'post',
    response: (
      data: MemberTypes.LoginResType
    ): ApiTypes.ResponseDataType<MemberTypes.LoginResType> => {
      console.log(data)
      return {
        code: 200,
        success: true,
        msg: '登录成功',
        data: {
          id: 1,
          username: 'admin',
          avatar: 'https://q1.qlogo.cn/g?b=qq&nk=294359980&s=100',
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          refresh_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          expire_in: 3600
        }
      }
    }
  },
  {
    url: '/secured/article/save',
    method: 'post',
    response: (
        data: any
    ): ApiTypes.ResponseDataType<any> => {
      console.log(data)
      return {
        code: 200,
        success: true,
        msg: '发布成功',
        data: {
          id: '123'
        }
      }
    }
  }
]
