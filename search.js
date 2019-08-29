/***
 * search (grid, wordlist)
 * This function accepts a grid (a 2d array of letters)
 * and a wordlist (an array of words to search for). The function finds any words
 * that exist in the word search in any of the 8 possible directions (up, down, left, right
 * and all 4 diagonal directions). This function is case-insensitive in its matching.
 *
 * Returns: an array of words that can be found in the word search
 ***/
module.exports = function search (grid, wordlist) {
  // Filter and return the word list by which words are found in the grid.
  return wordlist.filter(word => isWordInGrid(grid, word))
}

// Returns true if the word is found in the grid.
function isWordInGrid (grid, word) {
  // Search the grid for the first letter.
  const { xLength, yLength } = getGridDimensions(grid)
  for (let y = 0; y < yLength; y++) {
    for (let x = 0; x < xLength; x++) {
      if (!isSameCharacter(word[0], getGridCharacter(grid, x, y))) {
        continue
      }

      // The first letter is found. Search in each direction around the starting letter for the rest of the word.
      for (let xDelta = -1; xDelta <= 1; xDelta++) {
        for (let yDelta = -1; yDelta <= 1; yDelta++) {
          if (!xDelta && !yDelta) {
            // A direction is required.
            continue
          }
          if (isRestOfWordPresent(grid, word.slice(1), x, y, xDelta, yDelta)) {
            return true
          }
        }
      }
    }
  }

  // The word was not found.
  return false
}

// Recursively searches for the rest of the word, given the starting location and the direction to search.
// The value of xDelta and yDelta should be -1, 0, or 1. Both cannot be 0.
function isRestOfWordPresent(grid, restOfWord, x, y, xDelta, yDelta) {
  // Base case: if there are no more characters to check, the word is found.
  if (!restOfWord.length) {
    return true
  }

  // Compare the next character in the given direction.
  // Assumption: Words must be found in a straight line on the grid (not Boggle-style).
  const nextX = x + xDelta
  const nextY = y + yDelta
  const nextCharacter = getGridCharacter(grid, nextX, nextY)

  // Check for boundary violation.
  if (!nextCharacter) {
    return false
  }

  // Check for the next character match.
  if (!isSameCharacter(restOfWord[0], nextCharacter)) {
    return false
  }

  return isRestOfWordPresent(grid, restOfWord.slice(1), nextX, nextY, xDelta, yDelta)
}

// Returns the result of a case-insensitive string comparison.
function isSameCharacter (a, b) {
  return a.toUpperCase() === b.toUpperCase()
}

// Returns an object containing an x length and a y length.
// Assumption: The grid is always rectangular. Each row is the same size, and each column is the same size.
function getGridDimensions (grid) {
  const yLength = grid.length
  const xLength = yLength ? grid[0].length : 0
  return { xLength, yLength }
}

// Returns true if the given coordinates are out of bounds of the grid.
function isOutOfBounds (grid, x, y) {
  const { xLength, yLength } = getGridDimensions(grid)
  return x < 0 || x >= xLength || y < 0 || y >= yLength
}

// Returns the character at the given coordinates or null if out of bounds.
function getGridCharacter (grid, x, y) {
  if (isOutOfBounds(grid, x, y)) {
    return null
  }
  return grid[y][x]
}

/*
Possible changes:
- If the word is longer than the length and width of the grid, skip it.
- Explore recursive vs procedural performance.
- Store the grid in a different data structure (graph or 2D linked list?) before searching.
- Replace function calls with inline code. (less readable)
- Breadth-first vs depth-first search.
- Deduplicate the found word list.
*/
