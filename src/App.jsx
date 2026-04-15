import { useState } from 'react'
import mockData from './data/mock-data.json'
import { validateCompany } from './utils/validation'
import { downloadJson } from './utils/export'
import CompanyProfile from './components/CompanyProfile'
import Directors from './components/Directors'
import Locations from './components/Locations'

export default function App() {
  const [company, setCompany] = useState(mockData.companies[0])
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function updateCompany(updated) {
    if (updated.fundingStage !== 'public') {
      updated.ticker = null
      updated.stockExchange = null
    }
    setCompany(updated)
    if (submitted) {
      setErrors(validateCompany(updated, mockData.naicsReference))
    }
  }

  function handleExport() {
    const errs = validateCompany(company, mockData.naicsReference)
    setErrors(errs)
    setSubmitted(true)
    if (Object.keys(errs).length === 0) {
      downloadJson(company)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>{company.name}</h1>
          {company.fundingStage === 'public' && (
            <span className="meta">{company.ticker} · {company.stockExchange}</span>
          )}
        </div>
        <button onClick={handleExport} className="export-btn">
          Export JSON
        </button>
      </header>

      {submitted && Object.keys(errors).length > 0 && (
        <div className="error-banner">
          Fix {Object.keys(errors).length} error(s) before exporting
        </div>
      )}

      <CompanyProfile
        company={company}
        onChange={updateCompany}
        errors={errors}
        naicsReference={mockData.naicsReference}
      />
      <Directors
        directors={company.directors}
        onChange={dirs => updateCompany({ ...company, directors: dirs })}
        error={errors.directors}
        directorErrors={errors}
      />
      <Locations
        locations={company.locations}
        onChange={locs => updateCompany({ ...company, locations: locs })}
        error={errors.locations}
        locationErrors={errors}
      />
    </div>
  )
}