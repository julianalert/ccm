import { CryptoFaqContent } from '@/types/crypto-content'

// FAQ content stored in codebase
export const cryptoFaqs: Record<string, CryptoFaqContent> = {
  bitcoin: {
    slug: 'bitcoin',
    title: 'Questions fréquentes sur Bitcoin',
    description: 'Tout ce que vous devez savoir sur Bitcoin, la première cryptomonnaie décentralisée.',
    faqs: [
      [
        {
          question: 'Qu\'est-ce que Bitcoin ?',
          answer: 'Bitcoin (BTC) est la première cryptomonnaie décentralisée créée en 2009 par Satoshi Nakamoto. Il fonctionne sur une technologie blockchain qui permet des transactions peer-to-peer sans l\'intervention d\'une banque centrale ou d\'un administrateur unique.',
        },
        {
          question: 'Comment fonctionne Bitcoin ?',
          answer: 'Bitcoin utilise la technologie blockchain, un registre public distribué qui enregistre toutes les transactions. Les transactions sont vérifiées par des nœuds de réseau via la cryptographie et regroupées en blocs. Les mineurs valident ces blocs en résolvant des problèmes cryptographiques complexes.',
        },
        {
          question: 'Combien de Bitcoins existent-ils ?',
          answer: 'Le nombre maximum de Bitcoins est limité à 21 millions. Cette limite est programmée dans le code source de Bitcoin et ne peut pas être modifiée. Actuellement, plus de 19 millions de Bitcoins ont été minés.',
        },
      ],
      [
        {
          question: 'Comment acheter du Bitcoin ?',
          answer: 'Vous pouvez acheter du Bitcoin sur des plateformes d\'échange de cryptomonnaies comme Binance, Coinbase ou Kraken. Il suffit de créer un compte, de vérifier votre identité, et de déposer des fonds pour commencer à acheter.',
        },
        {
          question: 'Où stocker mes Bitcoins ?',
          answer: 'Vous pouvez stocker vos Bitcoins dans un portefeuille numérique. Il existe plusieurs types : portefeuilles en ligne (hot wallets), portefeuilles matériels (hardware wallets) pour plus de sécurité, ou portefeuilles mobiles pour un accès facile.',
        },
        {
          question: 'Bitcoin est-il légal ?',
          answer: 'La légalité de Bitcoin varie selon les pays. Dans la plupart des pays développés, Bitcoin est légal, mais certains pays l\'ont interdit ou restreint. Il est important de vérifier la réglementation dans votre pays avant d\'investir.',
        },
      ],
      [
        {
          question: 'Quels sont les risques d\'investir dans Bitcoin ?',
          answer: 'Bitcoin est un actif très volatil. Son prix peut fluctuer considérablement en peu de temps. Les risques incluent la volatilité des prix, les risques de sécurité (piratage, perte de clés privées), et l\'incertitude réglementaire. N\'investissez que ce que vous pouvez vous permettre de perdre.',
        },
        {
          question: 'Bitcoin est-il anonyme ?',
          answer: 'Bitcoin n\'est pas totalement anonyme mais plutôt pseudonyme. Toutes les transactions sont enregistrées publiquement sur la blockchain, mais elles sont liées à des adresses Bitcoin plutôt qu\'à des identités réelles. Cependant, avec des techniques d\'analyse, il est possible de tracer certaines transactions.',
        },
        {
          question: 'Quelle est la différence entre Bitcoin et les autres cryptomonnaies ?',
          answer: 'Bitcoin a été la première cryptomonnaie et reste la plus grande par capitalisation boursière. Contrairement à Ethereum qui permet les contrats intelligents, Bitcoin se concentre principalement sur les transferts de valeur. Il est souvent considéré comme "l\'or numérique" en raison de sa rareté programmée.',
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

