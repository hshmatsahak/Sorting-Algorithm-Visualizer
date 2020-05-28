var test_array = [];
var colors = [];
var labels = [];
var delay = 200;

var canvas = document.getElementById('myChart');
var ctx = canvas.getContext('2d');

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

for (var x=0; x < slider.value; x++){
    test_array[x] = Math.floor(Math.random() * 100);
    colors[x] = 'blue'; // ocnsider setting a macro default color
    labels[x] = 'huh';  
}
//update_visualizer(chart_to_sort, test_array, colors); why does this not work when uncommented?

slider.oninput= function(){
    output.innerHTML = this.value;
    test_array.splice(0,test_array.length);
    colors.splice(0,colors.length);
    labels.splice(0,labels.length);
    for (var i=0; i < slider.value; i++){
        test_array[i] = Math.floor(Math.random() * 100);
        colors[i] = 'blue'; // ocnsider setting a macro default color
        labels[i] = 'huh';  
    }
    //delay = 100/slider.value;
    delay = 200;
    update_visualizer(chart_to_sort, test_array, colors);
}

function genNewArray(length){
    for (var j=0; j < length; j++){
        test_array[j] = Math.floor(Math.random() * 100);
        colors[j] = 'blue'; // ocnsider setting a macro default color
        labels[j] = 'huh';  
    }
    update_visualizer(chart_to_sort, test_array, colors);
}

var chart_to_sort = new Chart(ctx, {
  // The type of chart we want to create
  type: 'bar',

  // The data for our dataset
  data: {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: colors,
      borderColor: 'rgb(255, 99, 132)',
      data: test_array
    }]
  },

  // Configuration options go here
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
})

function update_visualizer(chart, update_vals, update_colors) {
  chart.data.datasets[0].data = update_vals;
  chart.data.datasets[0].backgroundColor = update_colors;
  chart.update();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(items, leftIndex, rightIndex){
  if (items[leftIndex]>items[rightIndex]){
    var temp = items[leftIndex];
    colors[leftIndex] = 'red';
    colors[rightIndex] = 'red';
    update_visualizer(chart_to_sort, items, colors);
    await sleep (delay);
  	items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp; 
    chart_to_sort.update();
    await sleep (delay);
    colors[leftIndex] = 'green';
    colors[rightIndex] = 'green';
    chart_to_sort.update();
    await sleep (delay);
  }
  //await sleep (500);
}

async function bubble_sort (){
	for (var i = 0; i < test_array.length+1; i++){
        for (var j = 0; j < test_array.length-i-1; j++){
            colors[j] = 'green';
            colors[j+1] = 'green';
            chart_to_sort.update();
            await sleep (delay);
            await swap(test_array, j , j+1);
            colors[j] = 'blue';
            colors[j+1] = 'blue';
            update_visualizer(chart_to_sort, test_array, colors);
        }
        colors[test_array.length-i] = 'purple';
        chart_to_sort.update();
    }
}

async function partition(arr, low, high) {
  var i = low-1; // index of smaller element
  var pivot = arr[high];  // pivot

  for (var j = low; j < high; j++){
      // If current element is smaller than the pivot 
      colors[j] = 'purple';
      update_visualizer(chart_to_sort, test_array, colors);
      await sleep (delay);
      if (arr[j] < pivot){
          // increment index of smaller element 
          i = i+1; 
          var temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
      } 
      colors[j] = 'blue';
      update_visualizer(chart_to_sort, test_array, colors);
  }
  
  colors[i+1] = 'black';
  colors[high] = 'black';
  update_visualizer(chart_to_sort, test_array, colors);
  var temp2 = arr[i+1];
  arr[i+1] = arr[high];
  arr[high] = temp2; 
  await sleep (delay);
  colors[i+1] = 'blue';
  colors[high] = 'blue';
  update_visualizer(chart_to_sort, test_array, colors);
  return (i+1);
}

async function quickSort(arr, low, high) {
  if (low < high){ 
    // pi is partitioning index, arr[p] is now 
    // at right place 
    var pi = await partition(arr,low,high);

    // Separately sort elements before 
    // partition and after partition 
    await quickSort(arr, low, pi-1); 
    await quickSort(arr, pi+1, high); 
  }
}

async function doquicksort(){
	await quickSort(test_array, 0, test_array.length-1);
}

async function domergesort(){
  await mergeSort(test_array, 0, test_array.length-1, 1);
}

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
} // has not been used

