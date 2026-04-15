export default function Locations({ locations, onChange, error, locationErrors }) {
    function update(index, field, value) {
      const updated = locations.map((l, i) =>
        i === index ? { ...l, [field]: value } : l
      )
      onChange(updated)
    }
  
    function add() {
      onChange([...locations, {
        id: `LOC-NEW-${Date.now()}`,
        name: '',
        addressLine1: '',
        city: '',
        region: '',
        postalCode: '',
        countryCode: ''
      }])
    }
  
    function remove(index) {
      onChange(locations.filter((_, i) => i !== index))
    }
  
    return (
      <section>
        <h2>Locations</h2>
        {error && <span className="err">{error}</span>}
  
        {locations.map((loc, i) => (
          <div key={loc.id} className="location-row">
            <label>Location name
              <input
                value={loc.name ?? ''}
                onChange={e => update(i, 'name', e.target.value)}
              />
            </label>
  
            <label>Address
              <input
                value={loc.addressLine1 ?? ''}
                onChange={e => update(i, 'addressLine1', e.target.value)}
              />
              {locationErrors[`location_${i}`]?.addressLine1 && (
                <span className="err">{locationErrors[`location_${i}`].addressLine1}</span>
              )}
            </label>
  
            <label>City
              <input
                value={loc.city ?? ''}
                onChange={e => update(i, 'city', e.target.value)}
              />
              {locationErrors[`location_${i}`]?.city && (
                <span className="err">{locationErrors[`location_${i}`].city}</span>
              )}
            </label>
  
            <label>Region / State
              <input
                value={loc.region ?? ''}
                onChange={e => update(i, 'region', e.target.value)}
              />
            </label>
  
            <label>Postal code
              <input
                value={loc.postalCode ?? ''}
                onChange={e => update(i, 'postalCode', e.target.value)}
              />
            </label>
  
            <label>Country code
              <input
                value={loc.countryCode ?? ''}
                onChange={e => update(i, 'countryCode', e.target.value.toUpperCase())}
                placeholder="e.g. US, GB, DE"
                maxLength={2}
              />
              {locationErrors[`location_${i}`]?.countryCode && (
                <span className="err">{locationErrors[`location_${i}`].countryCode}</span>
              )}
            </label>
  
            {locations.length > 1 && (
              <button
                className="remove-btn"
                onClick={() => remove(i)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
  
        <button className="add-btn" onClick={add}>+ Add location</button>
      </section>
    )
  }