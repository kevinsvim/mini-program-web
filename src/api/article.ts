import request from '@/utils/request'
import type { BlogTypes } from '@/types/blog'
import type { ApiTypes } from "@/types/api";
export default {
    saveArticle(article: BlogTypes.ArticleType): Promise<ApiTypes.ResponseDataType> {
        return request({
            url: '/secured/article/saveArticle',
            method: 'post',
            data: article
        })
    }
}
