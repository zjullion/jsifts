function countOccurences(char: string, stringToSearch: string): number {
  let occurences = 0
  let index = stringToSearch.indexOf(char)
  while (index !== -1) {
    occurences++
    index = stringToSearch.indexOf(char, index + 1)
  }
  return occurences
}

/**
 * Generates all unique subsets of characters (up to a length of `maxSetLength`) for an `inputString`. For example, the
 * unique character sets up to a length of 3 for the string "test" are "e", "s", "t", "es", "et", "st", "tt", "est",
 * "ett", and "stt".
 * @param inputString The string to generate the subsets from.
 * @param maxSetLength The maximum length of unique character subset to generate.
 * @returns An array that contains the generated subsets.
 */
export default function generateUniqueCharacterSubsets(inputString: string, maxSetLength: number): string[] {
  if (maxSetLength < 1) {
    return []
  }

  const maxCharOccurences: { [char: string]: number } = {}
  for (const char of inputString) {
    if (maxCharOccurences[char]) {
      maxCharOccurences[char]++
    } else {
      maxCharOccurences[char] = 1
    }
  }
  const sortedChars = Object.keys(maxCharOccurences).sort()

  const charSetsOfLengths: string[][] = [[], [...sortedChars]]
  const indexToStartAt: { [char: string]: number } = {}
  sortedChars.forEach((char, index) => {
    indexToStartAt[char] = index
  })

  for (let currentLength = 2; currentLength <= maxSetLength; currentLength++) {
    const setsOfCurrentLength = []
    const setsOfPreviousLength = charSetsOfLengths[currentLength - 1]

    for (const char of sortedChars) {
      const maxOccurences = maxCharOccurences[char]
      let newIndexToStartAtSet = false

      for (let setIndex = indexToStartAt[char]; setIndex < setsOfPreviousLength.length; setIndex++) {
        const setFromPrevious = setsOfPreviousLength[setIndex]
        const numOccurencesInPreviousSet = countOccurences(char, setFromPrevious)

        if (numOccurencesInPreviousSet < maxOccurences) {
          if (!newIndexToStartAtSet && numOccurencesInPreviousSet < maxOccurences - 1) {
            indexToStartAt[char] = setsOfCurrentLength.length
            newIndexToStartAtSet = true
          }
          setsOfCurrentLength.push(`${char}${setFromPrevious}`)
        }
      }

      if (!newIndexToStartAtSet) {
        indexToStartAt[char] = setsOfCurrentLength.length
      }
    }

    charSetsOfLengths.push(setsOfCurrentLength)
  }

  const charSets: string[] = []
  for (const sets of charSetsOfLengths) {
    charSets.push(...sets)
  }
  return charSets
}
