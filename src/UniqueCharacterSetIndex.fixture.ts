type IndexableObject = {
  searchAttribute: string
  somethingElse: string
}

export const objectA: IndexableObject = {
  searchAttribute: 'alphabet',
  somethingElse: 'letters of the alphabet',
}

export const objectB: IndexableObject = {
  searchAttribute: 'banana',
  somethingElse: 'information about bananas',
}

export const objectC: IndexableObject = {
  searchAttribute: 'cat',
  somethingElse: 'a picture of a cat',
}

export const objectD: IndexableObject = {
  searchAttribute: 'dictionary',
  somethingElse: 'a useful dictionary',
}

export const objectsArray: IndexableObject[] = [
  objectA,
  objectB,
  objectC,
  objectD,
]