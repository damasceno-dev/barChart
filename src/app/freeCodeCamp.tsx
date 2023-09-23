import d3 from "d3";
import { useRef, useEffect, useState } from "react";

interface GDPYear {
  year: string;
  gdp: number;
}

export function BarChartWithDiv3() {
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

  
  const svgHeight = 700

  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
      <svg width={1700} height={svgHeight} className='inline-block bg-white m-[1px] text-red-800'>
      {/* {data.map((x, i) => <h1 className="text-white" key={i}> {x.gdp}</h1>)} */}
      {data.map(({year,gdp}, i) => {
        return (
          <rect key={i} height={gdp/30} width='5' x={i*6 + 10} y={svgHeight - gdp/30} className='fill-indigo-700 m-[1px]'/>
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
          <svg key={i} height={gdp/30} width='4' className='inline-block bg-white text-white m-[1px]'>

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

export function BarChartTry() {
  // const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
  const dataset = [243.1,246.3,250.1,260.3,266.2,272.9,279.5,280.7,275.4,271.7]

  return (
    <main className="w-full h-[100vh]">
      {dataset.map((x,i) => {
        return (
          <div key={i} style={{height: x}} className={`inline-block bg-white w-6 h-[${x}px] m-1 text-white`}></div>
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
  //#endregion