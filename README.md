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
**Arogya.ai** is an advanced AI-powered healthcare companion designed to bridge the gap between patients and the right medical facilities. By leveraging artificial intelligence, Arogya.ai guides users through a comprehensive **Treatment Journey**, helping them identify their symptoms, find the most appropriate medical departments, and locate nearby government and private hospitals quickly and efficiently.

## ✨ Key Features
- **🧠 AI Treatment Journey**: An intelligent, step-by-step interactive map (Symptoms ➔ Suggested Department ➔ Suggested Tests ➔ Nearby Hospitals ➔ Appointment ➔ Medicine Reminder ➔ Recovery Tracking).
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

## 🔄 Workflow Structure

```mermaid
flowchart TB
    %% Styling
    classDef userEntry fill:#59e1ff,stroke:#0f172a,stroke-width:2px,color:#0f172a,font-weight:bold
    classDef module fill:#1e293b,stroke:#59e1ff,stroke-width:2px,color:#fff
    classDef process fill:#334155,stroke:#94a3b8,stroke-width:1px,color:#fff
    classDef database fill:#0f172a,stroke:#fbbf24,stroke-width:2px,color:#fff

    subgraph Client [📱 User Interface Layer]
        direction TB
        A([User Login / Entry]):::userEntry --> B{Select Path}
        B -->|Symptoms| C[🤖 AI Health Assistant]:::module
        B -->|Find Care| D[🏥 Hospital Locator]:::module
        B -->|Urgent| E[🚑 Emergency Services]:::module
    end

    subgraph Logic [⚙️ Core Processing]
        direction TB
        C --> F(Analyze Symptoms & Predict Dept):::process
        D --> G(Spatial Search & OPD Filters):::process
        E --> H(Real-Time Trauma & Blood Bank Check):::process
    end

    subgraph Data [💾 Database & APIs]
        direction TB
        F -.-> I[(Medical Knowledge Base)]:::database
        G -.-> J[(Hospitals & Doctors DB)]:::database
        H -.-> K[(Emergency Live Feeds)]:::database
    end

    subgraph Output [🎯 Actionable Outcomes]
        direction TB
        F --> L([Personalized Treatment Plan]):::userEntry
        G --> M([Interactive Map & Booking]):::userEntry
        H --> N([Immediate SOS & Routing]):::userEntry
    end
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
