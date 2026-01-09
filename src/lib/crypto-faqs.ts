import { CryptoFaqContent } from '@/types/crypto-content'

// FAQ content stored in codebase
export const cryptoFaqs: Record<string, CryptoFaqContent> = {
  bitcoin: {
    slug: 'bitcoin',
    title: 'Questions fréquentes sur Bitcoin',
    description: 'Tout ce que vous voulez vraiment savoir sur Bitcoin en 2026.',
    faqs: [
      [
        {
          question: 'C\'est quoi Bitcoin exactement ?',
          answer: 'Bitcoin (BTC), c\'est la toute première crypto-monnaie. Créée en 2009 par un mystérieux Satoshi Nakamoto, c\'est de l\'argent 100% numérique qui ne dépend d\'aucune banque ni d\'aucun gouvernement. Les transactions se font directement entre utilisateurs (peer-to-peer) grâce à la blockchain, un registre public vérifié par des milliers d\'ordinateurs dans le monde. En gros : de l\'argent qu\'on peut envoyer partout dans le monde sans demander la permission à personne.',
        },
        {
          question: 'Comment ça fonctionne concrètement ?',
          answer: 'Bitcoin utilise la blockchain, une chaîne de blocs contenant toutes les transactions depuis 2009. Quand vous envoyez des BTC à quelqu\'un, les "mineurs" (des ordinateurs ultra-puissants) vérifient que vous possédez bien ces bitcoins et les inscrivent dans un nouveau bloc. Une fois validé, impossible de modifier ou d\'annuler la transaction. C\'est sécurisé par de la cryptographie complexe et personne ne contrôle le réseau - c\'est ça qui rend Bitcoin unique.',
        },
        {
          question: 'Combien de Bitcoins existent-ils ?',
          answer: 'Maximum 21 millions, pas un de plus. C\'est inscrit dans le code depuis le début. Actuellement (début 2026), environ 19,6 millions ont déjà été minés. Il en reste donc moins de 1,5 million à créer d\'ici 2140 environ. Cette rareté programmée, c\'est ce qui fait dire à beaucoup que Bitcoin est une réserve de valeur, un peu comme l\'or numérique. Contrairement aux euros ou dollars qu\'on peut imprimer à volonté, Bitcoin a une politique monétaire stricte et immuable.',
        },
        {
          question: 'Comment acheter du Bitcoin en 2026 ?',
          answer: 'Plusieurs options : Les plateformes d\'échange (Coinbase, Binance, Kraken) : le plus simple, vous créez un compte, vérifiez votre identité et achetez avec votre carte ou virement. Les ETF Bitcoin : depuis 2024, vous pouvez acheter des ETF Bitcoin via votre compte-titres classique (BlackRock, Fidelity...) sans vous embêter avec les wallets. Le P2P : directement entre particuliers, plus anonyme mais plus risqué. Attention aux frais qui varient énormément selon les plateformes.',
        },
        {
          question: 'Où stocker mes Bitcoins en sécurité ?',
          answer: 'Règle d\'or : "Not your keys, not your coins". Si vous ne contrôlez pas vos clés privées, vous ne possédez pas vraiment vos bitcoins. Les hot wallets (connectés à internet) : pratiques pour les petits montants du quotidien. Applications mobiles, extensions de navigateur. Plus faciles mais moins sécurisés. Les cold wallets (déconnectés d\'internet) : pour les gros montants. Hardware wallets type Ledger ou Trezor. Beaucoup plus sécurisés mais moins pratiques. Si vous laissez vos BTC sur une plateforme d\'échange, c\'est eux qui ont les clés. Ils peuvent geler votre compte, se faire hacker, faire faillite (souvenez-vous de FTX).',
        },
      ],
      [
        {
          question: 'C\'est quoi le Lightning Network ?',
          answer: 'Le gros problème de Bitcoin, c\'est qu\'il ne peut traiter que 7 transactions par seconde (Visa en fait 65 000). Le Lightning Network, c\'est une surcouche qui permet des paiements quasi instantanés et avec des frais ridicules. Vous ouvrez un canal, faites autant de transactions que vous voulez, puis le fermez. Seules l\'ouverture et la fermeture sont inscrites sur la blockchain principale. Depuis 2023-2024, l\'adoption explose, surtout dans les pays qui utilisent Bitcoin pour les paiements quotidiens.',
        },
        {
          question: 'Pourquoi Bitcoin est si volatile ?',
          answer: 'Bitcoin, c\'est le grand huit émotionnel. Ça peut monter de 20% en une semaine et descendre de 30% la suivante. Plusieurs raisons : marché encore relativement petit (face aux actions ou à l\'or), beaucoup de spéculation et de trading à effet de levier, sensible aux annonces réglementaires et aux news macro, cycles psychologiques de peur et de cupidité très marqués. Fait intéressant : la volatilité diminue avec le temps. En 2021, elle était à 66% annualisée. En 2025, elle est descendue à 36%, son plus bas historique. Bitcoin mature progressivement.',
        },
        {
          question: 'C\'est quoi les cycles Bitcoin et le halving ?',
          answer: 'Historiquement, Bitcoin suit un cycle de 4 ans lié au "halving" - un événement où la récompense des mineurs est divisée par deux. Le dernier a eu lieu en avril 2024 (récompense passée de 6,25 à 3,125 BTC par bloc). Le schéma classique : halving → 12-18 mois plus tard, gros bull run → sommet → krach → marché baissier de 1-2 ans → nouveau halving. Ça a marché en 2012-2013, 2016-2017, 2020-2021. Mais attention : chaque cycle est différent et de plus en plus de gens pensent que ce modèle est mort. Avec l\'arrivée des institutions et des ETF, Bitcoin suit de plus en plus les cycles macroéconomiques globaux que son propre cycle interne.',
        },
        {
          question: 'Faut-il investir dans Bitcoin ?',
          answer: 'On ne vous dira jamais quoi faire. Vraiment. Mais voilà ce qu\'on peut dire : N\'investissez QUE ce que vous pouvez vous permettre de perdre totalement. La volatilité reste brutale même si elle diminue. Pensez long terme (5-10 ans minimum). Diversifiez, ne mettez pas tous vos œufs dans le même panier. Formez-vous avant d\'investir. Les red flags : les gourous qui promettent "BTC à 1 million en 2027" → fuyez. Ceux qui vous disent d\'emprunter pour acheter du BTC → fuyez. Les promesses de gains rapides et garantis → arnaque. Bitcoin peut monter à 200 000$ comme redescendre à 50 000$. Personne ne sait.',
        },
        {
          question: 'Bitcoin est-il légal ?',
          answer: 'Ça dépend où vous êtes. Dans la plupart des pays développés (Europe, USA, Canada, Japon...), c\'est totalement légal. Vous pouvez acheter, vendre, détenir du BTC sans problème. Quelques pays l\'ont interdit ou fortement restreint (Chine, Bangladesh, certains pays du Moyen-Orient et d\'Afrique). D\'autres comme El Salvador en ont même fait une monnaie légale. En 2026, la tendance est clairement à la régulation plutôt qu\'à l\'interdiction. Les gouvernements veulent contrôler et taxer, pas forcément bannir. Aux USA, le CLARITY Act en discussion devrait donner un cadre légal clair. L\'UE a son règlement MiCA depuis 2024.',
        },
      ],
      [
        {
          question: 'Bitcoin est-il vraiment anonyme ?',
          answer: 'Non, Bitcoin est pseudo-anonyme, pas anonyme. Nuance importante. Toutes les transactions sont publiques sur la blockchain. N\'importe qui peut voir qu\'une adresse A a envoyé X bitcoins à une adresse B. Par contre, les adresses ne sont que des suites de chiffres et de lettres - rien ne dit qui se cache derrière. Mais dans les faits, avec un peu de travail d\'analyse, on peut souvent retracer l\'origine des transactions, surtout si elles passent par des plateformes d\'échange qui demandent une pièce d\'identité (obligations KYC). Bitcoin n\'est pas l\'outil rêvé des criminels que les médias décrivent. Les forces de l\'ordre ont des outils d\'analyse de blockchain très performants maintenant.',
        },
        {
          question: 'Quels sont les vrais risques ?',
          answer: 'Soyons honnêtes : Risque de prix : Bitcoin reste volatile. Vous pouvez perdre 30-50% de votre investissement en quelques semaines. Risque de sécurité : si vous perdez vos clés privées, vos bitcoins sont perdus pour toujours. Si vous vous faites hacker, idem. Pas de service client pour récupérer vos fonds. Risque réglementaire : un gouvernement majeur pourrait durcir drastiquement la régulation (interdiction, taxation très forte...). Risque technologique : un bug critique dans le code (peu probable après 17 ans), une avancée en informatique quantique qui casserait la cryptographie (pas pour demain). Risque de plateforme : si vous stockez sur un exchange qui fait faillite ou se fait hacker, vous pouvez tout perdre.',
        },
        {
          question: 'C\'est quoi la différence entre Bitcoin et les autres cryptos ?',
          answer: 'Bitcoin a été le premier et reste le plus gros par capitalisation. Sa philosophie : être une réserve de valeur et un moyen de paiement décentralisé. Point barre. Ethereum permet les smart contracts et tout un écosystème d\'applications. Solana mise sur la vitesse. Cardano sur la recherche académique. Chaque crypto a sa sauce. Bitcoin, c\'est le plus simple conceptuellement, le plus sécurisé (jamais hacké en 17 ans), le plus décentralisé. Il fait une chose et la fait bien. Certains disent que c\'est dépassé technologiquement. D\'autres que c\'est justement sa force - la simplicité et la sécurité avant tout. C\'est pour ça qu\'on l\'appelle "l\'or numérique" ou "l\'argent de réserve" des cryptos.',
        },
        {
          question: 'Les gouvernements peuvent-ils arrêter Bitcoin ?',
          answer: 'En théorie, non. Bitcoin est décentralisé sur des milliers de nœuds dans le monde entier. Pour le tuer complètement, il faudrait éteindre internet ou coordonner une interdiction mondiale (bonne chance avec ça). Par contre, un gouvernement peut : interdire les plateformes d\'échange sur son territoire (ça complique l\'achat/vente), interdire aux entreprises et commerces d\'accepter Bitcoin, taxer très lourdement les gains, poursuivre les utilisateurs. La Chine a essayé plusieurs fois d\'interdire Bitcoin. Résultat ? Le mining s\'est déplacé ailleurs, les Chinois continuent de trader via VPN et plateformes offshore. Bitcoin continue.',
        },
        {
          question: 'Les banques centrales vont créer leurs propres cryptos, Bitcoin est mort ?',
          answer: 'Les CBDC (monnaies numériques de banque centrale) arrivent effectivement. L\'euro numérique est en préparation, la Chine a déjà son yuan numérique, plein de pays testent. Mais les CBDC, c\'est l\'opposé total de Bitcoin : Centralisé (contrôlé par la banque centrale) vs décentralisé. Traçable à 100% (surveillance totale) vs pseudo-anonyme. Politique monétaire flexible (ils peuvent en créer autant qu\'ils veulent) vs offre fixe. Censurable (ils peuvent geler vos fonds) vs résistant à la censure. Les CBDC sont des euros ou dollars numériques améliorés. C\'est pas un concurrent de Bitcoin, c\'est un outil de contrôle gouvernemental. Si jamais vous vous demandez pourquoi Bitcoin existe, attendez de voir les CBDC en action.',
        },
      ],
    ],
  },
  ethereum: {
    slug: 'ethereum',
    title: 'Questions fréquentes sur Ethereum',
    description: 'Découvrez tout ce que vous devez savoir sur Ethereum, la plateforme blockchain pour contrats intelligents.',
    faqs: [
      [
        {
          question: 'Qu\'est-ce qu\'Ethereum ?',
          answer: 'Ethereum est une plateforme blockchain décentralisée qui permet d\'exécuter des contrats intelligents (smart contracts) et des applications décentralisées (dApps). Sa cryptomonnaie native s\'appelle Ether (ETH), qui est utilisée pour payer les frais de transaction sur le réseau.',
        },
        {
          question: 'Quelle est la différence entre Ethereum et Bitcoin ?',
          answer: 'Alors que Bitcoin est principalement une monnaie numérique pour les transferts de valeur, Ethereum est une plateforme programmable qui permet de créer des applications décentralisées, des contrats intelligents, et des tokens. Ethereum peut exécuter du code, pas seulement transférer de la valeur.',
        },
        {
          question: 'Qu\'est-ce qu\'un contrat intelligent (smart contract) ?',
          answer: 'Un contrat intelligent est un programme qui s\'exécute automatiquement sur la blockchain Ethereum lorsque certaines conditions sont remplies. Il permet d\'automatiser des accords sans intermédiaire, garantissant que les termes du contrat sont respectés de manière transparente et immuable.',
        },
      ],
      [
        {
          question: 'Comment fonctionne Ethereum 2.0 ?',
          answer: 'Ethereum 2.0 (maintenant appelé "The Merge") a migré Ethereum du mécanisme de consensus Proof of Work (PoW) au Proof of Stake (PoS). Cela réduit considérablement la consommation d\'énergie du réseau et améliore sa scalabilité, permettant de traiter plus de transactions par seconde.',
        },
        {
          question: 'Qu\'est-ce que le DeFi sur Ethereum ?',
          answer: 'Le DeFi (Finance Décentralisée) est un écosystème d\'applications financières construites sur Ethereum. Il permet de prêter, emprunter, échanger et gagner des intérêts sur des cryptomonnaies sans intermédiaires traditionnels comme les banques.',
        },
        {
          question: 'Comment acheter de l\'Ether (ETH) ?',
          answer: 'Vous pouvez acheter de l\'Ether sur des plateformes d\'échange comme Binance, Coinbase, ou Kraken. Après avoir créé un compte et vérifié votre identité, vous pouvez déposer des fonds et acheter de l\'ETH. Vous pouvez également l\'acheter directement avec une carte bancaire sur certaines plateformes.',
        },
      ],
      [
        {
          question: 'Qu\'est-ce que le gas sur Ethereum ?',
          answer: 'Le gas est le coût nécessaire pour exécuter une transaction ou un contrat intelligent sur Ethereum. Il est payé en ETH et récompense les validateurs du réseau. Les prix du gas varient selon la congestion du réseau : plus le réseau est occupé, plus le gas est cher.',
        },
        {
          question: 'Ethereum est-il plus écologique que Bitcoin ?',
          answer: 'Oui, depuis la transition vers Ethereum 2.0 avec le Proof of Stake, Ethereum consomme environ 99,95% moins d\'énergie qu\'avant. Il est maintenant beaucoup plus écologique que Bitcoin, qui utilise toujours le Proof of Work nécessitant beaucoup d\'énergie pour le minage.',
        },
        {
          question: 'Qu\'est-ce que l\'EVM (Ethereum Virtual Machine) ?',
          answer: 'L\'EVM est la machine virtuelle qui exécute les contrats intelligents sur Ethereum. Elle permet à n\'importe quel développeur d\'écrire et déployer du code décentralisé qui s\'exécutera de manière identique sur tous les nœuds du réseau, garantissant la décentralisation et la sécurité.',
        },
      ],
    ],
  },
}

/**
 * Get FAQ content by slug
 */
export function getCryptoFaqs(slug: string): CryptoFaqContent | null {
  return cryptoFaqs[slug.toLowerCase()] || null
}

