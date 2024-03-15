// Write your code here

import {BarChart, Legend, Bar, XAxis, YAxis} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {data} = props
  const updatedData = data.map(eachData => ({
    dose1: eachData.dose_1,
    dose2: eachData.dose_2,
    vaccineDate: eachData.vaccine_date,
  }))
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="vaccination-coverage-card">
      <h1 className="vaccination-coverage-heading">Vaccination Coverage</h1>
      <BarChart width={1000} height={300} data={updatedData} margiin={{top: 5}}>
        <XAxis
          dataKey="vaccineDate"
          tick={{stroke: '#6c757d', strokeWidth: 1}}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{stroke: '#6c757d', strokeWidth: 0}}
        />
        <Legend wrapperStyle={{padding: 0}} />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barsize="18%" />
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barsize="18%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
