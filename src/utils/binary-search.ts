type BinarySearchComparison<T> = (candidate: T) => -1 | 0 | 1;

const BinarySearch = {
  /**
   * Searches for an item in an array which matches a certain condition.
   * This requires the condition to only match one item in the array,
   * and for the array to be ordered.
   *
   * @param {Array<T>} list The array to search.
   * @param {BinarySearchComparison<T>} comparisonFn
   *      Called and provided a candidate item as the first argument.
   *      Should return:
   *          > -1 if the item should be located at a lower index than the provided item.
   *          > 1 if the item should be located at a higher index than the provided item.
   *          > 0 if the item is the item you're looking for.
   *
   * @return {T | null} The object if it is found or null otherwise.
   */
  // 搜索数组内目标对象 根据comparisonFn返回值，循环执行
  search: function <T>(
    list: T[],
    comparisonFn: BinarySearchComparison<T>
  ): T | null {
    let minIndex: number = 0;
    let maxIndex: number = list.length - 1;
    let currentIndex: number | null = null;
    let currentElement: T | null = null;

    while (minIndex <= maxIndex) {
      currentIndex = ((minIndex + maxIndex) / 2) | 0;
      currentElement = list[currentIndex];
      // 返回中间位
      const comparisonResult = comparisonFn(currentElement);
      if (comparisonResult > 0) {
        minIndex = currentIndex + 1;
      } else if (comparisonResult < 0) {
        maxIndex = currentIndex - 1;
      } else {
        return currentElement;
      }
    }

    return null;
  },
};

export default BinarySearch;
