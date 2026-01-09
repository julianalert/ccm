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
    title: 'Ethereum : tout ce qu\'il faut savoir en 2026',
    heroImage: '/images/ethereum.jpg',
    heroImageAlt: 'Ethereum - La plateforme blockchain pour contrats intelligents',
    sections: [
      {
        type: 'heading',
        content: 'C\'est quoi Ethereum exactement ?'
      },
      {
        type: 'paragraph',
        content: 'Ethereum, c\'est bien plus qu\'une simple crypto-monnaie. C\'est un ordinateur mondial décentralisé qui permet à n\'importe qui de créer des applications qui tournent sans qu\'aucune entreprise ou gouvernement puisse les arrêter.'
      },
      {
        type: 'paragraph',
        content: 'Lancé en 2015 par Vitalik Buterin (un génie russe-canadien qui avait 19 ans à l\'époque), Ethereum a introduit le concept révolutionnaire des smart contracts - des programmes qui s\'exécutent automatiquement quand certaines conditions sont remplies. Pour en savoir plus sur l\'histoire et les détails techniques, consultez <a href="https://fr.wikipedia.org/wiki/Ethereum" target="_blank" rel="noopener noreferrer">l\'article Wikipedia sur Ethereum</a>.'
      },
      {
        type: 'paragraph',
        content: 'Bitcoin, c\'est de l\'argent numérique. Ethereum, c\'est une plateforme sur laquelle vous pouvez construire à peu près n\'importe quoi : des applications financières, des jeux, des réseaux sociaux, des organisations autonomes, et bien plus encore.'
      },
      {
        type: 'heading',
        content: 'Le problème qu\'Ethereum voulait résoudre'
      },
      {
        type: 'paragraph',
        content: 'Aujourd\'hui, quand vous utilisez une app, vos données sont stockées sur les serveurs d\'une entreprise. Amazon, Google, Facebook - ils ont tout. Vos photos, vos messages, vos infos bancaires.'
      },
      {
        type: 'paragraph',
        content: 'C\'est pratique, mais ça pose des problèmes :'
      },
      {
        type: 'list',
        content: [
          'Ces entreprises peuvent faire ce qu\'elles veulent de vos données',
          'Un gouvernement peut les forcer à vous espionner',
          'Un pirate peut hacker leurs serveurs',
          'L\'entreprise peut fermer du jour au lendemain et vous perdez tout',
          'Ils peuvent vous censurer ou bannir sans recours'
        ]
      },
      {
        type: 'paragraph',
        content: 'L\'idée d\'Ethereum ? Remplacer ces serveurs centralisés par un réseau décentralisé de milliers d\'ordinateurs. Vos données vous appartiennent. Les applications tournent de manière autonome. Personne ne peut les arrêter ou les modifier sans consensus du réseau.'
      },
      {
        type: 'heading',
        content: 'Comment ça marche concrètement ?'
      },
      {
        type: 'heading3',
        content: 'La blockchain Ethereum'
      },
      {
        type: 'paragraph',
        content: 'Comme Bitcoin, Ethereum utilise une blockchain - un registre public de toutes les transactions. Mais la blockchain Ethereum peut stocker bien plus que des transactions monétaires : elle peut exécuter du code.'
      },
      {
        type: 'paragraph',
        content: 'Chaque nœud du réseau (des milliers d\'ordinateurs partout dans le monde) possède une copie complète de cette blockchain. Quand quelqu\'un lance une transaction ou exécute un smart contract, tous les nœuds vérifient et valident.'
      },
      {
        type: 'image',
        content: '/images/ethereum.jpg',
        imageAlt: 'Blockchain Ethereum - Réseau décentralisé pour applications',
        imageCaption: 'La blockchain Ethereum permet d\'exécuter du code décentralisé et des smart contracts.'
      },
      {
        type: 'heading3',
        content: 'Les smart contracts, le truc qui change tout'
      },
      {
        type: 'paragraph',
        content: 'Un smart contract, c\'est un programme qui vit sur la blockchain. Une fois déployé, il est immuable - personne ne peut le modifier, pas même celui qui l\'a créé.'
      },
      {
        type: 'paragraph',
        content: 'L\'exemple classique : un distributeur automatique. Vous mettez 2€, vous appuyez sur un bouton, vous recevez votre canette. Tout est automatique, pas besoin de vendeur.'
      },
      {
        type: 'paragraph',
        content: 'Les smart contracts, c\'est pareil mais pour n\'importe quelle transaction ou accord :'
      },
      {
        type: 'list',
        content: [
          'Une assurance qui se déclenche automatiquement si votre vol est annulé',
          'Un prêt qui se rembourse tout seul selon des conditions prédéfinies',
          'Un système de vote où les résultats sont impossibles à truquer',
          'Des NFTs qui donnent des royalties automatiques aux créateurs à chaque revente'
        ]
      },
      {
        type: 'paragraph',
        content: 'Le code, c\'est la loi. Si le smart contract dit que X doit se passer quand Y arrive, ça se passera. Pas de middle man, pas d\'interprétation, pas de magouille possible.'
      },
      {
        type: 'heading3',
        content: 'L\'Ether (ETH), le carburant du réseau'
      },
      {
        type: 'image',
        content: '/images/eth.jpg',
        imageAlt: 'Ether ETH - La crypto-monnaie native d\'Ethereum',
        imageCaption: 'L\'Ether (ETH) est le carburant qui alimente toutes les opérations sur Ethereum.'
      },
      {
        type: 'paragraph',
        content: 'Ether (ETH), c\'est la crypto-monnaie native d\'Ethereum. Elle sert à deux trucs :'
      },
      {
        type: 'paragraph',
        content: '<strong>Payer les frais de transaction</strong> : chaque opération sur Ethereum coûte du "gas" (littéralement du carburant). Vous envoyez de l\'ETH ? Ça coûte du gas. Vous exécutez un smart contract ? Ça coûte du gas. Ces frais sont payés en ETH et vont aux validateurs qui sécurisent le réseau.'
      },
      {
        type: 'paragraph',
        content: '<strong>Staker pour sécuriser le réseau</strong> : depuis septembre 2022, Ethereum fonctionne en Proof of Stake. Vous pouvez "staker" (bloquer) vos ETH pour devenir validateur et gagner des récompenses. Plus de minage énergivore comme Bitcoin.'
      },
      {
        type: 'paragraph',
        content: 'Contrairement à Bitcoin (limité à 21 millions), il n\'y a pas de limite stricte au nombre d\'ETH. Par contre, depuis la mise à jour EIP-1559 en 2021, une partie des frais de transaction est "brûlée" (détruite). Et avec le Proof of Stake, beaucoup moins d\'ETH est créé. Résultat : dans certaines périodes, ETH devient déflationnaire.'
      },
      {
        type: 'heading',
        content: 'The Merge : la transformation historique de 2022'
      },
      {
        type: 'paragraph',
        content: 'Le 15 septembre 2022, Ethereum a accompli un des exploits techniques les plus impressionnants de l\'histoire de la crypto : passer du Proof of Work au Proof of Stake sans arrêter le réseau. Comme changer le moteur d\'un avion en plein vol.'
      },
      {
        type: 'heading3',
        content: 'C\'est quoi le Proof of Stake ?'
      },
      {
        type: 'paragraph',
        content: '<strong>Avant (Proof of Work)</strong> : des mineurs avec des ordinateurs ultra-puissants se faisaient concurrence pour résoudre des problèmes mathématiques complexes. Le gagnant validait le bloc et recevait une récompense. Ça consommait autant d\'électricité qu\'un pays entier.'
      },
      {
        type: 'paragraph',
        content: '<strong>Après (Proof of Stake)</strong> : des validateurs stakent (bloquent) 32 ETH comme caution. Ils sont sélectionnés aléatoirement pour valider les blocs. S\'ils font bien leur job, ils gagnent des récompenses. S\'ils trichent ou sont offline, ils perdent une partie de leur stake (c\'est le "slashing").'
      },
      {
        type: 'heading3',
        content: 'Les résultats du Merge'
      },
      {
        type: 'list',
        content: [
          '<strong>Consommation énergétique réduite de 99,95%</strong> : Ethereum est passé de la consommation d\'un petit pays à celle d\'une petite ville',
          '<strong>Émission d\'ETH réduite de 90%</strong> : beaucoup moins d\'ETH créé, parfois même déflationnaire',
          '<strong>Réseau plus sécurisé</strong> : attaquer Ethereum coûte maintenant des milliards et vous perdez votre mise',
          '<strong>Les validateurs</strong> : aujourd\'hui plus d\'1 million de validateurs, avec plus de 34 millions d\'ETH stakés (environ 28% de l\'offre totale)'
        ]
      },
      {
        type: 'paragraph',
        content: 'Depuis, plusieurs upgrades majeures ont suivi :'
      },
      {
        type: 'list',
        content: [
          '<strong>Shanghai (avril 2023)</strong> : les gens peuvent enfin retirer leur ETH staké (avant, c\'était bloqué)',
          '<strong>Dencun (mars 2024)</strong> : introduction des "blobs" qui réduisent drastiquement les frais sur les Layer 2',
          '<strong>Pectra (mai 2025)</strong> : améliore l\'efficacité du staking et des validateurs',
          '<strong>Fusaka (décembre 2025)</strong> : continue d\'optimiser le réseau'
        ]
      },
      {
        type: 'heading',
        content: 'L\'écosystème Ethereum en 2026'
      },
      {
        type: 'heading3',
        content: 'Les Layer 2 : la vraie révolution scalabilité'
      },
      {
        type: 'paragraph',
        content: 'Le gros problème d\'Ethereum ? La scalabilité. Le réseau principal ne peut traiter qu\'environ 15-30 transactions par seconde. Visa en fait 65 000.'
      },
      {
        type: 'paragraph',
        content: 'Les Layer 2 (L2), c\'est des réseaux construits au-dessus d\'Ethereum qui traitent les transactions hors de la chaîne principale, puis envoient le résultat final à Ethereum pour la sécurité. Comme ça, vous gardez la sécurité d\'Ethereum mais avec des frais ridicules et une vitesse folle.'
      },
      {
        type: 'paragraph',
        content: 'Les gros players en 2026 :'
      },
      {
        type: 'list',
        content: [
          '<strong>Base</strong> : lancé par Coinbase, c\'est devenu le Layer 2 le plus utilisé. TVL de plusieurs milliards, des millions de transactions par jour. L\'avantage ? L\'intégration directe avec la base d\'utilisateurs massive de Coinbase.',
          '<strong>Arbitrum</strong> : un des pionniers, toujours dans le top 3. Super pour la DeFi, interopérable avec plein d\'autres chaînes.',
          '<strong>Optimism</strong> : a créé le concept de "Superchain" - un écosystème de L2 interopérables qui partagent la liquidité. Base en fait partie d\'ailleurs.',
          '<strong>zkSync, Starknet, Polygon zkEVM</strong> : utilisent les ZK-rollups, une technologie encore plus avancée qui offre plus de confidentialité et d\'efficacité.'
        ]
      },
      {
        type: 'paragraph',
        content: 'Les chiffres qui comptent : les L2 ont collectivement plus de 47 milliards de dollars de TVL début 2026. Ils traitent 17x plus de transactions qu\'Ethereum mainnet et ont réduit les frais d\'autant.'
      },
      {
        type: 'paragraph',
        content: 'L\'avenir ? Ethereum devient la couche de règlement final (settlement layer) pendant que les L2 gèrent l\'activité quotidienne. Vitalik lui-même dit qu\'on vise les 100 000 transactions par seconde à terme.'
      },
      {
        type: 'heading3',
        content: 'La DeFi (Finance Décentralisée)'
      },
      {
        type: 'paragraph',
        content: 'Ethereum, c\'est la maison de la DeFi. Des services financiers sans banque :'
      },
      {
        type: 'list',
        content: [
          '<strong>Prêts et emprunts</strong> : Aave, Compound - vous prêtez ou empruntez des cryptos sans passer par une banque',
          '<strong>Échanges décentralisés</strong> : Uniswap, Curve - échangez des cryptos directement avec d\'autres utilisateurs',
          '<strong>Stablecoins</strong> : USDC, DAI, USDT - des cryptos indexées sur le dollar',
          '<strong>Yield farming</strong> : gagnez des intérêts en fournissant de la liquidité',
          '<strong>Dérivés</strong> : GMX, dYdX - tradez des produits financiers complexes sans courtier'
        ]
      },
      {
        type: 'paragraph',
        content: 'La TVL totale de la DeFi sur Ethereum ? Plus de 50 milliards de dollars.'
      },
      {
        type: 'heading3',
        content: 'Les NFTs'
      },
      {
        type: 'paragraph',
        content: 'Les NFTs (tokens non fongibles) ont explosé sur Ethereum. C\'est la chaîne qui héberge la majorité des NFTs de valeur : art numérique, collections, musique, tickets, biens immobiliers virtuels...'
      },
      {
        type: 'paragraph',
        content: 'Même si le marché NFT a refroidi depuis l\'euphorie de 2021-2022, l\'infrastructure reste et de nouveaux cas d\'usage émergent : authentification de produits de luxe, diplômes universitaires, billets d\'événements...'
      },
      {
        type: 'heading3',
        content: 'Les DAOs (Organisations Autonomes Décentralisées)'
      },
      {
        type: 'paragraph',
        content: 'Des organisations sans patron, gouvernées par des smart contracts et des votes de la communauté. Les membres détiennent des tokens de gouvernance qui leur donnent le droit de vote sur les décisions.'
      },
      {
        type: 'paragraph',
        content: 'Des exemples : MakerDAO (gère le stablecoin DAI), Uniswap DAO, Arbitrum DAO... Ces organisations gèrent des milliards de dollars de manière totalement transparente et démocratique.'
      },
      {
        type: 'heading3',
        content: 'Le staking liquide'
      },
      {
        type: 'paragraph',
        content: 'Vous voulez staker vos ETH mais garder la liquidité ? Des protocoles comme Lido ou Rocket Pool le font pour vous. Vous déposez vos ETH, vous recevez des stETH (staked ETH) que vous pouvez utiliser ailleurs pendant que vos ETH sont stakés et génèrent des rendements.'
      },
      {
        type: 'paragraph',
        content: 'Lido contrôle environ 28% de tout l\'ETH staké (c\'était 30%, ça diminue progressivement avec la décentralisation). Le rendement du staking ? Entre 3% et 5% annuel actuellement.'
      },
      {
        type: 'heading3',
        content: 'L\'adoption institutionnelle'
      },
      {
        type: 'paragraph',
        content: 'Contrairement à 2020, les institutions sont là maintenant :'
      },
      {
        type: 'list',
        content: [
          'Franklin Templeton a tokenisé des fonds sur Ethereum',
          'Des grandes entreprises lancent leurs propres Layer 2 (Sony avec Soneium)',
          'Worldchain (par Worldcoin) a dépassé 10 millions d\'utilisateurs',
          'Les banques testent les stablecoins et les paiements sur Ethereum',
          'Les ETF Ethereum spot arrivent progressivement. Aux USA, la SEC étudie même la possibilité d\'autoriser le staking dans les ETF ETH.'
        ]
      },
      {
        type: 'heading',
        content: 'Les défis qui restent'
      },
      {
        type: 'heading3',
        content: 'L\'expérience utilisateur'
      },
      {
        type: 'paragraph',
        content: 'Soyons honnêtes : Ethereum c\'est encore trop compliqué pour Monsieur Tout-le-Monde. Les seed phrases, les clés privées, les wallets, le gas, les différentes chaînes... C\'est le bordel.'
      },
      {
        type: 'paragraph',
        content: 'Les solutions arrivent : les wallets deviennent plus simples, l\'account abstraction permet des expériences proches du Web2, les Layer 2 réduisent les frais. Mais y\'a encore du boulot.'
      },
      {
        type: 'heading3',
        content: 'La fragmentation des Layer 2'
      },
      {
        type: 'paragraph',
        content: 'Le succès des L2 crée un nouveau problème : vos ETH sont sur Base, mais l\'app que vous voulez utiliser est sur Arbitrum. Il faut bridge (transférer entre chaînes), c\'est chiant et ça coûte.'
      },
      {
        type: 'paragraph',
        content: 'Les solutions : le Superchain d\'Optimism, les shared sequencers, les protocoles d\'interopérabilité. L\'objectif ? Que ça ressemble à un seul Ethereum unifié plutôt qu\'à 50 chaînes isolées.'
      },
      {
        type: 'heading3',
        content: 'La centralisation cachée'
      },
      {
        type: 'paragraph',
        content: 'La plupart des L2 sont encore assez centralisés. Un seul séquenceur (opérateur), des clés de mise à jour aux mains de quelques personnes... La décentralisation, c\'est un objectif à long terme, pas la réalité d\'aujourd\'hui pour beaucoup de L2.'
      },
      {
        type: 'paragraph',
        content: 'Ethereum lui-même reste décentralisé, mais faut être conscient que les couches au-dessus le sont moins.'
      },
      {
        type: 'heading3',
        content: 'La régulation'
      },
      {
        type: 'paragraph',
        content: 'Les régulateurs adorent embêter Ethereum. La SEC américaine a longtemps considéré que l\'ETH pourrait être un security (titre financier), ce qui imposerait des régulations lourdes.'
      },
      {
        type: 'paragraph',
        content: 'En 2026, le cadre réglementaire se clarifie un peu aux USA avec le CLARITY Act en discussion. L\'Europe a déjà son règlement MiCA depuis 2024. Mais ça reste un terrain mouvant.'
      },
      {
        type: 'heading3',
        content: 'Ethereum et l\'informatique quantique'
      },
      {
        type: 'paragraph',
        content: 'Vitalik et les développeurs core prennent très au sérieux la menace quantique. Des ordinateurs quantiques suffisamment puissants pourraient casser la cryptographie actuelle d\'Ethereum.'
      },
      {
        type: 'paragraph',
        content: 'La solution ? Développer des algorithmes résistants au quantique et préparer une migration future. C\'est pas pour demain, mais c\'est sur le radar.'
      },
      {
        type: 'heading',
        content: 'Ethereum vs les concurrents'
      },
      {
        type: 'heading3',
        content: 'Solana'
      },
      {
        type: 'paragraph',
        content: 'Le gros concurrent. Ultra-rapide (des milliers de TPS), frais ridicules. Mais beaucoup plus centralisé et moins de développeurs/d\'applications matures qu\'Ethereum.'
      },
      {
        type: 'heading3',
        content: 'Cardano'
      },
      {
        type: 'paragraph',
        content: 'L\'approche académique et méthodique. Proof of Stake depuis le début, focus sur la gouvernance. Mais l\'écosystème reste beaucoup plus petit qu\'Ethereum.'
      },
      {
        type: 'heading3',
        content: 'Binance Smart Chain / BNB Chain'
      },
      {
        type: 'paragraph',
        content: 'Une copie quasi-identique d\'Ethereum mais centralisée et contrôlée par Binance. Moins cher, plus rapide, mais aux antipodes de la philosophie décentralisée.'
      },
      {
        type: 'heading3',
        content: 'Avalanche, Fantom, etc.'
      },
      {
        type: 'paragraph',
        content: 'Plein de chaînes qui promettent la même chose : plus rapide et moins cher qu\'Ethereum. Le problème ? L\'effet de réseau. Ethereum a les développeurs, les apps, la liquidité, la communauté. Dur de concurrencer ça.'
      },
      {
        type: 'paragraph',
        content: 'La réalité en 2026 : Ethereum reste dominant avec plus de 50% de la TVL totale DeFi et l\'écosystème d\'applications le plus riche. Les autres ont leurs niches, mais Ethereum garde son statut de "blockchain mondiale par défaut".'
      },
      {
        type: 'heading',
        content: 'Les personnalités importantes'
      },
      {
        type: 'heading3',
        content: 'Vitalik Buterin'
      },
      {
        type: 'image',
        content: '/images/vitalik.png',
        imageAlt: 'Vitalik Buterin - Créateur d\'Ethereum',
        imageCaption: 'Vitalik Buterin, le créateur d\'Ethereum, reste très actif dans le développement du protocole.'
      },
      {
        type: 'paragraph',
        content: 'Le créateur. Génie russe-canadien, il a conceptualisé Ethereum à 19 ans. Aujourd\'hui, il reste ultra-actif dans le développement du protocole, publie régulièrement des posts techniques sur sa vision pour Ethereum.'
      },
      {
        type: 'paragraph',
        content: 'Connu pour sa transparence, son éthique, et son côté un peu awkward. Il possède encore pas mal d\'ETH mais en donne régulièrement à des causes caritatives.'
      },
      {
        type: 'heading3',
        content: 'Les co-fondateurs'
      },
      {
        type: 'paragraph',
        content: 'Ethereum a été co-fondé par plusieurs personnes :'
      },
      {
        type: 'list',
        content: [
          '<strong>Gavin Wood</strong> : a écrit le Yellow Paper (la spec technique), créateur de Polkadot maintenant',
          '<strong>Charles Hoskinson</strong> : parti créer Cardano',
          '<strong>Joseph Lubin</strong> : fondateur de ConsenSys, énorme entreprise qui développe des outils Ethereum'
        ]
      },
      {
        type: 'heading3',
        content: 'Les développeurs core'
      },
      {
        type: 'paragraph',
        content: 'Contrairement à beaucoup de projets crypto, Ethereum n\'a pas de "chef". Le développement est géré par des dizaines de développeurs bénévoles ultra-compétents qui proposent des améliorations (les EIPs - Ethereum Improvement Proposals). Pour suivre les développements officiels, visitez <a href="https://ethereum.org/fr/" target="_blank" rel="noopener noreferrer">ethereum.org</a> et <a href="https://ethereum.foundation/" target="_blank" rel="noopener noreferrer">l\'Ethereum Foundation</a>.'
      },
      {
        type: 'heading',
        content: 'ETH comme investissement ?'
      },
      {
        type: 'heading3',
        content: 'La proposition de valeur'
      },
      {
        type: 'paragraph',
        content: 'ETH n\'est pas juste une monnaie, c\'est :'
      },
      {
        type: 'list',
        content: [
          'Le carburant de tout l\'écosystème Ethereum',
          'Un actif productif (via le staking)',
          'Une part dans le réseau (plus d\'activité = plus de fees brûlés = potentiellement déflationnaire)'
        ]
      },
      {
        type: 'paragraph',
        content: 'Avec le Merge et le staking, ETH devient un actif qui génère un rendement natif (3-5% par an). Ajoutez la déflation potentielle, et certains parlent d\'ETH comme d\'une "obligation à rendement ultérieur".'
      },
      {
        type: 'heading3',
        content: 'La volatilité'
      },
      {
        type: 'paragraph',
        content: 'ETH reste volatile. Très volatile. Ça peut monter de 50% en un mois et descendre de 40% le mois suivant. Le ATH (all-time high) était autour de 4800$ en novembre 2021. Depuis, ça a oscillé entre 1000$ et 4000$.'
      },
      {
        type: 'paragraph',
        content: 'Début 2026, l\'ETH tourne autour de 3000-3500$ selon les jours.'
      },
      {
        type: 'heading3',
        content: 'Les risques'
      },
      {
        type: 'list',
        content: [
          '<strong>Risque technologique</strong> : un bug critique dans le code (rare mais pas impossible)',
          '<strong>Risque réglementaire</strong> : des régulations qui tuent l\'adoption',
          '<strong>Risque de concurrence</strong> : une autre chaîne qui mange la part de marché d\'Ethereum',
          '<strong>Risque de centralisation</strong> : si Lido ou quelques gros validateurs contrôlent trop de stake',
          '<strong>Risque de fragmentation</strong> : les L2 deviennent trop isolés et l\'effet réseau d\'Ethereum se dilue'
        ]
      },
      {
        type: 'heading3',
        content: 'Notre position'
      },
      {
        type: 'paragraph',
        content: 'On ne vous dira jamais "achetez de l\'ETH" ou "vendez". Chacun sa gestion du risque, chacun sa stratégie.'
      },
      {
        type: 'paragraph',
        content: 'Ce qu\'on peut dire : Ethereum a la plus grosse adoption, le plus gros écosystème, les meilleurs développeurs. Mais ça garantit rien. La techno évolue vite, la régulation peut tout changer, la concurrence est féroce.'
      },
      {
        type: 'paragraph',
        content: 'Si vous investissez : pensez long terme, ne mettez que ce que vous pouvez perdre, diversifiez, et formez-vous.'
      },
      {
        type: 'heading',
        content: 'L\'avenir d\'Ethereum'
      },
      {
        type: 'heading3',
        content: 'La roadmap technique'
      },
      {
        type: 'paragraph',
        content: 'Vitalik a une vision claire pour Ethereum, organisée en plusieurs axes (il les appelle "The Surge", "The Verge", "The Purge", "The Splurge") :'
      },
      {
        type: 'list',
        content: [
          '<strong>Plus de blobs</strong> : augmenter la capacité de données pour les L2 (objectif : 100 000 TPS à terme)',
          '<strong>Stateless clients</strong> : permettre de valider Ethereum sans télécharger toute la blockchain',
          '<strong>Account abstraction</strong> : rendre les wallets beaucoup plus simples à utiliser',
          '<strong>PBS (Proposer-Builder Separation)</strong> : séparer les rôles pour plus de décentralisation',
          '<strong>Quantum resistance</strong> : préparer la résistance aux ordinateurs quantiques'
        ]
      },
      {
        type: 'heading3',
        content: 'La vision à long terme'
      },
      {
        type: 'paragraph',
        content: 'Ethereum veut devenir la couche de règlement mondiale. La blockchain sur laquelle tout se construit. Les L2 gèrent l\'activité quotidienne, Ethereum valide et sécurise le tout.'
      },
      {
        type: 'paragraph',
        content: 'Un internet décentralisé où vous contrôlez vraiment vos données, vos actifs, votre identité. Où les applications ne peuvent pas vous bannir arbitrairement. Où les transactions financières sont accessibles à n\'importe qui dans le monde.'
      },
      {
        type: 'paragraph',
        content: 'Utopie ou réalité future ? On verra. Mais en 2026, Ethereum reste de loin la blockchain la plus proche de cette vision.'
      },
      {
        type: 'heading',
        content: 'Conclusion'
      },
      {
        type: 'paragraph',
        content: 'Bottom line : Ethereum a 11 ans maintenant. C\'est plus un projet expérimental, c\'est une infrastructure mature qui sécurise des centaines de milliards de dollars et des milliers d\'applications. Les défis restent énormes, mais l\'innovation continue et l\'écosystème ne fait que grandir.'
      },
      {
        type: 'paragraph',
        content: 'Ce site vous permet de suivre le cours d\'ETH en temps réel et de comparer avec les autres cryptos. Pour le reste, DYOR (Do Your Own Research) comme on dit dans le milieu.'
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

