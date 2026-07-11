import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
})

let ALL_HOSPITALS = null;

const loadHospitals = async () => {
  if (!ALL_HOSPITALS) {
    const res = await axios.get(`/hospitals.json?t=${new Date().getTime()}`);
    ALL_HOSPITALS = res.data;
  }
  return ALL_HOSPITALS;
}

export const getHospitals = async (filters) => {
  const hospitals = await loadHospitals();
  let result = hospitals;
  if (filters?.state) {
    result = result.filter(h => h.state === filters.state);
  }
  if (filters?.district) {
    result = result.filter(h => h.district === filters.district);
  }
  return { data: result };
}

export const getHospital = async (id) => {
  const hospitals = await loadHospitals();
  const h = hospitals.find(h => h.id === id.toString());
  return { data: h };
}

export const searchHospitals = async (q) => {
  const hospitals = await loadHospitals();
  const query = q.toLowerCase();
  const result = hospitals.filter(h => 
    h.name.toLowerCase().includes(query) || 
    h.district.toLowerCase().includes(query) ||
    h.state.toLowerCase().includes(query) ||
    h.type.toLowerCase().includes(query)
  );
  return { data: result };
}
export const getDepartments = (hospitalId) => API.get(`/departments/${hospitalId}`)
export const getReviews = (hospitalId) => API.get(`/reviews/${hospitalId}`)
export const addReview = (hospitalId, data) => API.post(`/reviews/${hospitalId}`, data)
export const chatWithAI = (message) => API.post('/ai/chat', { message, language: 'hinglish' })
