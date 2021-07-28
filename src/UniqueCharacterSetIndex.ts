export default class UniqueCharacterSetIndex<T> {
  private charSetIndex: { [index: string]: T[] }
  private indexableAttribute: string & keyof T
  private maxCharSetLength: number

  /**
   * A UniqueCharacterSetIndex indexes objects based on a string attribute (`indexableAttribute`).
   * For each object, this attribute is broken down into all possible subsets of characters - these
   * subsets become the keys of the index.
   * @param indexableAttribute - the string attribute to construct the index on
   * @param maxCharSetLength - the maximum length of subsets (index keys) to construct and store
   */
  public constructor(indexableAttribute: string & keyof T, maxCharSetLength: number) {
    this.charSetIndex = {}
    this.indexableAttribute = indexableAttribute
    this.maxCharSetLength = maxCharSetLength
  }

  /**
   * Adds new values to the index. Throws a `TypeError` if each value does not have a string
   * attribute of `indexableAttribute`.
   * @param values - the objects to add to the index
   */
  public load(values: T[]): void {
    this.checkForIndexableAttribute(values)

    for (const currentValue of values) {
      const word: string = currentValue[this.indexableAttribute] as unknown as string
      const characterSets: string[] = this.generateUniqueCharacterSets(word)

      for (const charSet of characterSets) {
        if (!this.charSetIndex[charSet]) {
          this.charSetIndex[charSet] = []
        }
        this.charSetIndex[charSet].push(currentValue)
      }
    }
  }

  /**
   * Searches the index for all values which have an `indexableAttribute` which shares some characters
   * with `searchValue`. The results are returned as an array, with each entry including the value
   * and the shared characters. Each value will only appear in the result array once, and the results
   * are sorted in descending order by number of characters in common.
   * @param searchValue - the value to search for
   * @param minSharedCharacters - the minimum number of characters that `value[indexableAttribute]`
   * and `searchValue` must share for a result to be returned (defaults to 1)
   */
  public findValues(searchValue: string, minSharedCharacters = 1): { sharedCharacters: string; value: T }[] {
    const charSetsToSearch: string[] = this.generateUniqueCharacterSets(searchValue)
    charSetsToSearch.sort((charSetA: string, charSetB: string) => charSetB.length - charSetA.length)

    const valuesFound: { [index: string]: T } = {}
    const results: { sharedCharacters: string; value: T }[] = []

    for (const charSet of charSetsToSearch) {
      if (charSet.length < minSharedCharacters) {
        break
      }
      const valuesArray: T[] = this.charSetIndex[charSet]

      if (valuesArray) {
        for (const value of valuesArray) {
          const indexValue: string = value[this.indexableAttribute] as any // eslint-disable-line @typescript-eslint/no-explicit-any

          if (!valuesFound[indexValue]) {
            valuesFound[indexValue] = value
            results.push({ sharedCharacters: charSet, value })
          }
        }
      }
    }

    return results
  }

  private checkForIndexableAttribute(values: T[]): void {
    for (const currentValue of values) {
      if (typeof currentValue[this.indexableAttribute] !== 'string') {
        throw new TypeError(`One or more values do not have a string attribute ${this.indexableAttribute}.`)
      }
    }
  }

  // Modified from https://codereview.stackexchange.com/a/7025
  private generateUniqueCharacterSets(inputString: string): string[] {
    const charSetsArray: string[] = []
    const uniquecharSets: { [index: string]: boolean } = {}

    const recursiveSubstringFinder = (active: string, rest: string): void => {
      if (active && !rest) {
        if (active.length <= this.maxCharSetLength && !uniquecharSets[active]) {
          charSetsArray.push(active)
          uniquecharSets[active] = true
        }
      } else if (active || rest) {
        recursiveSubstringFinder(active + rest[0], rest.slice(1))
        recursiveSubstringFinder(active, rest.slice(1))
      }
    }

    recursiveSubstringFinder('', inputString.split('').sort().join(''))
    return charSetsArray
  }
}
