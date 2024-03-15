// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

class CowinDashboard extends Component {
  state = {vaccinationObject: {}, isLoading: true}

  componentDidMount() {
    this.getVaccinationList()
  }

  getVaccinationList = async () => {
    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }

      this.setState({vaccinationObject: updatedData, isLoading: false})
    } else {
      this.setState({vaccinationObject: undefined, isLoading: false})
    }
  }

  renderVaccinationChart = () => {
    const {vaccinationObject} = this.state
    const {last7DaysVaccination, vaccinationByGender, vaccinationByAge} =
      vaccinationObject
    if (vaccinationObject === undefined) {
      return (
        <div className="failure-card">
          <img
            className="failure-img"
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
          />
          <h1 className="failure-heading">Something went wrong</h1>
        </div>
      )
    }

    return (
      <div>
        <VaccinationCoverage data={last7DaysVaccination} />
        <VaccinationByGender data={vaccinationByGender} />
        <VaccinationByAge data={vaccinationByAge} />
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <div className="cowin-container">
          <div className="cowin-logo-card">
            <img
              className="cowin-logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <p className="cowin-logo-heading">Co-WIN</p>
          </div>
          <h1 className="main-heading">CoWIN Vaccination in India</h1>
          {isLoading ? this.renderLoader() : this.renderVaccinationChart()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
