const BFSdriver= (coords, level, seed) => {
    // JavaScript Program to print
    // count of nodes
    // at given level.
        
    let V;
    // Pointer to an
    // array containing
    // adjacency lists
    let adj=new Array(1001);
    for(let i=0;i<adj.length;i++)
    {
        adj[i]=[];
    }
    
    function addEdge(v,w)
    {
    // Add w to v’s list.
    adj[v].push(w);

    // Add v to w's list.
    adj[w].push(v);
    }
    
    function BFS(s,l)
    {
        V=100;
        // Mark all the vertices
        // as not visited
        let visited = new Array(V);
        let level = new Array(V);
    
        for (let i = 0; i < V; i++)
        {
        visited[i] = false;
        level[i] = 0;
        }
    
        // Create a queue for BFS
        let queue = [];
    
        // Mark the current node as
        // visited and enqueue it
        visited[s] = true;
        queue.push(s);
        level[s] = 0;
        let count = 0;
        while (queue.length!=0)
        {
    
        // Dequeue a vertex from
        // queue and print it
        s = queue[0];
        queue.shift();
    
        let list = adj[s];
        // Get all adjacent vertices
        // of the dequeued vertex s.
        // If a adjacent has not been
        // visited, then mark it
        // visited and enqueue it
        for (let i=0;i<list.length;i++)
        {
            if (!visited[list[i]])
            {
            visited[list[i]] = true;
            level[list[i]] = level[s] + 1;
            queue.push(list[i]);
            }
        }
    
        count = 0;
        for (let i = 0; i < V; i++)
            if (level[i] == l)
            count++;
        }
        return count;
    }
    
    
    
    // Driver code
    
    // Create a graph given
    // in the above diagram
    
    // const originalCoords = [[0,1],[0,2],[1,3],[2,4],[2,5]]

    // originalCoords.map(elem => addEdge(elem[0],elem[1]))

    // coords.map(elem => addEdge(elem[0],elem[1]))

    // Original code: 
    // addEdge(0, 1)
    // addEdge(0, 2)
    // addEdge(1, 3)
    // addEdge(2, 4)
    // addEdge(2, 5)

    // addEdge(1, 2)
    // addEdge(1, 4)
    // addEdge(2, 3)
    // addEdge(2, 5)
    // addEdge(4, 0)

    addEdge(6,3)
    
    // let level = 2;
    console.log(BFS(seed, level));
    // This code is contributed by unknown2108
    // https://www.geeksforgeeks.org/count-number-nodes-given-level-using-bfs/
}

export { BFSdriver }