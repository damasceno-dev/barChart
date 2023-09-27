import d3 from "d3";
import { useRef, useEffect, useState, MouseEventHandler } from "react";

interface GDPYear {
  year: string;
  gdp: number;
}

export function BarChartWithDiv3() {
  const [data, setData] = useState<GDPYear[]>([]);

  useEffect(() => {

    let ignore = false; //bool for the cleanup function => 

    async function getData() {
      try {
        const res = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
        const data = await res.json()
        const GDP_objectArray = data.data.map((tupleYearValue: [string,number])  => {
          return (
            {year: tupleYearValue[0], gdp: tupleYearValue[1]}
          )
        })
        if (!ignore) {
          setData(GDP_objectArray)
        }
      } catch (error) {
        
      }
    }
    getData()

    return () => {
      ignore = true;
    }

  }, [])

  type rectValue = (input: number) => number;
  
  const svgHeight = 700
  const barHeight: rectValue = (value) => value/30;
  const xSpacing: rectValue = (index) => index*6 + 10;


  // todo: function that recieves an year-month and returns year and quarter
  // todo: 18064.7 => 18,064.7 Billion 

  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
      <svg width={1700} height={svgHeight} className='inline-block bg-white m-[1px] text-red-800'>
      {/* {data.map((x, i) => <h1 className="text-white" key={i}> {x.gdp}</h1>)} */}
      {data.map(({year,gdp}, i) => {
        return (
          <rect key={i} height={barHeight(gdp)} width='5' x={xSpacing(i)} y={svgHeight - barHeight(gdp)} className='fill-indigo-600 m-[1px] hover:fill-green-500'>
            <title>{year} - {gdp}</title>
          </rect>
        )
      })}
      </svg>
    </main>
  )
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

  console.log(data)
  
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