async function mergeSort(arr, low, high, final){
    var which_colour = 'blue';
    if (final == 1){
        which_colour = 'purple';
    }
    var temp_data; 
    if (arr.length > 1){ 
        var mid = Math.floor(arr.length/2) //Finding the mid of the array 
        var L = arr.slice(0,mid); // Dividing the array elements  
        var R = arr.slice(mid, arr.length); // into 2 halves 
        
        await mergeSort(L,low,low+mid-1, 0); // Sorting the first half 
        await mergeSort(R,low+mid,high,0); // Sorting the second half 
  			
        var i = 0;
        var j = 0;
        var k = 0;
        var count = 0;
        var temp;

        // Copy data to temp arrays L[] and R[] 
        while (i < L.length && j < R.length){ 
            temp_data = chart_to_sort.data.datasets[0].data;
            if (L[i] < R[j]){         
                colors[low+mid+j] = 'red';
                colors[low+count] = 'red';
                chart_to_sort.update();
                await sleep (delay);
                colors[low+mid+j] = 'blue';
                colors[low+count] = which_colour;
                chart_to_sort.update();
                arr[k] = L[i]; 
                i=i+1;
            }
            else{ 
                // temp_data[low+count] and temp_data[low+L.length+j]
                colors[low+mid+j] = 'red';
                colors[low+count] = 'red';
                update_visualizer(chart_to_sort, temp_data, colors);
                await sleep (10);
                temp = temp_data[low+mid+j];
                temp_data.splice(low+mid+j, 1);
                temp_data.splice(low+count, 0, temp);
                update_visualizer(chart_to_sort, temp_data, colors);
                await sleep (10);
                colors[low+mid+j] = 'blue';
                colors[low+count] = which_colour;
                update_visualizer(chart_to_sort, temp_data, colors);
                arr[k] = R[j];  
                j=j+1; 
            }
            k=k+1;
            count = count + 1;
        }
        // Checking if any element was left 
        while (i < L.length){ 
            colors[low+count] = 'red';
            chart_to_sort.update();
            await sleep (delay);
            colors[low+count] = which_colour;
            chart_to_sort.update();
            arr[k] = L[i]; 
            i=i+1;
            k=k+1;
            count+=1;
        }
          
        while (j < R.length){ 
            colors[low+mid+j] = 'red';
            chart_to_sort.update();
            await sleep (delay);
            colors[low+mid+j] = which_colour;
            chart_to_sort.update();
            arr[k] = R[j]; 
            j=j+1;
            k=k+1;
        }
        //temp_data = chart_to_sort.data.datasets[0].data;
        //Array.prototype.splice.apply(temp_data, [low, high-low+1].concat(arr));
        //chart_to_sort.data.datasets[0].data = temp_data;
        update_visualizer(chart_to_sort, temp_data, colors);
        await sleep (delay);
        console.log("temp data:");
        console.log(temp_data);
    }
}

async function heapify(arr, n, i){ 
    var largest = i; 
    var l = 2 * i + 1;     
    var r = 2 * i + 2;     
  
    if (l < n && arr[i] < arr[l]) 
        largest = l; 

    if (r < n && arr[largest] < arr[r]) 
        largest = r; 
  	
    if (largest != i){ 
    	colors[i] = 'yellow';
        colors[largest] = 'yellow';
        update_visualizer(chart_to_sort, arr, colors);
    	await sleep (delay);
    	var temp = arr[i];
        arr[i] = arr[largest]; 
        arr[largest] = temp;
        chart.update();
        await sleep(delay);
        colors[i] = 'blue';
        colors[largest] = 'blue';
        update_visualizer(chart_to_sort, arr, colors);
        await heapify(arr, n, largest); 
    }
    update_visualizer(chart_to_sort, arr, colors);
 }

async function heapSort(arr){ 
    var n = arr.length;
  
    // Build a maxheap. 
    for (var i = Math.floor(n/2)-1; i >= 0; i--) 
        await heapify(arr, n, i); 
  
    // One by one extract elements 
    for (let i=n-1; i> 0; i--){ 
    		var temp = arr[i];
        arr[i] = arr[0];
        arr[0] = temp;
        await heapify(arr, i, 0) 
    }
}

async function doheap(){
	await heapSort(test_array);
	console.log(test_array);
}