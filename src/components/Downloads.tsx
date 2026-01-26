'use client'

import { useTranslation } from 'react-i18next'

interface DownloadRow {
  version: string
  date: string
  notes: string
  linkLabel: string
  linkUrl: string
  secondaryLabel?: string
  secondaryUrl?: string
}

export function Downloads() {
  const { t } = useTranslation('downloads')
  const rows = t('table.rows', { returnObjects: true }) as DownloadRow[]

  return (
    <section id="download" className="relative py-24 bg-muted/20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-accent-purple rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-muted-foreground">{t('badge')}</span>
            <div className="w-3 h-3 bg-accent-blue rounded-full animate-pulse" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">{t('title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-card/80">
                <tr className="text-xs uppercase tracking-widest text-muted-foreground">
                  <th className="px-6 py-4">{t('table.headers.version')}</th>
                  <th className="px-6 py-4">{t('table.headers.date')}</th>
                  <th className="px-6 py-4">{t('table.headers.notes')}</th>
                  <th className="px-6 py-4 text-right">{t('table.headers.download')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.version} className="border-t border-border/40">
                    <td className="px-6 py-5 font-semibold text-foreground">{row.version}</td>
                    <td className="px-6 py-5 text-sm text-muted-foreground">{row.date}</td>
                    <td className="px-6 py-5 text-sm text-muted-foreground max-w-sm">{row.notes}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-end gap-2">
                        <a
                          href={row.linkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full bg-accent-purple px-4 py-2 text-xs font-semibold text-white hover:bg-accent-purple/80 gentle-animation"
                        >
                          {row.linkLabel}
                        </a>
                        {row.secondaryLabel && row.secondaryUrl && (
                          <a
                            href={row.secondaryUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                          >
                            {row.secondaryLabel}
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">{t('footnote')}</p>
      </div>
    </section>
  )
}
