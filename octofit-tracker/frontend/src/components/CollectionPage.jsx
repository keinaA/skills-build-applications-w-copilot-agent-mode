function CollectionPage({ title, description, records, isLoading, error, renderRecord }) {
  return (
    <section aria-labelledby="page-title">
      <div className="page-heading mb-4">
        <p className="eyebrow mb-2">OCTOFIT TRACKER</p>
        <h1 className="h2 mb-2" id="page-title">{title}</h1>
        <p className="text-secondary mb-0">{description}</p>
      </div>

      {isLoading && (
        <div className="d-flex align-items-center gap-2 text-secondary" role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          Loading {title.toLowerCase()}…
        </div>
      )}

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {!isLoading && !error && records.length === 0 && (
        <div className="empty-state rounded-4 p-4">
          <h2 className="h5">Nothing here yet</h2>
          <p className="text-secondary mb-0">Records will appear here when they are available.</p>
        </div>
      )}

      {!isLoading && !error && records.length > 0 && (
        <div className="row g-3">
          {records.map((record, index) => (
            <div className="col-12 col-md-6 col-xl-4" key={record._id || record.id || index}>
              <article className="card record-card h-100">
                <div className="card-body">{renderRecord(record)}</div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default CollectionPage
