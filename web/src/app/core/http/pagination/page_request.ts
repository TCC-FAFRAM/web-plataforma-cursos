import { IPageQuery } from './ipage_query';
import { IQueryBuilder } from './iquery_builder';

export class PageRequest implements IQueryBuilder {
  constructor(
    public pageQuery: IPageQuery,
    public aditionalQuery: Map<string, string>
  ) {}

  buildQueryMap(): Map<string, string> {
    let buildQueryMap = new Map<string, string>([...this.buildPageQueryMap()]);

    if (this.aditionalQuery) {
      buildQueryMap = new Map<string, string>([
        ...buildQueryMap,
        ...this.aditionalQuery,
      ]);
    }

    return buildQueryMap;
  }
  buildQueryString(): string {
    return Array.from(this.buildQueryMap())
      .map(itemArray => `${itemArray[0]}=${itemArray[1]}`)
      .join('&');
  }
  buildPageQueryMap(): Map<string, string> {
    const buildPageQueryMap = new Map<string, string>();

    buildPageQueryMap.set('take', `${this.pageQuery.pageSize}`);
    buildPageQueryMap.set(
      'skip',
      `${this.pageQuery.pageNumber * this.pageQuery.pageSize}`
    );
    buildPageQueryMap.set('paginate', 'S');

    return buildPageQueryMap;
  }
}
