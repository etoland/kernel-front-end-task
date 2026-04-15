export function downloadJson(company) {
    const data = { ...company }
  
    // if not public, remove ticker and stockExchange from the export
    if (data.fundingStage !== 'public') {
      delete data.ticker
      delete data.stockExchange
    }
  
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: 'application/json' }
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${data.name.replace(/\s+/g, '-').toLowerCase()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }