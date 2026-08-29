// 1. Nos données de base
let panier = { baobab: 0, datte: 0, miel: 0, folere: 0, curcuma: 0, piment: 0 };
const prixProduits = { baobab: 1000, datte: 1000, miel: 3000, folere: 1000, curcuma: 1000, piment: 650 };

// 2. Fonction de mise à jour de l'affichage (calcul du total et du badge)
function mettreAjourLeTotal() {
    let totalGeneral = 0;
    totalGeneral += panier.baobab * prixProduits.baobab;
    totalGeneral += panier.datte * prixProduits.datte;
    totalGeneral += panier.miel * prixProduits.miel;
    totalGeneral += panier.folere * prixProduits.folere;
    totalGeneral += panier.curcuma * prixProduits.curcuma;
    totalGeneral += panier.piment * prixProduits.piment;

    // Afficher le prix total
    const elementTotal = document.getElementById("prix-total");
    if (elementTotal) {
        elementTotal.textContent = totalGeneral + " XFA";
    }

    // Afficher le nombre total d'articles
    let totalArticles = panier.baobab + panier.datte + panier.miel + panier.folere + panier.curcuma + panier.piment;
    const badge = document.getElementById("badge-compteur");
    if (badge) {
        badge.textContent = totalArticles;
    }

    // Badge du panier dans l'en-tête (icône 🛒 en haut de page)
    const badgeEntete = document.getElementById("compteurPanier");
    if (badgeEntete) {
        badgeEntete.textContent = totalArticles;
    }

    // Badge individuel sur chaque produit (ex: badge-baobab, badge-miel...)
    Object.keys(panier).forEach((nomProduit) => {
        const badgeProduit = document.getElementById("badge-" + nomProduit);
        if (badgeProduit) {
            badgeProduit.textContent = panier[nomProduit];
        }
    });

    // Activer ou désactiver le bouton si le panier est vide
    const boutonCommande = document.getElementById("bouton-valider");
    if (boutonCommande) {
        if (totalGeneral === 0) {
            boutonCommande.disabled = true;
            boutonCommande.style.opacity = "0.5";
        } else {
            boutonCommande.disabled = false;
            boutonCommande.style.opacity = "1";
        }
    }
}

// 3. Fonction pour ajouter un produit (Appelée par vos boutons de produits)
function ajouter(nomDuProduit) {
    panier[nomDuProduit] = panier[nomDuProduit] + 1;
    mettreAjourLeTotal();
}

// 4. NOUVEAUTÉ : La fonction d'envoi de la commande
function envoyerCommande() {
    // On récupère les valeurs écrites dans les cases du formulaire
    const nom = document.getElementById("client-nom").value;
    const tel = document.getElementById("client-tel").value;
    const quartier = document.getElementById("client-quartier").value;

    // Sécurité : On vérifie que l'utilisateur a bien rempli tous les champs
    if (nom === "" || tel === "" || quartier === "") {
        alert("Veuillez s'il vous plaît remplir toutes vos informations de livraison.");
        return; // On arrête la fonction ici si un champ est vide
    }

    // On prépare le texte de la commande
    let message = "Bonjour MHAL NATURAL FOODS, voici ma commande :\n\n";
    message = message + "👤 Client : " + nom + "\n";
    message = message + "📞 Téléphone : " + tel + "\n";
    message = message + "📍 Quartier : " + quartier + "\n\n";
    message = message + "📦 Contenu de la commande :\n";

    // On ajoute les produits commandés au texte de manière simple
    if (panier.baobab > 0) { message = message + "- Baobab : x" + panier.baobab + "\n"; }
    if (panier.datte > 0)  { message = message + "- Datte : x" + panier.datte + "\n"; }
    if (panier.miel > 0)   { message = message + "- Miel : x" + panier.miel + "\n"; }
    if (panier.folere > 0) { message = message + "- Foléré : x" + panier.folere + "\n"; }
    if (panier.curcuma > 0){ message = message + "- Curcuma : x" + panier.curcuma + "\n"; }
    if (panier.piment > 0) { message = message + "- Piment : x" + panier.piment + "\n"; }

    // On ajoute le prix total calculé à l'aide de l'élément HTML existant
    const prixTexte = document.getElementById("prix-total").textContent;
    message = message + "\n💵 Montant Total : " + prixTexte;

    // Votre numéro WhatsApp de réception (Format international sans le +)
    const numeroEntreprise = "237651363546";

    // On transforme le texte pour qu'il soit lisible dans un lien internet (encodeURIComponent)
    const lienWhatsApp = "https://wa.me/" + numeroEntreprise + "?text=" + encodeURIComponent(message);

    // On ouvre le lien WhatsApp dans un nouvel onglet
    window.open(lienWhatsApp, "_blank");
}

