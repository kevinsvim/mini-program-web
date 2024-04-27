/**
 * 文章相关类型
 */
export namespace BlogTypes {
    export interface ArticleType {
        /* 文章标题 */
        title: string,
        /* 文章内容 */
        content: string,
        /* 文章封面 */
        cover: string,
        /* 创作声明 */
        statement: number,
        /* 文章类型 */
        type: number,
        /* 原文链接 */
        copyFrom: string,
        /* 是否授权文章 */
        isAuthorized: boolean,
        /* 可见范围 */
        visibleRange: number,
        /* 文章摘要 */
        abstract: string,
        /* 文章标签 */
        tagIds: number[]
    }
    export interface RestaurantItem {
        id: number
        tag: string
        selected?: boolean
    }
}
