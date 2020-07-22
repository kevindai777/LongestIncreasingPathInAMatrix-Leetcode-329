//Objective is to find the longest path that is increasing in a matrix


//O(mn) where m and n are the row and column lengths of the matrix

if (!matrix || matrix.length < 1) {
    return 0
}

//Keep track of the longest path at each tile
let memo = new Array(matrix.length).fill(-1).map(() => new Array(matrix[0].length).fill(-1))
let max = 0
let directions = [[1,0], [-1,0], [0,1], [0,-1]]

for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
        max = Math.max(max, dfs(i, j, -Infinity))
    }
}

return max

//The 'parent' denotes the greatest element so far in the path
function dfs(row, col, parent) {
    //If out of bounds OR if element is not part of an increasing path
    if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length || matrix[row][col] <= parent) {
        return 0
    }
    
    //If unchecked
    if (memo[row][col] == -1) {
        let maxPath = 0
        for (let [dx,dy] of directions) {
            let nextX = row + dx
            let nextY = col + dy
            //DFS to find the greatest length
            let nextLength = dfs(nextX, nextY, matrix[row][col]) + 1
            maxPath = Math.max(maxPath, nextLength)
        }
        
        //Update memo
        memo[row][col] = maxPath
    }
    
    return memo[row][col]
}