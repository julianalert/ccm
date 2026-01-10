'use client'

import { useId } from 'react'
import Image, { type ImageProps } from 'next/image'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import screenshotContacts from '@/images/screenshots/contacts.png'
import screenshotInventory from '@/images/screenshots/inventory.png'
import screenshotProfitLoss from '@/images/screenshots/profit-loss.png'
import blockchainImage from '@/images/blockchain.jpeg'

interface Feature {
  name: React.ReactNode
  summary: string
  description: string
  image: ImageProps['src']
  icon: React.ComponentType
}

const features: Array<Feature> = [
  {
    name: 'Reporting',
    summary: 'Stay on top of things with always up-to-date reporting features.',
    description:
      'We talked about reporting in the section above but we needed three items here, so mentioning it one more time for posterity.',
    image: screenshotProfitLoss,
    icon: function ReportingIcon() {
      let id = useId()
      return (
        <>
          <defs>
            <linearGradient
              id={id}
              x1="11.5"
              y1={18}
              x2={36}
              y2="15.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".194" stopColor="#fff" />
              <stop offset={1} stopColor="#6692F1" />
            </linearGradient>
          </defs>
          <path
            d="m30 15-4 5-4-11-4 18-4-11-4 7-4-5"
            stroke={`url(#${id})`}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )
    },
  },
  {
    name: 'Inventory',
    summary:
      'Never lose track of what’s in stock with accurate inventory tracking.',
    description:
      'We don’t offer this as part of our software but that statement is inarguably true. Accurate inventory tracking would help you for sure.',
    image: screenshotInventory,
    icon: function InventoryIcon() {
      return (
        <>
          <path
            opacity=".5"
            d="M8 17a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
            fill="#fff"
          />
          <path
            opacity=".3"
            d="M8 24a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
            fill="#fff"
          />
          <path
            d="M8 10a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z"
            fill="#fff"
          />
        </>
      )
    },
  },
  {
    name: 'Contacts',
    summary:
      'Organize all of your contacts, service providers, and invoices in one place.',
    description:
      'This also isn’t actually a feature, it’s just some friendly advice. We definitely recommend that you do this, you’ll feel really organized and professional.',
    image: screenshotContacts,
    icon: function ContactsIcon() {
      return (
        <>
          <path
            opacity=".5"
            d="M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z"
            fill="#fff"
          />
          <path
            d="M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z"
            fill="#fff"
          />
        </>
      )
    },
  },
]

function Feature({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  feature: Feature
  isActive: boolean
}) {
  return (
    <div
      className={clsx(className, !isActive && 'opacity-75 hover:opacity-100')}
      {...props}
    >
      <div
        className={clsx(
          'w-9 rounded-lg',
          isActive ? 'bg-blue-600' : 'bg-slate-500',
        )}
      >
        <svg aria-hidden="true" className="h-9 w-9" fill="none">
          <feature.icon />
        </svg>
      </div>
      <h3
        className={clsx(
          'mt-6 text-sm font-medium',
          isActive ? 'text-blue-600' : 'text-slate-600',
        )}
      >
        {feature.name}
      </h3>
      <p className="mt-2 font-display text-xl text-slate-900">
        {feature.summary}
      </p>
      <p className="mt-4 text-sm text-slate-600">{feature.description}</p>
    </div>
  )
}

