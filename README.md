<div align="center">
  <img src="frontend/public/logo.png" alt="Arogya.ai Logo" width="250" />
  
  # Arogya.ai
  
  **RIGHT TREATMENT. RIGHT PLACE. RIGHT TIME.**

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

<br />

## 🌟 Overview
**Arogya.ai** is an advanced AI-powered healthcare companion designed to bridge the gap between patients and the right medical facilities. By leveraging artificial intelligence, Arogya.ai guides users through a comprehensive **Care Workspace**, helping them identify their symptoms, find the most appropriate medical departments, and locate nearby government and private hospitals quickly and efficiently.

## ✨ Key Features
- **🧠 AI Care Workspace**: An intelligent, step-by-step interactive map (Symptoms ➔ Suggested Department ➔ Suggested Tests ➔ Nearby Hospitals ➔ Appointment ➔ Medicine Reminder ➔ Recovery Tracking).
- **🏥 Smart Hospital Locator**: Discover nearby healthcare facilities, complete with OPD timings, department specializations, and real-time maps.
- **🚑 Emergency Assistance**: Quick access to 24/7 emergency wards, trauma centers, and blood banks.
- **🎨 Premium Dark UI**: A highly responsive, dynamic, and aesthetic user interface featuring glassmorphism, subtle micro-animations, and vibrant gradients.
- **🔐 Secure Authentication**: Integrated user login and signup flows to save favorite hospitals and track medical history.

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone repo_url
   cd "Arogya.ai"
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup (if applicable):**
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```

## 🛠️ Technology Stack
- **Frontend**: React, Vite, CSS (Modern flexbox/grid layouts with dark aesthetics)
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Backend**: Python (FastAPI/Flask/Django)

## 🧠 Core Architecture & Workflow Structure

To provide a comprehensive understanding of Arogya.ai, we've mapped out our **System Ecosystem** and technical **Workflow Structure**.

### 1. System Ecosystem (Mindmap)
```mermaid
mindmap
  root((Arogya.ai))
    🤖 AI Health Assistant
      Symptom Triage
      Department Prediction
      Required Tests Logic
    🏥 Smart Hospital Locator
      Real-Time Interactive Maps
      OPD Timings & Schedules
      Specialty-Based Filters
    🚑 Emergency SOS
      24/7 Trauma Centers
      Live Blood Bank Access
      Immediate Routing
    👤 User Profiles
      Personal Care Workspace
      Saved Favorite Hospitals
```

### 2. Workflow Structure
```mermaid
flowchart LR
    %% Custom Tech Styling
    classDef init fill:#3b82f6,stroke:#1e3a8a,stroke-width:2px,color:#fff,font-weight:bold
    classDef aiEngine fill:#8b5cf6,stroke:#4c1d95,stroke-width:2px,color:#fff
    classDef geoEngine fill:#10b981,stroke:#064e3b,stroke-width:2px,color:#fff
    classDef dataNode fill:#0f172a,stroke:#475569,stroke-width:1px,color:#e2e8f0
    
    A([User Client]):::init --> B{API Gateway}
    
    B -->|Symptom Log| C(AI Triage Engine):::aiEngine
    C --> D[Predict Dept & Tests]:::dataNode
    D --> E(Geo-Spatial Locator):::geoEngine
    
    B -->|Manual Search| E
    E --> F[OPD Timings & Maps]:::dataNode
    
    B -->|SOS / Urgent| G(Emergency Dispatch):::init
    G --> H[24/7 Trauma Centers]:::dataNode
    G --> I[Live Blood Banks]:::dataNode
    
    F --> J([Final Treatment Roadmap]):::init
    D -.-> J
    H --> J
    I --> J
```

## 🤝 Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



---
<div align="center">
  <p>Built with ❤️ by Harshita Shakya</p>
</div>