// 5. Initialise tous les badges à 0 au chargement de la page
document.addEventListener("DOMContentLoaded", mettreAjourLeTotal);

// 6. Menu mobile (hamburger)
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mainMenu = document.getElementById("mainMenu");

    if (hamburgerBtn && mainMenu) {
        hamburgerBtn.addEventListener("click", () => {
            const estOuvert = mainMenu.classList.toggle("menu-ouvert");
            hamburgerBtn.classList.toggle("actif", estOuvert);
            hamburgerBtn.setAttribute("aria-expanded", estOuvert ? "true" : "false");
        });

        // Ferme le menu quand on clique sur un lien
        mainMenu.querySelectorAll("a").forEach((lien) => {
            lien.addEventListener("click", () => {
                mainMenu.classList.remove("menu-ouvert");
                hamburgerBtn.classList.remove("actif");
                hamburgerBtn.setAttribute("aria-expanded", "false");
            });
        });
    }
});
//menu_info js 
      document.addEventListener("DOMContentLoaded", () => {
    // 1. Ligne modifiée pour cibler tous les blocs produits de votre boutique
    const produits = document.querySelectorAll(".produit");

    // 2. Bloc pour le flou automatique (crée le calque en arrière-plan sans toucher à votre CSS)
    const calqueFlou = document.createElement("div");
    calqueFlou.style.position = "fixed";
    calqueFlou.style.top = "0";
    calqueFlou.style.left = "0";
    calqueFlou.style.width = "100vw";
    calqueFlou.style.height = "100vh";
    calqueFlou.style.background = "rgba(0, 0, 0, 0.3)";
    calqueFlou.style.backdropFilter = "blur(8px)";
    calqueFlou.style.webkitBackdropFilter = "blur(8px)";
    calqueFlou.style.zIndex = "9998"; // Reste sous le menu pour qu'il soit net
    calqueFlou.style.display = "none";
    document.body.appendChild(calqueFlou);

    let menuActif = null;

    // 3. Structure de la boucle pour que chaque bouton ouvre son propre menu
    produits.forEach((produit) => {
        const infoBtn = produit.querySelector(".infos");
        const menuInfos = produit.querySelector(".menu_infos");

        if (infoBtn && menuInfos) {
            infoBtn.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();

                if (window.getComputedStyle(menuInfos).display === "none") {
                    if (menuActif) menuActif.style.display = "none";

                    // Affiche le flou d'arrière-plan
                    calqueFlou.style.display = "block";

                    // Force le menu à s'afficher proprement au-dessus du flou
                    menuInfos.style.display = "block";
                    menuInfos.style.position = "fixed";
                    menuInfos.style.top = "50%";
                    menuInfos.style.left = "50%";
                    menuInfos.style.transform = "translate(-50%, -50%)";
                    menuInfos.style.zIndex = "9999"; // Passe devant le flou pour rester NET
                    menuInfos.style.width = "300px";
                    menuInfos.style.maxWidth = "90%";
                    menuInfos.style.height = "550px";
                    menuInfos.style.overflowY = "auto";   
                    menuInfos.style.backgroundColor = "rgb(14,43,14)"; // Fond blanc solide obligatoire pour bloquer le flou
        
                    menuActif = menuInfos;
                } else {
                    menuInfos.style.display = "none";
                    calqueFlou.style.display = "none";
                    menuActif = null;
                }
            });
        }
    });

    // Écouteur pour fermer le menu si on clique sur le flou
    calqueFlou.addEventListener("click", () => {
        if (menuActif) menuActif.style.display = "none";
        calqueFlou.style.display = "none";
        menuActif = null;
    });
});

        
