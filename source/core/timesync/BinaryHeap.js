class BinaryHeap {
    constructor(comparatorFn) {
        this.list = [];
        this.comparator = comparatorFn;
    }

    comparator(data0, data1) {
        return data0.timestamp < data1.timestamp;
    }

    //Heapify
    minHeapify(arr, n, i) {
        let smallest = i;
        let l = 2 * i + 1; //left child index
        let r = 2 * i + 2; //right child index

        //If left child is smaller than root
        if (l < n && this.comparator(arr[l], arr[smallest])) {
            smallest = l;
        }

        // If right child is smaller than smallest so far
        if (r < n && this.comparator(arr[r], arr[smallest])) {
            smallest = r;
        }

        // If smallest is not root
        if (smallest !== i) {
            let temp = arr[i];
            arr[i] = arr[smallest];
            arr[smallest] = temp;

            // Recursively heapify the affected sub-tree
            this.minHeapify(arr, n, smallest);
        }
    }

    //Insert Value
    insert(data) {
        const size = this.list.length;

        if(size === 0){
            this.list.push(data);
        }else{
            this.list.push(data);

            //Heapify
            for (let i = parseInt(this.list.length / 2 - 1); i >= 0; i--) {
                this.minHeapify(this.list, this.list.length, i);
            }
        }
    }

    //Remove value
    delete(data) {
        const size = this.list.length;

        //Get the index of the number to be removed
        let i;
        for(i = 0; i < size; i++){
            if(this.comparator(this.list[i], data)){
                break;
            }
        }

        //Swap the number with last element
        [this.list[i], this.list[size - 1]] = [this.list[size - 1], this.list[i]];

        //Remove the last element
        this.list.splice(size - 1);

        //Heapify the list again
        for (let i = parseInt(this.list.length / 2 - 1); i >= 0; i--) {
            this.minHeapify(this.list, this.list.length, i);
        }
    }

    //Return min value
    findMin(){
        return this.list[0];
    }

    //Remove min val
    deleteMin() {
        this.delete(this.list[0]);
    }

    //Remove and return min value
    extractMin() {
        const min = this.list[0];
        this.delete(min);
        return min;
    }

    //Size
    size() { return  this.list.length }

    //IsEmpty
    isEmpty() { return this.list.length === 0 }

    //Return head
    getList() { return this.list }
}

export default BinaryHeap;
