import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function WorkshopPage() {
  const { t } = useTranslation(['workshop', 'navigation'])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/codelume-icon.svg" alt={t('navigation:brand')} className="h-8 w-8" />
            <div>
              <div className="text-lg font-black">{t('header.title')}</div>
              <div className="text-xs text-muted-foreground">{t('header.subtitle')}</div>
            </div>
          </div>
          <a
            href="/"
            className="text-sm font-semibold text-accent-purple hover:text-accent-purple/80 gentle-animation"
          >
            {t('header.back')}
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="max-w-5xl mb-10">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">{t('hero.title')}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('hero.subtitle')}</p>
        </div>

        <Tabs defaultValue="market" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card/60">
            <TabsTrigger value="market">{t('tabs.market')}</TabsTrigger>
            <TabsTrigger value="editor">{t('tabs.editor')}</TabsTrigger>
            <TabsTrigger value="publish">{t('tabs.publish')}</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {['a', 'b', 'c'].map((key, index) => (
                <div key={key} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t(`market.items.${index}.badge`)}
                  </div>
                  <div className="mt-3 text-lg font-semibold">{t(`market.items.${index}.title`)}</div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(`market.items.${index}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="editor" className="mt-6">
            <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card/80 to-background p-8">
              <div className="text-sm uppercase tracking-widest text-muted-foreground">{t('editor.badge')}</div>
              <h2 className="mt-3 text-2xl font-black">{t('editor.title')}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{t('editor.description')}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {['tooling', 'timeline', 'preview'].map((key) => (
                  <div key={key} className="rounded-2xl border border-border/60 bg-background/80 p-4">
                    <div className="text-sm font-semibold">{t(`editor.features.${key}.title`)}</div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {t(`editor.features.${key}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="publish" className="mt-6">
            <div className="rounded-3xl border border-border/60 bg-card p-8">
              <div className="text-sm uppercase tracking-widest text-muted-foreground">{t('publish.badge')}</div>
              <h2 className="mt-3 text-2xl font-black">{t('publish.title')}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{t('publish.description')}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['review', 'export', 'share'].map((key) => (
                  <span key={key} className="rounded-full border border-border/60 px-4 py-2 text-xs font-semibold text-muted-foreground">
                    {t(`publish.tags.${key}`)}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
