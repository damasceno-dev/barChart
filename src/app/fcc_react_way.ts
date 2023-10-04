


export function save() {
  const dataset = [
    [ 34,    78 ],
    [ 109,   280 ],
    [ 310,   120 ],
    [ 79,    411 ],
    [ 420,   220 ],
    [ 233,   145 ],
    [ 333,   96 ],
    [ 222,   333 ],
    [ 78,    320 ],
    [ 21,    123 ]
  ];
  const w = 500;
  const h = 500;
  const padding = 60;

  const xScale = (x: number) => {}
  const yScale = (y: number) => {}
  const html = dataset.map((x,i) => { 
    return (
      `<circle cx=${xScale(x[0])} cy=${yScale(x[1])} r='5'></circle>
        <text x=${xScale(x[0]+ 10) } y=${yScale(x[1])}>${x[0]}, ${x[1]}</text>
      `
    )
  })
  
  document.getElementsByTagName('body')[0].innerHTML = 
  `<svg style='background-color: aliceblue' height=${h} width=${w}>
    ${html}
  </svg>`
}

export function D3_React_Way_2() {

  //circle element
  const dataset = [
    [ 34,    78 ],
    [ 109,   280 ],
    [ 310,   120 ],
    [ 79,    411 ],
    [ 420,   220 ],
    [ 233,   145 ],
    [ 333,   96 ],
    [ 222,   333 ],
    [ 78,    320 ],
    [ 21,    123 ]
  ];

const w = 500;
const h = 500;
  const html = dataset.map((x,i) => { 
    return (
      `<circle cx=${x[0]} cy=${h-x[1]} r='5'></circle>
        <text x=${x[0] + 5} y=${h-x[1]}>${x[0]}, ${x[1]}</text>
      `
    )
  })
  
  document.getElementsByTagName('body')[0].innerHTML = 
  `<svg style='background-color: aliceblue' height=${h} width=${w}>
    ${html}
  </svg>`
}

export function D3_React_Way() {


    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

    const w = 500;
    const h = 100;
    
    //adding a title to each rect
    const html = dataset.map((x,i) => { 
        return (
          `<rect class='bar' x=${i*30} y=${h-3*x} width='25' height=${3*x}>
              <title>${x}</title>
          </rect>
            <text style='font-family: sans-serif; font-size:25' fill='red' x=${i*30} y=${h-3*x -3} >${x}</text>
          `
        )
      })
      
      document.getElementsByTagName('body')[0].innerHTML = 
      `<svg style='background-color: aliceblue' height=${h} width=${500}>
        ${html}
      </svg>`

}



