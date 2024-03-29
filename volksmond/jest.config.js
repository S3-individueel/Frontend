/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
    }
};

// module.exports = {
//     preset: 'ts-jest',
//     "transform": {
//     "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
//   }
// }

// {
//   "transform": {
//       "^.+\\.tsx?$": "ts-jest"
//   }
// }