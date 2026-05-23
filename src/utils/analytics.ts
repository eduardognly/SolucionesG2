// ─── IDs que debes reemplazar ────────────────────────────────────────────────
//
// GA4_ID → Google Analytics > Admin > Flujos de datos > tu sitio > ID de medición
//           Formato: G-XXXXXXXXXX
//
// AW_ID → Google Ads > Objetivos > Conversiones > [crea una acción] > Configurar etiqueta
//          Formato: AW-XXXXXXXXXX
//
// AW_LABEL_WHATSAPP y AW_LABEL_FORM → aparecen en el mismo paso, después del AW_ID
//          Formato: XXXXXXXXXXXX (12 caracteres alfanuméricos)
//
// Si aún no tienes Google Ads, deja AW_ID vacío — GA4 seguirá funcionando.
// ─────────────────────────────────────────────────────────────────────────────

const GA4_ID = 'G-XXXXXXXXXX'
const AW_ID = 'AW-XXXXXXXXXX'
const AW_LABEL_WHATSAPP = 'XXXXXXXXXXXX'
const AW_LABEL_FORM = 'XXXXXXXXXXXX'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag(...args)
}

export function trackWhatsApp(etiqueta: string) {
  gtag('event', 'whatsapp_click', {
    event_category: 'conversion',
    event_label: etiqueta,
  })

  if (AW_ID && !AW_ID.includes('X') && AW_LABEL_WHATSAPP && !AW_LABEL_WHATSAPP.includes('X')) {
    gtag('event', 'conversion', {
      send_to: `${AW_ID}/${AW_LABEL_WHATSAPP}`,
    })
  }
}

export function trackFormulario(etiqueta: string) {
  gtag('event', 'generate_lead', {
    event_category: 'conversion',
    event_label: etiqueta,
  })

  if (AW_ID && !AW_ID.includes('X') && AW_LABEL_FORM && !AW_LABEL_FORM.includes('X')) {
    gtag('event', 'conversion', {
      send_to: `${AW_ID}/${AW_LABEL_FORM}`,
    })
  }
}

export { GA4_ID, AW_ID }
