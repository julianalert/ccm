-- Add sample content for Bitcoin and Ethereum
-- This serves as a template for how to structure custom content for cryptocurrencies

-- Update Bitcoin (BTC) with custom content
UPDATE cryptocurrencies
SET 
  description_text = 'Bitcoin (BTC) est une cryptomonnaie majeure sur le marché.

Avec une capitalisation boursière de 1 603 921 631 072,569 €, elle occupe une position importante dans l''écosystème des cryptomonnaies.

Cette cryptomonnaie utilise la technologie blockchain pour garantir la sécurité et la décentralisation des transactions. Elle permet des transferts de valeur rapides et sécurisés sans l''intervention d''une autorité centrale.

Le marché des cryptomonnaies est en constante évolution, et Bitcoin continue de jouer un rôle significatif dans cette transformation financière. Les investisseurs et les utilisateurs suivent de près son évolution, notamment en raison de sa liquidité et de son adoption croissante.

Bitcoin a été créé en 2009 par une personne ou un groupe de personnes utilisant le pseudonyme Satoshi Nakamoto. Il s''agit de la première cryptomonnaie décentralisée, fonctionnant sans banque centrale ni administrateur unique. Le réseau Bitcoin est peer-to-peer et les transactions sont vérifiées par des nœuds de réseau via la cryptographie et enregistrées dans un registre public distribué appelé blockchain.',
  description_image = 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop',
  description_list = '[
    "Première cryptomonnaie décentralisée créée en 2009",
    "Technologie blockchain pour la sécurité et la transparence",
    "Offre limitée à 21 millions de bitcoins",
    "Acceptation croissante comme réserve de valeur",
    "Transactions peer-to-peer sans intermédiaire",
    "Mining par preuve de travail (Proof of Work)"
  ]'::jsonb
WHERE symbol = 'BTC' OR slug = 'bitcoin';

-- Update Ethereum (ETH) with custom content
UPDATE cryptocurrencies
SET 
  description_text = 'Ethereum (ETH) est la deuxième plus grande cryptomonnaie par capitalisation boursière après Bitcoin.

Ethereum se distingue de Bitcoin par sa capacité à exécuter des contrats intelligents (smart contracts) et des applications décentralisées (dApps). Cette fonctionnalité a révolutionné l''écosystème blockchain en permettant la création de protocoles financiers décentralisés (DeFi), de tokens non fongibles (NFT) et de nombreuses autres innovations.

La plateforme Ethereum utilise sa propre cryptomonnaie, l''Ether (ETH), comme carburant pour exécuter les opérations sur le réseau. Les développeurs peuvent créer et déployer des applications décentralisées qui fonctionnent exactement comme programmées, sans risque de censure, de fraude ou d''interférence de tiers.

Ethereum a été proposé en 2013 par Vitalik Buterin et lancé en 2015. Le réseau a récemment effectué une transition majeure vers Ethereum 2.0, passant du mécanisme de consensus Proof of Work (PoW) au Proof of Stake (PoS), ce qui réduit considérablement sa consommation d''énergie et améliore sa scalabilité.',
  description_image = 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=1200&h=600&fit=crop',
  description_list = '[
    "Plateforme blockchain pour contrats intelligents et dApps",
    "Créée en 2015 par Vitalik Buterin",
    "Transition vers Ethereum 2.0 avec Proof of Stake",
    "Écosystème DeFi et NFT le plus développé",
    "Langage de programmation Solidity pour les smart contracts",
    "Machine virtuelle Ethereum (EVM) pour l''exécution de code décentralisé"
  ]'::jsonb
WHERE symbol = 'ETH' OR slug = 'ethereum';

