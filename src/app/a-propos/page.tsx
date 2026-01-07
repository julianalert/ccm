import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure'

export const metadata: Metadata = {
  title: 'À propos | CCM Crypto',
  description:
    'Découvrez CCM Crypto, votre source fiable pour suivre les cours des crypto-monnaies en temps réel. En savoir plus sur notre mission et notre équipe.',
  keywords: [
    'à propos',
    'ccm crypto',
    'cours crypto',
    'crypto-monnaies',
    'bitcoin',
    'ethereum',
  ],
  alternates: {
    canonical: 'https://courscryptomonnaies.com/a-propos',
  },
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <Container className="py-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">
              À propos de Courscryptomonnaies.com
            </h1>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  Notre Mission
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Courscryptomonnaies.com a pour objectif de rendre l'information sur les crypto-monnaies accessible à tous. 
                  Nous fournissons des données en temps réel sur plus de 2 000 crypto-monnaies, 
                  permettant aux utilisateurs de suivre les cours, analyser les tendances et prendre des décisions éclairées.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Notre plateforme offre des graphiques interactifs, des convertisseurs de prix, 
                  et des informations détaillées sur chaque crypto-monnaie, le tout en français et en euros.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  Nos Données
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Les données de prix et de marché que nous affichons proviennent de sources fiables et sont mises à jour en temps réel. 
                  Nous nous efforçons de garantir l'exactitude des informations, mais nous ne pouvons garantir que toutes les données 
                  sont toujours à jour à 100% en raison de la volatilité du marché des crypto-monnaies.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Les prix affichés sont indicatifs et ne constituent pas une offre d'achat ou de vente. 
                  Pour des transactions réelles, veuillez consulter les plateformes d'échange officielles.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  Avertissement Important
                </h2>
                <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong className="font-semibold">Avertissement :</strong> L'investissement dans les crypto-monnaies comporte des risques. 
                    Les prix peuvent fluctuer considérablement et vous pouvez perdre une partie ou la totalité de votre investissement. 
                    Ne investissez que ce que vous pouvez vous permettre de perdre. 
                    Les informations fournies sur ce site ne constituent pas des conseils financiers personnalisés.
                  </p>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Nous recommandons fortement de faire vos propres recherches (DYOR - Do Your Own Research) 
                  et de consulter un conseiller financier qualifié avant de prendre toute décision d'investissement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  Contact
                </h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Pour toute question, suggestion ou signalement d'erreur, n'hésitez pas à nous contacter via notre 
                  <a 
                    href="https://docs.google.com/forms/d/1VF8q7I2njamJxIwIrQ5Vx5bvJEnN9Of-scHxpIVwZ5g/viewform?edit_requested=true" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {' '}formulaire de contact
                  </a>.
                </p>
                
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  Transparence et Liens d'Affiliation
                </h2>
                <AffiliateDisclosure />
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                  Dernière Mise à Jour
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  Cette page a été mise à jour pour la dernière fois le{' '}
                  {new Intl.DateTimeFormat('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format(new Date())}
                  .
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}

