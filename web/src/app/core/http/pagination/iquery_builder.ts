import { IPageQuery } from './ipage_query';

export interface IQueryBuilder {
  pageQuery: IPageQuery;
  aditionalQuery: Map<string, string>;
  buildQueryMap(): Map<string, string>;
  buildQueryString(): string;
  buildPageQueryMap(): Map<string, string>;
}
