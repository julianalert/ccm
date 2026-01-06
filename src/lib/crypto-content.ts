import { CryptoContent } from '@/types/crypto-content'

// Crypto content stored in codebase
export const cryptoContent: Record<string, CryptoContent> = {
  bitcoin: {
    slug: 'bitcoin',
    title: 'À propos de Bitcoin',
    heroImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop',
    heroImageAlt: 'Bitcoin - La première cryptomonnaie décentralisée',
    sections: [
      {
        type: 'paragraph',
        content: 'Bitcoin (BTC) est une cryptomonnaie majeure sur le marché. Avec une capitalisation boursière de 1 603 921 631 072,569 €, elle occupe une position importante dans l\'écosystème des cryptomonnaies.'
      },
      {
        type: 'paragraph',
        content: 'Cette cryptomonnaie utilise la technologie blockchain pour garantir la sécurité et la décentralisation des transactions. Elle permet des transferts de valeur rapides et sécurisés sans l\'intervention d\'une autorité centrale.'
      },
      {
        type: 'paragraph',
        content: 'Le marché des cryptomonnaies est en constante évolution, et Bitcoin continue de jouer un rôle significatif dans cette transformation financière. Les investisseurs et les utilisateurs suivent de près son évolution, notamment en raison de sa liquidité et de son adoption croissante.'
      },
      {
        type: 'heading',
        content: 'L\'histoire de Bitcoin'
      },
      {
        type: 'paragraph',
        content: 'Bitcoin a été créé en 2009 par une personne ou un groupe de personnes utilisant le pseudonyme Satoshi Nakamoto. Il s\'agit de la première cryptomonnaie décentralisée, fonctionnant sans banque centrale ni administrateur unique. Le réseau Bitcoin est peer-to-peer et les transactions sont vérifiées par des nœuds de réseau via la cryptographie et enregistrées dans un registre public distribué appelé blockchain.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop',
        imageAlt: 'Bitcoin blockchain et technologie de cryptographie',
        imageCaption: 'Bitcoin utilise la technologie blockchain pour sécuriser toutes les transactions.'
      },
      {
        type: 'heading',
        content: 'Caractéristiques principales'
      },
      {
        type: 'list',
        content: [
          'Première cryptomonnaie décentralisée créée en 2009',
          'Technologie blockchain pour la sécurité et la transparence',
          'Offre limitée à 21 millions de bitcoins',
          'Acceptation croissante comme réserve de valeur',
          'Transactions peer-to-peer sans intermédiaire',
          'Mining par preuve de travail (Proof of Work)'
        ]
      },
      {
        type: 'heading',
        content: 'Pourquoi investir dans Bitcoin ?'
      },
      {
        type: 'paragraph',
        content: 'Bitcoin est souvent considéré comme "l\'or numérique" en raison de sa rareté programmée et de sa fonction de réserve de valeur. De nombreuses institutions financières et entreprises ont commencé à intégrer Bitcoin dans leurs réserves, reconnaissant son potentiel comme protection contre l\'inflation.'
      },
      {
        type: 'paragraph',
        content: 'La liquidité élevée de Bitcoin, combinée à son adoption mondiale croissante, en fait un actif attractif pour les investisseurs cherchant à diversifier leur portefeuille. Cependant, il est important de noter que Bitcoin reste un actif volatil et que les investissements doivent être effectués avec prudence.'
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

