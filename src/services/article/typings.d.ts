declare namespace ArticleAPI {
  interface Response {
    code: number;
    success: boolean;
    data: any;
  }

  interface PageInfo {
    menuCurrent: string;
    searchQuery?: string;
    size: number;
    target: number;
  }
}
