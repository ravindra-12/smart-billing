export default function Video () {
    return(
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 20px 20px" }}>
        <div style={{
          background: "#fff", borderRadius: 24, padding: 20,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9",
        }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h2 className="rt-section" style={{ fontWeight: 900, color: "#0f172a", margin: "0 0 8px" }}>
              See Smart Billing Lite in Action
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>
              A quick walkthrough of billing, QR collection, receipt printing, udhaar tracking, and daily reports.
            </p>
          </div>
          <div style={{
            background: "#0f172a", borderRadius: 16, padding: 8,
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
          }}>
            <div style={{ aspectRatio: "16/9", borderRadius: 12, overflow: "hidden" }}>
              <iframe
                src="https://www.youtube.com/embed/HIkf0Lt_9io"
                title="Smart Billing Lite Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ width: "100%", height: "100%", border: "none", borderRadius: 12 }}
              />
            </div>
          </div>
        </div>
      </section>
    )
}