export default function CompanyProfile({ company, onChange, errors, naicsReference }) {
    const selectedSector = naicsReference.find(n => n.vertical === company.vertical)
    const subVerticals = selectedSector?.subVerticals ?? []
  
    function set(field, value) {
      onChange({ ...company, [field]: value })
    }
  
    return (
      <section>
        <h2>Company profile</h2>
  
        <label>Name
          <input
            value={company.name ?? ''}
            onChange={e => set('name', e.target.value)}
          />
          {errors.name && <span className="err">{errors.name}</span>}
        </label>
  
        <label>Legal name
          <input
            value={company.legalName ?? ''}
            onChange={e => set('legalName', e.target.value)}
          />
          {errors.legalName && <span className="err">{errors.legalName}</span>}
        </label>
  
        <label>Description
          <textarea
            value={company.description ?? ''}
            onChange={e => set('description', e.target.value)}
          />
        </label>
  
        <label>Website
          <input
            value={company.websiteUrl ?? ''}
            onChange={e => set('websiteUrl', e.target.value)}
            placeholder="https://example.com"
          />
          {errors.websiteUrl && <span className="err">{errors.websiteUrl}</span>}
        </label>
  
        <label>Status
          <select
            value={company.companyStatus ?? ''}
            onChange={e => set('companyStatus', e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="acquired">Acquired</option>
            <option value="dissolved">Dissolved</option>
          </select>
        </label>
  
        <label>Entity type
          <input
            value={company.entityType ?? ''}
            onChange={e => set('entityType', e.target.value)}
          />
        </label>
  
        <label>Annual revenue (USD)
          <input
            type="number"
            value={company.annualRevenueUsd ?? ''}
            onChange={e => set('annualRevenueUsd', Number(e.target.value))}
          />
        </label>
  
        <label>Funding stage
          <select
            value={company.fundingStage ?? ''}
            onChange={e => set('fundingStage', e.target.value)}
          >
            <option value="">Select stage</option>
            <option value="pre-seed">Pre-seed</option>
            <option value="seed">Seed</option>
            <option value="series-a">Series A</option>
            <option value="series-b">Series B</option>
            <option value="series-c">Series C</option>
            <option value="series-d">Series D</option>
            <option value="series-e">Series E</option>
            <option value="public">Public</option>
          </select>
        </label>
  
        <label>Vertical
          <select
            value={company.vertical ?? ''}
            onChange={e => onChange({ ...company, vertical: e.target.value, subVertical: '' })}
          >
            <option value="">Select sector</option>
            {naicsReference.map(n => (
              <option key={n.vertical} value={n.vertical}>{n.vertical}</option>
            ))}
          </select>
          {errors.vertical && <span className="err">{errors.vertical}</span>}
        </label>
  
        <label>Sub-vertical
          <select
            value={company.subVertical ?? ''}
            onChange={e => set('subVertical', e.target.value)}
            disabled={!company.vertical}
          >
            <option value="">Select sub-vertical</option>
            {subVerticals.map(sv => (
              <option key={sv} value={sv}>{sv}</option>
            ))}
          </select>
          {errors.subVertical && <span className="err">{errors.subVertical}</span>}
        </label>
  
        {company.fundingStage === 'public' && (
          <>
            <label>Ticker
              <input
                value={company.ticker ?? ''}
                onChange={e => set('ticker', e.target.value)}
              />
              {errors.ticker && <span className="err">{errors.ticker}</span>}
            </label>
  
            <label>Stock exchange
              <input
                value={company.stockExchange ?? ''}
                onChange={e => set('stockExchange', e.target.value)}
              />
              {errors.stockExchange && <span className="err">{errors.stockExchange}</span>}
            </label>
          </>
        )}
      </section>
    )
  }