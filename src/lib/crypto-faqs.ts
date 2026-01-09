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
          question: '🪙 C\'est quoi Bitcoin exactement ?',
          answer: 'Bitcoin (BTC), c\'est la toute première crypto-monnaie. Créée en 2009 par un mystérieux Satoshi Nakamoto, c\'est de l\'argent 100% numérique qui ne dépend d\'aucune banque ni d\'aucun gouvernement. Les transactions se font directement entre utilisateurs (peer-to-peer) grâce à la blockchain, un registre public vérifié par des milliers d\'ordinateurs dans le monde. En gros : de l\'argent qu\'on peut envoyer partout dans le monde sans demander la permission à personne.',
        },
        {
          question: '⚙️ Comment ça fonctionne concrètement ?',
          answer: 'Bitcoin utilise la blockchain, une chaîne de blocs contenant toutes les transactions depuis 2009. Quand vous envoyez des BTC à quelqu\'un, les "mineurs" (des ordinateurs ultra-puissants) vérifient que vous possédez bien ces bitcoins et les inscrivent dans un nouveau bloc. Une fois validé, impossible de modifier ou d\'annuler la transaction. C\'est sécurisé par de la cryptographie complexe et personne ne contrôle le réseau - c\'est ça qui rend Bitcoin unique.',
        },
        {
          question: '🔢 Combien de Bitcoins existent-ils ?',
          answer: 'Maximum 21 millions, pas un de plus. C\'est inscrit dans le code depuis le début. Actuellement (début 2026), environ 19,6 millions ont déjà été minés. Il en reste donc moins de 1,5 million à créer d\'ici 2140 environ. Cette rareté programmée, c\'est ce qui fait dire à beaucoup que Bitcoin est une réserve de valeur, un peu comme l\'or numérique. Contrairement aux euros ou dollars qu\'on peut imprimer à volonté, Bitcoin a une politique monétaire stricte et immuable.',
        },
        {
          question: '💳 Comment acheter du Bitcoin en 2026 ?',
          answer: 'Plusieurs options : Les plateformes d\'échange (Coinbase, Binance, Kraken) : le plus simple, vous créez un compte, vérifiez votre identité et achetez avec votre carte ou virement. Les ETF Bitcoin : depuis 2024, vous pouvez acheter des ETF Bitcoin via votre compte-titres classique (BlackRock, Fidelity...) sans vous embêter avec les wallets. Le P2P : directement entre particuliers, plus anonyme mais plus risqué. Attention aux frais qui varient énormément selon les plateformes.',
        },
        {
          question: '🔐 Où stocker mes Bitcoins en sécurité ?',
          answer: 'Règle d\'or : "Not your keys, not your coins". Si vous ne contrôlez pas vos clés privées, vous ne possédez pas vraiment vos bitcoins. Les hot wallets (connectés à internet) : pratiques pour les petits montants du quotidien. Applications mobiles, extensions de navigateur. Plus faciles mais moins sécurisés. Les cold wallets (déconnectés d\'internet) : pour les gros montants. Hardware wallets type Ledger ou Trezor. Beaucoup plus sécurisés mais moins pratiques. Si vous laissez vos BTC sur une plateforme d\'échange, c\'est eux qui ont les clés. Ils peuvent geler votre compte, se faire hacker, faire faillite (souvenez-vous de FTX).',
        },
      ],
      [
        {
          question: '⚡ C\'est quoi le Lightning Network ?',
          answer: 'Le gros problème de Bitcoin, c\'est qu\'il ne peut traiter que 7 transactions par seconde (Visa en fait 65 000). Le Lightning Network, c\'est une surcouche qui permet des paiements quasi instantanés et avec des frais ridicules. Vous ouvrez un canal, faites autant de transactions que vous voulez, puis le fermez. Seules l\'ouverture et la fermeture sont inscrites sur la blockchain principale. Depuis 2023-2024, l\'adoption explose, surtout dans les pays qui utilisent Bitcoin pour les paiements quotidiens.',
        },
        {
          question: '📈 Pourquoi Bitcoin est si volatile ?',
          answer: 'Bitcoin, c\'est le grand huit émotionnel. Ça peut monter de 20% en une semaine et descendre de 30% la suivante. Plusieurs raisons : marché encore relativement petit (face aux actions ou à l\'or), beaucoup de spéculation et de trading à effet de levier, sensible aux annonces réglementaires et aux news macro, cycles psychologiques de peur et de cupidité très marqués. Fait intéressant : la volatilité diminue avec le temps. En 2021, elle était à 66% annualisée. En 2025, elle est descendue à 36%, son plus bas historique. Bitcoin mature progressivement.',
        },
        {
          question: '🔄 C\'est quoi les cycles Bitcoin et le halving ?',
          answer: 'Historiquement, Bitcoin suit un cycle de 4 ans lié au "halving" - un événement où la récompense des mineurs est divisée par deux. Le dernier a eu lieu en avril 2024 (récompense passée de 6,25 à 3,125 BTC par bloc). Le schéma classique : halving → 12-18 mois plus tard, gros bull run → sommet → krach → marché baissier de 1-2 ans → nouveau halving. Ça a marché en 2012-2013, 2016-2017, 2020-2021. Mais attention : chaque cycle est différent et de plus en plus de gens pensent que ce modèle est mort. Avec l\'arrivée des institutions et des ETF, Bitcoin suit de plus en plus les cycles macroéconomiques globaux que son propre cycle interne.',
        },
        {
          question: '💰 Faut-il investir dans Bitcoin ?',
          answer: 'On ne vous dira jamais quoi faire. Vraiment. Mais voilà ce qu\'on peut dire : N\'investissez QUE ce que vous pouvez vous permettre de perdre totalement. La volatilité reste brutale même si elle diminue. Pensez long terme (5-10 ans minimum). Diversifiez, ne mettez pas tous vos œufs dans le même panier. Formez-vous avant d\'investir. Les red flags : les gourous qui promettent "BTC à 1 million en 2027" → fuyez. Ceux qui vous disent d\'emprunter pour acheter du BTC → fuyez. Les promesses de gains rapides et garantis → arnaque. Bitcoin peut monter à 200 000$ comme redescendre à 50 000$. Personne ne sait.',
        },
        {
          question: '⚖️ Bitcoin est-il légal ?',
          answer: 'Ça dépend où vous êtes. Dans la plupart des pays développés (Europe, USA, Canada, Japon...), c\'est totalement légal. Vous pouvez acheter, vendre, détenir du BTC sans problème. Quelques pays l\'ont interdit ou fortement restreint (Chine, Bangladesh, certains pays du Moyen-Orient et d\'Afrique). D\'autres comme El Salvador en ont même fait une monnaie légale. En 2026, la tendance est clairement à la régulation plutôt qu\'à l\'interdiction. Les gouvernements veulent contrôler et taxer, pas forcément bannir. Aux USA, le CLARITY Act en discussion devrait donner un cadre légal clair. L\'UE a son règlement MiCA depuis 2024.',
        },
      ],
      [
        {
          question: '🎭 Bitcoin est-il vraiment anonyme ?',
          answer: 'Non, Bitcoin est pseudo-anonyme, pas anonyme. Nuance importante. Toutes les transactions sont publiques sur la blockchain. N\'importe qui peut voir qu\'une adresse A a envoyé X bitcoins à une adresse B. Par contre, les adresses ne sont que des suites de chiffres et de lettres - rien ne dit qui se cache derrière. Mais dans les faits, avec un peu de travail d\'analyse, on peut souvent retracer l\'origine des transactions, surtout si elles passent par des plateformes d\'échange qui demandent une pièce d\'identité (obligations KYC). Bitcoin n\'est pas l\'outil rêvé des criminels que les médias décrivent. Les forces de l\'ordre ont des outils d\'analyse de blockchain très performants maintenant.',
        },
        {
          question: '⚠️ Quels sont les vrais risques ?',
          answer: 'Soyons honnêtes : Risque de prix : Bitcoin reste volatile. Vous pouvez perdre 30-50% de votre investissement en quelques semaines. Risque de sécurité : si vous perdez vos clés privées, vos bitcoins sont perdus pour toujours. Si vous vous faites hacker, idem. Pas de service client pour récupérer vos fonds. Risque réglementaire : un gouvernement majeur pourrait durcir drastiquement la régulation (interdiction, taxation très forte...). Risque technologique : un bug critique dans le code (peu probable après 17 ans), une avancée en informatique quantique qui casserait la cryptographie (pas pour demain). Risque de plateforme : si vous stockez sur un exchange qui fait faillite ou se fait hacker, vous pouvez tout perdre.',
        },
        {
          question: '🔀 C\'est quoi la différence entre Bitcoin et les autres cryptos ?',
          answer: 'Bitcoin a été le premier et reste le plus gros par capitalisation. Sa philosophie : être une réserve de valeur et un moyen de paiement décentralisé. Point barre. Ethereum permet les smart contracts et tout un écosystème d\'applications. Solana mise sur la vitesse. Cardano sur la recherche académique. Chaque crypto a sa sauce. Bitcoin, c\'est le plus simple conceptuellement, le plus sécurisé (jamais hacké en 17 ans), le plus décentralisé. Il fait une chose et la fait bien. Certains disent que c\'est dépassé technologiquement. D\'autres que c\'est justement sa force - la simplicité et la sécurité avant tout. C\'est pour ça qu\'on l\'appelle "l\'or numérique" ou "l\'argent de réserve" des cryptos.',
        },
        {
          question: '🏛️ Les gouvernements peuvent-ils arrêter Bitcoin ?',
          answer: 'En théorie, non. Bitcoin est décentralisé sur des milliers de nœuds dans le monde entier. Pour le tuer complètement, il faudrait éteindre internet ou coordonner une interdiction mondiale (bonne chance avec ça). Par contre, un gouvernement peut : interdire les plateformes d\'échange sur son territoire (ça complique l\'achat/vente), interdire aux entreprises et commerces d\'accepter Bitcoin, taxer très lourdement les gains, poursuivre les utilisateurs. La Chine a essayé plusieurs fois d\'interdire Bitcoin. Résultat ? Le mining s\'est déplacé ailleurs, les Chinois continuent de trader via VPN et plateformes offshore. Bitcoin continue.',
        },
        {
          question: '🏦 Les banques centrales vont créer leurs propres cryptos, Bitcoin est mort ?',
          answer: 'Les CBDC (monnaies numériques de banque centrale) arrivent effectivement. L\'euro numérique est en préparation, la Chine a déjà son yuan numérique, plein de pays testent. Mais les CBDC, c\'est l\'opposé total de Bitcoin : Centralisé (contrôlé par la banque centrale) vs décentralisé. Traçable à 100% (surveillance totale) vs pseudo-anonyme. Politique monétaire flexible (ils peuvent en créer autant qu\'ils veulent) vs offre fixe. Censurable (ils peuvent geler vos fonds) vs résistant à la censure. Les CBDC sont des euros ou dollars numériques améliorés. C\'est pas un concurrent de Bitcoin, c\'est un outil de contrôle gouvernemental. Si jamais vous vous demandez pourquoi Bitcoin existe, attendez de voir les CBDC en action.',
        },
      ],
    ],
  },
  ethereum: {
    slug: 'ethereum',
    title: 'Questions fréquentes sur Ethereum',
    description: 'Tout ce que vous voulez vraiment savoir sur Ethereum en 2026.',
    faqs: [
      [
        {
          question: "🟣 C'est quoi Ethereum exactement ?",
          answer: "Ethereum, c'est un ordinateur mondial décentralisé. Pas juste une crypto-monnaie comme Bitcoin, mais une vraie plateforme sur laquelle vous pouvez construire des applications qui tournent sans serveur central. Sa crypto native s'appelle Ether (ETH) et sert à payer les frais du réseau et à staker pour sécuriser le réseau. En gros : si Bitcoin est de l'argent numérique, Ethereum est un système d'exploitation pour applications décentralisées.",
        },
        {
          question: '🔄 Quelle est la vraie différence entre Ethereum et Bitcoin ?',
          answer: "Bitcoin, c'est de l'argent numérique. Point. Son but : être une réserve de valeur et un moyen de paiement décentralisé. C'est tout ce qu'il fait et c'est voulu. Ethereum, c'est une plateforme programmable. Vous pouvez créer des applications financières (DeFi), des NFTs, des jeux, des organisations autonomes (DAOs), des systèmes d'identité... tout ce que vous pouvez coder. Bitcoin transfère de la valeur, Ethereum exécute du code et crée des écosystèmes entiers. Autre différence majeure : Bitcoin utilise le Proof of Work (mining énergivore), Ethereum est passé au Proof of Stake en 2022 (99,95% moins d'énergie consommée).",
        },
        {
          question: "📜 C'est quoi les smart contracts concrètement ?",
          answer: "Un smart contract, c'est un programme qui vit sur la blockchain et s'exécute automatiquement quand certaines conditions sont remplies. Pas besoin d'intermédiaire, pas de manipulation possible. Exemple simple : vous créez un contrat \"Si Alice me paye 10 ETH avant le 15 mars, je lui envoie automatiquement 100 tokens XYZ. Sinon, je récupère mes tokens.\" Le code fait tout, personne ne peut tricher, c'est transparent et immuable. Les cas d'usage réels : assurances automatiques, prêts DeFi, échanges décentralisés, NFTs avec royalties aux artistes, systèmes de vote, gestion de fonds, et des milliers d'autres applications.",
        },
        {
          question: "🔀 C'est quoi cette histoire de \"Merge\" et Ethereum 2.0 ?",
          answer: "En septembre 2022, Ethereum a réalisé un exploit technique historique : passer du Proof of Work au Proof of Stake sans arrêter le réseau. Un truc de fou, comme changer le moteur d'un avion en plein vol. Avant, des mineurs avec des ordinateurs ultra-puissants validaient les transactions en résolvant des problèmes mathématiques. Maintenant, des validateurs stakent (bloquent) 32 ETH comme caution et sont sélectionnés pour valider. S'ils trichent, ils perdent leur mise. Les résultats : consommation d'énergie réduite de 99,95%, émission d'ETH réduite de 90%, réseau plus sécurisé. Actuellement plus d'1 million de validateurs avec environ 34 millions d'ETH stakés (28% de l'offre totale). Note : on ne dit plus \"Ethereum 2.0\" maintenant, c'est juste \"Ethereum\" tout court depuis le Merge.",
        },
        {
          question: '🌱 Ethereum est vraiment écologique maintenant ?',
          answer: "Oui. Depuis le passage au Proof of Stake, Ethereum consomme environ 99,95% moins d'énergie. On parle de la consommation d'une petite ville au lieu d'un pays entier. Bitcoin, qui utilise toujours le Proof of Work, consomme autant d'électricité que certains pays. Ethereum a résolu ce problème. C'est devenu une des blockchains majeures les plus écologiques. Certains validateurs utilisent même des énergies 100% renouvelables, rendant leur impact carbone quasi nul.",
        },
        {
          question: "💎 C'est quoi le staking et comment ça marche ?",
          answer: "Le staking, c'est bloquer vos ETH pour devenir validateur et sécuriser le réseau. En échange, vous gagnez des récompenses (actuellement entre 3% et 5% par an). Option 1 - Solo staking : vous avez 32 ETH ? Vous pouvez devenir validateur solo. Faut un peu de connaissances techniques et un ordinateur qui tourne 24/7. Option 2 - Staking liquide : vous n'avez pas 32 ETH ou vous voulez garder la liquidité ? Utilisez Lido, Rocket Pool ou d'autres. Vous stakez n'importe quel montant, vous recevez des tokens représentatifs (stETH, rETH) que vous pouvez utiliser ailleurs pendant que vos ETH génèrent des intérêts. Option 3 - Staking sur exchanges : Coinbase, Binance et autres proposent du staking simple. Vous déposez vos ETH, ils s'occupent du reste. Facile mais vous leur faites confiance (remember : not your keys, not your coins).",
        },
      ],
      [
        {
          question: "⚡ C'est quoi les Layer 2 et pourquoi c'est important ?",
          answer: "Le gros problème d'Ethereum : il ne peut traiter que 15-30 transactions par seconde sur la chaîne principale (mainnet). Visa en fait 65 000. Résultat : quand le réseau est chargé, les frais explosent (parfois 50-100$ pour une transaction). Les Layer 2 (L2), c'est des réseaux construits au-dessus d'Ethereum. Ils traitent des milliers de transactions hors de la chaîne principale, puis envoient le résultat final à Ethereum pour la sécurité. Vous gardez la sécurité d'Ethereum mais avec des frais ridicules (quelques centimes) et une vitesse folle. Les gros players en 2026 : Base (lancé par Coinbase, le plus utilisé), Arbitrum, Optimism, zkSync, Starknet, Polygon zkEVM. Collectivement, ils ont plus de 47 milliards de dollars de valeur bloquée et traitent 17x plus de transactions qu'Ethereum mainnet. L'avenir d'Ethereum, c'est ça : le mainnet devient la couche de règlement final ultra-sécurisée, les L2 gèrent l'activité quotidienne.",
        },
        {
          question: "⛽ Les frais de gas, c'est toujours aussi cher ?",
          answer: "Ça dépend où vous êtes. Sur Ethereum mainnet, oui, ça peut encore être cher quand le réseau est congestionné (10-50$ par transaction, parfois plus). Sur les Layer 2 ? Les frais sont dérisoires. On parle de quelques centimes, voire moins. Base, Arbitrum, Optimism : une transaction coûte généralement 0,10-0,50$ maximum. L'upgrade Dencun de mars 2024 a introduit les \"blobs\" qui ont drastiquement réduit les coûts des L2. Aujourd'hui, la majorité de l'activité DeFi se passe sur les L2 justement à cause des frais. Pro tip : pour des transactions normales ou de la DeFi, utilisez les L2. Gardez le mainnet pour les gros montants ou quand vous voulez le maximum de sécurité.",
        },
        {
          question: "🔬 C'est quoi la différence entre Optimistic et ZK-rollups ?",
          answer: "Les deux sont des types de Layer 2, mais avec des approches différentes : Optimistic Rollups (Arbitrum, Optimism, Base) : ils supposent que toutes les transactions sont honnêtes par défaut. S'il y a fraude, quelqu'un peut la contester pendant une période de défi (généralement 7 jours). Plus simples à développer, compatibilité facile avec Ethereum. ZK-Rollups (zkSync, Starknet, Polygon zkEVM) : ils utilisent des preuves cryptographiques (zero-knowledge proofs) pour prouver mathématiquement que les transactions sont valides. Plus complexes mais plus rapides pour les retraits (pas de période d'attente) et potentiellement plus confidentiels. Les deux marchent bien. Les Optimistic dominent actuellement en termes d'adoption, mais les ZK gagnent du terrain rapidement.",
        },
        {
          question: "💹 C'est quoi exactement la DeFi ?",
          answer: "DeFi = Finance Décentralisée. Des services financiers sans banque, sans intermédiaire, juste du code et des smart contracts. Ce que vous pouvez faire : Prêter/emprunter : sur Aave ou Compound, prêtez vos cryptos et gagnez des intérêts, ou empruntez contre vos actifs. Échanger : sur Uniswap ou Curve, échangez n'importe quelle crypto sans compte, sans KYC. Gagner des intérêts : fournissez de la liquidité et gagnez des frais de transaction. Trader des dérivés : sur GMX ou dYdX, tradez avec effet de levier. Stablecoins : utilisez des cryptos stables comme USDC ou DAI indexés sur le dollar. La TVL (valeur totale bloquée) dans la DeFi Ethereum ? Plus de 50 milliards de dollars début 2026. C'est devenu un système financier parallèle totalement fonctionnel.",
        },
        {
          question: "🖼️ Ethereum et les NFTs, ça en est où ?",
          answer: "Ethereum reste la blockchain dominante pour les NFTs, même si le marché a refroidi depuis l'euphorie de 2021-2022. Les collections majeures (Bored Apes, CryptoPunks, Azuki...) sont toutes sur Ethereum. Les marketplaces comme OpenSea, Blur, et LooksRare traitent des milliards de dollars de volume. Mais les NFTs ont évolué au-delà du simple art numérique. Maintenant on les utilise pour : authentifier des produits de luxe, émettre des tickets d'événements, représenter des actifs du monde réel (immobilier tokenisé), créer des programmes de fidélité, gérer des diplômes et certifications... L'infrastructure est là et mature. Les cas d'usage continuent de se développer.",
        },
        {
          question: "🏛️ C'est quoi les DAOs et ça marche vraiment ?",
          answer: "DAO = Decentralized Autonomous Organization. Une organisation sans patron, gouvernée par des smart contracts et des votes de la communauté. Les membres détiennent des tokens de gouvernance qui leur donnent le droit de voter sur les décisions : comment utiliser le trésor, quelles fonctionnalités développer, quels partenariats créer... Des exemples réels : MakerDAO gère le stablecoin DAI avec des milliards en trésorerie, Uniswap DAO contrôle le protocole d'échange le plus utilisé, Arbitrum DAO gère le Layer 2 avec 3+ milliards de dollars de budget. Est-ce que ça marche ? Oui et non. La gouvernance peut être lente et parfois dominée par quelques gros porteurs de tokens. Mais c'est infiniment plus transparent que les entreprises traditionnelles et ça continue d'évoluer.",
        },
      ],
      [
        {
          question: '💳 Comment acheter de l\'ETH en 2026 ?',
          answer: "Les exchanges centralisés : Coinbase, Binance, Kraken - le plus simple. Créez un compte, vérifiez votre identité, virez des euros, achetez. Pratique mais vous leur faites confiance avec vos fonds. Les ETF Ethereum : depuis 2024, des ETF ETH existent (surtout aux USA). Vous pouvez acheter via votre compte-titres classique sans gérer de wallet. Pas encore aussi populaires que les ETF Bitcoin mais ça monte. Les DEX (exchanges décentralisés) : Uniswap sur un Layer 2 - vous gardez le contrôle total de vos fonds. Plus complexe pour les débutants. Le P2P : directement entre particuliers via des plateformes comme LocalCryptos. Plus anonyme mais plus risqué.",
        },
        {
          question: "⛽ C'est quoi le gas exactement et pourquoi ça change tout le temps ?",
          answer: "Le gas, c'est le coût pour exécuter une opération sur Ethereum. Chaque action (envoyer de l'ETH, exécuter un smart contract, mint un NFT) consomme une certaine quantité de gas. Le prix du gas varie selon la congestion du réseau : beaucoup de monde veut faire des transactions en même temps ? Le gas monte. Réseau calme ? Le gas baisse. C'est de l'offre et de la demande. Depuis EIP-1559 (août 2021), le système est plus prévisible : un \"base fee\" (frais de base) obligatoire qui s'ajuste automatiquement + un \"priority fee\" (pourboire) optionnel pour faire passer votre transaction plus vite. Le base fee est brûlé (détruit), ce qui rend ETH potentiellement déflationnaire. Sites comme Etherscan Gas Tracker vous montrent les prix en temps réel. Attendez les moments calmes (weekend, nuit en Europe/USA) pour payer moins.",
        },
        {
          question: "🔐 Où stocker mes ETH en sécurité ?",
          answer: "Hot wallets (connectés à internet) : MetaMask, Rainbow, Coinbase Wallet - pratiques pour les petits montants et l'utilisation quotidienne. Plus faciles mais moins sécurisés. Cold wallets (déconnectés) : Ledger, Trezor - pour les gros montants. Beaucoup plus sécurisés. Vos clés privées ne touchent jamais internet. Smart contract wallets : les nouveaux wallets comme Safe ou Argent utilisent des smart contracts pour des fonctionnalités avancées (récupération sociale, multi-sig, limites de dépenses...). L'account abstraction rend ça de plus en plus courant. Règle d'or : si vous stockez sur un exchange, vous ne possédez pas vraiment vos ETH. \"Not your keys, not your coins.\" Pour vraiment les posséder, transférez-les sur un wallet dont vous contrôlez les clés privées.",
        },
        {
          question: "⚠️ Quels sont les vrais risques d'Ethereum ?",
          answer: "Soyons honnêtes : Risque de smart contract : un bug dans le code d'une application peut faire perdre des millions. Ça s'est vu plein de fois (The DAO en 2016, des hacks DeFi réguliers...). Utilisez des protocoles audités et testés. Risque de prix : ETH reste volatil. Ça peut monter de 50% ou descendre de 40% en quelques semaines. Risque réglementaire : des gouvernements pourraient durcir les régulations, interdire certains usages, taxer lourdement... Risque de centralisation cachée : beaucoup de Layer 2 sont encore assez centralisés. Lido contrôle 28% du staking (ça diminue mais c'est encore beaucoup). La décentralisation totale, c'est un objectif à long terme. Risque de fragmentation : trop de L2 qui ne communiquent pas bien = expérience utilisateur dégradée. Risque technologique : l'informatique quantique pourrait casser la cryptographie actuelle (pas pour demain, mais les devs y travaillent).",
        },
        {
          question: "🚫 Ethereum peut-il être censuré ou arrêté ?",
          answer: "Ethereum le réseau ? Non, c'est décentralisé sur des milliers de nœuds dans le monde. Pour le tuer, il faudrait une coordination mondiale impossible. Par contre, un gouvernement peut : Obliger les validateurs basés chez lui à censurer certaines transactions (ça s'est vu avec les sanctions OFAC). Interdire les plateformes d'échange. Poursuivre les développeurs d'applications spécifiques. Le protocole Ethereum lui-même résiste à la censure, mais les couches au-dessus (exchanges, certains L2, applications) sont plus vulnérables. C'est pour ça que la décentralisation reste un combat constant, pas un état acquis.",
        },
        {
          question: "💎 ETH comme investissement, c'est smart ?",
          answer: "On ne vous dira jamais quoi faire. Mais voilà les éléments de réflexion : Les arguments pour : Plus gros écosystème d'applications et de développeurs. Actif productif (génère des rendements via le staking). Potentiellement déflationnaire (plus de burning que de création dans certaines conditions). Adoption institutionnelle croissante. Technologie qui continue d'évoluer et de s'améliorer. Les arguments contre : Volatilité brutale. Concurrence féroce (Solana, et autres). Complexité technique qui peut freiner l'adoption grand public. Régulation incertaine. Pas de garantie que la techno actuelle sera celle du futur. Notre position : Ethereum a prouvé sa résilience et sa capacité d'innovation depuis 11 ans. Mais ça reste un pari risqué. N'investissez que ce que vous pouvez perdre, pensez long terme, diversifiez, et surtout : formez-vous avant de mettre un centime.",
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

