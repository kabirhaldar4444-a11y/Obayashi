const fs = require('fs');
const path = require('path');

// Read existing Japan projects from worksContent.js
const currentWorksContent = fs.readFileSync('src/data/worksContent.js', 'utf8');

// Extract Japan projects array
const projectsMatch = currentWorksContent.match(/export const projects = (\[[\s\S]*?\]);/);
if (!projectsMatch) {
  console.error('Could not find projects array in worksContent.js');
  process.exit(1);
}

// Parse Japan projects
const fullProjects = eval(projectsMatch[1]);
const japanProjects = fullProjects.filter(p => p.locationCategory === 'Japan');
console.log('Preserved Japan projects:', japanProjects.length);

// Now define the 45 Indian projects from the user's table
const indianProjectsRaw = [
  {
    id: "work_india_001",
    slNo: 1,
    title: "Pune International Airport Expansion",
    category: "Aviation",
    area: "200 acres",
    budget: "₹3,000-4,000 crores",
    deadline: "2033",
    location: "Maharashtra",
    userDesc: "Expansion to accommodate growing passenger traffic."
  },
  {
    id: "work_india_002",
    slNo: 2,
    title: "Tidel Park Chennai Expansion",
    category: "Commercial Infrastructure",
    area: "50 acres",
    budget: "₹1,500-2,000 crores",
    deadline: "2031",
    location: "Tamil Nadu",
    userDesc: "Expansion of Chennai's Tidel Park to accommodate more IT companies."
  },
  {
    id: "work_india_003",
    slNo: 3,
    title: "Shendra-Bidkin Industrial Area",
    category: "Industrial Infrastructure",
    area: "500 acres",
    budget: "₹2,500-3,500 crores",
    deadline: "2030",
    location: "Maharashtra",
    userDesc: "Industrial cluster development with a focus on manufacturing."
  },
  {
    id: "work_india_004",
    slNo: 4,
    title: "East Coast Economic Corridor (ECEC)",
    category: "Industrial Infrastructure",
    area: "1,000 km",
    budget: "₹20,000-25,000 crores",
    deadline: "2034",
    location: "Odisha, Andhra Pradesh, Tamil Nadu",
    userDesc: "A major industrial corridor for boosting economic activity."
  },
  {
    id: "work_india_005",
    slNo: 5,
    title: "Hyderabad Pharma City",
    category: "Industrial Infrastructure",
    area: "1,000 acres",
    budget: "₹6,000-8,000 crores",
    deadline: "2032",
    location: "Telangana",
    userDesc: "Industrial park focusing on the pharmaceutical sector."
  },
  {
    id: "work_india_006",
    slNo: 6,
    title: "Amritsar-Kolkata Economic Corridor",
    category: "Industrial Infrastructure",
    area: "800+ km",
    budget: "₹15,000-20,000 crores",
    deadline: "2031",
    location: "Punjab, West Bengal",
    userDesc: "Infrastructure development for enhanced trade and industrial connectivity."
  },
  {
    id: "work_india_007",
    slNo: 7,
    title: "Visakhapatnam Port Expansion",
    category: "Port Infrastructure",
    area: "200 acres",
    budget: "₹4,000-5,000 crores",
    deadline: "2035",
    location: "Andhra Pradesh",
    userDesc: "Expansion of the port to accommodate growing cargo demands."
  },
  {
    id: "work_india_008",
    slNo: 8,
    title: "Kandla Port Expansion",
    category: "Port Infrastructure",
    area: "150 acres",
    budget: "₹2,000-3,000 crores",
    deadline: "2033",
    location: "Gujarat",
    userDesc: "Expansion of Kandla Port to handle increased cargo and shipping traffic."
  },
  {
    id: "work_india_009",
    slNo: 9,
    title: "Rishikesh-Karanprayag Rail Line",
    category: "Railways",
    area: "120 km",
    budget: "₹3,000-4,000 crores",
    deadline: "2032",
    location: "Uttarakhand",
    userDesc: "A railway line project to improve connectivity."
  },
  {
    id: "work_india_010",
    slNo: 10,
    title: "Singrauli Solar Park",
    category: "Renewable Energy",
    area: "2,500+ acres",
    budget: "₹5,000-7,000 crores",
    deadline: "2034",
    location: "Madhya Pradesh",
    userDesc: "A major solar park for sustainable energy generation."
  },
  {
    id: "work_india_011",
    slNo: 11,
    title: "Ludhiana Elevated Road Project",
    category: "Roads and Highways",
    area: "10-12 km",
    budget: "₹1,500-2,000 Crore",
    deadline: "2030",
    location: "Punjab",
    userDesc: "Elevated road project to reduce congestion in the city."
  },
  {
    id: "work_india_012",
    slNo: 12,
    title: "Jaipur Elevated Road Project",
    category: "Roads and Highways",
    area: "10-15 km",
    budget: "₹2,000-3,000 Crore",
    deadline: "2034",
    location: "Rajasthan",
    userDesc: "Elevated road project to ease traffic congestion in Jaipur."
  },
  {
    id: "work_india_013",
    slNo: 13,
    title: "Raipur-Durg Expressway",
    category: "Roads and Highways",
    area: "50-60 km",
    budget: "₹3,000-4,000 Crore",
    deadline: "2033",
    location: "Chhattisgarh",
    userDesc: "A new expressway project to ease traffic between Raipur and Durg."
  },
  {
    id: "work_india_014",
    slNo: 14,
    title: "Bengaluru Elevated Corridor",
    category: "Roads and Highways",
    area: "20-25 km",
    budget: "₹3,500-4,500 Crore",
    deadline: "2032",
    location: "Karnataka",
    userDesc: "Elevated corridors to ease traffic congestion."
  },
  {
    id: "work_india_015",
    slNo: 15,
    title: "Char Dham Highway Project",
    category: "Roads and Highways",
    area: "800-900 km",
    budget: "₹12,000-14,000 Crore",
    deadline: "2031",
    location: "Uttarakhand",
    userDesc: "Construction of improved highways to facilitate pilgrimage."
  },
  {
    id: "work_india_016",
    slNo: 16,
    title: "Siliguri Elevated Corridor",
    category: "Roads and Highways",
    area: "20-25 km",
    budget: "₹2,500-3,500 Crore",
    deadline: "2034",
    location: "West Bengal",
    userDesc: "Elevated road corridor to reduce traffic congestion in Siliguri."
  },
  {
    id: "work_india_017",
    slNo: 17,
    title: "Chandigarh Elevated Corridor",
    category: "Roads and Highways",
    area: "15-20 km",
    budget: "₹1,500-2,500 Crore",
    deadline: "2030",
    location: "Chandigarh",
    userDesc: "Elevated road to ease traffic congestion in Chandigarh."
  },
  {
    id: "work_india_018",
    slNo: 18,
    title: "Indore-Ahmedabad Expressway",
    category: "Roads and Highways",
    area: "350-400 km",
    budget: "₹5,500-6,500 Crore",
    deadline: "2033",
    location: "Madhya Pradesh, Gujarat",
    userDesc: "An expressway connecting Indore and Ahmedabad for better road connectivity."
  },
  {
    id: "work_india_019",
    slNo: 19,
    title: "Smart City Project, Indore",
    category: "Urban Infrastructure",
    area: "100-150 km²",
    budget: "₹1,000-1,500 Crore",
    deadline: "2031",
    location: "Madhya Pradesh",
    userDesc: "Infrastructure development for a smart city with advanced technologies."
  },
  {
    id: "work_india_020",
    slNo: 20,
    title: "Varanasi Smart City Project",
    category: "Urban Infrastructure",
    area: "80-120 km²",
    budget: "₹1,200-1,800 Crore",
    deadline: "2032",
    location: "Uttar Pradesh",
    userDesc: "Development of a smart city in Varanasi, incorporating modern amenities."
  },
  {
    id: "work_india_021",
    slNo: 21,
    title: "Amritsar Smart City Project",
    category: "Urban Infrastructure",
    area: "80-100 km²",
    budget: "₹1,500-2,000 Crore",
    deadline: "2034",
    location: "Punjab",
    userDesc: "Modernization of Amritsar into a smart city with advanced infrastructure."
  },
  {
    id: "work_india_022",
    slNo: 22,
    title: "Rajkot Smart City Project",
    category: "Urban Infrastructure",
    area: "70-90 km²",
    budget: "₹1,200-1,600 Crore",
    deadline: "2033",
    location: "Gujarat",
    userDesc: "Development of Rajkot into a smart city with modern infrastructure."
  },
  {
    id: "work_india_023",
    slNo: 23,
    title: "Patna Ganga Riverfront Project",
    category: "Urban Infrastructure",
    area: "20-30 km",
    budget: "₹3,000-4,500 Crore",
    deadline: "2031",
    location: "Bihar",
    userDesc: "Riverfront development project to enhance tourism and urban amenities."
  },
  {
    id: "work_india_024",
    slNo: 24,
    title: "Bhilai Smart City Project",
    category: "Urban Infrastructure",
    area: "60-90 km²",
    budget: "₹1,000-1,500 Crore",
    deadline: "2035",
    location: "Chhattisgarh",
    userDesc: "Modernization of Bhilai into a smart city with advanced technologies."
  },
  {
    id: "work_india_025",
    slNo: 25,
    title: "Lucknow Metro Phase 2",
    category: "Urban Transportation",
    area: "25-30 km",
    budget: "₹2,500-3,500 Crore",
    deadline: "2035",
    location: "Uttar Pradesh",
    userDesc: "The second phase of the Lucknow Metro project."
  },
  {
    id: "work_india_026",
    slNo: 26,
    title: "Kolkata East-West Metro Corridor",
    category: "Urban Transportation",
    area: "20-25 km",
    budget: "₹4,500-6,000 Crore",
    deadline: "2031",
    location: "West Bengal",
    userDesc: "Expansion of the metro corridor to improve urban mobility."
  },
  {
    id: "work_india_027",
    slNo: 27,
    title: "Bhopal Metro Project",
    category: "Urban Transportation",
    area: "20-25 km",
    budget: "₹2,500-3,500 Crore",
    deadline: "2030",
    location: "Madhya Pradesh",
    userDesc: "Metro system to ease urban mobility in Bhopal."
  },
  {
    id: "work_india_028",
    slNo: 28,
    title: "Mumbai Metro Line 5",
    category: "Urban Transportation",
    area: "20-25 km",
    budget: "₹8,000-10,000 Crore",
    deadline: "2032",
    location: "Maharashtra",
    userDesc: "Metro expansion connecting Thane and Wadala."
  },
  {
    id: "work_india_029",
    slNo: 29,
    title: "Kolkata-Howrah Metro Tunnel",
    category: "Urban Transportation",
    area: "10-12 km",
    budget: "₹3,000-4,500 Crore",
    deadline: "2034",
    location: "West Bengal",
    userDesc: "Underground metro tunnel to ease transportation between Kolkata and Howrah."
  },
  {
    id: "work_india_030",
    slNo: 30,
    title: "Mumbai Metro Line 4",
    category: "Urban Transportation",
    area: "20-25 km",
    budget: "₹4,500-6,000 Crore",
    deadline: "2031",
    location: "Maharashtra",
    userDesc: "Metro expansion to improve public transport in Mumbai."
  },
  {
    id: "work_india_031",
    slNo: 31,
    title: "Kolkata Metro Line 6",
    category: "Urban Transportation",
    area: "20-25 km",
    budget: "₹3,000-4,000 Crore",
    deadline: "2034",
    location: "West Bengal",
    userDesc: "A new metro line to improve public transport capacity in Kolkata."
  },
  {
    id: "work_india_032",
    slNo: 32,
    title: "Delhi Metro Phase 5",
    category: "Urban Transportation",
    area: "50-60 km",
    budget: "₹5,000-7,000 Crore",
    deadline: "2032",
    location: "Delhi",
    userDesc: "Expansion of the Delhi Metro network with new lines and stations."
  },
  {
    id: "work_india_033",
    slNo: 33,
    title: "Navi Mumbai Metro Line 1 & 2",
    category: "Urban Transportation",
    area: "25-30 km",
    budget: "₹4,000-6,000 Crore",
    deadline: "2030",
    location: "Maharashtra",
    userDesc: "Expansion of metro services to improve connectivity in Navi Mumbai."
  },
  {
    id: "work_india_034",
    slNo: 34,
    title: "Kanpur Elevated Metro Line",
    category: "Urban Transportation",
    area: "15-20 km",
    budget: "₹3,500-4,500 Crore",
    deadline: "2035",
    location: "Uttar Pradesh",
    userDesc: "Elevated metro line for improving public transport in Kanpur."
  },
  {
    id: "work_india_035",
    slNo: 35,
    title: "Pune Metro Line 2",
    category: "Urban Transportation",
    area: "15-20 km",
    budget: "₹2,500-3,500 Crore",
    deadline: "2031",
    location: "Maharashtra",
    userDesc: "Expansion of Pune's metro system to improve urban mobility."
  },
  {
    id: "work_india_036",
    slNo: 36,
    title: "Mumbai Metro Line 7A",
    category: "Urban Transportation",
    area: "15-20 km",
    budget: "₹3,000-4,500 Crore",
    deadline: "2032",
    location: "Maharashtra",
    userDesc: "Extension of the metro network in Mumbai for better urban mobility."
  },
  {
    id: "work_india_037",
    slNo: 37,
    title: "Enayam Port Project",
    category: "Port Infrastructure",
    area: "1,000-1,500 hectares",
    budget: "INR 7,500-10,000 Crore",
    deadline: "2032",
    location: "Tamil Nadu",
    userDesc: "A new greenfield port project aimed at boosting industrial growth and trade."
  },
  {
    id: "work_india_038",
    slNo: 38,
    title: "Paradip Port Capacity Expansion",
    category: "Port Infrastructure",
    area: "150-200 hectares",
    budget: "INR 3,000-4,500 Crore",
    deadline: "2033",
    location: "Odisha",
    userDesc: "Expansion of the existing port to handle more cargo, including development of new terminals."
  },
  {
    id: "work_india_039",
    slNo: 39,
    title: "Colachel Port Project",
    category: "Port Infrastructure",
    area: "500-700 hectares",
    budget: "INR 4,000-6,000 Crore",
    deadline: "2032",
    location: "Tamil Nadu",
    userDesc: "A deep-draft port project to handle larger vessels, increasing cargo capacity and connectivity."
  },
  {
    id: "work_india_040",
    slNo: 40,
    title: "Bikaner Solar Park",
    category: "Solar Energy",
    area: "2,000 acres (approx. 8.1 sq. km)",
    budget: "INR 2,500 crore - 3,000 crore",
    deadline: "2033",
    location: "Rajasthan",
    userDesc: "A 500 MW solar park under development to boost renewable energy."
  },
  {
    id: "work_india_041",
    slNo: 41,
    title: "Rewa Solar Park Expansion",
    category: "Solar Energy",
    area: "Additional 500 acres",
    budget: "INR 1,500 crore - 2,000 crore",
    deadline: "2030",
    location: "Madhya Pradesh",
    userDesc: "Expansion of the Rewa Solar Park to increase its capacity by 250 MW."
  },
  {
    id: "work_india_042",
    slNo: 42,
    title: "Bundelkhand Solar Project",
    category: "Solar Energy",
    area: "600 acres (approx. 2.4 sq. km)",
    budget: "INR 650 crore - 850 crore",
    deadline: "2033",
    location: "Uttar Pradesh",
    userDesc: "Solar park under development with a capacity of 150 MW."
  },
  {
    id: "work_india_043",
    slNo: 43,
    title: "Sambhar Lake Solar Park",
    category: "Solar Energy",
    area: "9,000 acres (approx. 36.4 sq. km)",
    budget: "INR 18,000 crore - 22,000 crore",
    deadline: "2030",
    location: "Rajasthan",
    userDesc: "Solar power park under development with a capacity of 2,000 MW."
  },
  {
    id: "work_india_044",
    slNo: 44,
    title: "Bhadla Solar Phase II",
    category: "Solar Energy",
    area: "5,000 acres (approx. 20.2 sq. km)",
    budget: "INR 10,000 crore - 12,000 crore",
    deadline: "2034",
    location: "Rajasthan",
    userDesc: "Expansion of the Bhadla Solar Park with a capacity of 1,000 MW."
  },
  {
    id: "work_india_045",
    slNo: 45,
    title: "Khavda Solar Project",
    category: "Solar Energy",
    area: "1,000 acres (approx. 4 sq. km)",
    budget: "INR 1,200 crore - 1,500 crore",
    deadline: "2031",
    location: "Gujarat",
    userDesc: "A major solar project under construction with a 250 MW capacity."
  }
];

console.log('Total Indian projects to generate:', indianProjectsRaw.length);
