import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: "🪙 C'est quoi une cryptomonnaie, en vrai ?",
      answer:
        "Une cryptomonnaie, c'est de l'argent 100 % numérique, qui ne dépend ni d'une banque ni d'un État. Elle circule sur Internet, de personne à personne, grâce à une techno appelée blockchain.",
    },
    {
      question: "🔗 La blockchain, c'est quoi ce truc ?",
      answer:
        "Imagine un grand cahier public que tout le monde peut consulter, mais que personne ne peut trafiquer. Chaque transaction y est inscrite, une fois pour toutes. Simple, transparent, et plutôt malin.",
    },
    {
      question: "💸 À quoi ça sert concrètement ?",
      answer:
        "À plein de choses : envoyer de l'argent rapidement, payer des services, investir, créer des apps sans intermédiaire, ou juste… garder de la valeur sur le long terme.",
    },
    {
      question: "📉 Pourquoi les prix font le yoyo ?",
      answer:
        "Parce que le marché est encore jeune et très réactif. Une news, un tweet, une annonce… et ça peut monter ou descendre très vite. Bienvenue dans la crypto 😅",
    },
  ],
  [
    {
      question: "🧠 Faut-il être un génie pour s'y mettre ?",
      answer:
        "Non. Mais comprendre ce qu'on fait, c'est clairement une bonne idée. La crypto récompense souvent la patience plus que la précipitation.",
    },
    {
      question: "⚠️ Est-ce risqué ?",
      answer:
        "Oui. Sans détour. On peut gagner, mais aussi perdre. La règle d'or : n'investis jamais de l'argent que tu ne peux pas te permettre de perdre.",
    },
    {
      question: "🔐 Où sont stockées les cryptos ?",
      answer:
        "Dans des portefeuilles numériques (wallets) : soit sur des plateformes, soit sur ton propre wallet perso (plus de contrôle, plus de responsabilité).",
    },
    {
      question: "🇫🇷 Est-ce légal en France ?",
      answer:
        "Oui. La crypto est autorisée, encadrée… et imposable quand tu fais des gains. Rien d'illégal, tant que tu joues le jeu.",
    },
  ],
  [
    {
      question: "🌍 Il y a vraiment autant de cryptos ?",
      answer:
        "Oui, des milliers. Mais spoiler : toutes ne se valent pas. Certaines ont un vrai projet, d'autres beaucoup moins.",
    },
    {
      question: "📊 Pourquoi suivre les cours sur un site comme celui-ci ?",
      answer:
        "Pour voir clair. Suivre les prix, comprendre les tendances, comparer les projets… Bref, éviter d'investir à l'aveugle.",
    },
    {
      question: "🚀 La crypto, c'est juste une mode ?",
      answer:
        "Peut-être pour certains projets. Mais la technologie derrière est déjà en train de changer la finance et le web. La suite ? On la construit maintenant.",
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src={backgroundImage}
        alt="Fond décoratif pour la section des questions fréquentes"
        aria-hidden="true"
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Questions fréquentes
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Tout ce que vous voulez savoir sur les crypto-monnaies, sans prise de tête.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg/7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
