import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  //pageNumber - currentPage i.e 1 * pageSize  example (2-1) * 5 = 5  ///ignore the first 5 items
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value(); //lodash method converts back into a method
}