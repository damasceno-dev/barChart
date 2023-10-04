import * as d3 from 'd3'
import { useRef, useEffect, useState, MouseEventHandler } from "react";

interface GDPYear {
  year: string;
  gdp: number;
}
export function BarChartWithDiv3() {
  const [data, setData] = useState<GDPYear[]>([]);

  const svgHeight = 600;
  const svgWidth = 1200;
  const xPadding = 40;
  const yPadding = 15;
  const topPadding = 80;

  let yScale: d3.ScaleLinear<number, number, never>; let xScale : d3.ScaleLinear<number, number, never>;

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
  
  
    const yearValues = data.filter(x=> x.year !== undefined).map(x => x.year)
    
    if(yearValues.length > 0) {
      const yearMin = d3.minIndex(yearValues); const yearMax = d3.maxIndex(yearValues);
    
      if (yearMin !== undefined && yearMax !== undefined) {
        xScale = d3.scaleLinear([yearMin, yearMax], [0 + xPadding, svgWidth - xPadding])
      } else {
        throw Error('Invalid year value')
      }
    }


  const gdpValues = data.filter(x => x.gdp !== undefined).map(x => x.gdp)

  if (gdpValues.length > 0) {
    const [gdpMin, gdpMax] = d3.extent(gdpValues)
    // const [gdpMin, gdpMax] = [d3.min(gdpValues), d3.max(gdpValues)]
    if (gdpMin !== undefined && gdpMax !== undefined) {
      yScale = d3.scaleLinear([gdpMin, gdpMax], [0 + yPadding, svgHeight - yPadding - topPadding])
    } else {
      throw Error('Invalid gdp value')
    }
  }


  
  type rectValue = (input: number) => number;

  // const barHeight: rectValue = (value) => value/30;
  const barHeight: rectValue = (value) => yScale(value);
  // const xSpacing: rectValue = (index) => index*6 + 10;
  const xSpacing: rectValue = (index) => xScale(index);

  const YearToQuarter = (yearMonthDay: string) : string => {

    const month = Number(yearMonthDay.substring(5,7))
    const year = Number(yearMonthDay.substring(0,4))

    if (typeof month !== 'number') {
      throw Error('Expected to recieve a month number at position 5 to 6 for the string ' + yearMonthDay);
    }
    if (typeof year !== 'number') {
      throw Error('Expected to recieve a year number at position 0 to 3 for the string ' + yearMonthDay);
    }

    const quarter = month >= 0 && month <= 3 ? 'Q1' :
                    month >= 4 && month <= 6 ? 'Q2' :
                    month >= 7 && month <= 9 ? 'Q3' :
                    'Q4';
    
    return year + ' ' + quarter;
  }

  const BillionFormat = (value: number):string =>  {
    let plural = value/1000 > 2 ? 'Billions' : 'Billion'
    let dollarUSLocale = Intl.NumberFormat('en-US');
    return `${dollarUSLocale.format(value)} ${plural}`
  }

  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
      <svg width={svgWidth} height={svgHeight} className='inline-block bg-black m-[1px] text-red-800'>
      {data.map(({year,gdp}, i) => <RectElement  
                                      key={i}
                                      rectWidth={4}
                                      i={i} 
                                      barHeight={barHeight(gdp)} 
                                      xSpacing={xSpacing(i)} 
                                      svgHeight={svgHeight}
                                      date={YearToQuarter(year)} 
                                      gdp={BillionFormat(gdp)}
                                    />)}
      </svg>
    </main>
  )
}

interface RectElementProps {
  i: number;
  rectWidth: number;
  barHeight: number;
  xSpacing: number;
  svgHeight: number;
  date: string;
  gdp: string;
}

export function RectElement({i, rectWidth, barHeight, xSpacing, svgHeight, date, gdp}: RectElementProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
          <>
            <rect key={i} 
                  height={barHeight} width={rectWidth} 
                  x={xSpacing} y={svgHeight - barHeight} 
                  className={`fill-indigo-600 hover:fill-green-500`}    
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  
            />
            <g className={isHovered ? `visible opacity-100 transition-all duration-300` : `invisible opacity-0 transition-all duration-300`}>
              <rect height='70' width='230' x={i < 90 ? xSpacing : xSpacing - 200} y={svgHeight - barHeight - 90} className='fill-indigo-800 stroke-green-500 stroke-2' filter="url(#f1)"/>
              <text className='fill-white' x={i < 90 ? xSpacing + 30 : xSpacing - 185} y={svgHeight - barHeight - 50}>{date} - ${gdp}</text>
              <line x1={i < 90 ? xSpacing + 140 : xSpacing - 80} y1={svgHeight - barHeight - 20} x2={xSpacing} y2={svgHeight - barHeight} className='stroke-green-500 stroke-2'/>
              <filter id="f1" x="0" y="0" width="200%" height="200%">

                esse blur tá funcionando?
                <feComponentTransfer in="SourceGraphic">
                <feFuncR type="discrete" tableValues="0.8"/>
                <feFuncG type="discrete" tableValues="1"/>
                <feFuncB type="discrete" tableValues="0.8"/>
                </feComponentTransfer>
                <feGaussianBlur stdDeviation="3"/>
                <feOffset dx="2" dy="2" result="shadow"/>
                <feComposite in="SourceGraphic" in2="shadow" operator="over"/>
              </filter>
            </g>
          </>

        )
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