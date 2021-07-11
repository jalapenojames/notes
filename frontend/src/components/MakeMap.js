import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BFSdriver } from './MapBFS'
import _next from '../next_arrow.png'
import _back from '../note_back.png'

export default function MakeMap({ notesTitle, layerMap, updateLayerMap, root, updateRoot, testNotes }) {
    const defaultArr = Array(testNotes.length).fill().map((elem,idx) => idx)

    const [value, setValue] = useState('');
    // const [whatsLeft, setWhatsLeft] = useState(defaultArr);
    // const [citizens, setCitizens] = useState([]);
    const [toggle, setToggle] = useState(false);

    const clickedNote = (id) => {
        // console.log('id here is ', id)
        layerMap===0? handleClick0(id) : console.log()
        layerMap===1? handleClick1(id) : console.log()
    }

    const clickedMapNote = (id) => {
        // If you click the root note, then add value as root's child
        // id for this scenario is the rootID
        root[0].who === id? value || value===0? handleClickRoot1(value) /* Add function here to add value as a child of root */ : console.log() : console.log()
        id!== root[0].who? console.log('alright got here') : console.log()
    }

    // Make note that's clicked on into the root note
    const handleClick0 = (id) => updateRoot([{who: id, children: null}])
    
    const handleClick1 = (id) => value===id? setValue('') : setValue(id)       // (setValue(''), setWhatsLeft())

    const handleClick0Arrow = () => root.length>0? updateLayerMap(1) : console.log()

    const handleClick1Arrow = (who) => {
        who==='left'? updateLayerMap(0) : console.log()
        who==='right'? updateLayerMap(2) : console.log()
    }

    const handleClick2Arrow = (who) => {
        who==='left'? updateLayerMap(1) : console.log()
        // who==='right'? updateLayerMap(2) : console.log()
    }

    const handleClickRoot1 = (who) => {        
        // Add who under root (state)  
        if(root[0].children === null) {
            root[0].children = [{ who: who, children: null}]
            // console.log([{ who: who, children: null}])
            updateRoot(root)
            setToggle(!toggle)
            return
        }
        if(root[0].children!==null) {
            let arr = []
            // console.log('we selected', who, 'to be added')
            root[0].children.map(elem => arr.push(elem.who))                    // Add existing children
            arr.push(who)                                                       // Add selected note index
            // console.log(arr)
            const append = arr.map(elem => ({ who: elem, children: null}))
            // console.log(append, root)
            root[0].children = append

            updateRoot(root)
            setToggle(!toggle)                                      
            // ^Force update, this effectively runs the UseEffect that depends on a change in Root
            //      - Then it displays it in JSX render (done by useEffect(()=>{}, [toggle]))
            return
        }
                // Then display it as a child of root /? where
    }

    // Pick your root
    const layerMap0 = () => (
        <React.Fragment>
            <div className="d-flex flex-column align-items-center">
                <h1>Pick your root</h1>
                <p>MapField</p>
                <br/><br/>
                <br/><br/>
                <p>your root goes here when selected:</p>
                {root.length>0? <p className='border border-secondary rounded' style={{width: '200px'}}>{lessThanFifteen(testNotes[root[0].who][0])}</p> : <p className='' style={{width: '200px'}}>_</p>}
                {/* {console.log(root.length)} */}
                <br/><br/>
                Next<img onClick={handleClick0Arrow} src={_next} alt='next arrow' style={{height: '60px'}}/>
            </div>
        </React.Fragment>
    )

    // Add a child
    const layerMap1 = () => (
        <React.Fragment>
            <div className="d-flex flex-column align-items-center">
                <h1>Add a child</h1>
                {/* <br/><br/> */}
                <div className='bg-secondary d-flex flex-column align-items-center justify-content-center' style={{height: '600px', width: '600px', position: 'relative'}}>
                    
                    {/* Containers */}
                    <div className='d-flex flex-column align-items-center justify-content-center' style={{position: 'absolute', height: '600px', width: '600px', opacity: '1', zIndex: '1', backgroundColor: '#001C57'}}>
                        {Array(3).fill().map((elem,indexR) => (<div className='row text-white' style={{paddign: 0}}>{Array(3).fill().map((elem,indexC)=><div id={indexR+'-'+indexC} className='d-flex flex-column align-items-center justify-content-center border border-white' style={{height: '100px', width: '150px', padding: 0}}>
                            {}

                            {/* Root node */}
                            {(indexR===1 && indexC===1)? root.length>0? rootJSX() : console.log() : console.log() }
                            
                            {/* Child node */}
                            {(indexR===1 && indexC===1)? root.length>0? mapTree2(root, []).join(', ') : console.log() : console.log() }

                        </div>)}</div>))}
                    </div>
                    
                    {/* First child */}
                    {/* {root.length>0? root[0].children? <p className='bg-primary text-white border border-dark rounded' style={{width: '150px'}}>{console.log(root[0].children[0].who)}{lessThanFifteen(testNotes[root[0].children[0].who][0],18)}</p> : <p className='' style={{width: '200px'}}>_</p> : <p className='' style={{width: '200px'}}>_</p> } */}
                
                </div>
                <br/>
                {/* <br/> */}
                <div className='row'>
                    <div className='col'>Back</div>
                    <div className='col'>Next</div>
                </div>
                <div className='row'>
                <img className='col' onClick={() => handleClick1Arrow('left')} src={_next} alt='next arrow' style={{height: '50px', width: 'auto', transform: 'rotate(180deg)', padding: '0 10px 0 10px'}}/>
                <img className='col' onClick={() => handleClick1Arrow('right')} src={_next} alt='next arrow' style={{height: '50px', width: 'auto', padding: '0 10px 0 10px'}}/>
                </div>
            </div>
        </React.Fragment>        
    )

        // Look at note map
        const layerMap2 = () => (
            <React.Fragment>
                <div className="d-flex flex-column align-items-center">
                    <h1>Note Map</h1>
                    {/* <br/><br/> */}
                    <div className='bg-secondary d-flex flex-column align-items-center justify-content-center' style={{height: '600px', width: '600px', position: 'relative'}}>
                        
                        {/* Containers */}
                        <div className='d-flex flex-column align-items-center justify-content-center' style={{position: 'absolute', height: '600px', width: '600px', opacity: '1', zIndex: '1', backgroundColor: '#001C57'}}>
                                <div className='d-flex flex-column align-items-center justify-content-center' style={{color: 'white'}}>
                                {/* Root node */}
                                { root.length>0? rootJSX() : console.log() }
                                
                                {/* Child node */}
                                { root.length>0? mapTree2(root, []).slice(1, mapTree2(root, []).length).join(', ') : console.log() }

                                {/* Drawing */}
                                {drawing()}

                                {/* Test */}
                                {drawingTest()}                                
                                </div>
                        </div>                    
                    </div>
                    <br/>
                    {/* <br/> */}
                    <div className='row'>
                        <div className='col'>Back</div>
                        <div className='col'>Next</div>
                    </div>
                    <div className='row'>
                    <img className='col' onClick={() => handleClick2Arrow('left')} src={_next} alt='next arrow' style={{height: '50px', width: 'auto', transform: 'rotate(180deg)', padding: '0 10px 0 10px'}}/>
                    <img className='col' onClick={() => handleClick2Arrow('right')} src={_next} alt='next arrow' style={{height: '50px', width: 'auto', padding: '0 10px 0 10px'}}/>
                    </div>
                </div>
            </React.Fragment>        
        )
    
    const drawing = () => {
        
        const citizens = mapTree2(root, []).slice(1, mapTree2(root, []).length) // .join(', ')
        const everybody = mapTree2(root, [])

        root.length>0? root[0].children? console.log('citizens: ' + citizens) : console.log() : console.log()
        root.length>0? root[0].children? console.log('everybody: ' + everybody) : console.log() : console.log()

        return (<div>
            {root.length>0? root[0].children?  citizens.map(elem => <div>{testNotes[elem][0]}</div>) : console.log() : console.log()}
        </div>)
    }

    const drawingTest = () => {
        const test3 = [{who: '1', children: [{who: '1.2', children: [{who: '1.2.3', children: null},{who: '1.2.5', children: null}]}, {who: '1.4', children: [{who: '1.4.0', children: null}]}]}]
        const test4 = [{who: '1', children: [{who: '2', children: [{who: '3', children: null},{who: '5', children: null}]}, {who: '4', children: [{who: '0', children: null}]}]}]

        console.log(mapTree3(test3,[]))

        const tree = mapTree3(test3,[])

        // const citizens = mapTree2(root, []).slice(1, mapTree2(root, []).length) // .join(', ')
        // const everybody = mapTree2(root, [])

        // root.length>0? root[0].children? console.log('citizens: ' + citizens) : console.log() : console.log()
        // root.length>0? root[0].children? console.log('everybody: ' + everybody) : console.log() : console.log()


        console.log(flattenObject(root))
        const depth = Object.keys(flattenObject(root)).map(elem => elem.split('.').length/2)
        const vals = Object.values(flattenObject(root))

        console.log(depth,vals) 

        let max_of_array = Math.max.apply(Math, depth);
        console.log(max_of_array)

        let map = Array(max_of_array).fill().map(elem => [])
        depth.map((elem, i) => vals[i] || vals[i]===0? map[elem-1].push(vals[i]) : console.log())

        console.log(map)
     

        return (<div>
            {'testing'}
            {/* {tree.map(elem => <div className='row'>{Array(elem.length).fill().map(elem => <div className='col'>🥬</div>)}</div>)} */}
            {map.map((elem,indexR) => <div className='row'>{Array(map[indexR].length).fill().map(elem => <div className='col'>🍗</div>)}</div>)}
        </div>)
    }

    const rootJSX = () => <p onClick={()=>clickedMapNote(root[0].who)} className='bg-dark text-white border border-dark rounded' style={{width: '60px', margin: 0}}>{lessThanFifteen(testNotes[root[0].who][0],10)}</p>

    useEffect(()=>{
        // Reset Root upon render
        updateRoot([])
        // updateLayerMap(0)

        // Reset selected id
        setValue('')

        // Testing 
        // const test2 = [{who: '1', children: [{who: '1.2', children: [{who: '1.2.3', children: null}]}, {who: '1.4', children: [{who: '1.4.0', children: null}]}]}]
        const test3 = [{who: '1', children: [{who: '1.2', children: [{who: '1.2.3', children: null},{who: '1.2.5', children: null}]}, {who: '1.4', children: [{who: '1.4.0', children: null}]}]}]
        const testNM = [{who: 6, children: [{who: 4, children: null}]}]

        // console.log(Object.values(flattenObject(test3)))
        // console.log((flattenObject(test3)))

        // console.log(Object.values(flattenObject2(test3)))
        // console.log(flattenObject2(test3))

        // console.log(test3.flat(Infinity))

        // const coordList = evalMakeEdges(test3)
        // console.log(coordList)

        // BFSdriver(coordList, 2, 1)

        // console.log(evalMakeEdges(testNM))
        // console.log(evalMakeEdges(test3))

        // console.log(flattenObject(test3))
        // const depth = Object.keys(flattenObject(test3)).map(elem => elem.split('.').length/2)
        // const vals = Object.values(flattenObject(test3))

        // console.log(depth,vals)

        // let max_of_array = Math.max.apply(Math, depth);
        // console.log(max_of_array)

        // let map = Array(max_of_array).fill().map(elem => [])
        // depth.map((elem, i) => vals[i]? map[elem-1].push(vals[i]) : console.log())

        // console.log(map)
    },[])

    function flattenObject(ob) {
        var toReturn = {};
    
        for (var i in ob) {
            if (!ob.hasOwnProperty(i)) continue;
    
            if ((typeof ob[i]) == 'object' && ob[i] !== null) {
                var flatObject = flattenObject(ob[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue;
    
                    toReturn[i + '.' + x] = flatObject[x];
                }
            } else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    }

    function flattenObject2(ob, prefix = false, result = null) {
        result = result || {};
      
        // Preserve empty objects and arrays, they are lost otherwise
        if (prefix && typeof ob === 'object' && ob !== null && Object.keys(ob).length === 0) {
          result[prefix] = Array.isArray(ob) ? [] : {};
          return result;
        }
      
        prefix = prefix ? prefix + '.' : '';
      
        for (const i in ob) {
          if (Object.prototype.hasOwnProperty.call(ob, i)) {
            if (typeof ob[i] === 'object' && ob[i] !== null) {
              // Recursion on deeper objects
              flattenObject2(ob[i], prefix + i, result);
            } else {
              result[prefix + i] = ob[i];
            }
          }
        }
        return result;
      }

    // Display Root's children in JSX render
    useEffect(()=>{
        root.length>0? displayRoot(root) : console.log()
    },[toggle])

    useEffect(()=>{
        // console.log(root)
    },[root])

    const evalMakeEdges = (tree) => {
        let t = makeEdges(tree,[])

        // if(!t[1]) {
        //     console.log('gottem', t.slice(0,1))
        //     t = t.slice(0,1)

        //     let tResult=[]
        //     t.map(elem => {
        //         // bookmark
        //     })
        // }

        let tResult = []
        t.map(elem => {
            if(elem.length>0)
                tResult.push(+elem)
        })
        let tCoord= []
        for (let i=0; i<tResult.length/2; i++) {
            tCoord.push([ tResult[2*i], tResult[2*i+1] ])
        }

        return tCoord
    }

    const getLastChar = (string) => {
        if(typeof string === 'number')
            return string.toString().split('.')[string.toString().split('.').length-1]
        return string.split('.')[string.split('.').length-1]
    }

    const getEdges = (tree) => {
        let s = getLastChar(tree[0].who)
        if(tree[0].children) {
            let c = tree[0].children.map(elem => getLastChar(elem.who))
            // s += ','+c
            s = c.map(elem => [+s].concat(+elem))
            return s
        }
        return
    }

    // Recursive function to retrieve edges on Root
    const makeEdges = (tree,a) => {
        if(tree[0].children) {          
            // console.log(getLastChar(tree[0].who), a.length, getEdges(tree), tree[0].who)  
            // return [tree[0].who].concat(tree[0].children.map(elem => makeEdges([elem],a.concat([tree[0].who])))).join().split(',')
            return getEdges(tree).concat(tree[0].children.map(elem=>makeEdges([elem],a.concat([getEdges(tree)])))).join().split(',')
        }
        else {
            // console.log(getLastChar(tree[0].who), a.length, getEdges(tree), tree[0].who)  
            return getEdges(tree)
        }
    }

    // Recursive function to print Root (??? test)
    const mapTree3 = (tree,a) => {
        if(tree[0].children) {          
            console.log(tree[0].who, a.length)  
            return [tree[0].who].concat(tree[0].children.map(elem => mapTree3([elem],a.concat([tree[0].who])))/*.join()*/)//.join().split(',')
        }
        else {
            console.log(tree[0].who, a.length)  
            return tree[0].who
        }
    }

    // Recursive function to print Root
    const mapTree = (tree,a) => {
        if(tree[0].children) {            
            return [tree[0].who].concat(tree[0].children.map(elem => mapTree([elem],a.concat([tree[0].who]))).join()).join().split(',').map(elem => +elem)
        }
        else {
            return tree[0].who
        }
    }

    // Recursive function wrapper to return result as an Array
    const mapTree2 = (tree,a) => {
        const mapTree = (tree,a) => {
            if(tree[0].children) {            
                return [tree[0].who].concat(tree[0].children.map(elem => mapTree([elem],a.concat([tree[0].who]))).join()).join().split(',').map(elem => +elem)
            }
            else {
                return tree[0].who
            }
        }

        if(typeof mapTree(tree,a) === 'number')
            return [mapTree(tree,a)]
        else
            return mapTree(tree,a)
    }


    const displayRoot = (node) => console.log('i should be displaying something')       // currently, Root is being passed in as node 

    const actionDisplay = (val) => {
        const valNum = val.toString().split('.')[val.toString().split('.').length-1]    // Retrieve last number in path name e.g. 4.1.3 => "3"
        const newNode = document.createElement('p')                                     // Create new node to append

    }

    // Return phrase up to 18 characters long
    const lessThanFifteen = (phrase, num) => {
        let charactersUsed = 0
        let desiredIndex = 0
        if(num < 1 || !num)
            num=15
        phrase.split(' ').map((elem,index) => {
            charactersUsed+= elem.length + 1
            charactersUsed<num? desiredIndex = index : console.log()
        })

        return (phrase.split(' ').map((elem,index) => index<=desiredIndex? elem : console.log()).join(' '))
    }

    const printRoot = (node) => {
        if(node[0].children) {
            console.log(node[0].who)

            node[0].children.map(elem => {
                printRoot([elem])
            })
        }
        else {
            console.log(node[0].who)
        }
    }

    const printRootArr = (node) => {
        if(node[0].children) {
            console.log(node[0].who)

            node[0].children.map(elem => {
                printRootArr([elem])
            })
        }
        else {
            console.log(node[0].who)
        }
    }

    const whichList = () => {
        const defaultArr = Array(notesTitle.length).fill().map((elem,idx)=>idx)
        if(layerMap===0)        // This returned array is the complete and full notes list #=> [0,1,2...]
            return defaultArr
        if(layerMap===1 || layerMap===2) {      // need to revisit this and return only 'whats left' - root - any 'taken' notes
            let currentArr = defaultArr

            let rootIndex = ''
            let takenNotes = []                     // Example, placeholder
            let r2 = []
            if(root.length>0) {
                rootIndex = root[0].who             // Get root index           // #=> [n] or [rootIndex]
                // Taken notes (add root)
                takenNotes.push(rootIndex)
                // Taken notes (add all children)
                // >> create this f-n
                const r = mapTree(root, [])
                let r2 = takenNotes.concat(r)
                r2.splice(0,1)

                // if you want to remove clicked child
                // r2.map(elem => takenNotes.push(elem))
                // takenNotes.shift()


                // Remove all root/taken notes
                currentArr.splice(rootIndex,1)      // *** Cannot splice any further, must use different method since index will no longer match
            }

            // Find matching index from takenNotes in currentArr
            // If it matches, splice it from array 
            // console.log(currentArr)
            let toBeRemoved = []
            takenNotes.map(elem => currentArr.includes(elem)? toBeRemoved.push(elem) : console.log())   // Adds 'notes to be removed' to array
            // console.log(toBeRemoved)

            let toBeReturned = []
            currentArr.map(elem => toBeRemoved.includes(elem)? console.log() : toBeReturned.push(elem))
            // console.log(toBeReturned)
            
            return toBeReturned
        }        
        return defaultArr       // default 
    }

    // Disable 'who' in available notes, reminder who is value or currently selected note in left panel
    // Change Left panel selected note to gray
    const conditional = (color1, color2, elem) =>  layerMap===1? value===elem? root.length>0? mapTree2(root,[]).includes(elem)? color1 : color2 : color2 : console.log() : console.log()

    const conditional2 = () => {}

    return (
        <div className='d-flex align-items-center justify-content-center' style={{height: '100%'}}>

            {/* { PANEL } */}
            <div className='d-flex align-items-center' style={{height: '100%', borderRight: 'solid 1px black', position: 'relative'}}>
                <div className='' style={{position: 'absolute', height: '80px', width: '80px', top: '120px', left: '100px'}}><Link to='/home' className='noteTitle'>back</Link> </div>
                <div className='d-flex align-items-center' style={{width: '300px', height: '500px'}}>
                    <ul className='notesTitle'style={{margin: 'auto', width: '300px', height: '400px', overflowY: 'auto'}}>
                        {/* notes looks like [0,1,2,3,4,5,6,7,8] */}
                        {/* but it will look like [0,3,4,5] */}
                        {whichList().map((elem,index) => (
                            <li onClick={() => clickedNote(elem)} className='col' style={{width: '200px', listStyleType: 'none', pointerEvents: `${conditional('none','auto',elem)}`}}>
                                <p className='border border-secondary rounded' style={{backgroundColor: `${conditional('gray','green',elem)}`, color: `${conditional('black','white',elem)}`}}>{lessThanFifteen(notesTitle[elem].children[0].text,18)}</p>
                            </li>                                                
                        ))}
                    </ul>  
                </div>
            </div>

            {/* { MAP MAKER } */}
            <div className="col" style={{position: 'relative'}}>
                {layerMap===0? layerMap0() : console.log()}
                {layerMap===1? layerMap1() : console.log()}
                {layerMap===2? layerMap2() : console.log()}
            </div>
        </div>
    )
}

// Graveyard

        // console.log(root[0])
        // console.log(root[0].children)
        // console.log(root[0].children? root[0].children[0].who? root[0].children.map(elem => elem.who) : console.log() : console.log())

        // Testing: 
        // console.log('printing root...')
        // const test = [{who: 1, children: [{who: 2, children: null}, {who: 3, children: null}]}]
        // const test2 = [{who: 1, children: [{who: 2, children: [{who: 4, children: null}]}, {who: 3, children: [{who: 0, children: null}]}]}]
        // const test3 = [{who: 1, children: [{who: 2, children: [{who: 4, children: null}, {who: 5, children: null}]}, {who: 3, children: [{who: 0, children: null}]}]}]
        // console.log(test2)
        // printRoot(test2)

        // Map test2 tree
        // console.log(mapTree(test3,[]))

        // console.log(mapTree2([{who: 2, children: null}],[]))
        // console.log(mapTree2([{who: 2, children: [{who: 3, children: null}]}],[]))

        // console.log(mapTree2([{who: 2, children: [{who: 3, children: null}]}],[]).includes(0))






        // old actionDisplay f-n: 
        // const valNum = val.toString().split('.')[val.toString().split('.').length-1]    // Retrieve last number in path name e.g. 4.1.3 => "3"
        // const newNode = document.createElement('p')                                     // Create new node to append

        // // Append p element to the DOM (under Root)
        // newNode.innerText = lessThanFifteen(testNotes[valNum][0],18)
        // newNode.className = 'bg-primary text-white border border-dark rounded'
        // newNode.onclick = () => {clickedMapNote(valNum)}

        // // console.log(document.getElementById('1-1'), newNode)

        // // Attach child node to Root
        // document.getElementById('1-1')? document.getElementById('1-1').append(newNode) : console.log('1-1 dne')

        // console.log('actionDisplay... ', mapTree(root,[]))

        // // Example: 
        // // <p className='bg-primary text-white border border-dark rounded' style={{width: '150px'}}>{console.log(root[0].children[0].who)}{lessThanFifteen(testNotes[root[0].children[0].who][0],18)}</p>


        // old displayAction f-n
        // if(node[0].children){
        //     let underlings = node[0].children.map(elem => elem.who).join(', ')
        //     actionDisplay(underlings)
        //     node[0].children.map(elem => displayRoot([elem]))
        // }


    //     {Array(3).fill().map((elem,indexR) => (<div className='row text-white' style={{paddign: 0}}>{Array(3).fill().map((elem,indexC)=><div id={indexR+'-'+indexC} className='d-flex flex-column align-items-center justify-content-center border border-white' style={{height: '100px', width: '150px', padding: 0}}>
    //     {}

    //     {/* Root node */}
    //     {(indexR===1 && indexC===1)? root.length>0? rootJSX() : console.log() : console.log() }
        
    //     {/* Child node */}
    //     {(indexR===1 && indexC===1)? root.length>0? mapTree2(root, []).join(', ') : console.log() : console.log() }

    // </div>)}</div>))}




        // // Testing 
        // // const test2 = [{who: '1', children: [{who: '1.2', children: [{who: '1.2.3', children: null}]}, {who: '1.4', children: [{who: '1.4.0', children: null}]}]}]
        // const test3 = [{who: '1', children: [{who: '1.2', children: [{who: '1.2.3', children: null},{who: '1.2.5', children: null}]}, {who: '1.4', children: [{who: '1.4.0', children: null}]}]}]

        // // console.log(mapTree3(test2,[]))
        // // console.log(mapTree3(test3,[]))

        // // console.log(mapTree3(test2[0].children,[]))

        // const coordList = evalMakeEdges(test3)
        // console.log(coordList)

        // BFSdriver(coordList, 2, 1)