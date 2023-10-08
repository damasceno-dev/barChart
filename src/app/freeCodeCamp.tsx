import * as d3 from 'd3'
import { useRef, useEffect, useState } from "react";

export function LinePlot({
  data = [1,2,3,4,5,6],
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20
}) {

  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  // const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const y = d3.scaleLinear(d3.extent(data) as Iterable<number>, [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);
  const caminho = line(data)
    return (
      <svg width={width} height={height}>
        {caminho && <path fill="none" stroke="currentColor" stroke-width="1.5" d={caminho} />}
        <g fill="white" stroke="currentColor" stroke-width="1.5">
          {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
        </g>
      </svg>
    );
  }


export function SvgHoverTest() {
  const x = 2222;
  const y = 3333;
  const z = 4444;
  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
    <svg width={1700} height={700} className='inline-block bg-white m-[1px] text-red-800'>

          <rect height='350' width='350' x='5' y='100' className={`fill-gray-500 peer/${x}`}>
          </rect>
          <g className={`peer-hover/${x}:visible peer-hover/${x}:opacity-100 invisible opacity-0 transition-all duration-350`}>
            <rect  height='350' width='350' x='200' y='100' className='fill-indigo-800'>
              {/* <title>{YearToQuarter(year)} - ${BillionFormat(gdp)}</title> */}
            </rect>
            <text x='50' y='50'>hei hei</text>
          </g>

          <rect height='350' width='350' x='505' y='100' className={`fill-gray-500 peer/${y}`}>
          </rect>
          <g className={`peer-hover/${y}:visible peer-hover/${y}:opacity-100 invisible opacity-0 transition-all duration-350`}>
            <rect height='350' width='350' x='800' y='100' className='fill-indigo-800'>
              {/* <title>{YearToQuarter(year)} - ${BillionFormat(gdp)}</title> */}
            </rect>
            <text x='50' y='50'>hei hei</text>
          </g>

          <PureElement></PureElement>


    </svg>
    </main>
  )
}

export function PureElement() {
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <rect height='350' width='350' x='905' y='100' className={`fill-gray-500 peer`} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
      </rect>
      <g className={isHovered ? `visible opacity-80 transition-all duration-500` : `invisible opacity-0 transition-all duration-500`}>
        <rect height='350' width='350' x='1005' y='100' className='fill-indigo-800'>
          {/* <title>{YearToQuarter(year)} - ${BillionFormat(gdp)}</title> */}
        </rect>
        <text x='50' y='50'>hei hei</text>
      </g>
    </>
  )
}

interface GDPYear {
  year: string;
  gdp: number;
}

export function BarChartWithDiv2() {
  const [data, setData] = useState<GDPYear[]>([]);
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
        const data = await res.json()
        const GDP_objectArray = data.data.map((tupleYearValue: [string,number])  => {
          return (
            {year: tupleYearValue[0], gdp: tupleYearValue[1]}
          )
        })
        
        setData(GDP_objectArray)
      } catch (error) {
        
      }
    }

    getData()
  }, [])

  return (
    <main>
      {/* {data.map((x, i) => <h1 className="text-white" key={i}> {x.gdp}</h1>)} */}
      {data.map(({year,gdp}, i) => {
        return (
          <svg key={i} height={gdp/30} width='4' className='inline-block bg-gray-500 text-white m-[1px]'>

          </svg>
          // <div key={i} style={{height: gdp/30}} className={`inline-block bg-white w-1 m-[1px] text-white`}></div>
          // <div className={getClassName(x)} key={i}></div>
        )
      })}
    </main>
  )
}


export function BarChartWithDiv() {
  const [data, setData] = useState<GDPYear[]>([]);
  const [numbers, setNumbers] = useState<number[]>();

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(data => setData(data.data))
  }, [])
  
  return (
    <main className="w-full h-[100vh]">
      {data.map(({year,gdp}, i) => {
        return (
          <div key={i} style={{height: gdp}} className={`inline-block bg-white w-6 m-1 text-white`}></div>
          // <div className={getClassName(x)} key={i}></div>
        )
      })}
    </main>
  )
}

export function FreeCodeCamp() {
  
    const gx = useRef(null);
        useEffect(() => {
          const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
  
          d3.select(gx.current)
          .selectAll('h2')
          .data(dataset)
          .enter()
          .append('h2')
          .text('New Title')
        } , [])
  
    return (
      <h1 ref={gx}>opa</h1>
    )
}

export function Example() {
  //#region Insert with js 
  let dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
  const html = dataset.map( x=> {
    if(x < 20) {
      return (
        `<h2 style='color: red'>${x} USD</h2>`
      )
    } else {
      return (
        `<h2 style='color: green'>${x} USD</h2>`
      )
    }
    }).join('')

    document.getElementsByTagName('body')[0].innerHTML = html

  return (
    <h1>opa</h1>
  )
}

export function Example2() {
  const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

  const w = 500;
  const h = 100;

  const html = dataset.map((x,i) => { 
    return (
      `<rect x=${i*30} y=${h-3*x} width='25' height=${3*x}></rect>
        <text x=${i*30} y=${h-3*x -3} >${x}</text>
      `
    )
  })
}
  //#endregion