const fs = require('fs');
const path = require('path');
const { internationalProjects: sgProjects } = require('./international_part1.cjs');

// Define Thailand (8)
const thProjects = [
  {
    id: "work_th_001",
    title: "Queen Sirikit National Convention Center (QSNCC)",
    subtitle: "A massive state-of-the-art redevelopment expanding Bangkok's premier convention center to 300,000 square meters.",
    category: "Cultural",
    designType: "Design & Build",
    location: "Bangkok, Thailand",
    locationCategory: "Thailand",
    completionYear: "2022",
    city: "Bangkok",
    airportName: "Suvarnabhumi International Airport (BKK)",
    coordinates: "13.7238° N, 100.5598° E",
    summary: "The redevelopment of Queen Sirikit National Convention Center (QSNCC) transformed Bangkok's premier national venue into an ultra-modern convention and exhibition hub spanning nearly 300,000 square meters. Obayashi executed the massive fast-track reconstruction featuring expansive column-free exhibition halls and traditional Thai architectural motifs.",
    description: "Queen Sirikit National Convention Center (QSNCC) has stood as the pride of Thailand's international diplomacy and commerce since its original debut in 1991. To accommodate massive 21st-century global congresses, Obayashi Corporation spearheaded an ambitious total redevelopment that increased the facility's usable capacity more than fivefold.\n\nThe revitalized center encompasses over 300,000 square meters of exhibition, conference, and commercial facilities. The centerpiece consists of vast column-free exhibition halls spanning 78,500 square meters, supported by colossal long-span steel roof trusses designed to carry heavy suspended exhibition rigging.\n\nArchitecturally, the development marries contemporary sustainable engineering with delicate interpretations of traditional Thai craftsmanship, including undulating ceiling canopies reminiscent of hand-woven Thai silks. Direct underground connectivity links the center seamlessly with the MRT Blue Line subway station.\n\nAchieving LEED Silver certification, the new QSNCC hosted the historic 2022 APEC Economic Leaders' Week shortly after opening, receiving global acclaim for its state-of-the-art audio-visual integration, security systems, and rapid modular turnaround capabilities.",
    detailsList: [
      { label: "Sector", value: "Cultural & Convention Infrastructure" },
      { label: "Sub-Sector", value: "International Exhibition & Conference Center" },
      { label: "Gross Floor Area", value: "298,000 m²" },
      { label: "Exhibition Space", value: "78,500 m² Column-Free Space" },
      { label: "Deadline", value: "2022" },
      { label: "Location", value: "Ratchadaphisek Road, Bangkok, Thailand" }
    ],
    kanjiName: "クイーン・シリキット・ナショナル・コンベンション・センター再開発工事",
    romajiName: "Kuīn Shirikitto Nashonaru Kompenshon Sentā Saikaihatsu Kōji",
    locationStory: "Situated along Ratchadaphisek Road adjacent to Benjakitti Park in downtown Bangkok, functioning as Thailand's primary portal for global summit meetings.",
    challenges: [
      "Executing an enormous 300,000 m² high-specification civic facility under an aggressive fast-track schedule in time for the APEC 2022 Summit.",
      "Erecting heavy long-span structural steel roof trusses spanning over 100 meters above subterranean MRT rail tunnels."
    ],
    solutions: [
      "Implemented comprehensive 4D BIM logistics scheduling and pre-assembled roof truss segments offsite for rapid overnight lifting.",
      "Installed continuous geotechnical vibration and displacement sensors to safeguard adjacent Bangkok MRT rail infrastructure."
    ],
    timeline: [
      { phase: "Demolition & Ground Improvement", date: "2019–2020", desc: "Dismantling of original 1991 venue and installing 1,800 heavy foundation piles." },
      { phase: "Deep Basements & Floor Slabs", date: "2020–2021", desc: "Constructing multi-level subterranean logistics docks and direct MRT subway link." },
      { phase: "Long-Span Roof Truss Erection", date: "2021–2022", desc: "Hoisting massive 110-meter steel trusses and installing acoustic acoustic-rated envelopes." },
      { phase: "APEC Summit Inauguration", date: "September, 2022", desc: "Official handover, LEED certification, and hosting the 2022 APEC World Leaders' Summit." }
    ],
    specs: {
      "Structure": "Composite Steel Truss Roof with Reinforced Concrete Substructure",
      "Gross Area": "298,000 m² (5x expansion of historic venue)",
      "Exhibition Halls": "8 Exhibition Halls, 4 Plenary Halls, 50 Meeting Rooms",
      "Green Rating": "LEED Silver Certified",
      "Client": "N.C.C. Management & Development Co., Ltd.",
      "Construction Method": "Offsite Pre-Assembly & Fast-Track 4D BIM Project Delivery"
    },
    culturalInsight: {
      title: "盛会",
      meaning: "Embodying 'Seikai' (grand celebratory gathering), a dignified hall where cultures and nations converse in harmony.",
      quote: "「賓客盈門」",
      quoteTranslation: "Welcoming esteemed guests from across the world with boundless hospitality."
    }
  },

  {
    id: "work_th_002",
    title: "O-NES TOWER",
    subtitle: "A next-generation 29-story Grade-A smart office skyscraper in Nana, Bangkok, engineered with Japanese CFT composite columns.",
    category: "Offices",
    designType: "Design & Build",
    location: "Sukhumvit, Bangkok, Thailand",
    locationCategory: "Thailand",
    completionYear: "2022",
    city: "Bangkok",
    airportName: "Suvarnabhumi International Airport (BKK)",
    coordinates: "13.7402° N, 100.5539° E",
    summary: "O-NES TOWER is a 29-story Grade-A smart office building developed and constructed by Obayashi's Thai subsidiary (Thai Obayashi). Located in the heart of Sukhumvit with direct BTS Nana skybridge connectivity, the tower features pioneering Concrete-Filled Steel Tube (CFT) seismic engineering and high-efficiency sustainable systems.",
    description: "O-NES TOWER exemplifies Thai Obayashi's commitment to creating human-centric, high-performance commercial architecture in Bangkok. Rising 29 stories above the vibrant Sukhumvit commercial strip, the building serves as Thai Obayashi's new corporate headquarters while providing prime office leasing for multinational corporations.\n\nThe tower incorporates Concrete-Filled Steel Tube (CFT) structural columns, a sophisticated structural technology pioneered in Japan that dramatically enhances earthquake resilience, maximizes usable floor space, and delivers superior fire resistance without bulky internal masonry.\n\nThe exterior facade combines triple-glazed low-E insulated glass with automated sun-tracking exterior aluminum louvers, substantially reducing solar heat gain in Bangkok's tropical climate. Generous landscaped sky terraces, fresh air ionization filtration, and touchless smart building turnstiles provide tenant wellness.\n\nO-NES TOWER achieved both LEED Gold and WELL Gold pre-certifications, earning a reputation as one of Thailand's most technologically sophisticated green commercial addresses.",
    detailsList: [
      { label: "Sector", value: "Commercial Office Skyscraper" },
      { label: "Sub-Sector", value: "Next-Generation Smart Grade-A Corporate Tower" },
      { label: "Storeys", value: "29 Storeys + 4 Basements" },
      { label: "Gross Floor Area", value: "85,000 m²" },
      { label: "Deadline", value: "2022" },
      { label: "Location", value: "Sukhumvit Soi 6, Bangkok, Thailand" }
    ],
    kanjiName: "オー・ネス・タワー新築工事",
    romajiName: "Ō-Nesu Tawā Shinchiku Kōji",
    locationStory: "Strategically located on Sukhumvit Road adjacent to BTS Nana Station, directly connected via an elevated all-weather skybridge walkway.",
    challenges: [
      "Constructing deep multi-level basements and high-rise CFT columns within the narrow confines of one of Bangkok's busiest vehicular corridors.",
      "Meeting stringent dual LEED Gold and WELL Gold indoor environmental quality standards."
    ],
    solutions: [
      "Introduced Japanese Concrete-Filled Steel Tube (CFT) column technology, speeding up vertical erection while slimming down column dimensions.",
      "Integrated smart MERV 14 / HEPA filtration with real-time indoor air quality (IAQ) sensors and automated outdoor air flush cycles."
    ],
    timeline: [
      { phase: "Deep Foundation Piles", date: "2018–2019", desc: "Installing high-capacity barrette piles and diaphragm retaining walls." },
      { phase: "CFT Columns & Steel Frame", date: "2019–2021", desc: "Precision erection of Japanese CFT columns and composite metal floor decks." },
      { phase: "Unitized Low-E Facade", date: "2021–2022", desc: "Installing insulated triple-glazed panels and rooftop solar photovoltaic arrays." },
      { phase: "Commissioning & Headquarters Move", date: "2022", desc: "Thai Obayashi headquarters relocation and commercial tenant handover." }
    ],
    specs: {
      "Structure": "Concrete-Filled Steel Tube (CFT) Columns with Steel Composite Beams",
      "Height / Floors": "29 Storeys Above Ground, 4 Basements",
      "Gross Area": "85,000 m²",
      "Green Ratings": "LEED Gold & WELL Gold Certified",
      "Transit Connection": "Direct BTS Nana Skybridge Link",
      "Client": "Thai Obayashi Corporation Limited",
      "Construction Method": "Japanese CFT Engineering & Automated Smart Building Automation"
    },
    culturalInsight: {
      title: "堅牢",
      meaning: "Embodying 'Kenrō' (unyielding structural integrity), pioneering resilient Japanese composite engineering to safeguard urban enterprise.",
      quote: "「玉樹臨風」",
      quoteTranslation: "Standing elegant and resilient against the changing winds of time."
    }
  },

  {
    id: "work_th_003",
    title: "SAMYAN MITRTOWN",
    subtitle: "A vibrant 222,000 m² mixed-use complex combining Grade-A offices, retail, residential condominiums, and a 24-hour community hub.",
    category: "Urban Redevelopment",
    designType: "General Contracting",
    location: "Pathum Wan, Bangkok, Thailand",
    locationCategory: "Thailand",
    completionYear: "2019",
    city: "Bangkok",
    airportName: "Suvarnabhumi International Airport (BKK)",
    coordinates: "13.7335° N, 100.5284° E",
    summary: "SAMYAN MITRTOWN is a transformative mixed-use urban development constructed by Thai Obayashi at the junction of Phaya Thai and Rama IV Roads. Spanning 222,000 square meters, the complex features a 31-story Grade-A office tower, a 33-story condominium tower, a multi-story lifestyle mall with 24-hour zones, and a dedicated MRT underground pedestrian tunnel.",
    description: "SAMYAN MITRTOWN redefines mixed-use urban placemaking in central Bangkok. Located at the vibrant nexus of Chulalongkorn University and Bangkok's central business district, the multi-award-winning project was built by Thai Obayashi for Golden Land Property Development.\n\nThe complex integrates three distinct functional towers over a dynamic podium: a 31-story Grade-A commercial office tower (Mitrtown Office Tower), a 33-story residential condominium (Triple Y Residence), and a six-story lifestyle and dining center housing Bangkok's pioneering 24-hour co-working and learning zone.\n\nA key engineering highlight of the project was the construction of the Samyan MRT Tunnel, an underground pedestrian tunnel crossing beneath Rama IV Road to directly connect the subterranean retail concourse with the Samyan MRT subway station without disrupting heavy surface traffic.\n\nCertified LEED Gold for building design and construction, SAMYAN MITRTOWN seamlessly integrates intelligent building automation, green pocket parks, and high-efficiency water reclamation.",
    detailsList: [
      { label: "Sector", value: "Urban Redevelopment & Mixed-Use" },
      { label: "Sub-Sector", value: "Commercial Office, Residential & Retail Complex" },
      { label: "Gross Floor Area", value: "222,000 m²" },
      { label: "Towers", value: "31-Storey Office + 33-Storey Condo + Retail Mall" },
      { label: "Deadline", value: "2019" },
      { label: "Location", value: "Rama IV & Phaya Thai Road, Bangkok, Thailand" }
    ],
    kanjiName: "サムヤーン・ミットタウン大規模複合開発新築工事",
    romajiName: "Samuyān Mittotaun Daikibo Fukugō Kaihatsu Shinchiku Kōji",
    locationStory: "Situated at the vibrant gateway to Chulalongkorn University, revitalizing the historic Samyan neighborhood into an educational, creative, and commercial hub.",
    challenges: [
      "Boring a pedestrian subway tunnel beneath Rama IV Road while maintaining unimpeded traffic flow on one of Bangkok's busiest transit corridors.",
      "Coordinating concurrent construction of two distinct high-rise towers (office and residential) above a shared commercial podium."
    ],
    solutions: [
      "Employed pipe-jacking and pipe-roof micro-tunneling methods under Rama IV Road with zero surface road closures.",
      "Utilized synchronized modular jump forms and dedicated material hoist hoppers to erect both superstructures simultaneously."
    ],
    timeline: [
      { phase: "Substructure & Excavation", date: "2016–2017", desc: "Large-scale basement excavation and slurry diaphragm perimeter retaining walls." },
      { phase: "Dual High-Rise Erection", date: "2017–2018", desc: "Simultaneous core climbing for 31-story office and 33-story condo towers." },
      { phase: "Underground MRT Tunnel", date: "2018–2019", desc: "Pipe-jacking pedestrian link under Rama IV Road and retail concourse fit-out." },
      { phase: "LEED Gold Inauguration", date: "September, 2019", desc: "Grand opening of the 24-hour learning zone and office tower tenant move-in." }
    ],
    specs: {
      "Structure": "Post-Tensioned Concrete Frames with High-Strength Concrete Cores",
      "Gross Area": "222,000 m² Mixed-Use Space",
      "Features": "31-Storey Office, 33-Storey Condo, 6-Storey Mall, MRT Tunnel Link",
      "Green Rating": "LEED Gold Certified",
      "Client": "Golden Land Property Development PLC",
      "Construction Method": "Pipe-Jacking Pedestrian Underpass & Concurrent Twin-Tower Superstructure"
    },
    culturalInsight: {
      title: "友誼",
      meaning: "Embodying 'Yūgi' (enduring companionship), 'Mitrtown' reflects a friendly gathering place that nurtures learning, commerce, and community 24/7.",
      quote: "「三人行必有我師」",
      quoteTranslation: "In the company of fellow seekers, endless wisdom is shared."
    }
  },

  {
    id: "work_th_004",
    title: "Park Ventures Ecoplex",
    subtitle: "Bangkok's pioneering LEED Platinum commercial development, integrating Grade-A offices with the luxury Okura Prestige Bangkok hotel.",
    category: "Offices",
    designType: "Design & Build",
    location: "Ploenchit, Bangkok, Thailand",
    locationCategory: "Thailand",
    completionYear: "2011",
    city: "Bangkok",
    airportName: "Suvarnabhumi International Airport (BKK)",
    coordinates: "13.7431° N, 100.5467° E",
    summary: "Park Ventures Ecoplex is a 33-story landmark skyscraper at the corner of Ploenchit and Wireless Roads in central Bangkok. Constructed by Thai Obayashi, it made history as the first mixed-use building in Thailand to achieve prestigious LEED Platinum certification, combining corporate offices with The Okura Prestige Bangkok.",
    description: "Park Ventures Ecoplex stands as a watershed achievement in Southeast Asian green architecture. Constructed by Thai Obayashi for Univentures, the 33-story, 142-meter skyscraper occupies the prestigious corner of Wireless Road and Ploenchit Road in Bangkok's diplomatic embassy quarter.\n\nThe building's poetic silhouette is inspired by the 'Wai'—the traditional Thai gesture of warm greeting and respect—characterized by fluid, converging cantilevered glass planes. The lower floors provide 27,000 square meters of premium column-free office space, while floors 23 through 33 house the five-star Okura Prestige Bangkok hotel, complete with a breathtaking 25-meter cantilevered infinity pool overlooking the city skyline.\n\nObayashi integrated advanced environmental engineering systems, including double-glazed low-E laminated glass that reflects 75% of solar heat, greywater recycling plants, high-efficiency chillers with variable speed drives, and occupancy-sensing LED illumination throughout.\n\nEarning LEED Platinum certification with honors, Park Ventures established the gold standard for luxury, environmental stewardship, and Japanese hospitality in Thailand.",
    detailsList: [
      { label: "Sector", value: "Commercial Office & Luxury Hospitality" },
      { label: "Sub-Sector", value: "LEED Platinum Mixed-Use Skyscraper" },
      { label: "Height / Storeys", value: "142 meters / 33 Storeys" },
      { label: "Gross Floor Area", value: "54,000 m²" },
      { label: "Deadline", value: "2011" },
      { label: "Location", value: "Wireless Road & Ploenchit Road, Bangkok, Thailand" }
    ],
    kanjiName: "パーク・ベンチャーズ・エコプレックス（ホテル・オフィス複合ビル）新築工事",
    romajiName: "Pāku Benchāzu Ekopurekkusu Shinchiku Kōji",
    locationStory: "Standing prominently at the junction of Wireless Road and Ploenchit Road, with a direct elevated skybridge link to BTS Ploenchit Station.",
    challenges: [
      "Constructing a complex 25-meter cantilevered infinity swimming pool extending outward from the 25th floor over Bangkok's skyline.",
      "Attaining Thailand's first LEED Platinum certification for a mixed-use commercial and luxury hotel development."
    ],
    solutions: [
      "Fabricated massive post-tensioned steel outrigger trusses to securely anchor the cantilevered sky pool structure.",
      "Implemented full building commissioning, enthalpy recovery heat exchangers, and 100% closed-loop greywater landscape recycling."
    ],
    timeline: [
      { phase: "Deep Foundation Piling", date: "2008–2009", desc: "Bored cast-in-place piling into deep stiff Bangkok clay strata." },
      { phase: "Concrete Superstructure", date: "2009–2010", desc: "Slipforming the central core and casting angled outward cantilever floor slabs." },
      { phase: "Curtain Wall & Sky Pool Cantilever", date: "2010–2011", desc: "Installing double low-E curtain walling and heavy steel pool cantilevers." },
      { phase: "LEED Platinum Handover", date: "September, 2011", desc: "Hotel opening of The Okura Prestige and historic LEED Platinum award." }
    ],
    specs: {
      "Structure": "Post-Tensioned Reinforced Concrete Frame with Structural Steel Outriggers",
      "Height": "142 meters (33 Storeys)",
      "Hotel Rooms": "240 Luxury Rooms (The Okura Prestige Bangkok)",
      "Green Rating": "LEED Platinum (First in Thailand for Mixed-Use)",
      "Key Feature": "25-Meter Cantilevered Sky Infinity Pool",
      "Client": "Univentures Public Company Limited",
      "Construction Method": "Complex Angled Slipform Core & Post-Tensioned Cantilever Trussing"
    },
    culturalInsight: {
      title: "合掌",
      meaning: "Embodying 'Gasshō' (the Thai Wai gesture of respect and welcome), bowing gracefully toward the city in a timeless gesture of peace.",
      quote: "「和敬清寂」",
      quoteTranslation: "Harmony, respect, purity, and tranquility woven into architecture."
    }
  },

  {
    id: "work_th_005",
    title: "AIA East Gateway",
    subtitle: "A modern 33-story commercial Grade-A and retail office tower in Bangna, designed for environmental sustainability and tenant wellness.",
    category: "Offices",
    designType: "Design & Build",
    location: "Bangna, Bangkok, Thailand",
    locationCategory: "Thailand",
    completionYear: "2022",
    city: "Bangkok",
    airportName: "Suvarnabhumi International Airport (BKK)",
    coordinates: "13.6689° N, 100.6482° E",
    summary: "AIA East Gateway is a 33-story premium Grade-A office and retail development built by Thai Obayashi on Bangna-Trad Road. Spanning 70,000 square meters, the building incorporates forward-looking wellness engineering, extensive urban greenery, sports tracks, and dual LEED Gold and WELL Gold certifications.",
    description: "AIA East Gateway stands as a landmark corporate development anchoring Bangkok's burgeoning eastern economic growth corridor along Bangna-Trad Road. Constructed by Thai Obayashi for AIA Thailand, the 33-story high-rise integrates sustainable corporate commerce with holistic occupant wellness.\n\nThe development features five floors of retail and wellness amenities, topped by 28 floors of premium Grade-A office space with flexible 2,000-square-meter column-free floor plates and high three-meter ceiling clearances. The building boasts an outdoor fitness park, a rooftop jogging track, and multi-tier sky gardens.\n\nTechnical engineering prioritized environmental performance. Obayashi implemented double-glazed low-E ceramic-fritted curtain walling, advanced ultraviolet germicidal irradiation (UVGI) in air handlers, high-efficiency variable-flow chillers, and rooftop rainwater collection cisterns.\n\nHaving earned LEED Gold and WELL Gold certifications, AIA East Gateway sets a new standard for healthy corporate workplaces that foster active lifestyles.",
    detailsList: [
      { label: "Sector", value: "Commercial Office & Retail" },
      { label: "Sub-Sector", value: "Eco-Wellness Grade-A Corporate Tower" },
      { label: "Gross Floor Area", value: "70,000 m²" },
      { label: "Storeys", value: "33 Storeys" },
      { label: "Deadline", value: "2022" },
      { label: "Location", value: "Bangna-Trad Road, Bangkok, Thailand" }
    ],
    kanjiName: "AIAイースト・ゲートウェイ新築工事",
    romajiName: "Ei-Ai-Ei Īsuto Gētowei Shinchiku Kōji",
    locationStory: "Positioned along Bangna-Trad KM 4.5, connecting central Bangkok directly with the Eastern Economic Corridor (EEC) industrial zones and Suvarnabhumi Airport.",
    challenges: [
      "Achieving rigorous indoor air quality standards with HEPA and UVGI sterilization throughout high-occupancy office towers.",
      "Constructing multi-level landscaped podium gardens and rooftop jogging tracks with zero structural water leakage."
    ],
    solutions: [
      "Installed continuous UVGI germicidal lamps inside central air handling units alongside real-time PM2.5 monitoring.",
      "Engineered multi-layer elastomeric waterproofing membranes with electronic vector leak detection on all garden terraces."
    ],
    timeline: [
      { phase: "Substructure & Bored Piling", date: "2019–2020", desc: "Foundation piling and multi-level parking podium construction." },
      { phase: "Tower Superstructure Frame", date: "2020–2021", desc: "Rapid post-tensioned floor slab pours and central service core climbing." },
      { phase: "Curtain Wall & Wellness Fit-out", date: "2021–2022", desc: "Energy-efficient glass facade installation and sky garden landscaping." },
      { phase: "Handover & Dual Gold Certification", date: "2022", desc: "Official opening with dual LEED Gold and WELL Gold distinctions." }
    ],
    specs: {
      "Structure": "Post-Tensioned Reinforced Concrete Frame with Shear Wall Core",
      "Storeys / Area": "33 Storeys / 70,000 m² Gross Floor Area",
      "Office Plates": "Column-Free 2,000 m² Floor Plates with 3m Ceilings",
      "Wellness Features": "Rooftop Running Track, Fitness Pavilion & Multi-Tier Green Terraces",
      "Green Ratings": "LEED Gold & WELL Gold Certified",
      "Client": "AIA Company Limited (Thailand)",
      "Construction Method": "Health-Centric Construction with Zero-VOC Finishes"
    },
    culturalInsight: {
      title: "康泰",
      meaning: "Embodying 'Kōtai' (vibrant health and enduring peace), blending workplace vigor with natural tranquility.",
      quote: "「身心康寧」",
      quoteTranslation: "A balanced sanctuary where both mind and body flourish."
    }
  },

  {
    id: "work_th_006",
    title: "Head Office of the Stock Exchange of Thailand (SET)",
    subtitle: "A monumental 28-story corporate headquarters and financial complex symbolizing Thailand's modern capital market leadership.",
    category: "Government",
    designType: "Design & Build",
    location: "Ratchadaphisek, Bangkok, Thailand",
    locationCategory: "Thailand",
    completionYear: "2015",
    city: "Bangkok",
    airportName: "Suvarnabhumi International Airport (BKK)",
    coordinates: "13.7198° N, 100.5601° E",
    summary: "The Head Office of the Stock Exchange of Thailand (SET) is a prestigious 28-story financial headquarters built by Thai Obayashi on Ratchadaphisek Road. Designed to symbolize the transparency and stability of Thailand's capital markets, the building features advanced trading floor data networks, an auditorium, and a public financial museum.",
    description: "The Head Office of the Stock Exchange of Thailand stands as the architectural and financial nervous system of Thailand's capital economy. Commissioned by the Stock Exchange of Thailand and constructed by Thai Obayashi, the 28-story headquarters houses trading operations, regulatory bodies, and corporate institutions.\n\nThe architectural design conveys institutional transparency and prestige through crystalline, multi-faceted high-performance glass curtain walls. The building features an expansive public financial library (Maruey Knowledge Center), the Sukree Charoensook Auditorium, and the INVESTORY interactive investment learning museum.\n\nGiven the mission-critical nature of capital market operations, Obayashi implemented Tier-III data center redundancy, uninterrupted emergency power backups, and military-grade physical and cyber security perimeters. Seismic-resistant concrete core walls and vibration-damped structural floor slabs ensure uninterrupted digital transaction processing.\n\nThe building was awarded the Thailand Energy Award and achieved LEED Gold certification, exemplifying Obayashi's capacity to deliver state-of-the-art financial nerve centers.",
    detailsList: [
      { label: "Sector", value: "Government & Financial Infrastructure" },
      { label: "Sub-Sector", value: "National Capital Market Headquarters" },
      { label: "Gross Floor Area", value: "62,000 m²" },
      { label: "Height / Storeys", value: "28 Storeys + 2 Basements" },
      { label: "Deadline", value: "2015" },
      { label: "Location", value: "Ratchadaphisek Road, Bangkok, Thailand" }
    ],
    kanjiName: "タイ証券取引所（SET）新本社ビル建設工事",
    romajiName: "Tai Shōken Torihikijo Shin-honsha Biru Kensetsu Kōji",
    locationStory: "Situated along Ratchadaphisek Road next to the Chinese Embassy, anchoring Bangkok's burgeoning New Central Business District.",
    challenges: [
      "Engineering a mission-critical 24/7 financial data core with zero tolerance for power interruptions or operational downtime.",
      "Constructing an acoustically isolated 400-seat multi-purpose auditorium and public financial museum within an active office tower."
    ],
    solutions: [
      "Built dual-feed redundant substations and uninterruptible power supply (UPS) banks with seismic-isolated emergency generator bays.",
      "Installed box-in-box acoustic isolation floating slabs and double-mass drywall partitions for the auditorium."
    ],
    timeline: [
      { phase: "Bored Piles & Basement Slurry", date: "2012–2013", desc: "Foundation piling and construction of high-security subterranean vaults." },
      { phase: "Superstructure Concrete Core", date: "2013–2014", desc: "Erection of reinforced concrete frame with high-durability floor plates." },
      { phase: "Curtain Wall & Mission Systems", date: "2014–2015", desc: "Glass envelope installation, trading server rooms, and museum fit-outs." },
      { phase: "Official Commissioning", date: "December, 2015", desc: "Handover to the Stock Exchange of Thailand and LEED Gold certification." }
    ],
    specs: {
      "Structure": "Reinforced Concrete Frame with Dual High-Strength Core Walls",
      "Storeys / Height": "28 Storeys, 134 meters",
      "Gross Area": "62,000 m²",
      "Special Facilities": "INVESTORY Museum, 400-Seat Auditorium, Maruey Library",
      "Green Rating": "LEED Gold Certified & Thailand Energy Award Winner",
      "Client": "The Stock Exchange of Thailand (SET)",
      "Construction Method": "High-Security Mission-Critical Construction & Tier-III Redundancy"
    },
    culturalInsight: {
      title: "公正",
      meaning: "Embodying 'Kōsei' (fairness and upright transparency), creating a transparent glass citadel that anchors national financial trust.",
      quote: "「信義通天下」",
      quoteTranslation: "Integrity and trust command respect throughout the entire world."
    }
  },

  {
    id: "work_th_007",
    title: "NEXTOPIA (Siam Paragon)",
    subtitle: "A groundbreaking 10,000 m² eco-futuristic prototype floor transformation inside Bangkok's premier luxury shopping destination.",
    category: "Cultural",
    designType: "Design & Build",
    location: "Pathum Wan, Bangkok, Thailand",
    locationCategory: "Thailand",
    completionYear: "2025",
    city: "Bangkok",
    airportName: "Suvarnabhumi International Airport (BKK)",
    coordinates: "13.7466° N, 100.5348° E",
    summary: "NEXTOPIA is an ambitious 10,000 m² commercial transformation within Bangkok's iconic Siam Paragon mall. Executed by Thai Obayashi, the project creates an immersive, sustainable multi-dimensional retail and cultural innovation showcase featuring circular materials, living biophilic canopies, and experiential digital domes.",
    description: "NEXTOPIA represents the cutting edge of retail reinvention in Asia. Commissioned by Siam Piwat and executed by Thai Obayashi within the world-famous Siam Paragon luxury retail mall, this 10,000-square-meter development transforms an entire high-level concourse into an eco-futuristic community biosphere.\n\nThe project integrates biophilic indoor architecture with interactive technology, featuring modular pavilion pods, living moss walls, low-energy LED kinetic sky ceilings, and multi-functional experiential amphitheaters. It serves as a living incubator for sustainable lifestyle brands, carbon-neutral dining, and eco-art exhibitions.\n\nExecuting major structural demolition, reinforcement, and fit-out directly within an open, fully operating luxury mall required extreme precision. Obayashi implemented dust-tight negative-pressure partitions, silent diamond-wheel concrete cutting, and overnight heavy hoisting to ensure uninterrupted visitor operations below.\n\nNEXTOPIA establishes a prototype for the future of commercial spaces, demonstrating how circular architecture, recycled timber, and smart energy monitoring can revitalize retail.",
    detailsList: [
      { label: "Sector", value: "Retail & Cultural Innovation" },
      { label: "Sub-Sector", value: "Sustainable Experiential Commercial Transformation" },
      { label: "Transformed Area", value: "10,000 m²" },
      { label: "Location Level", value: "Siam Paragon Upper Concourses" },
      { label: "Deadline", value: "2025" },
      { label: "Location", value: "Rama I Road, Pathum Wan, Bangkok, Thailand" }
    ],
    kanjiName: "サイアム・パラゴン内ネクストピア新設工事",
    romajiName: "Saiamu Paragon-nai Nekusutopia Shinsetsu Kōji",
    locationStory: "Located inside Siam Paragon along Rama I Road, connected directly with the BTS Siam central transit interchange in heart of Bangkok.",
    challenges: [
      "Performing heavy structural retrofitting and slab modifications directly inside an operating luxury shopping destination without noise or dust migration.",
      "Incorporating living biophilic canopies and sophisticated digital media ceilings with minimal structural floor loads."
    ],
    solutions: [
      "Executed negative-pressure soundproof enclosures with overnight robotic diamond cutting for structural openings.",
      "Used ultra-lightweight recycled aluminum frames, mass timber structures, and lightweight volcanic soil substitutes."
    ],
    timeline: [
      { phase: "Phased Enclosure & Demolition", date: "2023–2024", desc: "Acoustic hoarding installation and selective structural slab removal." },
      { phase: "Structural Reinforcement & Framing", date: "2024", desc: "Lightweight steel truss installation and mechanical service rerouting." },
      { phase: "Biophilic Pods & Media Ceilings", date: "2024–2025", desc: "Installation of living green walls, kinetic digital domes, and timber pods." },
      { phase: "Grand Opening", date: "2025", desc: "Official launch as Siam Paragon's flagship sustainable future retail experience." }
    ],
    specs: {
      "Structure": "Lightweight Structural Steel Framing with Engineered Mass Timber",
      "Area": "10,000 m² Immersive Experience Zone",
      "Sustainability": "Zero-VOC Finishes, 80% Recycled Content, Living Air Filtration",
      "Client": "Siam Piwat Company Limited",
      "Construction Method": "Low-Impact Clean Retrofitting within Active Luxury Mall"
    },
    culturalInsight: {
      title: "新境",
      meaning: "Embodying 'Shinkyō' (new horizons of possibility), pioneering sustainable retail spaces where environmental consciousness and modern lifestyle intertwine.",
      quote: "「革故鼎新」",
      quoteTranslation: "Shedding the obsolete to bring forth radiant, enduring innovation."
    }
  },

  {
    id: "work_th_008",
    title: "EBARA FOODS (THAILAND) New Factory",
    subtitle: "A cutting-edge modern food processing and sauce manufacturing facility built to international HACCP and GMP hygiene standards in Ayutthaya.",
    category: "Industrial Infrastructure",
    designType: "Design & Build",
    location: "Ayutthaya, Thailand",
    locationCategory: "Thailand",
    completionYear: "2023",
    city: "Ayutthaya",
    airportName: "Don Mueang International Airport (DMK)",
    coordinates: "14.3532° N, 100.5684° E",
    summary: "The EBARA FOODS (THAILAND) New Factory is an advanced food manufacturing plant constructed by Thai Obayashi in Rojana Industrial Park, Ayutthaya. Designed to supply high-quality Japanese sauces and seasonings across Southeast Asia, the facility adheres to rigorous HACCP hygiene protocols and energy-efficient climate design.",
    description: "The EBARA FOODS New Factory represents a key strategic expansion for renowned Japanese seasoning manufacturer Ebara Foods into Southeast Asia. Built by Thai Obayashi in the Rojana Industrial Park in historic Ayutthaya province, the plant manufactures Japanese barbecue sauces, soup bases, and specialized condiments.\n\nThe single-story manufacturing complex encompasses computerized raw material storage, cleanroom batch mixing rooms, automated high-speed bottling lines, packaging halls, and cold-chain warehousing. Positive air pressure zoning and antimicrobial wall and floor coatings prevent microbial contamination.\n\nAyutthaya's floodplain geography required comprehensive civil flood defense engineering. Obayashi raised the building's finished ground level well above regional historical flood levels, installing perimeter containment berms, retention ponds, and automated backflow check valves.\n\nThe plant incorporates rooftop solar photovoltaic arrays, wastewater treatment bioreactors, and heat recovery steam systems, exemplifying clean, sustainable Japanese industrial construction in Thailand.",
    detailsList: [
      { label: "Sector", value: "Industrial Infrastructure & Food Manufacturing" },
      { label: "Sub-Sector", value: "Advanced HACCP / GMP Food Processing Plant" },
      { label: "Gross Floor Area", value: "14,500 m²" },
      { label: "Site Area", value: "32,000 m²" },
      { label: "Deadline", value: "2023" },
      { label: "Location", value: "Rojana Industrial Park, Ayutthaya, Thailand" }
    ],
    kanjiName: "エバラ食品タイランド新工場建設工事",
    romajiName: "Ebara Shokuhin Tairando Shin-kōjō Kensetsu Kōji",
    locationStory: "Located in the Rojana Industrial Park in Ayutthaya province, serving as Ebara's ASEAN food manufacturing export and distribution hub.",
    challenges: [
      "Engineering robust flood defense protections for an industrial facility located within the Chao Phraya river basin floodplain.",
      "Meeting stringent Japanese and international HACCP and GMP sanitary cleanroom certifications."
    ],
    solutions: [
      "Engineered an elevated engineered earth pad with peripheral flood defense dykes and automated stormwater retention pumps.",
      "Implemented positive-pressure air locks, seamless epoxy resin flooring, and automated CIP (Clean-In-Place) piping sterilization."
    ],
    timeline: [
      { phase: "Earthfill & Flood Protection Berms", date: "2021–2022", desc: "Engineered site elevation and perimeter flood dyke construction." },
      { phase: "Structural Steel Frame & Insulated Cladding", date: "2022", desc: "Erecting portal frames and food-grade insulated sandwich wall panels." },
      { phase: "Cleanrooms & Processing Lines", date: "2022–2023", desc: "Installing sanitary piping, bottling cleanrooms, and steam boilers." },
      { phase: "HACCP Certification & Commercial Production", date: "2023", desc: "Sanitary commissioning and commencement of export production." }
    ],
    specs: {
      "Structure": "Pre-Engineered Structural Steel Frame with Food-Grade Insulated Panels",
      "Floor Area": "14,500 m² Modern Processing Plant",
      "Hygiene Standards": "HACCP & GMP Certified Food Production Facility",
      "Flood Protection": "Finished Floor Elevated 1.5m Above Historical Flood Level",
      "Client": "Ebara Foods (Thailand) Co., Ltd.",
      "Construction Method": "HACCP-Compliant Sanitary Engineering & Flood-Resilient Civil Design"
    },
    culturalInsight: {
      title: "食育",
      meaning: "Embodying 'Shokuiku' (nourishing life through culinary craftsmanship), delivering safe, wholesome Japanese culinary flavors across the world.",
      quote: "「民以食為天」",
      quoteTranslation: "To humanity, wholesome sustenance is as vital as the heavens themselves."
    }
  }
];

console.log(`Loaded ${sgProjects.length} Singapore and ${thProjects.length} Thailand projects`);
module.exports = { sgProjects, thProjects };
