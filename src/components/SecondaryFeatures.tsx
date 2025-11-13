'use client'

import { useId } from 'react'
import Image, { type ImageProps } from 'next/image'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import screenshotContacts from '@/images/screenshots/contacts.png'
import screenshotInventory from '@/images/screenshots/inventory.png'
import screenshotProfitLoss from '@/images/screenshots/profit-loss.png'

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
                alt=""
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
                      alt=""
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
        <p className="mt-4 text-lg tracking-tight text-slate-700">
        Bitcoin, Ethereum, blockchain, ICOs, plateformes d'échange. Comme vous avez pu le remarquer, les crypto-monnaies ont envahi l'espace public ces dernières années. Dans les médias, les forums, les conversations à Noël. Elles sont partout. L’utilisation d’un vocabulaire nouveau perd la plupart des nouveaux arrivants.

À l’origine connues pour leur réputation sulfureuse (car soit disant utilisées par les criminels et les blanchisseurs d’argent), les crypto-monnaies ont depuis fait un long chemin, que ce soit d'un point de vue popularité ou évolution de la technologie. De nouvelles applications qui utilisent la blockchain sont créées tous les jours, dans de nombreux secteurs : finance mais aussi santé, média, assurance, technologie, etc...

Pour beaucoup, les crypto-monnaies représentent la démocratisation de la finance. Elles sont l'innovation de la fintech qui amènera de réelles avancées, à partir d'une technologie révolutionnaire qui vient remettre en question l'ordre politique, économique et social.


          </p>
          <h2 className="mt-12 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
          Qu'est-ce qu'une crypto-monnaie et pour quel usage ?
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
          Les crypto-monnaies sont des actifs digitaux qui utilisent la cryptographie, une technique d'encryption, pour garantir leur sécurité. Elles sont à l'origine vouées à être utilisées pour acheter et vendre des biens et des services, bien que de plus en plus de crypto-monnaies présentent une valeur technologique aujourd'hui. Elles ne dépendent d'aucune autorité centrale, à l'inverse des monnaies traditionnelles comme l'euro, le dollar et les autres.

Peu de gens le savent, mais les cryptos ont émergé en tant que projet parallèle à un autre projet plus important. Satoshi Nakamoto, l'inventeur du Bitcoin, n'a jamais voulu créé une monnaie en premier lieu. Il souhaitait avant toute chose créer un système de cash digital de pair à pair. Dans un écrit sur SourceForge, il annonçait en 2009 : "Voici le premier jet sur le Bitcoin, un nouveau système de paiement électronique qui utilise un réseau de pair à pair. C'est entièrement décentralisé, et ne repose sur aucun serveur ou autorité centrale".


          </p>

          <h2 className="mt-12 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
          Les facteurs qui jouent sur le cours des crypto-monnaies
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
          Comme nous l'avons mentionné ci-dessus, les crypto-monnaies sont décentralisées, elles ne sont donc pas contrôlées - et ne peuvent pas être manipulées - par un gouvernement ou une banque centrale spécifique. Cela signifie également que de nombreux facteurs qui influent sur le prix des devises traditionnelles - un changement de politique d'une banque centrale, des données économiques ou une catastrophe naturelle - sont peu susceptibles d'avoir un impact direct sur le prix des crypto-monnaies.

Quels facteurs pourraient affecter le prix des crypto-monnaies? Comme toujours, l'offre et la demande sont les principaux moteurs du marché, mais voici quelques exemples plus détaillés…

Popularité ou popularité perçue : c'est encore aujourd'hui le facteur de volatilité principal.
Actualités sur un «fork» ou un problème technique : souvent, un fork ou un problème technique met une crypto sur le devant de la scène, elle occupe l'espace médiatique, ce qui lui donne de la visibilité et donc une hausse ou baisse de la demande en fonction de l'actualité (positive ou négative).
Niveau de confiance : bien sûr, comme pour toute monnaie, la confiance accordée à celle-ci par les individus est importante. Plus il y a de confiance, plus il y a de demande.
Déclarations des décideurs : le projet est-il en bonne santé ? Progresse-t-il comme il se doit ? Quelle communication de la part des fondateurs ?
Attendez ... nous venons de dire que les gouvernements ne peuvent pas contrôler le prix des crypto-monnaies, alors pourquoi les mentionnons-nous parmi les facteurs susceptibles d'influencer? Eh bien, un gouvernement majeur a toujours le pouvoir, même s'il est juste dans sa capacité à prendre des décisions concernant la légalité d'un instrument spécifique.

Par exemple, le 4 septembre 2017, la Chine a décidé que toutes les ICO (offres initiales de pièces) étaient illégales et a fait des commentaires indiquant qu'elle pourrait sévir contre le commerce de crypto-monnaie dans le pays. Compte tenu de la taille et de l'influence de la superpuissance asiatique, le marché a réagi et dans les jours qui ont suivi, le prix du Bitcoin a baissé.


          </p>
          <h2 className="mt-12 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
          Sur quelles crypto-monnaies prometteuses investir en 2020 ?
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
          Une question qui nous revient souvent est celle-ci : sur quelle crypto-monnaie je dois investir ? Ici, vous ne trouverez aucun conseil pour investir. Notre mission n'est pas de vous inciter à suivre aveuglément ce qu'un individu que vous ne connaissez pas et qui n'est pas plus informé que vous vous conseille de faire. On sait, c'est décevant.

Mais on préfère faire beaucoup mieux : à savoir vous donner toutes les clefs pour effectuer votre propre réflexion et votre propre analyse.

De cette manière, vous serez capable d'analyser chaque crypto-monnaie par vous-même, et de créer votre propre liste des 10 crypto-monnaies les plus prometteurs pour investir en 2020.

Prendre une décision de manière informée, qui vous appartient, et qui est le résultat de vos connaissances et de votre analyse, voilà ce qu'on attend de vous.

Nous avons construit ce site web pour vous. Il est votre outil pour mieux appréhender, comprendre et analyser les crypto-monnaies. Nous avons donc sorti le maximum d'outils pour vous aider dans votre démarche.

Vous pouvez bien sûr suivre le cours de l'ensemble des crypto-monnaies, l'actualité quotidienne et récente de vos crypto-monnaies préférées et de l'ensemble du marché, de la blockchain, et autres. Et enfin, un calendrier tenu à jour afin de rester informé des événements importants à venir.



          </p>
        </div>
      </Container>
    </section>
  )
}
