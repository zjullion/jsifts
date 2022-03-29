import generateUniqueCharacterSubsets from './utils/generateUniqueCharacterSubsets'

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
      const word = currentValue[this.indexableAttribute] as unknown as string
      const characterSets: string[] = generateUniqueCharacterSubsets(word, this.maxCharSetLength)

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
   * and `searchValue` must share for a result to be returned
   */
  public findValues(searchValue: string, minSharedCharacters: number): { sharedCharacters: string; value: T }[] {
    const charSetsToSearch: string[] = generateUniqueCharacterSubsets(searchValue, this.maxCharSetLength)
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
          const indexValue = value[this.indexableAttribute] as unknown as string

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
}
