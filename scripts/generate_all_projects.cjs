const fs = require('fs');
const path = require('path');

// 1. Read existing Japan projects from worksContent.js
const currentWorks = fs.readFileSync('src/data/worksContent.js', 'utf8');
const projectsMatch = currentWorks.match(/export const projects = (\[[\s\S]*?\]);/);
const fullProjects = eval(projectsMatch[1]);
const japanProjects = fullProjects.filter(p => p.locationCategory === 'Japan');

console.log('Preserved Japan projects in worksContent:', japanProjects.length);

// 2. Read existing Japan projectDetails
const currentDetails = fs.readFileSync('src/data/projectDetails.js', 'utf8');
const detailsMatch = currentDetails.match(/export const detailedProjectContent = ({[\s\S]*?});/);
const fullDetails = eval(`(${detailsMatch[1]})`);

const japanDetails = {};
japanProjects.forEach(p => {
  if (fullDetails[p.id]) {
    japanDetails[p.id] = fullDetails[p.id];
  }
});
console.log('Preserved Japan detailed entries:', Object.keys(japanDetails).length);

// 3. Definition of the 45 Indian Projects
const indianData = [
  {
    id: "work_india_001",
    slNo: 1,
    title: "Pune International Airport Expansion",
    subtitle: "A modern multi-level terminal expansion engineered to significantly scale passenger handling capacity, apron stands, and aviation logistics at Pune Airport.",
    category: "Aviation",
    designType: "Design & Build",
    location: "Maharashtra",
    area: "200 acres",
    budget: "₹3,000-4,000 crores",
    deadline: "2033",
    completionYear: "2033",
    prefecture: "Maharashtra",
    city: "Pune",
    airportName: "Pune International Airport (PNQ)",
    coordinates: "18.5822° N, 73.9197° E",
    userDesc: "Expansion to accommodate growing passenger traffic.",
    summary: "The Pune International Airport Expansion is a flagship aviation infrastructure project developed by the Airports Authority of India (AAI) and state agencies to transform Pune's civil enclave into a modern international gateway. The expansion includes a new integrated multi-level terminal building (NITB), rapid exit taxiways, expanded aircraft parking aprons, multi-level car parking, and advanced passenger handling systems.",
    p1: "The Pune International Airport Expansion represents a major strategic upgrade to western India's aviation network, developed to accommodate exponential growth in regional business, industrial, and tourist air traffic. Undertaken by the Airports Authority of India (AAI) in coordination with the Indian Air Force and Maharashtra Airport Development Company, the project transforms the existing civil enclave at Lohegaon into a high-capacity, state-of-the-art international air transit hub.",
    p2: "The centerpiece of the expansion is the New Integrated Terminal Building (NITB), spanning over 52,000 square meters across multiple levels. Structural engineering features large-span structural steel roof trusses, high-performance insulated double-glazed curtain walls, 10 passenger boarding aerobridges, 34 automated check-in counters, in-line baggage handling systems with advanced explosives detection, and a dedicated multi-level car parking (MLCP) facility connected via climate-controlled pedestrian skywalks.",
    p3: "Civil and airfield engineering works included the construction of high-load aircraft aprons accommodating up to 16 Code-C aircraft simultaneously, parallel taxiways, rapid exit taxiways (RET), and airfield ground lighting (AGL) systems. Rigorous engineering management was required to execute heavy structural erections, underground utility networks, and runway pavement upgrades while maintaining uninterrupted daily military and civilian flight operations within strict security and flight-curfew windows.",
    p4: "Environmental sustainability is integral to the development, featuring GRIHA 4-Star and LEED Gold compliant building systems, rooftop solar photovoltaic generation, extensive rainwater harvesting reservoirs, and energy-efficient centralized HVAC with variable refrigerant flow. Upon completion, the expanded terminal increases annual passenger handling capacity to over 16 million, bolstering Maharashtra's manufacturing and IT export corridors while providing world-class international passenger comfort.",
    detailsList: [
      { label: "Sector", value: "Aviation Infrastructure" },
      { label: "Sub-Sector", value: "Airport Terminal & Airside" },
      { label: "Budget", value: "₹3,000–4,000 Crores" },
      { label: "Area", value: "200 Acres (52,000+ m² NITB)" },
      { label: "Deadline", value: "2033" },
      { label: "Location", value: "Pune, Maharashtra" }
    ],
    kanjiName: "プネー国際空港ターミナル拡張事業",
    romajiName: "Punē Kokusai Kūkō Tāminaru Kakuchō Jigyō",
    locationStory: "Strategically located at Lohegaon in Pune, western India's primary automotive, engineering, and IT metropolis. The expansion integrates state-of-the-art civil aviation infrastructure with active defense airfield grids to unlock international trade and travel.",
    challenges: [
      "Executing heavy structural steel framing and deep foundation piling within an active defense airfield under stringent flight safety and radar interference restrictions.",
      "Managing complex passenger diversion and live airfield pavement connections during highly restricted midnight non-flight curfew hours."
    ],
    solutions: [
      "Deployed 3D Building Information Modeling (BIM) paired with GPS-calibrated crane positioning to ensure structural steel assemblies remained strictly within aviation clearance envelopes.",
      "Utilized off-site modular steel prefabrication and rapid-curing high-strength concrete mixes to achieve accelerated night-shift apron paving."
    ],
    timeline: [
      { phase: "Master Planning & Airfield Clearance", date: "2024–2025", desc: "Aviation safety clearances, defense coordination, and comprehensive geotechnical site investigations." },
      { phase: "Deep Piling & Substructure", date: "2026–2028", desc: "Execution of continuous flight auger piles, underground stormwater drainage, and basement retention walls." },
      { phase: "Superstructure & Space-Frame Roof", date: "2029–2031", desc: "Erection of high-tensile steel roof trusses, aerodynamic facade glazing, and multi-level parking ramps." },
      { phase: "Systems Integration & Commissioning", date: "2032–2033", desc: "Installation of automated baggage handling, CAT-II airfield lighting, security grids, and commercial handover." }
    ],
    specs: {
      "Structure": "Composite Structural Steel Frame & Reinforced Concrete",
      "Foundation": "Cast-in-Place Bored Concrete Piles (35m depth)",
      "Steel Used": "High-Tensile Structural Steel Grade E350/E450",
      "Concrete Grade": "High-Performance Concrete M40/M50",
      "Terminal Area": "52,000+ m² Multi-Level Terminal Building",
      "Apron Capacity": "16 Code-C Aircraft Parking Bays",
      "Passenger Capacity": "16+ Million Passengers Per Annum (MPPA)",
      "Seismic Resistance": "Seismic Zone III Compliant Ductile Frame",
      "Energy Rating": "GRIHA 4-Star & LEED Gold Target",
      "Executing Agency": "Airports Authority of India (AAI) & MADC",
      "Construction Method": "Prefabricated Long-Span Steel Truss & Rapid Night Paving"
    },
    culturalInsight: {
      title: "飛翔",
      meaning: "Embodying the spirit of 'Hishō' (soaring flight), the Pune Airport expansion connects Maharashtra's industrial ingenuity directly with global commercial skylines.",
      quote: "「鵬程万里」",
      quoteTranslation: "Embarking on a noble journey of ten thousand miles."
    }
  },
  {
    id: "work_india_002",
    slNo: 2,
    title: "Tidel Park Chennai Expansion",
    subtitle: "A premium IT/ITES high-rise commercial campus expansion expanding Chennai's technological footprint with modern Grade-A smart infrastructure.",
    category: "Commercial Infrastructure",
    designType: "Design & Build",
    location: "Tamil Nadu",
    area: "50 acres",
    budget: "₹1,500-2,000 crores",
    deadline: "2031",
    completionYear: "2031",
    prefecture: "Tamil Nadu",
    city: "Chennai",
    airportName: "Chennai International Airport (MAA)",
    coordinates: "12.9863° N, 80.2432° E",
    userDesc: "Expansion of Chennai's Tidel Park to accommodate more IT companies.",
    summary: "The Tidel Park Chennai Expansion is a landmark commercial infrastructure development by TIDEL Park Ltd (a joint venture of TIDCO and ELCOT) expanding the iconic Taramani and Pattabiram technology corridors. The project adds millions of square feet of Grade-A IT workspace, smart enterprise incubation centers, Tier-IV data center facilities, and sustainable green office towers.",
    p1: "The Tidel Park Chennai Expansion builds upon the monumental legacy of India's pioneering software tech park, developed to meet surging global demand for enterprise software, fintech, and semiconductor engineering spaces across Tamil Nadu. Developed under the aegis of the Tamil Nadu Industrial Development Corporation (TIDCO) and ELCOT, the expansion reinforces Chennai's status as the SaaS and technology capital of South Asia.",
    p2: "The multi-tower high-rise complex incorporates cutting-edge structural engineering, utilizing high-strength composite steel-concrete columns, post-tensioned flat slabs to create expansive column-free floor plates exceeding 40,000 sq. ft., and unitized double-glazed solar-reflective facades that optimize natural daylight while drastically reducing solar heat gain in Chennai's tropical climate.",
    p3: "Specialized building engineering includes dual-redundant 110kV dedicated electrical substations, Tier-IV ready enterprise data center infrastructure, intelligent Building Management Systems (IBMS), centralized chilled-water HVAC with thermal energy storage, automated destination-dispatch elevator banks, and multi-tier basement parking equipped with EV charging stations.",
    p4: "Achieving LEED Platinum and IGBC Green Building Platinum ratings, the project incorporates on-site solar photovoltaic canopies, zero-liquid-discharge (ZLD) wastewater treatment plants recycling 100% of greywater for cooling and landscaping, and rainwater percolation pits across the campus. Upon completion, the development provides cutting-edge workspace for over 35,000 technology professionals.",
    detailsList: [
      { label: "Sector", value: "Commercial Infrastructure" },
      { label: "Sub-Sector", value: "IT/ITES Technology Parks" },
      { label: "Budget", value: "₹1,500–2,000 Crores" },
      { label: "Area", value: "50 Acres (~3.5 Million sq. ft. Built-up)" },
      { label: "Deadline", value: "2031" },
      { label: "Location", value: "Chennai, Tamil Nadu" }
    ],
    kanjiName: "タイデル・パーク・チェンナイ拡張計画",
    romajiName: "Taideru Pāku Chennai Kakuchō Keikaku",
    locationStory: "Situated along the Old Mahabalipuram Road (OMR) and Pattabiram tech corridors in Chennai, Tamil Nadu. The development leverages high-speed digital trunk lines, suburban rail, and metro linkages to foster global IT enterprise growth.",
    challenges: [
      "Designing deep subterranean basement structures in coastal soil conditions subject to high water tables and seasonal cyclone storm surges.",
      "Achieving massive column-free interior floor spans to accommodate modern agile enterprise workstations while ensuring superior seismic dampening."
    ],
    solutions: [
      "Installed continuous reinforced concrete diaphragm slurry walls combined with multi-stage deep dewatering systems during basement excavation.",
      "Engineered post-tensioned bonded slab systems and composite steel moment frames to maximize usable interior space and structural efficiency."
    ],
    timeline: [
      { phase: "Master Planning & Environmental Clearances", date: "2024–2025", desc: "Architectural master planning, coastal zone clearances, and geotechnical soil investigations." },
      { phase: "Diaphragm Wall & Deep Basement", date: "2025–2027", desc: "Construction of perimeter retaining diaphragm walls and 3-level basement concrete casting." },
      { phase: "Tower Superstructure Erection", date: "2027–2029", desc: "High-speed slipform core construction, composite framing, and unitized glass curtain wall installation." },
      { phase: "MEP, Fit-outs & Green Certification", date: "2030–2031", desc: "Deployment of smart HVAC, Tier-IV electrical redundancy, LEED Platinum audits, and commercial leasing launch." }
    ],
    specs: {
      "Structure": "Composite Steel-Concrete Core with Post-Tensioned Slabs",
      "Foundation": "Diaphragm Retaining Walls with Bored Piles (32m depth)",
      "Steel Used": "High-Strength Thermo-Mechanically Treated (TMT) Fe550D",
      "Concrete Grade": "High-Performance Self-Compacting Concrete M50",
      "Building Height": "85–110 meters (Twin High-Rise Towers)",
      "Built-up Area": "3,500,000 sq. ft. Grade-A Office Space",
      "Parking Capacity": "4,200 vehicles with smart EV charging bays",
      "Seismic Resistance": "Seismic Zone III Compliant Ductile Shear Walls",
      "Energy Rating": "LEED Platinum & IGBC Platinum Certified",
      "Executing Agency": "TIDEL Park Ltd, TIDCO & ELCOT",
      "Construction Method": "Post-Tensioned Flat Slabs & Unitized Facade Assembly"
    },
    culturalInsight: {
      title: "智",
      meaning: "Reflecting 'Chi' (intellect and digital wisdom), Tidel Park stands as an enduring monument to Tamil Nadu's software innovation and global engineering workforce.",
      quote: "「知識は力なり」",
      quoteTranslation: "Knowledge is the supreme architect of progress."
    }
  },
  {
    id: "work_india_003",
    slNo: 3,
    title: "Shendra-Bidkin Industrial Area",
    subtitle: "A world-class greenfield smart industrial city in Maharashtra developed under the Delhi–Mumbai Industrial Corridor (DMIC) and AURIC.",
    category: "Industrial Infrastructure",
    designType: "Design & Build",
    location: "Maharashtra",
    area: "500 acres",
    budget: "₹2,500-3,500 crores",
    deadline: "2030",
    completionYear: "2030",
    prefecture: "Maharashtra",
    city: "Chhatrapati Sambhajinagar (Aurangabad)",
    airportName: "Aurangabad Airport (IXU)",
    coordinates: "19.8762° N, 75.3433° E",
    userDesc: "Industrial cluster development with a focus on manufacturing.",
    summary: "The Shendra-Bidkin Industrial Area, also known as AURIC (Aurangabad Industrial City), is India's flagship greenfield smart industrial city developed under the Delhi–Mumbai Industrial Corridor (DMIC). Spanning advanced manufacturing nodes, the project integrates 100% underground utilities, automated SCADA water supply, common effluent treatment, and smart digital governance.",
    p1: "The Shendra-Bidkin Industrial Area represents a paradigm shift in Indian industrial town planning, developed as part of the Delhi–Mumbai Industrial Corridor (DMIC) in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. Planned by Maharashtra Industrial Township Limited (MITL) in partnership with the Government of India, the development provides a self-sustaining industrial ecosystem designed to attract global automotive, electronics, and precision engineering giants.",
    p2: "Civil engineering infrastructure across the zone features wide multi-lane heavy-haul arterial roads with dedicated utility corridors, subterranean multi-duct trenches carrying 100% underground power and optical fiber networks, automated water distribution networks supplied via dedicated raw water pipelines from the Jayakwadi Dam, and a state-of-the-art Central Command and Control Centre (CCCC) managing civic operations in real time.",
    p3: "Industrial environmental sustainability is anchored by a high-capacity Common Effluent Treatment Plant (CETP) utilizing membrane bioreactors and multi-stage reverse osmosis to achieve Zero Liquid Discharge (ZLD), automated solid waste processing, dedicated industrial gas pipeline networks, and high-voltage 220kV/33kV digital gas-insulated substations ensuring 99.99% power reliability for sensitive high-tech manufacturing.",
    p4: "The smart city integrates social infrastructure alongside industrial plots, including residential neighborhoods, commercial hubs, exhibition centers, skill development academies, and green buffer parks. Upon full operationalization, the Shendra-Bidkin node generates over 150,000 direct and indirect manufacturing jobs, positioning Maharashtra as a premier global manufacturing destination.",
    detailsList: [
      { label: "Sector", value: "Industrial Infrastructure" },
      { label: "Sub-Sector", value: "Smart Industrial City / DMIC Node" },
      { label: "Budget", value: "₹2,500–3,500 Crores" },
      { label: "Area", value: "500 Acres (Part of 10,000-acre AURIC master plan)" },
      { label: "Deadline", value: "2030" },
      { label: "Location", value: "Chhatrapati Sambhajinagar, Maharashtra" }
    ],
    kanjiName: "シェンドラ・ビドキン スマート工業都市",
    romajiName: "Shendora Bidokin Sumāto Kōgyō Toshi",
    locationStory: "Positioned in the Marathwada region of Maharashtra along the DMIC expressway grid. The smart industrial city connects western sea ports with northern industrial centers via high-capacity rail and highway links.",
    challenges: [
      "Laying hundreds of kilometers of multi-utility underground duct networks in basalt rock terrain while maintaining precise gravitational drainage gradients.",
      "Guaranteeing zero liquid discharge across a diverse mix of heavy industrial chemical, automotive, and metallurgical manufacturing tenants."
    ],
    solutions: [
      "Utilized specialized trenching machinery, rock-breakers, and 3D GIS subsurface mapping to coordinate utility duct alignments through basalt strata.",
      "Engineered centralized SCADA-controlled wastewater collection pipelines linked to advanced multi-effect evaporators and membrane filtration systems."
    ],
    timeline: [
      { phase: "Master Plan & Land Consolidation", date: "2023–2024", desc: "Zoning approval, environmental impact assessment (EIA), and topographic surveying." },
      { phase: "Heavy Earthworks & Road Grids", date: "2024–2026", desc: "Roadway sub-base construction, bridge culverts, and underground utility corridor installation." },
      { phase: "CETP, Water Grids & Power Sub-stations", date: "2026–2028", desc: "Erection of 220kV substations, water treatment plants, ZLD effluent recycling networks, and SCADA centers." },
      { phase: "Smart City Command & Tenant Onboarding", date: "2029–2030", desc: "Integration of citywide IoT sensor grids, smart lighting, and global manufacturing operations handover." }
    ],
    specs: {
      "Structure": "Greenfield Smart Industrial City Infrastructure",
      "Foundation": "Hard Basalt Rock Excavation with Reinforced Concrete Foundations",
      "Road Network": "Heavy-Duty 4/6-Lane Rigid Concrete Pavements (PQC)",
      "Concrete Grade": "Pavement Quality Concrete M40 / Structural M45",
      "Effluent Treatment": "Zero Liquid Discharge (ZLD) CETP with RO & MEE",
      "Power Reliability": "220/33kV Dual-Source Dedicated Underground Substations",
      "Water Supply": "Dedicated Raw Water Pipeline from Jayakwadi Dam with SCADA",
      "Seismic Resistance": "Seismic Zone II Compliant Infrastructure",
      "Digital Grid": "Citywide Optical Fiber with Integrated Command & Control Centre",
      "Executing Agency": "Maharashtra Industrial Township Limited (MITL) & NICDC",
      "Construction Method": "Underground Multi-Utility Trenching & Modular Infrastructure"
    },
    culturalInsight: {
      title: "創",
      meaning: "Embodying 'Sō' (creation and manufacturing excellence), AURIC transforms ancient Marathwada into an ultra-modern manufacturing engine for global industry.",
      quote: "「百錬成鋼」",
      quoteTranslation: "Through hundredfold tempering, pure steel is forged."
    }
  },
  {
    id: "work_india_004",
    slNo: 4,
    title: "East Coast Economic Corridor (ECEC)",
    subtitle: "India's premier coastal economic corridor spanning 1,000 km along the eastern seaboard to boost port-led industrialization and manufacturing trade.",
    category: "Industrial Infrastructure",
    designType: "Design & Build",
    location: "Odisha, Andhra Pradesh, Tamil Nadu",
    area: "1,000 km",
    budget: "₹20,000-25,000 crores",
    deadline: "2034",
    completionYear: "2034",
    prefecture: "Odisha, Andhra Pradesh & Tamil Nadu",
    city: "Eastern Seaboard",
    airportName: "Visakhapatnam (VTZ) / Chennai (MAA) / Bhubaneswar (BBI)",
    coordinates: "17.6868° N, 83.2185° E",
    userDesc: "A major industrial corridor for boosting economic activity.",
    summary: "The East Coast Economic Corridor (ECEC) is India's first coastal economic corridor, developed with technical and financial assistance from the Asian Development Bank (ADB). Stretching from West Bengal and Odisha through Andhra Pradesh (Vizag–Chennai Industrial Corridor - VCIC) to Tamil Nadu, the corridor connects major deepwater ports with heavy industrial clusters.",
    p1: "The East Coast Economic Corridor (ECEC) represents India's flagship port-led industrialization initiative along the Bay of Bengal, developed by the National Industrial Corridor Development Corporation (NICDC) in partnership with state governments and the Asian Development Bank (ADB). Spanning strategic coastal regions of Odisha, Andhra Pradesh, and Tamil Nadu, the corridor accelerates trade integration with Southeast Asia under India's Act East policy.",
    p2: "The multi-faceted engineering scope comprises high-capacity access-controlled coastal expressways, heavy-duty freight rail sidings, multi-modal logistics parks (MMLH), internal industrial cluster networks, and dedicated port-rail-road interchange hubs connecting major seaports including Paradip, Visakhapatnam, Kakinada, Krishnapatnam, Ennore, and Chennai.",
    p3: "Civil engineering in coastal zones required specialized techniques, including deep soil improvement via prefabricated vertical drains (PVD) and stone columns across marine clay flats, cyclone-resilient elevated roadway embankments, anti-corrosion marine grade concrete bridges over tidal estuaries, and dedicated high-voltage power evacuation lines designed to withstand Category 4 tropical cyclones.",
    p4: "Multiple industrial nodes—such as the Visakhapatnam, Srikalahasti, and Chittoor nodes—feature centralized industrial effluent networks, desalinated water supply pipelines, and green energy substations. When fully realized, the ECEC creates a thriving manufacturing corridor contributing significantly to India's GDP and maritime export volume.",
    detailsList: [
      { label: "Sector", value: "Industrial Infrastructure" },
      { label: "Sub-Sector", value: "Coastal Industrial Corridor / Port Connectivity" },
      { label: "Budget", value: "₹20,000–25,000 Crores" },
      { label: "Length / Area", value: "1,000 km Multi-State Coastal Alignment" },
      { label: "Deadline", value: "2034" },
      { label: "Location", value: "Odisha, Andhra Pradesh, Tamil Nadu" }
    ],
    kanjiName: "東海岸経済回廊開発事業",
    romajiName: "Higashi Kaigan Keizai Kairō Kaihatsu Jigyō",
    locationStory: "Extending along the Bay of Bengal coastal highway and railway spine across Odisha, Andhra Pradesh, and Tamil Nadu. The corridor links hinterland resource centers with deepwater seaports for global maritime commerce.",
    challenges: [
      "Constructing durable heavy-freight road and rail infrastructure across soft, saturated coastal alluvium and cyclone-vulnerable tidal deltas.",
      "Coordinating multi-state environmental and coastal regulation zone (CRZ) clearances across hundreds of rivers, estuaries, and agricultural wetlands."
    ],
    solutions: [
      "Applied geosynthetic reinforcement, stone columns, and prefabricated vertical drains to accelerate coastal soil settlement and prevent embankment rutting.",
      "Used high-performance silica-fume concrete and epoxy-coated rebar for all maritime bridges and estuarine culverts to prevent marine chloride corrosion."
    ],
    timeline: [
      { phase: "Corridor Master Planning & ADB Loan Agreement", date: "2023–2025", desc: "Detailed feasibility studies, social impact management, and ADB multilateral funding clearance." },
      { phase: "Coastal Soil Improvement & Highway Widening", date: "2025–2028", desc: "Ground consolidation using PVD, embankment grading, and construction of multi-lane coastal freight expressways." },
      { phase: "Industrial Nodes & Port Interchanges", date: "2028–2031", desc: "Development of Visakhapatnam, Machilipatnam, and Chittoor smart manufacturing nodes and rail spurs." },
      { phase: "Full Corridor Integration & Logistics Commissioning", date: "2032–2034", desc: "Commissioning of multimodal logistics parks, automated dry ports, and full freight operations." }
    ],
    specs: {
      "Structure": "Multi-Modal Coastal Industrial & Transportation Corridor",
      "Foundation": "Ground Improvement with PVD & Deep Bored Marine Piles",
      "Highway Length": "1,000 km 4/6-Lane Access-Controlled Expressways",
      "Concrete Grade": "Corrosion-Resistant Marine Concrete M45/M50",
      "Steel Used": "Epoxy-Coated Corrosion-Resistant Rebar (CRS)",
      "Ports Connected": "Paradip, Visakhapatnam, Kakinada, Krishnapatnam, Chennai",
      "Industrial Nodes": "Multiple Industrial Townships across Odisha, AP & Tamil Nadu",
      "Seismic & Cyclone": "Seismic Zone III & Cyclone Wind Resistant (250 km/h)",
      "Logistics Hubs": "Multi-Modal Logistics Parks (MMLPs) & Dry Ports",
      "Funding & Execution": "NICDC, State Governments & Asian Development Bank (ADB)",
      "Construction Method": "Geosynthetic Embankment Stabilization & Precast Bridge Spans"
    },
    culturalInsight: {
      title: "海",
      meaning: "Representing 'Kai' (the ocean of opportunity), the East Coast Corridor connects India's historic maritime maritime trade routes with next-generation global industries.",
      quote: "「海納百川」",
      quoteTranslation: "The ocean is vast because it welcomes all rivers."
    }
  },
  {
    id: "work_india_005",
    slNo: 5,
    title: "Hyderabad Pharma City",
    subtitle: "The world's largest integrated pharmaceutical and life sciences manufacturing hub engineered with Zero Liquid Discharge (ZLD) smart infrastructure.",
    category: "Industrial Infrastructure",
    designType: "Design & Build",
    location: "Telangana",
    area: "1,000 acres",
    budget: "₹6,000-8,000 crores",
    deadline: "2032",
    completionYear: "2032",
    prefecture: "Telangana",
    city: "Hyderabad (Mucherla)",
    airportName: "Rajiv Gandhi International Airport (HYD)",
    coordinates: "17.1500° N, 78.5200° E",
    userDesc: "Industrial park focusing on the pharmaceutical sector.",
    summary: "Hyderabad Pharma City, situated in Mucherla, Rangareddy district, is the world's largest integrated pharmaceutical cluster developed by the Telangana State Industrial Infrastructure Corporation (TSIIC). Recognized as a National Investment and Manufacturing Zone (NIMZ), the project features zero-liquid-discharge (ZLD) common effluent treatment, steam pipelines, and digital logistics.",
    p1: "Hyderabad Pharma City is an epoch-making industrial development engineered to establish the world's preeminent life-sciences and bulk-drug manufacturing ecosystem. Conceived by the Government of Telangana and developed through the Telangana State Industrial Infrastructure Corporation (TSIIC) with NIMZ status, the mega-park caters to global vaccine, biotechnology, and active pharmaceutical ingredient (API) manufacturers.",
    p2: "The infrastructure engineering blueprint incorporates centralized common steam generation grids, dedicated raw water pipeline supply from the Krishna River basin, specialized hazardous chemical handling corridors, dual-circuit high-reliability electrical grids, wide concrete transport corridors, and a smart logistics hub integrated with Hyderabad's international airport cargo network.",
    p3: "Environmental compliance is anchored by a state-of-the-art Common Effluent Treatment Plant (CETP) with a daily capacity exceeding 100 MLD. Utilizing advanced biological treatment, multi-stage membrane filtration, and thermal evaporators, the facility guarantees 100% Zero Liquid Discharge (ZLD), converting industrial wastewater into high-purity recycled process water and reusable salts.",
    p4: "The development also features research and development centers, testing labs accredited to US FDA and WHO standards, residential townships for scientists and workers, and extensive green buffer plantations. Upon completion, Hyderabad Pharma City consolidates Hyderabad's position as the 'Vaccine Capital of the World', driving life-saving pharmaceutical exports across the globe.",
    detailsList: [
      { label: "Sector", value: "Industrial Infrastructure" },
      { label: "Sub-Sector", value: "Pharmaceutical & Life Sciences Park / NIMZ" },
      { label: "Budget", value: "₹6,000–8,000 Crores" },
      { label: "Area", value: "1,000 Acres Phase I (Part of 19,000-acre master plan)" },
      { label: "Deadline", value: "2032" },
      { label: "Location", value: "Mucherla / Hyderabad, Telangana" }
    ],
    kanjiName: "ハイデラバード・ファーマ・シティ開発計画",
    romajiName: "Haiderabādo Fāma Shiti Kaihatsu Keikaku",
    locationStory: "Located in Mucherla, Rangareddy district near Hyderabad, Telangana. The mega cluster leverages proximity to Rajiv Gandhi International Airport and major national highways for global cold-chain pharma distribution.",
    challenges: [
      "Eliminating the environmental footprint of toxic chemical and pharmaceutical effluents across hundreds of industrial manufacturing units.",
      "Installing extensive high-pressure steam, hazardous chemical, and treated water pipeline networks across complex granitic terrain."
    ],
    solutions: [
      "Constructed a multi-tier Zero Liquid Discharge (ZLD) centralized treatment complex with multi-effect evaporators and biological membrane reactors.",
      "Engineered reinforced concrete utility service trenches with leak-detection sensors and automatic isolation valves for hazardous chemical transport."
    ],
    timeline: [
      { phase: "NIMZ Designation & Land Development", date: "2023–2025", desc: "Environmental approvals, master planning, and bulk earthworks across granite formations." },
      { phase: "ZLD Effluent Plant & Primary Grids", date: "2025–2028", desc: "Construction of central 100 MLD CETP, raw water treatment, and 220kV dedicated sub-stations." },
      { phase: "Internal Steam & Pipeline Infrastructure", date: "2028–2030", desc: "Installation of underground utility ducts, steam distribution networks, and internal highway grids." },
      { phase: "Testing Labs, Logistics Hub & Full Commissioning", date: "2031–2032", desc: "Completion of FDA-standard testing labs, cold chain logistics hub, and global pharma operations." }
    ],
    specs: {
      "Structure": "Greenfield Mega Life-Sciences & Pharma Industrial City",
      "Foundation": "Granite Bedrock Excavation with Reinforced Concrete Bases",
      "Effluent Treatment": "100 MLD Zero Liquid Discharge (ZLD) Centralized CETP",
      "Concrete Grade": "Chemical-Resistant Sulfate-Resisting Concrete M45",
      "Utilities": "Centralized High-Pressure Steam & Hazardous Fluid Ducts",
      "Water Supply": "Dedicated Krishna River Pipeline with Advanced Desalination",
      "Power Network": "220/33kV Sub-stations with Dedicated Pharma Power Ring",
      "Testing Standards": "US FDA, WHO & EU-GMP Compliant Quality Infrastructure",
      "Logistics": "Integrated Temperature-Controlled Cold-Chain Cargo Grid",
      "Executing Agency": "Telangana State Industrial Infrastructure Corporation (TSIIC)",
      "Construction Method": "ZLD Effluent Treatment Engineering & Heavy Pipeline Trenching"
    },
    culturalInsight: {
      title: "薬",
      meaning: "Reflecting 'Yaku' (medicine and healing), Hyderabad Pharma City builds the physical infrastructure that delivers life-saving pharmaceuticals to billions worldwide.",
      quote: "「医は仁術なり」",
      quoteTranslation: "The practice of medicine is an art of benevolence."
    }
  }
];

console.log('Processed initial 5 Indian projects...');
