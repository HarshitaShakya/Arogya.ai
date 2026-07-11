import { INDIA_STATES_DISTRICTS } from '../utils/indiaData';

const HOSPITAL_TYPES = ['District Hospital', 'Community Health Centre', 'Primary Health Centre', 'Medical College', 'Sub-District Hospital'];
const HOSPITAL_PREFIXES = ['Government', 'Civil', 'General', 'State', 'District'];

function generateHospitals() {
  const hospitals = [];
  let idCounter = 1000;

  // Simple string hash function for deterministic coordinates
  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
    return hash;
  };

  for (const [state, districts] of Object.entries(INDIA_STATES_DISTRICTS)) {
    for (const district of districts) {
      // Generate 5 to 12 hospitals per district deterministically based on name length
      const numHospitals = 5 + (district.length % 8);
      
      // Generate a deterministic center coordinate for this district somewhere in India
      // India approx bounds: Lat 8.0 to 37.0, Lng 68.0 to 97.0
      const distHash = Math.abs(hashCode(district + state));
      const centerLat = 8.0 + (distHash % 29000) / 1000;
      const centerLng = 68.0 + ((distHash * 7) % 29000) / 1000;
      
      for (let i = 0; i < numHospitals; i++) {
        idCounter++;
        
        // Deterministic pseudo-randomness
        const typeIndex = (idCounter + i) % HOSPITAL_TYPES.length;
        const prefixIndex = (idCounter * 3 + i) % HOSPITAL_PREFIXES.length;
        
        const type = HOSPITAL_TYPES[typeIndex];
        const prefix = HOSPITAL_PREFIXES[prefixIndex];
        
        let name;
        if (type === 'Medical College') {
          name = `${prefix} Medical College and Hospital, ${district}`;
        } else if (type === 'District Hospital') {
          name = `${district} ${prefix} Hospital`;
        } else {
          name = `${prefix} ${type}, ${district} (Sector ${i + 1})`;
        }

        hospitals.push({
          id: idCounter.toString(),
          name: name,
          state: state,
          district: district,
          address: `Main Road, Near City Center, ${district}, ${state} - 10000${(i % 9) + 1}`,
          type: type,
          is_ayushman_empanelled: (idCounter % 3) !== 0, // ~66% empanelled
          emergency_available: (idCounter % 4) !== 0 || type === 'Medical College' || type === 'District Hospital', // High emergency availability
          total_beds: 50 + (idCounter % 950), // 50 to 1000 beds
          lat: centerLat + ((i * 13) % 100 - 50) / 5000, // Small jitter around the district center
          lng: centerLng + ((i * 17) % 100 - 50) / 5000,
        });
      }
    }
  }
  return hospitals;
}

// Generate it once when the module is imported
export const ALL_HOSPITALS = generateHospitals();
