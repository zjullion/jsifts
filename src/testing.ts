import damLevScore from 'damerau-levenshtein'
import words from './words.fixture'
import { IndexableObject } from './UniqueCharacterSetIndex.fixture'
import UniqueCharacterSetIndex from './UniqueCharacterSetIndex'

const charSetIndex = new UniqueCharacterSetIndex<IndexableObject>('searchAttribute', 4)
charSetIndex.load(words.map((word) => ({ searchAttribute: word, somethingElse: word })))

type Result = {
  value: string
  score: number
}

const doIndexedSearch = (searchTerm: string, minScore: number): Result[] => {
  const results: Result[] = []

  const possibleMatches = charSetIndex.findValues(searchTerm, 1)
  let index = 0

  while (
    index < possibleMatches.length &&
    possibleMatches[index].sharedCharacters.length > searchTerm.length * minScore
  ) {
    const { similarity } = damLevScore(possibleMatches[index].value.searchAttribute, searchTerm)

    if (similarity > minScore) {
      results.push({
        value: possibleMatches[index].value.searchAttribute,
        score: similarity,
      })
    }

    index++
  }

  results.sort((resultA, resultB) => resultB.score - resultA.score)
  return results
}

const doSlowSearch = (searchTerm: string, minScore: number): Result[] => {
  const results: Result[] = []

  for (const word of words) {
    const { similarity } = damLevScore(word, searchTerm)

    if (similarity > minScore) {
      results.push({
        value: word,
        score: similarity,
      })
    }
  }

  results.sort((resultA, resultB) => resultB.score - resultA.score)
  return results
}