function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.summary}>
          <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 top-8 bottom-0 bg-slate-200 sm:-inset-x-6" />
            <div className="relative mx-auto w-211 overflow-hidden rounded-xl bg-white shadow-lg ring-1 shadow-slate-900/5 ring-slate-500/10">
              <Image
                className="w-full"
                src={feature.image}
                alt={`Illustration de la fonctionnalité ${feature.name}`}
                sizes="52.75rem"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FeaturesDesktop() {
  return (
    <TabGroup className="hidden lg:mt-20 lg:block">
      {({ selectedIndex }) => (
        <>
          <TabList className="grid grid-cols-3 gap-x-8">
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.summary}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="data-selected:not-data-focus:outline-hidden">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </TabList>
          <TabPanels className="relative mt-20 overflow-hidden rounded-4xl bg-slate-200 px-14 py-16 xl:px-16">
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <TabPanel
                  static
                  key={feature.summary}
                  className={clsx(
                    'px-5 transition duration-500 ease-in-out data-selected:not-data-focus:outline-hidden',
                    featureIndex !== selectedIndex && 'opacity-60',
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="w-211 overflow-hidden rounded-xl bg-white shadow-lg ring-1 shadow-slate-900/5 ring-slate-500/10">
                    <Image
                      className="w-full"
                      src={feature.image}
                      alt={`Illustration de la fonctionnalité ${feature.name}`}
                      sizes="52.75rem"
                    />
                  </div>
                </TabPanel>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-slate-900/10 ring-inset" />
          </TabPanels>
        </>
      )}
    </TabGroup>
  )
}

export function SecondaryFeatures() {
  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="pt-20 pb-14 sm:pt-32 sm:pb-20 lg:pb-32"
    >
      <Container>
        <div className="w-full text-left">
          <h2 className="mt-4 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Introduction
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            On ne va pas se mentir, les cryptos ont bien changé depuis 2020. Ce qui était vu comme un truc de geeks ou un casino en ligne est devenu... bah, un peu des deux en fait, mais aussi beaucoup plus.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Quand Satoshi Nakamoto a sorti Bitcoin en 2009, l'idée était assez dingue : créer de l'argent numérique qui ne dépend d'aucune banque, d'aucun gouvernement. Juste un réseau où tout le monde vérifie les transactions des autres.
          </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
            Le truc génial, c'est la blockchain. En gros, c'est un grand livre de comptes public où tout est inscrit et que personne ne peut trafiquer. Quand vous envoyez des bitcoins à quelqu'un, le réseau entier vérifie que vous les avez bien et que vous ne les avez pas déjà dépensés ailleurs. Pas besoin de banque au milieu.
          </p>

          <h2 className="mt-12 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Les cryptos, c'est plus seulement pour payer
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Ethereum a tout changé en introduisant les smart contracts. C'est quoi ? Des petits programmes qui tournent tout seuls sur la blockchain. Genre : "Si cette condition est remplie, alors fais ça automatiquement".
          </p>
          <div className="mt-8 flex justify-center">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-lg ring-1 shadow-slate-900/5 ring-slate-500/10">
              <Image
                src={blockchainImage}
                alt="Illustration de la technologie blockchain"
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </div>
          <p className="mt-6 text-lg tracking-tight text-slate-700">
            Ça a ouvert la porte à plein de trucs : la DeFi (finance décentralisée, des services financiers sans banque), les NFTs (on vous épargne le débat), des organisations autonomes décentralisées... Bref, maintenant y'a des cryptos pour à peu près tout.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Bitcoin reste principalement une réserve de valeur (certains disent "l'or numérique", d'autres rigolent). D'autres comme XRP ou Stellar sont faites pour les paiements rapides entre pays. Solana, Cardano et compagnie ont leurs propres écosystèmes d'applications. Chacune a son délire.
          </p>

          <h2 className="mt-12 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Pourquoi ça monte, pourquoi ça descend
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Les cryptos restent hyper volatiles. Un jour tout est vert, le lendemain tout est rouge. Qu'est-ce qui explique ça ?
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            <strong>L'adoption institutionnelle</strong> : Quand BlackRock lance un ETF Bitcoin ou qu'une grosse boîte met du BTC dans son bilan, ça fait bouger les lignes. On est loin de l'époque où c'était juste des particuliers sur des forums.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            <strong>Les mises à jour techniques</strong> : Une grosse update qui améliore les performances d'un réseau, ça peut faire exploser le prix. Un bug ou un hack, et c'est la chute libre.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            <strong>La régulation</strong> : Les gouvernements adorent annoncer des trucs sur les cryptos. Les USA approuvent un ETF ? Ça monte. La Chine interdit le mining (encore) ? Ça baisse. L'Union européenne sort une nouvelle loi ? Ça dépend.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            <strong>L'offre et la demande, tout bêtement</strong> : Bitcoin n'en créera jamais plus de 21 millions. D'autres cryptos brûlent régulièrement des tokens pour réduire l'offre. Ça joue forcément sur les prix.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            <strong>Les cycles de marché</strong> : Les cryptos suivent des cycles assez prévisibles liés au "halving" de Bitcoin (tous les 4 ans environ). Marché haussier, euphorie, krach, hiver crypto, et ça recommence.
          </p>

          <h2 className="mt-12 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Comment choisir dans ce bordel ?
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Y'a genre 20 000 cryptos qui existent. La plupart ne valent rien ou sont des arnaques pures et simples. Quelques centaines ont un vrai projet derrière. Et peut-être une dizaine qui vont vraiment compter sur le long terme.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Comment faire le tri ? Faut se poser les bonnes questions :
          </p>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-lg tracking-tight text-slate-700">
            <li><strong>L'équipe</strong> : Qui développe le projet ? Ils sont connus ? Ils ont déjà fait leurs preuves ailleurs ?</li>
            <li><strong>L'utilité réelle</strong> : Le projet résout un vrai problème ou c'est juste du marketing ?</li>
            <li><strong>L'activité du réseau</strong> : Y'a des transactions ? Des développeurs actifs ? Une vraie communauté ?</li>
            <li><strong>Les partenariats</strong> : Des boîtes sérieuses bossent avec eux ?</li>
            <li><strong>La tokenomics</strong> : Comment les tokens sont distribués ? Y'a pas 50% qui appartiennent aux fondateurs ?</li>
          </ul>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Regardez aussi la capitalisation de marché (la "taille" du projet), le volume d'échange (la liquidité), l'historique des prix. Mais attention, un coin qui a fait x100 l'année dernière ne fera pas forcément x100 cette année. C'est même plutôt l'inverse.
          </p>

          <h2 className="mt-12 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            On en est où aujourd'hui ?
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Les cryptos ne vont pas disparaître. Trop d'argent, trop d'infrastructures, trop d'innovation. Par contre, le Far West des débuts, c'est terminé. La régulation arrive de partout (pas toujours mal d'ailleurs), les acteurs institutionnels s'installent, les projets foireux se font défoncer plus vite.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Les défis restent énormes : l'expérience utilisateur est encore trop compliquée pour Monsieur Tout-le-Monde, les frais de transaction peuvent être délirants sur certains réseaux, la consommation d'énergie (même si ça s'améliore), et la régulation qui peut arriver n'importe comment.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Mais bon, y'a aussi des vrais cas d'usage qui émergent. Les paiements transfrontaliers qui coûtent moins cher et sont plus rapides. La possibilité de prêter ou emprunter sans passer par une banque. Des systèmes de vote transparents. Du stockage décentralisé. C'est pas juste de la spéculation.
          </p>

          <h2 className="mt-12 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Notre rôle dans tout ça
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Ce site, c'est votre tableau de bord. Vous voulez suivre les prix en temps réel ? C'est là. Voir les variations sur la journée, la semaine, le mois ? Check. Comparer les cryptos entre elles ? On a ce qu'il faut.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            On ne vous dira jamais "achetez ça" ou "vendez ci". C'est pas notre job et franchement, ceux qui le font sont soit des idiots, soit des escrocs. On vous donne les infos, vous faites vos propres choix.
          </p>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Bienvenue dans le monde des cryptos. C'est passionnant, c'est risqué, c'est en constante évolution. Restez informés, restez prudents, et surtout : n'investissez jamais plus que ce que vous pouvez vous permettre de perdre.
          </p>
        </div>
      </Container>
    </section>
  )
}
