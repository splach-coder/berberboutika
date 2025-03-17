import React, { useState } from 'react';

const FaqItem = ({ question, answer, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="text-black border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-lg">{question}</span>
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqComponent = () => {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 text-black">
      <h1 className="text-4xl font-bold text-center mb-4">F.A.Q.</h1>
      <h2 className="text-3xl font-medium text-center mb-12">Commander sur chabichic.com</h2>

      <div className="space-y-2">
        <FaqItem 
          question="COMMENT PRODUISONS NOUS ?" 
          answer="Tous nos produits sont fabriqués et peints à la main de manière artisanale au Maroc. Ils ne sont donc jamais totalement identiques. Les petits défauts n'en sont pas, ils font partie du charme du fait-main. Chaque pièce est donc unique ! Les couleurs des produits peuvent aussi être différentes sur deux commandes séparées, il est ainsi préférable de commander votre vaisselle en une seule fois."
          defaultOpen={true}
        />
        <FaqItem 
          question="COMMENT FONCTIONNE LE SITE ?" 
          answer="Vous naviguez sur notre site, choisissez vos produits préférés et les ajoutez au panier. Une fois votre sélection terminée, procédez au paiement sécurisé et recevez votre commande chez vous."
        />
        <FaqItem 
          question="LE PAIEMENT EST-IL SÉCURISÉ ?" 
          answer="Oui, tous nos paiements sont sécurisés par un système de cryptage avancé. Nous acceptons les cartes de crédit, PayPal et autres méthodes de paiement sécurisées."
        />
        <FaqItem 
          question="COMMENT UTILISER MON AVOIR ?" 
          answer="Votre avoir est disponible dans votre compte client. Lors de votre prochaine commande, vous pourrez l'utiliser en l'appliquant dans votre panier avant de procéder au paiement."
        />
        <FaqItem 
          question="COMMENT TROUVER LES DIMENSIONS DES PRODUITS ?" 
          answer="Les dimensions détaillées de chaque produit sont mentionnées dans sa description. Vous pouvez y accéder en cliquant sur le produit qui vous intéresse."
        />
        <FaqItem 
          question="UN PRODUIT EST ÉPUISÉ, VA-T-IL REVENIR ?" 
          answer="Nos produits artisanaux sont souvent produits en séries limitées. Si un produit est épuisé, il pourrait être réapprovisionné, mais le délai peut varier. N'hésitez pas à nous contacter pour plus d'informations."
        />
      </div>
      
    </div>
  );
};

export default FaqComponent;