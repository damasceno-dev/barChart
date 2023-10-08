"use client"
import * as d3 from 'd3'
import { useEffect, useState} from 'react';

export default function Home() {

  return (
    <BarChart/>
  )
}

interface GDPYear {
  year: string;
  gdp: number;
}

function BarChart() {
  const [data, setData] = useState<GDPYear[]>([]);

  const svgHeight = 500;
  const svgWidth = 800;
  const xPadding = 40;
  const yPadding = 0;
  const topPadding = 100;

  let xScale: d3.ScaleTime<number, number, number | undefined> = d3.scaleTime();
  let yScale: d3.ScaleLinear<number, number, never> = d3.scaleLinear();

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
        throw Error('Error when fetching data: ' + error)
      }
    }
    getData()

    return () => {
      ignore = true;
    }

  }, [])

  const yearValues = data.filter(x=> x.year !== undefined).map(x => new Date(x.year))
  if(yearValues.length > 0) {
    const [yearMin, yearMax] = d3.extent(yearValues); 
    if (yearMin !== undefined && yearMax !== undefined) {
      xScale = d3.scaleTime([yearMin, yearMax], [0 + xPadding, svgWidth - xPadding])
    } else {
      throw Error('Invalid year value')
    }
  }

  const gdpValues = data.filter(x => x.gdp !== undefined).map(x => x.gdp)
  let gdpMax, gdpMin: number | undefined = 0;
  if (gdpValues.length > 0) {
    [gdpMin, gdpMax] = d3.extent(gdpValues)
    if (gdpMin !== undefined && gdpMax !== undefined) {
      // yScale = d3.scaleLinear([gdpMin, gdpMax], [0 + yPadding, svgHeight - yPadding - topPadding])
      yScale = d3.scaleLinear([0, gdpMax], [0, svgHeight-topPadding])
      console.log(gdpMin, yScale(gdpMin), gdpMin/yScale(gdpMin))
      console.log(gdpMax, yScale(gdpMax), gdpMax/yScale(gdpMax))
    } else {
      throw Error('Invalid gdp value')
    }
  }

  type rectValue = (input: number| Date) => number;

  const barHeight: rectValue = (value) => yScale(value);
  const xSpacing:rectValue = (date)=> {
    const returnedMapped = xScale(date)
    if(typeof returnedMapped !== 'undefined') {
      return returnedMapped;
    } else {
      throw Error('Date ' + date + ' has invalid format')
    }
  } 

  return (
    <main className="bg-black w-full h-[100vh] flex flex-col items-center justify-center">
      <div className='bg-gray-900 flex flex-col items-center p-4 shadow-[0_10px_20px_rgba(34,197,94,_0.7)] rounded'>
        <div id='title' className='text-white text-5xl pt-3'>United States GDP</div>
        <svg width={svgWidth} height={svgHeight} className='inline-block bg-gray-900 m-[1px] text-white'>
        <AxisBottom
          xScale={xScale}
          xPadding={xPadding}
          svgHeight={svgHeight}
          svgWidth={svgWidth}
        />
        <AxisLeft
          yScale={yScale}
          xPadding={xPadding}
          yPadding={yPadding}
          svgHeight={svgHeight}
        />
        {data.map(({year,gdp}, i) => <RectElement  
                                        key={i}
                                        i={i} 
                                        barHeight={barHeight(gdp)} 
                                        xSpacing={xSpacing(new Date(year))} 
                                        svgHeight={svgHeight}
                                        date={year} 
                                        gdp={gdp}
                                      />)}
        </svg>
        <div className='text-white self-end mr-8 mt-3'>More Information: http://www.bea.gov/national/pdf/nipaguid.pdf
        </div>
      </div>
    </main>
  )
}

interface AxisProperties {
  xPadding: number;
  yPadding?: number;
  svgHeight: number;
}

interface AxisBottomProperties extends AxisProperties {
  xScale: d3.ScaleTime<number, number, number | undefined>;
  svgWidth: number;
}

