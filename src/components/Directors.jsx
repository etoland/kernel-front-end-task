export default function Directors({ directors, onChange, error, directorErrors }) {
    function update(index, field, value) {
      const updated = directors.map((d, i) =>
        i === index ? { ...d, [field]: value } : d
      )
      onChange(updated)
    }
  
    function add() {
      onChange([...directors, {
        id: `DIR-NEW-${Date.now()}`,
        name: '',
        email: '',
        phone: ''
      }])
    }
  
    function remove(index) {
      onChange(directors.filter((_, i) => i !== index))
    }
  
    return (
      <section>
        <h2>Directors</h2>
        {error && <span className="err">{error}</span>}
  
        {directors.map((dir, i) => (
          <div key={dir.id} className="director-row">
            <label>Name
              <input
                value={dir.name ?? ''}
                onChange={e => update(i, 'name', e.target.value)}
              />
              {directorErrors[`director_${i}`]?.name && (
                <span className="err">{directorErrors[`director_${i}`].name}</span>
              )}
            </label>
  
            <label>Email
              <input
                value={dir.email ?? ''}
                onChange={e => update(i, 'email', e.target.value)}
              />
              {directorErrors[`director_${i}`]?.email && (
                <span className="err">{directorErrors[`director_${i}`].email}</span>
              )}
            </label>
  
            <label>Phone
              <input
                value={dir.phone ?? ''}
                onChange={e => update(i, 'phone', e.target.value)}
              />
            </label>
  
            {directors.length > 1 && (
              <button
                className="remove-btn"
                onClick={() => remove(i)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
  
        <button className="add-btn" onClick={add}>+ Add director</button>
      </section>
    )
  }