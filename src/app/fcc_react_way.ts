

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
