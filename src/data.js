import * as img from "../constants";

const data = [
    {
        content: [
            {
                title: "ceQueSontLesMenstruations",
                category: "Menstruations",
                content: ["ceQueSontLesMenstruationsContent"],
                list: ["Le nom scientifique des règles, un écoulement périodique de sang faisant partie du cycle menstruel ;", "Un processus naturel et sain chez les filles et les femmes en âge de procréer ; ", "Un signe qu’une fille a atteint l’âge de la puberté ;", "La preuve qu’une femme n'est pas enceinte ;", "Elles proviennent de la destruction de la couche interne de l’utérus, composée de sang et de muqueuse utérine ou endomètre, dû à la chute du taux d’hormones ovariennes s’il n’y a pas eu de fécondation."],
                content2: ["Les premières règles d’une fille sont appelées ménarche et leurs apparitions varient d’une fille à une autre.  Comme c’est un processus naturel ayant un lien avec la dignité humaine, il faut arrêter les tabous autour de cela (moqueries, exclusion, la honte). On a le droit d’en parler librement surtout en cas de problèmes."],
                urlImg: img.images.ceQueSontLesMenstruations,
            },
            {
                title: "leCycleMenstruel",
                category: "Menstruations",
                content: ["leCycleMenstruelContent", "Un cycle menstruel se compte à partir du premier jour des règles et se termine la veille des prochaines règles. En général, il dure entre 21 à 45 jours et la moyenne est de 28 jours. Pour chaque femme, la durée du cycle varie selon :"],
                list: ["son âge (le cycle est irrégulier pendant les premières règles et la période avant la ménopause)", "sa condition physique (poids, santé, fatigue)", "le stress et le choc émotionnel", "les contraceptifs hormonaux (pilule, injection) "],
                content2: ["Pour le calculer, il faut noter la date du premier jour des règles sur plusieurs mois. Si les règles arrivent le 18 août et les prochaines le 15 septembre c’est que le cycle dure 28 jours. Pour trouver l’ovulation il faut soustraire 14 à 28 (la durée du cycle), ainsi, l’ovulation est le 31 août.", "Ce calcul est valable pour tous les cycles, pour un cycle de 21 jours (21-14= 7), l’ovulation a lieu le 7e jour. Pour un cycle de 45 jours (45-14=31) l’ovulation aura lieu le 31e jour du cycle."],
                urlImg: img.images.cycleMenstruel,
            },
            {
                title: "lesPhasesDuCycleMenstruel",
                category: "Menstruations",
                content: ["lesPhasesDuCycleMenstruelContent"],
                imgInside: true,
                content2: ["La phase de fécondité est la période pendant laquelle une femme peut tomber enceinte si elle a eu un rapport sexuel non protégé. Elle dépend de la durée du cycle. Pour un cycle régulier, elle commence quatre jours avant l’ovulation et se termine deux jours après cela.", "L’ovulation est le moment où l’ovule est expulsé par l’un des ovaires dans la trompe de Fallope pour attendre la fécondation. Comme pour les règles, le jour de l'ovulation peut varier d'un cycle à l'autre. L’ovule peut vivre jusqu’à 24h dans les trompes de Fallope. Pendant cette période, s’il ne rencontre pas de spermatozoïde, il meurt. Elle est marquée par des pertes vaginales, une libido renforcée, une augmentation de la température corporelle, une sensibilité des seins, un changement de position du col de l’utérus lors de l’ovulation et quelques fois des douleurs et crampes abdominales ou dans le bas du dos.", "En effet certaines femmes ressentent des douleurs ovulatoires, plus légères que celles des règles, on les appelle mittelschmerz. Ces douleurs, dues à l’augmentation rapide d'hormone, sont ressenties au milieu du bassin ou dans le bas-ventre, du même côté que l'ovaire qui a expulsé un ovule. Elles s’accompagnent parfois de pertes de sang légères et de l’apparition d’un ganglion au niveau de l’aine. ", "Il n'existe pas de traitement officiel recommandé pour les douleurs ovulatoires. Néanmoins, la douleur peut être gérée de la même manière que les crampes menstruelles : par la chaleur, des massages ou des médicaments antidouleur en vente libre."],
                urlImg: img.images.phasesDuCycleMenstruel
            },
            {
                title: "syndromeMenstruel",
                category: "Menstruations",
                content: ["syndromeMenstruelContent", "Des changements physiques tels que : "],
                list: ["crampes abdominales,", "ballonnements,", "prise de poids,", "fringales,", "poussée d’acnés,", "seins douloureux,", "maux de tête ou étourdissements."],
                content2: ["Des changements émotionnels :"],
                list2: ["sautes d’humeur (colère, euphorie, irritabilité, tristesse)", "agressivité,", "manque de concentration, confusion,", "fatigue,", "état dépressif (anxiété ou panique, nervosité)."],
                urlImg: img.images.syndromePremenstruel
            },
            {
                title: "lesPertesVaginales",
                category: "Menstruations",
                content: ["lesPertesVaginalesContent", "Si vous avez des pertes habituellement avec une légère odeur, il n’y a rien à craindre, elles sont normales. Comme leur rôle est de protéger la flore vaginale et de nettoyer le vagin, il ne faut surtout pas les enlever lors de la douche."],
                urlImg: img.images.perteVaginal
            }, {
                title: "leSpotting",
                category: "Menstruations",
                content: ["lesSpottingContent"],
                urlImg: img.images.spotting
            }, {
                title: "pertesAnormales",
                category: "Menstruations",
                content: ["pertesAnormalesContent", "Quand la glaire est abondante et qu’elle ressemble à du yaourt ou du lait caillé tout en s’accompagnant de démangeaisons, il peut s’agir d’une mycose vaginale. Elle ne dégage pas d’odeur particulière.", "Quand elle est verdâtre accompagnée d’une mauvaise odeur, cela peut signifier une IST appelée la « trichomonas ». Les pertes sont mousseuses et causent des irritations au moment d’uriner ou lors des rapports sexuels.", "Une glaire grise ayant une forte odeur de poisson pourri signifie une maladie appelée vaginose.", "Les pertes vaginales roses ou brunes qui apparaissent au milieu du cycle sans cause apparente peuvent être dues à une IST."],
                urlImg: img.images.pertesAnormales
            }, {
                title: "laMenopause",
                category: "Menstruations",
                content: ["laMenopauseContent", "La transition vers la ménopause peut se faire petit à petit, souvent en commençant par des changements dans le cycle menstruel. On parle de « périménopause » à partir du moment où ces signes sont observés pour la première fois et cela se termine à l’arrêt permanent des menstruations.", "Les signes annonçant la ménopause sont :"],
                list: ["L’irrégularité des règles", "Les bouffées de chaleur", "Des sueurs nocturnes", "Une perturbation du sommeil", "Des troubles de l'humeur", "Une baisse de libido", "La sécheresse vaginale", "Un vieillissement de la peau, des cheveux plus fins", "Une légère prise de poids"],
                urlImg: img.images.menopause
            }
        ]
    }, {

        content: [
            {
                title: "hygieneIntimePendantLesRegles",
                category: "Hygiène menstruelle",
                content: ["hygieneIntimePendantLesReglesContent"],
                urlImg: img.images.hygienneIntimePendantLesRegles
            },
            {
                title: "lesDifferentsTypesDeProtegeHygienique",
                category: "Hygiène menstruelle",
                content: ["lesDifferentsTypesDeProtegeHygieniqueContent"],
                list: ["la serviette hygiénique, meilleure surtout pour les premières règles ;", "le linge en coton ;", "le protège-slip ;", "la culotte menstruelle ;", "le tampon"],
                urlImg: img.images.differentsTypesProtegeHygienique
            }, {
                title: "laServietteHygieniqueJetable",
                category: "Hygiène menstruelle",
                content: ["laServietteHygieniqueJetableContent", " On peut trouver des serviettes hygiéniques de jour et de nuit, ces dernières sont plus épaisses pour assurer une meilleure protection et éviter les débordements. Les serviettes de jour doivent être changées toutes les 3 heures, même si elles ne sont pas pleines, pour éviter la prolifération des bactéries et ne pas causer de mycose. Ce délai est plus long pour les serviettes de nuit. En cas de règles hémorragique il est nécessaire de les changer même durant la nuit. Si on ne connait pas encore son flux menstruel, il est préférable de choisir la serviette la plus grande et changer par la suite."],
                urlImg: img.images.servitteHygieniqueJetable
            }, {
                title: "laProtectionEnTissu",
                category: "Hygiène menstruelle",
                content: ["laProtectionEnTissuContent", "Attention : "],
                list: ["Il faut toujours choisir un linge en coton pour éviter les bactéries et les irritations.", "Elle doit être changée toutes les heures.", "Il est interdit de l’introduire dans le vagin.", "Il faut la laver avec du savon, l’eau seule ne suffit pas", "Après le lavage, il faut l’étendre au soleil et en hauteur pour éviter la poussière ou que les animaux ne les touchent. Si l’endroit dans lequel elle a été étendue n’est pas ensoleillé, il est nécessaire de repasser le tissu."],
                urlImg: img.images.protectionEnTissu
            },
            {
                title: "tissuVsServiette",
                category: "Hygiène menstruelle",
                content: ["Tableau (en cours ...)"],
                urlImg: img.images.tissuVsServiette
            },


            {
                title: "laServietteHygieniqueLavable",
                category: "Hygiène menstruelle",
                content: ["laServietteHygieniqueLavableContent"],
                urlImg: img.images.servietteHygieniqueLavable
            },
            {
                title: "leProtegeSlip",
                category: "Hygiène menstruelle",
                content: ["leProtegeSlipContent"],
                urlImg: img.images.protegeSlip
            },
            {
                title: "laCulotteMenstruelle",
                category: "Hygiène menstruelle",
                content: ["laCulotteMenstruelleContent"],
                urlImg: img.images.culotteMenstruelle
            },

            {
                title: "leTampon",
                category: "Hygiène menstruelle",
                content: ["leTamponContent", "Toutefois, le port du tampon pendant plus de 6 heures ou pendant la nuit peut entraîner une stagnation du sang dans le vagin, créant un environnement propice à la croissance de bactéries. Pour minimiser le risque de problèmes tels que les infections vaginales, il est crucial de suivre attentivement les instructions d'utilisation du tampon :"],
                list: ["Avant et après son insertion, il est important de bien se laver les mains ;", "Il est recommandé de le changer régulièrement, au moins toutes les 6 heures ;", "Opter pour une protection adaptée à son flux est essentiel ;", "Pour des nuits prolongées, optez plutôt pour des serviettes hygiéniques ;", "En dehors des règles, il ne faut pas l'utiliser, par exemple, pour absorber les pertes vaginales ;", "Après avoir nagé, il est recommandé de changer de tampon ;", "Si l’emballage présente des déchirures, il doit être jeté, car il risque d’avoir été sali."],
                urlImg: img.images.tampon
            },
            {
                title: "La « cup » ou coupe menstruelle ",
                category: "Hygiène menstruelle",
                content: ["cupContent", "Réutilisable, elle doit être retirée puis vidée au cours de la journée et lavée à l’eau chaude et au savon doux à chaque fois. Comme le tampon, sa mauvaise utilisation (tel l’usage trop prolongé) peut entraîner un syndrome de choc toxique, car le sang qui stagne favorise la prolifération de bactéries."],
                urlImg: img.images.cup
            },

        ]
    }, {
        content: [
            {
                title: "dysmenorrhees",
                category: "Troubles et maladies",
                content: ["dysmenorrheesContent", "La dysménorrhée est due à une hormone qui est responsable de la contraction du muscle utérin et d’autres changements physiques avant l’arrivée des règles. Elle est primaire si elle est pathologique c’est-à-dire qu’elle n’est causée par aucune maladie, par contre elle est secondaire si elle découle d’une maladie telle que l’endométriose ou encore l’adénomyose."],
                urlImg: img.images.douleurMenstruelle
            }, {
                title: "amenorrhee",
                category: "Troubles et maladies",
                content: ["amenorrheeContent", "L’aménorrhée est primaire si une jeune fille de 16 ans ou plus n’a pas encore eu ses premières règles. On parle d’aménorrhée secondaire quand il y a une interruption des règles pendant un ou plusieurs cycles."],
                urlImg: img.images.abscenceDeRegles
            }, {
                title: "saignementEnDehorsDesRegles",
                category: "Troubles et maladies",
                content: ["saignementEnDehorsDesReglesContent"],
                list: ["liés à une lésion de l’appareil génital (infections, endométriose ou adénomyose, cancer du col de l’utérus et du vagin, fibromes utérins -très fréquents...),", "dus à un déséquilibre hormonal (sécrétion insuffisante d’hormones ou hémorragies utérines dues au stress et effets secondaires des médicaments ou de certaines herbes) ;", "des métrorragies qui ont une cause générales (anomalies congénitales ou des pathologies acquises causant la coagulation du sang)"],
                urlImg: img.images.saignementDehorsRegles
            }, {
                title: "mycoseVaginale",
                category: "Troubles et maladies",
                content: ["mycoseVaginaleContent", "Ce déséquilibre est dû à l’affaiblissement du système immunitaire, à la prise trop élevée d’antibiotiques, à la prise de pilule contraceptive, à la grossesse, au diabète, à la pratique abusive de douches vaginales, au port de vêtements et de sous-vêtements synthétiques. Il se produit également lorsque les rapports sexuels non protégés altèrent l'acidité du vagin à cause des spermatozoïdes, et les frottements pendant les rapports peuvent déplacer des bactéries vers le vagin.", "Toutefois, une mycose vaginale n’est pas considérée comme une infection sexuellement transmissible. Les symptômes les plus courants d’une mycose vaginale sont :"],
                list: ["les démangeaisons et/ou les brûlures autour de la vulve (organes externes génitaux de la femme) et de l'ouverture vaginale ;", "les pertes vaginales blanches ou jaunes pouvant être épaisses mais n’ont pas nécessairement d’odeur ;", "les douleurs lors des rapports sexuels ;", "•	la douleur,  la rougeur et le gonflement de la vulve;", "les douleurs en urinant."],
                content2: ["La mycose est traitée avec des médicaments antifongiques prescrits par les gynécologues."],
                urlImg: img.images.mycoseVaginal
            },


            {
                title: "endometriose",
                category: "Troubles et maladies",
                content: ["endometrioseContent", "Elle entraîne des douleurs aiguës pendant les règles, les rapports sexuels et aux toilettes. D’autre part, elle cause des douleurs pelviennes chroniques, des ballonnements, des nausées et de la fatigue, et parfois une dépression, de l’angoisse et une infertilité. Néanmoins, certaines personnes ne présentent aucun symptôme, dans ce cas, elles ne sont pas au courant de la maladie. Ces symptômes peuvent s’atténuer après la ménopause, mais pas toujours.", "Il n’existe actuellement pas de remède contre l’endométriose, on peut seulement atténuer les symptômes par des médicaments, voire une intervention chirurgicale."],
                urlImg: img.images.endometriose
            }, {
                title: "kysteOvarien",
                category: "Troubles et maladies",
                content: ["kysteOvarienContent", "La plupart ne présentent aucun symptôme mais dans certains cas, ils peuvent être accompagnés de règles irrégulières, de douleurs pelviennes dans un côté du corps, douleurs pendant les rapports sexuels ou de troubles intestinaux et urinaires irrégulières.", "On distingue deux types de kystes ovariens :"],
                list: ["Les kystes fonctionnels de l’ovaire qui surviennent avant la ménopause. Ils sont les plus fréquents et découlent d’un dysfonctionnement de l’ovaire. Ce type de grosseur est susceptible de disparaître spontanément en seulement quelques cycles. Ils peuvent changer de volume, disparaitre avec les règles et réapparaitre au cycle suivant. Dans certains cas, ils sont dus à un traitement stimulant l’ovulation ou de produits contraceptifs comme la pose d’un stérilet.", "Les kystes organiques de l’ovaire dont la cause est inconnue et sont permanents. Contrairement aux kystes fonctionnels, leur volume ne change pas quel que soit le moment du cycle menstruel. On distingue les kystes organiques ovariens séreux (remplis de liquide) ; les kystes mucoïdes ou mucineux (remplis de mucus) ; les kystes dermoïdes qui ressemblent à la peau et peuvent contenir des cheveux ou des dents ; et les kystes endométriosiques liés à une endométriose."],
                urlImg: img.images.kysteOvarien
            }, {
                title: "fibromes",
                category: "Troubles et maladies",
                content: ["fibromesContent", "Leurs causes ne sont pas encore connues. Les facteurs de risque possibles sont des antécédents familiaux de fibrome, l'obésité ou une puberté précoce. Il semble aussi qu’une élévation des taux d’hormones féminines stimule leur croissance. Ils peuvent se développer pendant la grossesse (lorsque les taux de ces hormones augmentent), et ils tendent à disparaître à la ménopause (lorsque ces taux baissent de façon drastique). Certains cas ne présentent pas de symptômes mais un examen est nécessaire tous les 6 à 12 mois afin d’observer leur évolution.", " Les fibromes peuvent provoquer douleurs, métrorragie, constipation, fausses couches à répétition et besoin fréquent d’uriner. Les traitements comprennent la prise de médicaments (afin de soulager les symptômes ou de limiter leur développement) ou l'ablation des fibromes ou de l’utérus par une intervention chirurgicale.", "Les fibromes peuvent se situer à divers endroits de l’utérus :"],
                list: ["sous la surface externe de l’utérus ;", "à l’intérieur de la paroi utérine ;", "sous la couche interne  de l’utérus."],
                urlImg: img.images.fibromes
            },

        ]
    }, {
        content: [
            {
                title: "definitionEtAvantages",
                category: "Planning Familiale",
                content: ["definitionEtAvantagesContent"],
                list: ["éviter les grossesses non désirées,", "décider du nombre d’enfants désiré,", "assurer un espacement convenable entre les naissances,", "programmer les naissances au meilleur moment quant à l’âge de la mère."],
                content2: ["Au point de vue santé : "],
                list2: ["contribue à la réduction de la mortalité et morbidité maternelle et infantile entre autres la fistule obstétricale.", "améliore le bien-être des mères et de la famille.", "contribue au développement socio-économique de la famille et du pays.", "peut aider à ralentir les taux de croissance démographique et à modérer l’impact sur l’environnement (épuisement des ressources naturelles, demande croissante d’eau, pollution...)."],
                urlImg: img.images.definitionsEtAvantages
            },

            {
                title: "typesDePlanningFamilial",
                category: "Planning Familiale",
                content: ["typesDePlanningFamilialContent"],
                list: ["Méthode hormonale", "Méthode mécanique", "Méthode barrière", "Méthode naturelle", "Méthode chirurgicale (méthode définitive)"],
                urlImg: img.images.typesDePlanningFamilial
            },

            {
                title: "methodeHormonale",
                category: "Planning Familiale",
                content: ["methodeHormonaleContent"],
                list: ["la contraception d'urgence, également appelée « pilule du lendemain », utilise des hormones pour éviter une grossesse après un rapport sexuel non protégé, efficace dans les 72 heures suivant le rapport. En revanche, elle ne doit pas être utilisée régulièrement, son efficacité est supérieure à 58% ;", "le contraceptif oral combiné, souvent appelé « pilule », contenant des hormones pour empêcher la production d'ovules, est efficace à 91% lorsqu'il est pris à heure fixe ;", "le contraceptif microdosé, également appelé « micropilule », adapté aux femmes allaitantes car il contient peu d'hormone, avec une efficacité de 90% à 97% ;", "le contraceptif injectable, administré mensuellement ou trimestriellement, bloque l'ovulation avec une efficacité de l'ordre de 97%, mais nécessite une régularité dans les injections ;", "l'implant contraceptif, inséré sous la peau, bloque la production d'ovules avec une efficacité dépassant 99%, nécessitant un renouvellement tous les 3 à 5 ans par un professionnel de santé."],
                urlImg: img.images.methodeHormonale
            }, {
                title: "methodeMecanique",
                category: "Planning Familiale",
                content: ["methodeMecaniqueContent"],
                urlImg: img.images.methodeMecanique
            },

            {
                title: "methodeBarriere",
                category: "Planning Familiale",
                content: "methodeBarriereContent",
                urlImg: img.images.methodeBarriere
            }, {
                title: "methodeNaturelle",
                category: "Planning Familiale",
                content: "methodeNaturelleContent",
                urlImg: img.images.methodeNaturelle
            }
            ,
            {
                title: "methodeChirurgicale",
                category: "Planning Familiale",
                content: "methodeChirurgicaleContent",
                urlImg: img.images.methodeChirurgicale
            },
        ]
    }, {
        content: [
            {
                title: "lesBonnesPratiquesDurantLaMenstruation",
                category: "Astuces",
                content: "lesBonnesPratiquesDurantLaMenstruationContent",
                urlImg: img.images.lesBonnesPratiqueDurantLaMenstruation
            }
            , {
                title: "alimentationPendantLesRegles",
                category: "Astuces",
                content: "alimentationPendantLesReglesContent",
                urlImg: img.images.alimentationPendantLesRegles
            }
            , {
                title: "etreActiveDurantLesRegles",
                category: "Astuces",
                content: "etreActiveDurantLesReglesContent",
                urlImg: img.images.etreActiveDurantLesRegles
            }
            , {
                title: "uneBonneHygieneIntime",
                category: "Astuces",
                content: "uneBonneHygieneIntimeContent",
                urlImg: img.images.bonneHygienneIntime
            }
            , {
                title: "soulagerLesDouleursMenstruelles",
                category: "Astuces",
                content: "soulagerLesDouleursMenstruellesContent",
                urlImg: img.images.soulagerLesDouleursMenstruels  
            }
        ]    
    }
]

export default data;