// Global variables
let array = [];
let arrayBars = [];
let animationSpeed = 50; // Adjust as needed

// Utility functions
function generateRandomArray(length) {
  array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * 400) + 5); // Generate random heights for bars
  }
}

function updateArrayView() {
  const arrayContainer = document.getElementById('arrayContainer');
  arrayContainer.innerHTML = '';
  arrayBars = [];
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement('div');
    bar.classList.add('array-bar');
    bar.style.height = `${array[i]}px`;
    arrayContainer.appendChild(bar);
    arrayBars.push(bar);
  }
}

// Sorting algorithms
async function mergeSort() {
  // Merge Sort implementation
  async function merge(left, mid, right) {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);

    let leftIndex = 0;
    let rightIndex = 0;
    let arrayIndex = left;

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      if (leftArr[leftIndex] <= rightArr[rightIndex]) {
        array[arrayIndex] = leftArr[leftIndex];
        leftIndex++;
      } else {
        array[arrayIndex] = rightArr[rightIndex];
        rightIndex++;
      }
      arrayBars[arrayIndex].style.height = `${array[arrayIndex]}px`;
      arrayIndex++;
      await delay(animationSpeed);
    }

    while (leftIndex < leftArr.length) {
      array[arrayIndex] = leftArr[leftIndex];
      arrayBars[arrayIndex].style.height = `${array[arrayIndex]}px`;
      leftIndex++;
      arrayIndex++;
      await delay(animationSpeed);
    }

    while (rightIndex < rightArr.length) {
      array[arrayIndex] = rightArr[rightIndex];
      arrayBars[arrayIndex].style.height = `${array[arrayIndex]}px`;
      rightIndex++;
      arrayIndex++;
      await delay(animationSpeed);
    }
  }

  async function mergeSortUtil(left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortUtil(left, mid);
      await mergeSortUtil(mid + 1, right);
      await merge(left, mid, right);
    }
  }

  await mergeSortUtil(0, array.length - 1);
}

async function bubbleSort() {
  // Bubble Sort implementation
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        // Update view
        arrayBars[j].style.height = `${array[j]}px`;
        arrayBars[j + 1].style.height = `${array[j + 1]}px`;

        await delay(animationSpeed);
      }
    }
  }
}

async function quickSort() {
  // Quick Sort implementation
  async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (array[j] <= pivot) {
        i++;

        // Swap elements
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;

        // Update view
        arrayBars[i].style.height = `${array[i]}px`;
        arrayBars[j].style.height = `${array[j]}px`;

        await delay(animationSpeed);
      }
    }

    // Swap elements
    const temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    // Update view
    arrayBars[i + 1].style.height = `${array[i + 1]}px`;
    arrayBars[high].style.height = `${array[high]}px`;

    await delay(animationSpeed);

    return i + 1;
  }

  async function quickSortUtil(low, high) {
    if (low < high) {
      const pivotIdx = await partition(low, high);
      await quickSortUtil(low, pivotIdx - 1);
      await quickSortUtil(pivotIdx + 1, high);
    }
  }

  await quickSortUtil(0, array.length - 1);
}

async function heapSort() {
  // Heap Sort implementation
  async function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      // Swap elements
      const temp = array[i];
      array[i] = array[largest];
      array[largest] = temp;

      // Update view
      arrayBars[i].style.height = `${array[i]}px`;
      arrayBars[largest].style.height = `${array[largest]}px`;

      await delay(animationSpeed);

      await heapify(n, largest);
    }
  }

  async function heapSortUtil() {
    const n = array.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }

    // Heap sort
    for (let i = n - 1; i >= 0; i--) {
      // Swap elements
      const temp = array[0];
      array[0] = array[i];
      array[i] = temp;

      // Update view
      arrayBars[0].style.height = `${array[0]}px`;
      arrayBars[i].style.height = `${array[i]}px`;

      await delay(animationSpeed);

      await heapify(i, 0);
    }
  }

  await heapSortUtil();
}

// Helper function for delaying animation
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Event listeners
document.getElementById('mergeSort').addEventListener('click', async () => {
  document.getElementById('mergeSort').disabled = true;
  document.getElementById('randomizeArray').disabled = true;
  await mergeSort();
  document.getElementById('mergeSort').disabled = false;
  document.getElementById('randomizeArray').disabled = false;
});

document.getElementById('bubbleSort').addEventListener('click', async () => {
  document.getElementById('bubbleSort').disabled = true;
  document.getElementById('randomizeArray').disabled = true;
  await bubbleSort();
  document.getElementById('bubbleSort').disabled = false;
  document.getElementById('randomizeArray').disabled = false;
});

document.getElementById('quickSort').addEventListener('click', async () => {
  document.getElementById('quickSort').disabled = true;
  document.getElementById('randomizeArray').disabled = true;
  await quickSort();
  document.getElementById('quickSort').disabled = false;
  document.getElementById('randomizeArray').disabled = false;
});

document.getElementById('heapSort').addEventListener('click', async () => {
  document.getElementById('heapSort').disabled = true;
  document.getElementById('randomizeArray').disabled = true;
  await heapSort();
  document.getElementById('heapSort').disabled = false;
  document.getElementById('randomizeArray').disabled = false;
});

document.getElementById('randomizeArray').addEventListener('click', () => {
  const arrayLength = Math.floor(Math.random() * 50) + 10; // Generate random array length between 10 and 60
  generateRandomArray(arrayLength);
  updateArrayView();
});

document.getElementById('speedSlider').addEventListener('input', (e) => {
  animationSpeed = 100 - e.target.value;
});

// Initialize with a random array
generateRandomArray(20);
updateArrayView();
// Function to read and process the custom array input
function useCustomArray() {
  const customArrayInput = document.getElementById('customArrayInput').value;
  const customArray = customArrayInput.split(',').map(numStr => parseInt(numStr.trim()));

  // Validate the input: Check if all array elements are valid numbers
  if (customArray.some(isNaN)) {
    alert('Invalid array input. Please enter numbers separated by commas.');
    return;
  }

  array = customArray;
  updateArrayView();
}

// Event listener for the "Use Custom Array" button
document.getElementById('useCustomArray').addEventListener('click', () => {
  useCustomArray();
});

// ... Other event listeners as provided ...

// Initialize with a random array (you can remove this line if you want to start with an empty array)
generateRandomArray(20);
updateArrayView();
