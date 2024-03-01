function largestGood(binString) {
  // Base case where input is invalid
  if (!binString) return ""
  if (binString.length === 0) return ""

  // METHOD
  // 1. Search for all good binary strings
  // 2. See if there are any swaps that can make the string bigger
  // 3. Stop when there no swaps will make string bigger
  
  // 1. Search for all good binary strings
  const goodStrings = []; // Type of [startIndex: number, endIndex: number, string: string][]

  for (let x = 0; x < binString.length; x++) {
    const stringUnderTest = binString.slice(x);

    for (let i = 0; i < stringUnderTest.length; i++) {
      const prefix = stringUnderTest.slice(0, i + 1);

      if (isGood(prefix)) {
        goodStrings.push([x, x + i, prefix]);
      }
    }
  }

  // 2. Search through all good strings 1 by 1 to see if we can make number bigger
  for (let i = 0; i < goodStrings.length; i++) {
    const [firstStart, firstEnd, first] = goodStrings[i];

    for (let j = 1; j < goodStrings.length; j++) {
      const [secondStart, secondEnd, second] = goodStrings[j];
      
      // Check if consecutive
      if (firstEnd + 1 === secondStart) {
        // Consecutive good strings found, now check to see if the second string is bigger than first
        const firstInt = parseInt(first, 2);
        const secondInt = parseInt(second, 2);

        if (secondInt > firstInt) {
          // Swap
          const front = binString.slice(0, firstStart);
          const back = binString.slice(secondEnd + 1);

          const swap = binString.slice(secondStart, secondEnd + 1) + binString.slice(firstStart, firstEnd + 1);

          // Call again recursively to keep finding the largest interger
          return largestGood(front + swap + back);
        }
      }
    }
  }

  // If no way to make number bigger, just return the original string
  return binString;
}

function isGood(string) {
  // Test 1: Equal amount of 0s and 1s
  let zeroCount = 0;
  let oneCount = 0;

  for (let i = 0; i < string.length; i++) {
    if (string[i] === "0") zeroCount += 1;
    if (string[i] === "1") oneCount += 1;
  }

  // Test 2: For every prefix of the string, the number of 1s is not less than the number of 0s
  let test2 = true;

  for (let i = 0; i < string.length; i++) {
    const prefix = string.slice(0, i + 1);
    let preZeros = 0;
    let preOnes = 0;
  
    for (let j = 0; j < prefix.length; j++) {
      if (prefix[j] === "0") preZeros += 1;
      if (prefix[j] === "1") preOnes += 1;
      
      if (preZeros > preOnes) {
        test2 = false;
        break;
      }
    }
  }

  return (zeroCount === oneCount) && test2;
}

const tests = [
  {
    input: "11011000",
    expectedOutput: "11100100",
  },
  {
    input: "1100",
    expectedOutput: "1100",
  },
  {
    input: "1101001100",
    expectedOutput: "1101001100",
  },
  {
    input: "1010111000",
    expectedOutput: "1110001010",
  },
  // Edge Cases
  {
    input: "",
    expectedOutput: "",
  },
  {
    input: null,
    expectedOutput: "",
  },
]

tests.forEach((test) => {
  const functionOutput = largestGood(test.input);
  const passesTest = functionOutput === test.expectedOutput;

  console.log(`Testing: ${test.input} [${passesTest ? "PASS" : "FAIL"}] | Expected Output: ${test.expectedOutput} | Your Output: ${functionOutput}`)
})