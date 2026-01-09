import { CryptoContent } from '@/types/crypto-content'

// Crypto content stored in codebase
export const cryptoContent: Record<string, CryptoContent> = {
  bitcoin: {
    slug: 'bitcoin',
    title: 'C\'est quoi Bitcoin exactement ?',
    heroImage: '/images/bitcoin.jpg',
    heroImageAlt: 'Bitcoin - La première cryptomonnaie décentralisée',
    sections: [
      {
        type: 'paragraph',
        content: 'Bitcoin, c\'est LA crypto-monnaie originale. Celle qui a tout lancé en 2009. Créée par un certain Satoshi Nakamoto (on reviendra là-dessus), c\'est de l\'argent 100% numérique qui ne dépend d\'aucune banque, d\'aucun gouvernement, de personne en fait. Pour en savoir plus sur l\'histoire et les détails techniques, vous pouvez consulter <a href="https://fr.wikipedia.org/wiki/Bitcoin" target="_blank" rel="noopener noreferrer">l\'article Wikipedia sur Bitcoin</a>.'
      },
      {
        type: 'paragraph',
        content: 'L\'idée de base ? Pouvoir envoyer de l\'argent à quelqu\'un, n\'importe où dans le monde, sans demander la permission à qui que ce soit. Pas de banque au milieu, pas d\'autorité centrale, juste vous et la personne à qui vous envoyez des fonds.'
      },
      {
        type: 'paragraph',
        content: 'Y\'a pas de pièces physiques ni de billets. Tout existe uniquement sous forme de données dans un registre public géant qu\'on appelle la blockchain. Ce registre est vérifié et sécurisé par des milliers d\'ordinateurs partout dans le monde.'
      },
      {
        type: 'heading',
        content: 'Pourquoi Bitcoin a été créé'
      },
      {
        type: 'paragraph',
        content: 'Retour en 2008. Crise financière mondiale, les banques font n\'importe quoi, les gouvernements impriment de l\'argent pour les sauver. Les gens sont furax et se demandent s\'il y a pas un meilleur système.'
      },
      {
        type: 'paragraph',
        content: 'C\'est là que Satoshi débarque avec son white paper du Bitcoin. Son but ? Créer une monnaie qui ne peut pas être manipulée par les banques centrales, qui ne peut pas être censurée, et dont l\'émission est limitée et prévisible.'
      },
      {
        type: 'paragraph',
        content: 'Le mystère Satoshi Nakamoto reste entier aujourd\'hui. On ne sait toujours pas si c\'est un mec, une meuf, un groupe de personnes, un alien. Peu importe au final, parce que le code est open source et appartient à tout le monde maintenant.'
      },
      {
        type: 'image',
        content: '/images/satoshi-nakamoto.jpg',
        imageAlt: 'Satoshi Nakamoto - Le créateur mystérieux de Bitcoin',
        imageCaption: 'Satoshi Nakamoto, le créateur anonyme de Bitcoin, reste un mystère à ce jour.'
      },
      {
        type: 'heading',
        content: 'Comment ça marche concrètement ?'
      },
      {
        type: 'heading3',
        content: 'La décentralisation, le truc qui change tout'
      },
      {
        type: 'paragraph',
        content: 'Bitcoin n\'a pas de PDG, pas de siège social, pas de serveur central qu\'on peut éteindre. C\'est un réseau distribué sur des milliers d\'ordinateurs (les "nœuds") qui vérifient tous les transactions.'
      },
      {
        type: 'paragraph',
        content: 'Quand vous envoyez des bitcoins à quelqu\'un, vous diffusez la transaction sur le réseau. Les mineurs (on y vient) vérifient que vous possédez bien ces bitcoins et que vous ne les avez pas déjà dépensés ailleurs. Une fois validée, la transaction est inscrite dans un bloc, qui est ajouté à la blockchain.'
      },
      {
        type: 'image',
        content: '/images/blockchain2.png',
        imageAlt: 'Blockchain Bitcoin - Registre décentralisé des transactions',
        imageCaption: 'La blockchain Bitcoin est un registre public et décentralisé de toutes les transactions.'
      },
      {
        type: 'paragraph',
        content: 'Cette blockchain, c\'est littéralement une chaîne de blocs contenant toutes les transactions depuis 2009. Tout est public, transparent, vérifiable par n\'importe qui. Par contre, impossible de modifier ou supprimer une transaction une fois qu\'elle est validée.'
      },
      {
        type: 'heading3',
        content: 'Le minage, c\'est quoi ce délire ?'
      },
      {
        type: 'paragraph',
        content: 'Le minage, c\'est le processus par lequel de nouveaux bitcoins sont créés et les transactions sont validées. Les mineurs utilisent des ordinateurs ultra-puissants pour résoudre des problèmes mathématiques complexes.'
      },
      {
        type: 'paragraph',
        content: 'Le premier qui trouve la solution gagne le droit d\'ajouter le prochain bloc à la blockchain et reçoit une récompense en bitcoins. C\'est un peu comme une loterie où vos chances de gagner dépendent de votre puissance de calcul.'
      },
      {
        type: 'paragraph',
        content: 'Aujourd\'hui, la récompense est de 3,125 BTC par bloc (elle a diminué avec le temps). En 2009, c\'était 50 BTC. Tous les 4 ans environ, cette récompense est divisée par deux lors d\'un événement appelé le "halving".'
      },
      {
        type: 'paragraph',
        content: 'Le dernier halving a eu lieu en avril 2024. Le prochain est prévu pour 2028.'
      },
      {
        type: 'paragraph',
        content: 'Le minage consomme énormément d\'électricité, c\'est vrai. Mais de plus en plus de mineurs utilisent des énergies renouvelables, notamment parce que c\'est souvent l\'électricité la moins chère.'
      },
      {
        type: 'heading3',
        content: 'Les 21 millions, la limite absolue'
      },
      {
        type: 'paragraph',
        content: 'Il n\'existera jamais plus de 21 millions de bitcoins. C\'est inscrit dans le code depuis le début. On estime qu\'on atteindra ce maximum vers 2140.'
      },
      {
        type: 'paragraph',
        content: 'Pourquoi cette limite ? Pour créer une rareté. Contrairement aux euros ou aux dollars que les banques centrales peuvent imprimer à volonté, Bitcoin a une politique monétaire stricte et immuable.'
      },
      {
        type: 'paragraph',
        content: 'À l\'heure actuelle (début 2026), environ 19,6 millions de bitcoins ont déjà été minés. Il en reste donc moins de 1,5 million à créer sur plus d\'un siècle.'
      },
      {
        type: 'paragraph',
        content: 'Cette rareté programmée, c\'est ce qui fait dire à beaucoup que Bitcoin est une réserve de valeur, un peu comme l\'or numérique.'
      },
      {
        type: 'heading',
        content: 'Les caractéristiques qui font Bitcoin'
      },
      {
        type: 'heading3',
        content: 'C\'est décentralisé (oui, on insiste)'
      },
      {
        type: 'paragraph',
        content: 'Personne ne contrôle Bitcoin. Aucun gouvernement ne peut décider d\'en créer plus. Aucune entreprise ne peut censurer vos transactions. Le réseau appartient à tous ceux qui y participent.'
      },
      {
        type: 'paragraph',
        content: 'C\'est probablement la caractéristique la plus importante et celle qui fait le plus flipper les banques centrales.'
      },
      {
        type: 'heading3',
        content: 'C\'est transparent... mais pseudo-anonyme'
      },
      {
        type: 'paragraph',
        content: 'Toutes les transactions sont publiques et visibles sur la blockchain. N\'importe qui peut voir qu\'une adresse A a envoyé X bitcoins à une adresse B.'
      },
      {
        type: 'paragraph',
        content: 'Par contre, les adresses ne sont que des suites de caractères. Rien ne dit qui se cache derrière. C\'est pour ça qu\'on parle de pseudo-anonymat plutôt que d\'anonymat total.'
      },
      {
        type: 'paragraph',
        content: 'Dans les faits, avec un peu de travail, on peut souvent retracer l\'origine des transactions, surtout si elles passent par des plateformes d\'échange qui demandent une pièce d\'identité.'
      },
      {
        type: 'heading3',
        content: 'C\'est immuable'
      },
      {
        type: 'paragraph',
        content: 'Une fois qu\'une transaction est confirmée et inscrite dans plusieurs blocs, elle est gravée dans le marbre. Impossible de l\'annuler, de faire un chargeback comme avec une carte bancaire.'
      },
      {
        type: 'paragraph',
        content: 'C\'est un avantage pour les commerçants (pas de fraude possible), mais ça demande aussi d\'être super vigilant. Si vous envoyez des bitcoins à la mauvaise adresse, personne ne pourra vous les rendre.'
      },
      {
        type: 'heading3',
        content: 'C\'est divisible'
      },
      {
        type: 'paragraph',
        content: 'Un bitcoin peut être divisé en 100 millions d\'unités. La plus petite unité s\'appelle un satoshi (ou sat).'
      },
      {
        type: 'paragraph',
        content: 'Donc 1 BTC = 100 000 000 sats.'
      },
      {
        type: 'paragraph',
        content: 'Au cours actuel (autour de 100 000$ le BTC), un satoshi vaut environ 0,001$. Largement assez petit pour faire des micro-paiements.'
      },
      {
        type: 'heading3',
        content: 'C\'est (relativement) rapide'
      },
      {
        type: 'paragraph',
        content: 'Une transaction Bitcoin prend généralement entre 10 minutes et 1 heure pour être confirmée, selon les frais que vous payez et l\'engorgement du réseau.'
      },
      {
        type: 'paragraph',
        content: 'C\'est pas instantané comme une carte bancaire, mais c\'est infiniment plus rapide qu\'un virement international classique qui peut prendre plusieurs jours.'
      },
      {
        type: 'paragraph',
        content: 'Et avec le Lightning Network (une surcouche de Bitcoin), les paiements deviennent quasi instantanés et avec des frais ridicules. On en reparlera.'
      },
      {
        type: 'heading',
        content: 'Comment ça évolue, le Bitcoin ?'
      },
      {
        type: 'heading3',
        content: 'Le Lightning Network : Bitcoin en mode turbo'
      },
      {
        type: 'paragraph',
        content: 'Le gros problème de Bitcoin, c\'est la scalabilité. Le réseau peut traiter environ 7 transactions par seconde. Visa en fait 65 000. Pas top.'
      },
      {
        type: 'paragraph',
        content: 'Le Lightning Network, c\'est une solution qui fonctionne au-dessus de Bitcoin. Vous ouvrez un canal de paiement, vous faites autant de transactions que vous voulez quasi instantanément et pour presque rien, puis vous fermez le canal. Seules l\'ouverture et la fermeture sont enregistrées sur la blockchain principale.'
      },
      {
        type: 'paragraph',
        content: 'Depuis 2023-2024, l\'adoption du Lightning explose. De plus en plus de pays et de commerçants l\'utilisent pour les paiements du quotidien.'
      },
      {
        type: 'heading3',
        content: 'Les ETF Bitcoin : l\'arrivée de Wall Street'
      },
      {
        type: 'paragraph',
        content: 'En janvier 2024, les États-Unis ont approuvé les premiers ETF Bitcoin spot. Énorme. Ça permet à n\'importe qui d\'acheter du Bitcoin via son compte-titres classique, sans se prendre la tête avec les wallets et les clés privées.'
      },
      {
        type: 'paragraph',
        content: 'BlackRock, Fidelity, tous les gros acteurs de la finance traditionnelle ont lancé leur ETF. Résultat : des dizaines de milliards de dollars ont afflué dans Bitcoin.'
      },
      {
        type: 'paragraph',
        content: 'C\'est clairement un tournant. Bitcoin est devenu un actif financier mainstream.'
      },
      {
        type: 'heading3',
        content: 'Adoption par les pays'
      },
      {
        type: 'paragraph',
        content: 'El Salvador a fait du Bitcoin une monnaie légale en 2021. République centrafricaine a tenté en 2022 (puis fait marche arrière). D\'autres pays étudient sérieusement la question.'
      },
      {
        type: 'paragraph',
        content: 'Certaines banques centrales détiennent maintenant du Bitcoin dans leurs réserves, même si c\'est encore marginal.'
      },
      {
        type: 'heading',
        content: 'Les wallets : où stocker vos bitcoins ?'
      },
      {
        type: 'paragraph',
        content: 'Avant de posséder des bitcoins, faut un endroit pour les mettre. C\'est le wallet (portefeuille).'
      },
      {
        type: 'heading3',
        content: 'Les différents types'
      },
      {
        type: 'list',
        heading: 'Les wallets chauds (hot wallets)',
        content: [
          'Connectés à internet. Pratiques mais moins sécurisés.',
          'Applications mobiles, extensions de navigateur, plateformes d\'échange.'
        ]
      },
      {
        type: 'list',
        heading: 'Les wallets froids (cold wallets)',
        content: [
          'Déconnectés d\'internet. Beaucoup plus sécurisés.',
          'Hardware wallets type Ledger ou Trezor, paper wallets (votre clé privée imprimée sur papier).'
        ]
      },
      {
        type: 'paragraph',
        content: 'Si vous avez une grosse somme, utilisez un hardware wallet. Si c\'est juste pour des petits montants du quotidien, un wallet chaud suffit.'
      },
      {
        type: 'heading3',
        content: 'Not your keys, not your coins'
      },
      {
        type: 'paragraph',
        content: 'Règle d\'or : si vous ne contrôlez pas vos clés privées, vous ne possédez pas vraiment vos bitcoins.'
      },
      {
        type: 'paragraph',
        content: 'Quand vos BTC sont sur une plateforme d\'échange, c\'est la plateforme qui détient les clés. Ils peuvent geler votre compte, se faire hacker, faire faillite (coucou FTX).'
      },
      {
        type: 'paragraph',
        content: 'Pour vraiment posséder vos bitcoins, il faut les transférer sur un wallet dont vous seul avez les clés.'
      },
      {
        type: 'heading',
        content: 'Comment obtenir des bitcoins ?'
      },
      {
        type: 'heading3',
        content: 'Les acheter (99% des gens)'
      },
      {
        type: 'paragraph',
        content: 'Le plus simple : passer par une plateforme d\'échange. Coinbase, Binance, Kraken, Bitstamp... Y\'en a des tonnes.'
      },
      {
        type: 'paragraph',
        content: 'Vous créez un compte, vous vérifiez votre identité (obligations légales), vous virez des euros, vous achetez vos BTC.'
      },
      {
        type: 'paragraph',
        content: 'Attention aux frais qui varient énormément d\'une plateforme à l\'autre.'
      },
      {
        type: 'image',
        content: '/images/btc.jpg',
        imageAlt: 'Bitcoin BTC - Symbole de la cryptomonnaie',
        imageCaption: 'Le symbole BTC représente Bitcoin sur les plateformes d\'échange.'
      },
      {
        type: 'heading3',
        content: 'Les miner (pour les costauds)'
      },
      {
        type: 'paragraph',
        content: 'Techniquement possible, mais en pratique, à moins d\'avoir accès à de l\'électricité vraiment pas chère et du capital pour investir dans du matériel, vous serez pas rentable.'
      },
      {
        type: 'paragraph',
        content: 'Le minage est devenu une industrie ultra-compétitive dominée par de grosses fermes.'
      },
      {
        type: 'heading3',
        content: 'Vous en faire envoyer'
      },
      {
        type: 'paragraph',
        content: 'Si vous connaissez quelqu\'un qui a des bitcoins, il peut vous en envoyer. Il suffit de lui donner votre adresse Bitcoin.'
      },
      {
        type: 'paragraph',
        content: 'Ou vous pouvez proposer des biens/services en échange de BTC.'
      },
      {
        type: 'heading',
        content: 'Le cours du Bitcoin : on en parle ?'
      },
      {
        type: 'heading3',
        content: 'Volatilité, bonjour'
      },
      {
        type: 'paragraph',
        content: 'Bitcoin est volatile. Très volatile. Ça peut monter de 20% en une semaine et descendre de 30% la suivante.'
      },
      {
        type: 'paragraph',
        content: 'Depuis 2009, le BTC a connu plusieurs cycles : euphorie, bulle, krach, marché baissier interminable, puis ça recommence.'
      },
      {
        type: 'heading3',
        content: 'Les cycles et les halvings'
      },
      {
        type: 'paragraph',
        content: 'Historiquement, les gros bull runs arrivent 12-18 mois après les halvings. Pourquoi ? Parce que l\'offre de nouveaux bitcoins diminue d\'un coup, mais la demande continue d\'augmenter.'
      },
      {
        type: 'paragraph',
        content: 'Halving 2012 → bull run 2013<br/>Halving 2016 → bull run 2017<br/>Halving 2020 → bull run 2021<br/>Halving 2024 → on verra...'
      },
      {
        type: 'paragraph',
        content: 'Mais attention : le passé ne garantit rien. Chaque cycle est différent.'
      },
      {
        type: 'heading3',
        content: 'Qu\'est-ce qui fait bouger le prix ?'
      },
      {
        type: 'list',
        content: [
          '<strong>Adoption institutionnelle</strong> : les ETF, les entreprises qui mettent du BTC à leur bilan',
          '<strong>Régulation</strong> : une annonce positive ou négative d\'un gros pays',
          '<strong>Macro-économie</strong> : inflation, politique des banques centrales, crises financières',
          '<strong>Sentiment du marché</strong> : la peur et la cupidité, tout simplement',
          '<strong>Événements techniques</strong> : halvings, mises à jour du protocole',
          '<strong>Actualité</strong> : un hack d\'une grosse plateforme, un pays qui adopte Bitcoin...'
        ]
      },
      {
        type: 'heading',
        content: 'Faut-il investir ?'
      },
      {
        type: 'paragraph',
        content: 'On ne vous dira jamais quoi faire de votre argent. Vraiment.'
      },
      {
        type: 'paragraph',
        content: 'Ce qu\'on peut dire :'
      },
      {
        type: 'list',
        content: [
          'N\'investissez que ce que vous pouvez vous permettre de perdre totalement',
          'La volatilité est brutale, faut avoir le cœur bien accroché',
          'Pensez long terme si vous achetez',
          'Diversifiez, mettez pas tous vos œufs dans le même panier',
          'Formez-vous avant d\'investir : discutez avec la communauté sur <a href="https://www.reddit.com/r/Bitcoin/" target="_blank" rel="noopener noreferrer">r/Bitcoin</a>, lisez, posez des questions'
        ]
      },
      {
        type: 'paragraph',
        content: 'Les gourous qui vous promettent que "BTC sera à 1 million en 2027" ? Fuyez. Personne ne sait.'
      },
      {
        type: 'heading',
        content: 'Les personnalités importantes'
      },
      {
        type: 'heading3',
        content: 'Satoshi Nakamoto'
      },
      {
        type: 'paragraph',
        content: 'Le créateur fantôme. A publié le white paper en 2008, a miné les premiers blocs, a disparu en 2011.'
      },
      {
        type: 'paragraph',
        content: 'Il détient environ 1 million de BTC qui n\'ont jamais bougé (environ 100 milliards de dollars au cours actuel).'
      },
      {
        type: 'paragraph',
        content: 'Des dizaines de personnes ont été soupçonnées d\'être Satoshi. Aucune n\'a pu le prouver. Le mystère reste entier et c\'est peut-être mieux ainsi.'
      },
      {
        type: 'heading3',
        content: 'Hal Finney'
      },
      {
        type: 'paragraph',
        content: 'Le premier à avoir reçu des bitcoins de Satoshi. Développeur brillant, early adopter, beaucoup le soupçonnent d\'être Satoshi ou d\'avoir bossé étroitement avec lui.'
      },
      {
        type: 'paragraph',
        content: 'Décédé en 2014. Son corps a été cryogénisé.'
      },
      {
        type: 'heading3',
        content: 'Nick Szabo'
      },
      {
        type: 'paragraph',
        content: 'Cryptographe légendaire, créateur du concept de "bit gold" (précurseur de Bitcoin). Beaucoup pensent qu\'il est Satoshi. Il a toujours démenti.'
      },
      {
        type: 'paragraph',
        content: 'Contributeur majeur à la philosophie derrière les crypto-monnaies.'
      },
      {
        type: 'heading3',
        content: 'Andreas Antonopoulos'
      },
      {
        type: 'image',
        content: '/images/andreas-antonopoulos.jpg',
        imageAlt: 'Andreas Antonopoulos - Éducateur Bitcoin de référence',
        imageCaption: 'Andreas Antonopoulos est l\'un des éducateurs Bitcoin les plus respectés.'
      },
      {
        type: 'paragraph',
        content: 'Éducateur Bitcoin de référence. Ses conférences sur YouTube ont converti des milliers de personnes.'
      },
      {
        type: 'paragraph',
        content: 'Il explique les concepts les plus complexes avec des mots simples. Si vous voulez comprendre Bitcoin en profondeur, regardez ses vidéos.'
      },
      {
        type: 'heading3',
        content: 'Michael Saylor'
      },
      {
        type: 'paragraph',
        content: 'PDG de MicroStrategy, il a converti la trésorerie de sa boîte en Bitcoin (des milliards de dollars). Devenu l\'un des plus gros shills de BTC.'
      },
      {
        type: 'paragraph',
        content: 'Certains le trouvent inspirant, d\'autres pensent qu\'il est complètement barré.'
      },
      {
        type: 'heading3',
        content: 'Les développeurs core'
      },
      {
        type: 'paragraph',
        content: 'Le développement de Bitcoin continue avec une équipe de développeurs bénévoles. Pas de chef, juste des gens passionnés qui améliorent le code.'
      },
      {
        type: 'paragraph',
        content: 'Chaque amélioration doit être acceptée par la communauté (nœuds et mineurs). Personne ne peut imposer de changement.'
      },
      {
        type: 'heading',
        content: 'Les limites et défis'
      },
      {
        type: 'heading3',
        content: 'Scalabilité'
      },
      {
        type: 'paragraph',
        content: '7 transactions par seconde, c\'est pas ouf. Le Lightning Network aide, mais tout le monde n\'est pas encore convaincu que c\'est LA solution.'
      },
      {
        type: 'heading3',
        content: 'Consommation énergétique'
      },
      {
        type: 'paragraph',
        content: 'Bitcoin consomme beaucoup d\'électricité. Les défenseurs disent que ça sécurise le réseau et utilise de plus en plus d\'énergies renouvelables. Les détracteurs trouvent ça inadmissible.'
      },
      {
        type: 'heading3',
        content: 'Expérience utilisateur'
      },
      {
        type: 'paragraph',
        content: 'C\'est encore compliqué pour Monsieur Tout-le-Monde. Les clés privées, les seed phrases, les adresses... Faut être un minimum tech-savvy.'
      },
      {
        type: 'heading3',
        content: 'Régulation incertaine'
      },
      {
        type: 'paragraph',
        content: 'Chaque pays fait sa sauce. Certains encouragent, d\'autres interdisent, la plupart tâtonnent.'
      },
      {
        type: 'paragraph',
        content: 'Cette incertitude freine l\'adoption.'
      },
      {
        type: 'heading',
        content: 'Conclusion : Bitcoin en 2026'
      },
      {
        type: 'paragraph',
        content: 'Bitcoin a 17 ans. Pour une technologie monétaire, c\'est rien. L\'euro en a 25, le dollar des siècles.'
      },
      {
        type: 'paragraph',
        content: 'Est-ce que Bitcoin va remplacer l\'euro ou le dollar ? Probablement pas. Est-ce qu\'il va devenir une réserve de valeur acceptée mondialement, un peu comme l\'or ? C\'est déjà en train de se passer.'
      },
      {
        type: 'paragraph',
        content: 'Les banques centrales lancent leurs monnaies numériques (CBDC). Les gouvernements régulent de plus en plus. Bitcoin continue son bonhomme de chemin, imperturbable, décentralisé, résistant.'
      },
      {
        type: 'paragraph',
        content: 'Ça reste un pari risqué. Mais c\'est aussi une technologie fascinante, une expérience monétaire unique, et pour certains, une assurance contre un système financier traditionnel qu\'ils ne contrôlent pas.'
      },
      {
        type: 'paragraph',
        content: 'Ce site vous permet de suivre le cours en temps réel, de voir les variations, de comparer avec les autres cryptos. Le reste, c\'est à vous de le décider.'
      }
    ]
  },
  ethereum: {
    slug: 'ethereum',
    title: 'À propos d\'Ethereum',
    heroImage: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=1200&h=600&fit=crop',
    heroImageAlt: 'Ethereum - La plateforme blockchain pour contrats intelligents',
    sections: [
      {
        type: 'paragraph',
        content: 'Ethereum (ETH) est la deuxième plus grande cryptomonnaie par capitalisation boursière après Bitcoin.'
      },
      {
        type: 'paragraph',
        content: 'Ethereum se distingue de Bitcoin par sa capacité à exécuter des contrats intelligents (smart contracts) et des applications décentralisées (dApps). Cette fonctionnalité a révolutionné l\'écosystème blockchain en permettant la création de protocoles financiers décentralisés (DeFi), de tokens non fongibles (NFT) et de nombreuses autres innovations.'
      },
      {
        type: 'paragraph',
        content: 'La plateforme Ethereum utilise sa propre cryptomonnaie, l\'Ether (ETH), comme carburant pour exécuter les opérations sur le réseau. Les développeurs peuvent créer et déployer des applications décentralisées qui fonctionnent exactement comme programmées, sans risque de censure, de fraude ou d\'interférence de tiers.'
      },
      {
        type: 'heading',
        content: 'L\'évolution d\'Ethereum'
      },
      {
        type: 'paragraph',
        content: 'Ethereum a été proposé en 2013 par Vitalik Buterin et lancé en 2015. Le réseau a récemment effectué une transition majeure vers Ethereum 2.0, passant du mécanisme de consensus Proof of Work (PoW) au Proof of Stake (PoS), ce qui réduit considérablement sa consommation d\'énergie et améliore sa scalabilité.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=1200&h=600&fit=crop',
        imageAlt: 'Ethereum blockchain et contrats intelligents',
        imageCaption: 'Ethereum permet l\'exécution de contrats intelligents et d\'applications décentralisées.'
      },
      {
        type: 'heading',
        content: 'Caractéristiques principales'
      },
      {
        type: 'list',
        content: [
          'Plateforme blockchain pour contrats intelligents et dApps',
          'Créée en 2015 par Vitalik Buterin',
          'Transition vers Ethereum 2.0 avec Proof of Stake',
          'Écosystème DeFi et NFT le plus développé',
          'Langage de programmation Solidity pour les smart contracts',
          'Machine virtuelle Ethereum (EVM) pour l\'exécution de code décentralisé'
        ]
      },
      {
        type: 'heading',
        content: 'L\'écosystème Ethereum'
      },
      {
        type: 'paragraph',
        content: 'Ethereum héberge le plus grand écosystème de finance décentralisée (DeFi), permettant aux utilisateurs de prêter, emprunter, échanger et gagner des intérêts sur leurs cryptomonnaies sans intermédiaires traditionnels. La plateforme est également le berceau de la plupart des projets NFT, permettant la création et l\'échange de tokens non fongibles.'
      },
      {
        type: 'paragraph',
        content: 'Avec des milliers de dApps construites sur Ethereum, la plateforme continue d\'être le choix privilégié des développeurs cherchant à créer des applications blockchain innovantes. L\'adoption croissante et les améliorations continues de la plateforme renforcent sa position de leader dans l\'espace blockchain.'
      }
    ]
  }
}

/**
 * Get crypto content by slug
 */
export function getCryptoContent(slug: string): CryptoContent | null {
  return cryptoContent[slug.toLowerCase()] || null
}