function AxisBottom({xScale, xPadding, svgHeight, svgWidth}: AxisBottomProperties) {
  return (
      <g id='x-axis'>
        <path
        // d="M x1 y1 H x2 y2"
        d={`M ${xPadding - 5} ${svgHeight-30} H ${svgWidth - xPadding + 10}`}
        stroke="currentColor"
        />
      {xScale && xScale.ticks().map((value,index) => (
              <g
              className='tick'
              key={index}
              transform={`translate(${xScale(value)}, ${svgHeight -30})`}
              >
                <line
                  y2="6"
                  stroke="currentColor"
                />
                <text
                  key={index}
                  className='fill-white'
                  style={{
                    fontSize: "10px",
                    textAnchor: "middle",
                    transform: "translateY(20px)"
                  }}>
                  { value.getFullYear() }
                </text>
              </g>
      ))}
    </g>
  )
}

interface AxisLeftProperties extends AxisProperties {
  yScale: d3.ScaleLinear<number, number, never>;
}

function AxisLeft({yScale, xPadding, yPadding, svgHeight}: AxisLeftProperties) {
  return (
      <g id='y-axis'>
        <path
          // d="M x1 y1 L x2 y2"
          d={`M ${xPadding-2} ${svgHeight - 25} L ${xPadding -2} ${yPadding}`}
          stroke="currentColor"
        />
        <text transform="rotate(-90)" x="-350" y="60" className='fill-white'>Gross Domestic Product</text>

      {yScale && yScale.ticks().map((value,index) => (
            <g
              className='tick'
              key={index}
              transform={`translate(${xPadding - 5}, ${svgHeight - yScale(value) -30})`}
            >
              <line
                x2="4"
                x1="-3"
                stroke="currentColor"
              />
              <text
                key={index}
                className='fill-white'
                style={{
                  fontSize: "10px",
                  textAnchor: "middle",
                  transform: "translateX(-18px) translateY(3px)"
                }}>
                { value }
              </text>
            </g>
      ))}
      </g>
  )
}

interface RectElementProps {
  i: number;
  barHeight: number;
  xSpacing: number;
  svgHeight: number;
  date: string;
  gdp: number;
}

function RectElement({i, barHeight, xSpacing, svgHeight, date, gdp}: RectElementProps) {

  const [isHovered, setIsHovered] = useState(false);
  const changeDirectionIndex = 80;
  const rectWidth = 2;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  
  const yearToNumber = (yyyyMMdd: string) => Number(yyyyMMdd.substring(0,4))  
  const monthToNumber = (yyyyMMdd: string) => Number(yyyyMMdd.substring(5,7))

  const YearToQuarter = (yearMonthDay: string) : string => {

    const month = monthToNumber(yearMonthDay)
    const year = yearToNumber(yearMonthDay)

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
    let dollarUSLocale = Intl.NumberFormat('en-US');
    return `${dollarUSLocale.format(value)} Billions`
  }

  return (
          <>
            <rect key={i} 
                  height={barHeight} width={rectWidth} 
                  x={xSpacing} y={svgHeight - barHeight -30} 
                  className={`fill-indigo-600 hover:fill-green-500 bar`}    
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  data-date={date}
                  data-gdp={gdp}
            />
            <g id={isHovered ? 'tooltip' : ''} 
               className={isHovered ? `inline opacity-100 transition-all duration-300` : `hidden opacity-0 transition-all duration-300`}
               data-date={date}
               data-gdp={gdp}
            >
              <rect filter="url(#f1)" height='70' width='230' x={i < changeDirectionIndex ? xSpacing : xSpacing - 200} y={svgHeight - barHeight - 90} className='fill-indigo-800 stroke-green-500 stroke-2'/>
              <text className='fill-white' x={i < changeDirectionIndex ? xSpacing + 30 : xSpacing - 175} y={svgHeight - barHeight - 50}>{YearToQuarter(date)} - ${BillionFormat(gdp)}</text>
              <line x1={i < changeDirectionIndex ? xSpacing + 140 : xSpacing - 80} y1={svgHeight - barHeight - 20} x2={xSpacing} y2={svgHeight - barHeight} className='stroke-green-500 stroke-2'/>
              <filter id="f1" x="0" y="0" width="200%" height="200%">
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