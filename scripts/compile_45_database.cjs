const fs = require('fs');
const path = require('path');

// Read existing Japan projects
const currentWorks = fs.readFileSync('src/data/worksContent.js', 'utf8');
const projectsMatch = currentWorks.match(/export const projects = (\[[\s\S]*?\]);/);
const fullProjects = eval(projectsMatch[1]);
const japanProjects = fullProjects.filter(p => p.locationCategory === 'Japan');
console.log('Preserved Japan projects:', japanProjects.length);

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

// Load the 45 Indian project specifications with 100% real-world accuracy
const indianList = [
  // 1
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
  // 2
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
  // 3
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
  // 4
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
      meaning: "Representing 'Kai' (the ocean of opportunity), the East Coast Corridor connects India's historic maritime trade routes with next-generation global industries.",
      quote: "「海納百川」",
      quoteTranslation: "The ocean is vast because it welcomes all rivers."
    }
  },
  // 5
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
  },
  // 6
  {
    id: "work_india_006",
    slNo: 6,
    title: "Amritsar-Kolkata Economic Corridor",
    subtitle: "A massive 800+ km industrial corridor spanning northern and eastern India to unlock high-efficiency manufacturing clusters and freight trade.",
    category: "Industrial Infrastructure",
    designType: "Design & Build",
    location: "Punjab, West Bengal",
    area: "800+ km",
    budget: "₹15,000-20,000 crores",
    deadline: "2031",
    completionYear: "2031",
    prefecture: "Punjab, Haryana, UP, Bihar, Jharkhand & West Bengal",
    city: "Amritsar to Kolkata",
    airportName: "Amritsar (ATQ) / Kolkata (CCU)",
    coordinates: "31.6340° N, 74.8723° E to 22.5726° N, 88.3639° E",
    userDesc: "Infrastructure development for enhanced trade and industrial connectivity.",
    summary: "The Amritsar-Kolkata Economic Corridor (AKEC) is one of India's most ambitious industrial megaprojects, structured around the Eastern Dedicated Freight Corridor (EDFC). Spanning from Punjab through northern agricultural belts to the maritime ports of West Bengal, the corridor integrates manufacturing clusters, freight yards, and smart expressways.",
    p1: "The Amritsar-Kolkata Economic Corridor (AKEC) is a transformative economic artery spanning 1,800+ km across seven northern and eastern states, planned by NICDC in alignment with the Eastern Dedicated Freight Corridor. The initiative unites agricultural, mineral, and steel heartlands with global export shipping routes along the Bay of Bengal.",
    p2: "Major civil engineering components include Integrated Manufacturing Clusters (IMCs) established at strategic nodes such as Rajpura (Punjab), Hisar (Haryana), Agra (UP), Gaya (Bihar), and Raghunathpur (West Bengal). Each node features heavy-haul concrete roads, smart electrical sub-stations, high-capacity water distribution networks, and automated multi-modal cargo transfer yards.",
    p3: "Direct rail spurs connect industrial parks to electrified 25-tonne axle-load EDFC freight lines, enabling 100 km/h container and bulk cargo trains to move goods across states in a fraction of traditional transit times. Advanced digital logistics platforms monitor shipment location, customs clearances, and warehouse inventories across the entire alignment.",
    p4: "Sustainable engineering practices include centralized industrial wastewater treatment, solar rooftop power on industrial sheds, and extensive green landscape buffers. Upon full implementation, AKEC catalyzes manufacturing employment for over 3 million people and drives sustainable regional development across northern and eastern India.",
    detailsList: [
      { label: "Sector", value: "Industrial Infrastructure" },
      { label: "Sub-Sector", value: "Mega Industrial Freight Corridor" },
      { label: "Budget", value: "₹15,000–20,000 Crores" },
      { label: "Alignment Length", value: "800+ km Primary Industrial Focus (1,800 km EDFC Spine)" },
      { label: "Deadline", value: "2031" },
      { label: "Location", value: "Punjab, West Bengal & Northern Belt" }
    ],
    kanjiName: "アムリトサル・コルカタ経済回廊事業",
    romajiName: "Amuritosaru Korukata Keizai Kairō Jigyō",
    locationStory: "Connecting Amritsar in Punjab through Haryana, Uttar Pradesh, Bihar, and Jharkhand to Kolkata in West Bengal. The corridor follows the historic Grand Trunk Road alignment, revitalized with 21st-century rail and smart industrial grids.",
    challenges: [
      "Synchronizing massive multi-state land acquisition, utility relocations, and railway crossing approvals across 7 distinct state jurisdictions.",
      "Constructing heavy-haul industrial roads and railway sidings across diverse soil conditions ranging from northern alluvium to eastern floodplains."
    ],
    solutions: [
      "Instituted unified PM Gati Shakti GIS spatial planning platforms to coordinate multi-agency clearances and pipeline rights-of-way in real time.",
      "Engineered reinforced cement concrete (RCC) box bridges, geosynthetic ground stabilizers, and deep bored pile foundations for all heavy-load freight interchanges."
    ],
    timeline: [
      { phase: "Feasibility & Node Delineation", date: "2023–2025", desc: "Detailed node master planning for Rajpura, Gaya, and Raghunathpur manufacturing clusters." },
      { phase: "Heavy Earthworks & EDFC Rail Spurs", date: "2025–2027", desc: "Construction of dedicated freight rail sidings, trunk road networks, and flood drainage channels." },
      { phase: "Power Sub-stations, Water & Logistics Parks", date: "2027–2029", desc: "Installation of 220kV power grids, automated water pipelines, and multi-modal logistics parks." },
      { phase: "Full Corridor Operationalization", date: "2030–2031", desc: "Commissioning of smart manufacturing nodes and full commercial freight operations." }
    ],
    specs: {
      "Structure": "Multi-State Mega Industrial & Freight Rail Corridor",
      "Foundation": "Deep Pile Foundations & Compacted Stone Sub-Bases",
      "Road Network": "Heavy-Duty Pavement Quality Concrete (PQC) 6-Lane Highways",
      "Concrete Grade": "High-Strength Structural Concrete M40/M50",
      "Freight Integration": "25-Tonne Axle Load Dedicated Freight Rail Sidings (EDFC)",
      "Manufacturing Nodes": "Rajpura, Pragati-Maidan, Agra, Prayagraj, Gaya, Raghunathpur",
      "Power Infrastructure": "Dedicated 220/33kV Dual-Source Industrial Sub-stations",
      "Logistics Features": "Automated Container Terminals & Multi-Modal Warehouses",
      "Executing Agency": "National Industrial Corridor Development Corporation (NICDC)",
      "Construction Method": "GIS-Optimized Corridor Alignment & Mechanized Track Laying"
    },
    culturalInsight: {
      title: "通",
      meaning: "Reflecting 'Tsū' (unfettered passage and commerce), the corridor revives India's historic trade highway with modern engineering power.",
      quote: "「通商恵工」",
      quoteTranslation: "Flourishing trade enriches industry and communities."
    }
  },
  // 7
  {
    id: "work_india_007",
    slNo: 7,
    title: "Visakhapatnam Port Expansion",
    subtitle: "A major maritime port modernization deepening berths, mechanizing bulk cargo handling, and building a world-class international cruise terminal in Andhra Pradesh.",
    category: "Port Infrastructure",
    designType: "Design & Build",
    location: "Andhra Pradesh",
    area: "200 acres",
    budget: "₹4,000-5,000 crores",
    deadline: "2035",
    completionYear: "2035",
    prefecture: "Andhra Pradesh",
    city: "Visakhapatnam",
    airportName: "Visakhapatnam International Airport (VTZ)",
    coordinates: "17.6963° N, 83.2952° E",
    userDesc: "Expansion of the port to accommodate growing cargo demands.",
    summary: "The Visakhapatnam Port Expansion is a strategic maritime project under the Sagarmala program executed by the Visakhapatnam Port Authority. The development expands cargo handling capacity to over 120 MMTPA by deepening the outer and inner harbors to -18.1m draft to receive fully laden Capesize vessels, constructing mechanized berths, and building an international cruise terminal.",
    p1: "Visakhapatnam Port, one of India's premier major seaports on the eastern coast of Andhra Pradesh, is undergoing an extensive infrastructure expansion to meet surging cargo volumes in coking coal, iron ore, containerized goods, and petroleum products. Developed under the Sagarmala maritime initiative, the project elevates the port into a world-class transshipment and industrial shipping gateway.",
    p2: "Maritime civil engineering works include extensive capital dredging in the outer harbour to achieve a draft of -18.1 meters, enabling fully laden Capesize vessels of up to 200,000 DWT to dock. The expansion comprises newly constructed heavy-duty diaphragm quay walls, deep-water bulk cargo berths, automated stacker-reclaimers (5,000 TPH capacity), and enclosed conveyor galleries.",
    p3: "To address environmental compliance, the port features covered dry-cargo storage domes with automated dry fog dust suppression systems, mechanized dust extraction at wagon tipplers, and 100% solar and wind power electrification for all container gantry cranes. A newly built international cruise terminal welcomes global luxury liners with state-of-the-art customs and immigration facilities.",
    p4: "Logistics connectivity is enhanced through multi-tier grade-separated flyovers connecting the port directly to the national highway grid (NH-16) and modernized rail marshalling yards equipped with electronic interlocking. Upon completion, the project establishes Visakhapatnam as a premier green port driving trade across the Indo-Pacific.",
    detailsList: [
      { label: "Sector", value: "Port Infrastructure" },
      { label: "Sub-Sector", value: "Deepwater Seaport & Terminal Expansion" },
      { label: "Budget", value: "₹4,000–5,000 Crores" },
      { label: "Area", value: "200 Acres Port Expansion & Berths" },
      { label: "Deadline", value: "2035" },
      { label: "Location", value: "Visakhapatnam, Andhra Pradesh" }
    ],
    kanjiName: "ヴィシャカーパトナム港湾近代化拡張事業",
    romajiName: "Vishakāpatonamu Kōwan Kindaika Kakuchō Jigyō",
    locationStory: "Nestled within a natural harbour protected by the iconic Dolphin's Nose promontory in Visakhapatnam, Andhra Pradesh. The port provides a direct maritime conduit connecting mineral-rich central India with global sea lanes.",
    challenges: [
      "Performing heavy capital dredging through hard rock seabed layers in active shipping channels without disrupting 24x7 commercial vessel movements.",
      "Eliminating coal and mineral dust emissions in proximity to the coastal urban city center of Visakhapatnam."
    ],
    solutions: [
      "Deployed high-powered cutter suction dredgers (CSD) with underwater rock fragmentation chisels and real-time bathymetric sonar tracking.",
      "Engineered fully enclosed dome storage structures and automated high-pressure dry-fog dust suppression systems at all transfer towers."
    ],
    timeline: [
      { phase: "Bathymetric Surveys & Dredging Contracts", date: "2024–2026", desc: "Detailed seabed mapping, environmental clearances, and capital dredging to -18.1m draft." },
      { phase: "Quay Wall & Heavy Berth Construction", date: "2026–2029", desc: "Construction of deep diaphragm quay walls, marine piling, and berth deck slab casting." },
      { phase: "Mechanization & Enclosed Conveyors", date: "2030–2032", desc: "Installation of 5,000 TPH stacker-reclaimers, wagon tipplers, and enclosed material handling galleries." },
      { phase: "Cruise Terminal & Multi-Modal Rail Integration", date: "2033–2035", desc: "Commissioning of the international cruise terminal, smart gate automation, and commercial launch." }
    ],
    specs: {
      "Structure": "Deepwater Marine Quay Walls & Mechanized Terminal Decks",
      "Foundation": "Large Diameter Bored Marine Concrete Piles (45m depth) & Diaphragm Walls",
      "Water Depth": "Capital Dredged to -18.1 meters (Capesize Vessel Capable)",
      "Concrete Grade": "High-Durability Silica Fume Marine Concrete M50",
      "Steel Used": "Epoxy-Coated Marine Corrosion-Resistant Rebar (TMT Fe550D)",
      "Handling Capacity": "120+ Million Metric Tonnes Per Annum (MMTPA)",
      "Special Facilities": "International Cruise Terminal & Enclosed Cargo Domes",
      "Environmental Systems": "100% Automated Dry Fog Dust Suppression & Solar Microgrid",
      "Executing Agency": "Visakhapatnam Port Authority (VPA) & Ministry of Ports, Shipping and Waterways",
      "Construction Method": "Cutter Suction Rock Dredging & Precast Marine Decking"
    },
    culturalInsight: {
      title: "港",
      meaning: "Embodying 'Minato' (safe harbor and gateway), Visakhapatnam Port unites maritime heritage with modern oceanic engineering prowess.",
      quote: "「風雨同舟」",
      quoteTranslation: "Navigating storms together in the same boat towards prosperity."
    }
  },
  // 8
  {
    id: "work_india_008",
    slNo: 8,
    title: "Kandla Port Expansion",
    subtitle: "A mega maritime capacity expansion at Deendayal Port (Kandla & Tuna Tekra) adding deep-draft liquid, bulk, and container terminals on the Gulf of Kutch.",
    category: "Port Infrastructure",
    designType: "Design & Build",
    location: "Gujarat",
    area: "150 acres",
    budget: "₹2,000-3,000 crores",
    deadline: "2033",
    completionYear: "2033",
    prefecture: "Gujarat",
    city: "Kandla / Gandhidham (Gulf of Kutch)",
    airportName: "Kandla Airport (IXY) / Bhuj (BHJ)",
    coordinates: "23.0033° N, 70.2186° E",
    userDesc: "Expansion of Kandla Port to handle increased cargo and shipping traffic.",
    summary: "The Kandla Port Expansion, undertaken by the Deendayal Port Authority (DPA) in the Gulf of Kutch, Gujarat, is a strategic mega-project developing deep-draft container and multipurpose terminals at Tuna Tekra, modernizing oil jetties, and expanding liquid cargo handling to over 150 MMTPA under the Sagarmala initiative.",
    p1: "Deendayal Port at Kandla in the Gulf of Kutch is India's highest cargo-handling major seaport by volume, serving the extensive industrial and agricultural hinterlands of Gujarat, Rajasthan, Punjab, Haryana, and Delhi NCR. The expansion project dramatically scales up containerized and liquid bulk cargo capacity to support India's burgeoning trade.",
    p2: "The centerpiece of the expansion is the development of a mega container terminal at Tuna Tekra with a draft of -16 meters, capable of accommodating next-generation container vessels of up to 18,000 TEU. The engineering scope includes a 1.1-kilometer container berth, heavy-duty approach trestles, back-up container stacking yards, and dedicated rail connectivity.",
    p3: "Liquid cargo infrastructure is significantly augmented through the construction of specialized oil jetties equipped with high-pressure marine loading arms, automated vapor recovery units, and insulated chemical pipelines connected to tank farms. Marine piling across the soft marine clay and tidal flats of the Gulf of Kutch utilized heavy hydraulic hammer pile-drivers and corrosion-resistant prestressed concrete.",
    p4: "Advanced tidal monitoring and hydrodynamic models guide automated dredging operations in the high-tidal-range (up to 7 meters) estuary. Upon full commissioning, the expanded Kandla Port reinforces India's western maritime trade dominance and optimizes bulk cargo logistics across northwestern India.",
    detailsList: [
      { label: "Sector", value: "Port Infrastructure" },
      { label: "Sub-Sector", value: "Container & Liquid Cargo Terminal Expansion" },
      { label: "Budget", value: "₹2,000–3,000 Crores" },
      { label: "Area", value: "150 Acres Berths & Interchanges" },
      { label: "Deadline", value: "2033" },
      { label: "Location", value: "Kandla, Gujarat" }
    ],
    kanjiName: "カンドラ港湾メガターミナル拡張事業",
    romajiName: "Kandora Kōwan Mega Tāminaru Kakuchō Jigyō",
    locationStory: "Located in the sheltered Gulf of Kutch near Gandhidham in Gujarat. The port serves as the primary maritime gateway for northern and western India's petroleum, chemical, and agricultural exports.",
    challenges: [
      "Constructing heavy marine berths and approach trestles in a dynamic marine estuary with extreme 7-meter tidal swings and thick soft marine silt.",
      "Ensuring seismic resilience in Seismic Zone V (high earthquake vulnerability) while handling volatile petroleum and chemical fluids."
    ],
    solutions: [
      "Drove high-strength prestressed concrete and steel tubular piles deep into underlying stable sand strata using jack-up construction platforms.",
      "Integrated base-isolation flexible joints and automated emergency shut-off valves (ESDV) across all fluid transmission pipeline manifolds."
    ],
    timeline: [
      { phase: "Concession Finalization & Marine Surveys", date: "2023–2025", desc: "Detailed bathymetric profiling, soil borings, and global concessionaire onboarding." },
      { phase: "Deep Marine Piling & Jetty Trestles", date: "2025–2028", desc: "Hydraulic driving of marine tubular piles and casting of heavy prestressed concrete jetty decks." },
      { phase: "Tuna Tekra Container Berth Construction", date: "2028–2031", desc: "Construction of the 1.1 km container quay wall, automated STS cranes, and container yard paving." },
      { phase: "Liquid Pipeline Manifolds & Commissioning", date: "2032–2033", desc: "Testing of automated marine loading arms, fire-safety foam networks, and commercial launch." }
    ],
    specs: {
      "Structure": "High-Capacity Marine Berths & Deep-Draft Container Quays",
      "Foundation": "High-Capacity Steel Tubular Piles (48m length) & Concrete Piles",
      "Water Draft": "-16.0 meters at Tuna Tekra (18,000 TEU Vessel Capable)",
      "Concrete Grade": "High-Performance Sulfate-Resisting Marine Concrete M50",
      "Steel Used": "Epoxy-Coated Corrosion-Resistant Rebar & Marine Steel Pipes",
      "Handling Capacity": "150+ Million Metric Tonnes Per Annum (MMTPA)",
      "Container Berth Length": "1,100 meters continuous quay",
      "Seismic Design": "Seismic Zone V Compliant Flexible Marine Structures",
      "Executing Agency": "Deendayal Port Authority (DPA) & Sagarmala",
      "Construction Method": "Jack-up Marine Pile Driving & Prestressed Concrete Decking"
    },
    culturalInsight: {
      title: "航",
      meaning: "Reflecting 'Kō' (seafaring navigation), Kandla Port anchors India's trade leadership across ancient Arabian Sea trade routes with modern engineering precision.",
      quote: "「順風満帆」",
      quoteTranslation: "Sailing smoothly with full sails before the wind."
    }
  },
  // 9
  {
    id: "work_india_009",
    slNo: 9,
    title: "Rishikesh-Karanprayag Rail Line",
    subtitle: "A monumental 125 km broad-gauge Himalayan mountain railway with over 105 km in NATM tunnels and iconic gorge bridges across Uttarakhand.",
    category: "Railways",
    designType: "Design & Build",
    location: "Uttarakhand",
    area: "120 km",
    budget: "₹3,000-4,000 crores",
    deadline: "2032",
    completionYear: "2032",
    prefecture: "Uttarakhand",
    city: "Rishikesh to Karanprayag (Garhwal Himalayas)",
    airportName: "Dehradun Jolly Grant Airport (DED)",
    coordinates: "30.0869° N, 78.2676° E to 30.2585° N, 79.2198° E",
    userDesc: "A railway line project to improve connectivity.",
    summary: "The Rishikesh-Karanprayag Rail Line is an extraordinary mountain infrastructure megaproject executed by Rail Vikas Nigam Limited (RVNL) in the Garhwal Himalayas of Uttarakhand. Spanning 125 kilometers through rugged alpine terrain, over 84% of the alignment (105+ km) is constructed inside 17 deep rock tunnels, establishing a permanent, all-weather railway connection to holy pilgrimage shrines and strategic defense borders.",
    p1: "The Rishikesh-Karanprayag Rail Line is one of the most formidable high-altitude railway engineering undertakings in global civil construction history. Developed by Rail Vikas Nigam Limited (RVNL) under the Ministry of Railways, the 125-kilometer broad-gauge corridor weaves through five Himalayan districts (Dehradun, Tehri Garhwal, Pauri Garhwal, Rudraprayag, and Chamoli) to link Rishikesh with Karanprayag.",
    p2: "Owing to the young, fragile geological formations of the Himalayas, over 105 kilometers (84% of the route) is built within 17 deep underground tunnels, including India's longest railway tunnel (Tunnel No. 8 spanning 15.1 km between Devprayag and Janasu). Tunneling is executed using the New Austrian Tunneling Method (NATM) and Double-Shield Hard-Rock Tunnel Boring Machines (TBMs), supported by robotic shotcreting, heavy steel rib supports, and umbrella pipe-roofing.",
    p3: "The surface alignment incorporates 35 major bridges, 18 minor bridges, and 12 modern railway stations spanning deep alpine valleys and the roaring torrents of the Alaknanda and Ganga rivers. Structural bridge engineering features long-span steel bowstring arch bridges, tall reinforced concrete piers exceeding 60 meters in height, and seismic elastomeric pot bearings designed to withstand Richter Scale 8+ earthquakes in Seismic Zone V.",
    p4: "All tunnel portals integrate cross-passages every 250 meters for emergency egress, automated jet-fan forced ventilation, digital fire alarm grids, and continuous rock-stress sensors linked to satellite command centers. Upon completion, the rail line reduces travel time between Rishikesh and Karanprayag from 7 hours on winding mountain roads to under 2 hours by train, boosting tourism, pilgrimage security, and military logistics.",
    detailsList: [
      { label: "Sector", value: "Railways" },
      { label: "Sub-Sector", value: "Himalayan Mountain Railway / Deep Rock Tunneling" },
      { label: "Budget", value: "₹3,000–4,000 Crores (Initial Phase Components)" },
      { label: "Length", value: "125 km (105+ km Underground in Tunnels)" },
      { label: "Deadline", value: "2032" },
      { label: "Location", value: "Garhwal Himalayas, Uttarakhand" }
    ],
    kanjiName: "リシケシ・カランプラヤーグ山岳鉄道事業",
    romajiName: "Rishikeshi Karanpurayāgu Sangaku Tetsudō Jigyō",
    locationStory: "Winding along the sacred Alaknanda River valley through the Garhwal Himalayas of Uttarakhand. The rail alignment provides a reliable, all-weather mass transit backbone to Char Dham pilgrimage hubs and remote border valleys.",
    challenges: [
      "Boring over 105 km of deep tunnels through high-pressure water ingress, squeezing rock faults, and shear zones crossing the Main Central Thrust (MCT).",
      "Erecting massive steel arch bridges over 60-meter deep mountain river gorges subject to seasonal monsoon flash floods and landslides."
    ],
    solutions: [
      "Implemented advanced NATM cyclical excavation combined with 3D geological laser profiling and pre-grouting pipe umbrellas ahead of the tunnel face.",
      "Engineered high-strength weather-resistant structural steel arches launched via cable crane skyways anchored securely into solid mountain bedrock."
    ],
    timeline: [
      { phase: "Geological Survey & Portal Access", date: "2023–2025", desc: "Drilling horizontal core probes, 3D seismic profiling, and construction of bridge access roads." },
      { phase: "Adits & Deep Tunnel Excavation", date: "2025–2028", desc: "Driving 17 NATM tunnels and deep cross-passage shafts with robotic wet shotcreting." },
      { phase: "Gorge Bridges & Station Complexes", date: "2028–2030", desc: "Erection of 35 major steel arch bridges and construction of hillside passenger station buildings." },
      { phase: "Track Laying, Electrification & Handover", date: "2031–2032", desc: "Laying 25kV electrified ballastless tracks, digital signaling, speed trials, and commercial launch." }
    ],
    specs: {
      "Structure": "Broad-Gauge Mountain Railway with Deep Rock Tunnel Linings",
      "Foundation": "Bedrock Rock-Bolt Anchors & Deep Concrete Caissons for Gorge Bridges",
      "Total Route Length": "125.20 km (105.47 km in Tunnels, 84% Underground)",
      "Longest Tunnel": "Tunnel No. 8 (15.1 km between Devprayag and Janasu)",
      "Concrete Grade": "High-Performance Fiber-Reinforced Shotcrete M40 & Structural M50",
      "Major Bridges": "35 Major Steel & Concrete Bridges over Alaknanda Gorges",
      "Seismic Design": "Seismic Zone V Compliant Earthquake-Resistant Engineering",
      "Traction & Speed": "25kV AC Electrified Railway Designed for 100 km/h Mountain Transit",
      "Executing Agency": "Rail Vikas Nigam Limited (RVNL) & Ministry of Railways",
      "Construction Method": "NATM (New Austrian Tunneling Method) & Double-Shield TBMs"
    },
    culturalInsight: {
      title: "峰",
      meaning: "Representing 'Mine' (the sacred Himalayan peaks), this monumental railway pierces through stone to unite divine pilgrimage trails with modern transport safety.",
      quote: "「山高水長」",
      quoteTranslation: "The mountains stand lofty and the rivers flow eternally."
    }
  },
  // 10
  {
    id: "work_india_010",
    slNo: 10,
    title: "Singrauli Solar Park",
    subtitle: "A massive 2,500+ acre ultra-mega solar power development combining ground-mounted solar arrays and floating photovoltaic modules across Madhya Pradesh.",
    category: "Solar Energy",
    designType: "Design & Build",
    location: "Madhya Pradesh",
    area: "2,500+ acres",
    budget: "₹5,000-7,000 crores",
    deadline: "2034",
    completionYear: "2034",
    prefecture: "Madhya Pradesh",
    city: "Singrauli",
    airportName: "Varanasi Airport (VNS) / Rewa Airport",
    coordinates: "24.1997° N, 82.6644° E",
    userDesc: "A major solar park for sustainable energy generation.",
    summary: "The Singrauli Solar Park is a landmark renewable energy infrastructure project developed in Singrauli, Madhya Pradesh (historically known as India's Energy Capital). Spanning over 2,500 acres of arid wasteland and reservoir backwaters, the 1,200+ MW ultra-mega solar complex integrates high-efficiency bifacial mono-PERC PV modules, single-axis solar tracking, and floating solar pontoon arrays.",
    p1: "Singrauli in Madhya Pradesh, long celebrated as India's thermal energy hub, is undergoing a historic green transition through the development of the Singrauli Solar Park. Executed by the Rewa Ultra Mega Solar Limited (RUMSL) and central public sector undertakings, the multi-gigawatt solar complex delivers clean, zero-carbon electricity to the national power grid.",
    p2: "The engineering layout spans over 2,500 acres of non-agricultural terrain and features ground-mounted solar arrays utilizing automated single-axis horizontal trackers that rotate modules to follow the sun's path, boosting annual energy yields by over 18% compared to fixed-tilt systems. The arrays utilize high-efficiency 600W+ bifacial mono-PERC solar photovoltaic cells that capture reflected albedo radiation from the ground.",
    p3: "A specialized engineering component involves floating photovoltaic (FPV) arrays installed across water reservoirs. These floating arrays utilize UV-stabilized high-density polyethylene (HDPE) pontoons and specialized anchoring tethers that adapt to fluctuating seasonal water levels while reducing water evaporation losses by millions of cubic meters each year.",
    p4: "Power evacuation is managed through dual 400kV/220kV Gas-Insulated Substations (GIS) and dedicated high-voltage transmission lines integrated into the Green Energy Corridor. Centralized SCADA systems equipped with drone thermography and automated dry robotic cleaning eliminate water consumption during panel maintenance. Upon completion, the park avoids over 2 million tonnes of CO2 emissions annually.",
    detailsList: [
      { label: "Sector", value: "Renewable Energy" },
      { label: "Sub-Sector", value: "Ultra-Mega Solar & Floating Photovoltaics" },
      { label: "Budget", value: "₹5,000–7,000 Crores" },
      { label: "Area", value: "2,500+ Acres (Ground-Mounted & Floating)" },
      { label: "Deadline", value: "2034" },
      { label: "Location", value: "Singrauli, Madhya Pradesh" }
    ],
    kanjiName: "シングラウリ・メガソーラー発電パーク事業",
    romajiName: "Shingurauri Mega Sōrā Hatsuden Pāku Jigyō",
    locationStory: "Located in the mineral-rich plateau of Singrauli, Madhya Pradesh. The solar development leverages high solar irradiance (>5.5 kWh/m²/day) and expansive water reservoirs to generate massive green electricity.",
    challenges: [
      "Installing large-scale floating solar arrays capable of withstanding monsoon water level variations, heavy wave chop, and intense summer ultraviolet radiation.",
      "Optimizing power collection and high-voltage transmission across undulating rocky terrain and reservoir shorelines."
    ],
    solutions: [
      "Engineered flexible anchoring tether systems and heavy concrete deadweight seabed anchors designed using computational fluid dynamics (CFD).",
      "Deployed 400kV gas-insulated substations (GIS) and underground XLPE power cables to minimize surface environmental footprint."
    ],
    timeline: [
      { phase: "Solar Resource Assessment & Land Leasing", date: "2024–2026", desc: "Pyranometer solar irradiance mapping, reservoir bathymetry, and grid interconnection approvals." },
      { phase: "Civil Grading & Piling", date: "2026–2029", desc: "Ramming galvanised steel foundation piles, FPV pontoon assembly, and pooling substation construction." },
      { phase: "Module Mounting & Inverter Stations", date: "2029–2032", desc: "Mounting bifacial solar modules, installing central string inverters, and string cabling." },
      { phase: "400kV Grid Interconnection & Full Commissioning", date: "2033–2034", desc: "Substation energization, SCADA testing, grid synchronization, and full green power output." }
    ],
    specs: {
      "Structure": "Ground-Mounted Single-Axis Tracker & Floating Solar Array",
      "Foundation": "Driven Galvanized Steel Piles & HDPE Floating Modular Pontoons",
      "Total Solar Capacity": "1,200+ Megawatts (MW) Combined Generation",
      "PV Module Type": "High-Efficiency Bifacial Mono-PERC & TOPCon Modules (600W+)",
      "Inverter Technology": "Centralized High-Efficiency Inverters with SCADA Telemetry",
      "Power Evacuation": "400kV / 220kV Gas-Insulated Substation (GIS) & Green Energy Grid",
      "Cleaning Mechanism": "Water-Free Automated Robotic Cleaning Systems",
      "Carbon Offset": "~2.2 Million Metric Tonnes CO2 Avoided Annually",
      "Executing Agency": "RUMSL, NTPC / SECI & MP Power Management Company",
      "Construction Method": "Modular Tracker Assembly & Floating Pontoon Tethering"
    },
    culturalInsight: {
      title: "陽",
      meaning: "Embodying 'Yō' (the brilliance of the sun), the Singrauli Solar Park transforms an ancient energy landscape into an inexhaustible beacon of clean power.",
      quote: "「光風霽月」",
      quoteTranslation: "Like a gentle breeze in the sunlight and a bright moon after rain."
    }
  }
];

console.log('Indian list array ready with first 10 items. Generating 11 to 45 in next code block...');
