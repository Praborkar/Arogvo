Arogvo – Sehat Simplified

Arogvo is a React Native–based health & wellness application designed to simplify access to modern healthcare. The app enables users to search doctors, book appointments, track health metrics, store digital medical records, consult online, and access smart wellness guidance — all backed by Firebase’s secure and scalable infrastructure.

🌟 Features
🔹 Doctor Search & Appointment Booking

Search doctors by specialization, ratings, or city

View doctor profiles with experience, timings, and fees

Book and manage appointments instantly

🔹 Online Consultations

Secure video/voice consultation support (upcoming)

Chat follow-ups

Prescription upload/download support

🔹 Digital Health Records (EHR)

Upload medical reports, prescriptions, test results

Auto-categorized storage

Encrypted data storage using Firebase Security Rules

🔹 Smart Health Tracker

Track steps, sleep, mood & daily vitals

Smart notifications for medicine reminders

Weekly and monthly health trends

🔹 Emergency Support

One-tap SOS button

Auto-call emergency contacts

Nearby hospital detection

🔹 Personalized Health Tips

AI-driven diet, fitness, and sleep recommendations

Symptom checker (future feature)

Preventive health insights

🛠️ Tech Stack
📱 Frontend – Mobile App

React Native

React Navigation

NativeWind / Tailwind CSS

React Query

Redux Toolkit / Context API

Axios

🔥 Backend & Cloud

Firebase Authentication (user login & roles)

Firebase Firestore (database for all data)

Firebase Storage (medical reports, images)

Firebase Cloud Messaging (FCM) (notifications)

Firebase Cloud Functions (business logic)

🔐 Security

Firebase Security Rules

JWT (optional if integrating Node backend later)

📂 Project Structure
Arogvo/
 ├── app/
 │    ├── components/
 │    ├── screens/
 │    ├── hooks/
 │    ├── assets/
 │    ├── navigation/
 │    └── utils/
 │
 ├── firebase/
 │    ├── config.js
 │    ├── auth.js
 │    ├── database.js
 │    └── storage.js
 │
 ├── assets/
 │    └── screenshots/
 │         ├── login.png
 │         ├── home.png
 │         ├── doctor-search.png
 │         ├── appointment.png
 │         ├── records.png
 │         └── health-tracker.png
 │
 └── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Praborkar/arogvo.git
cd arogvo

2️⃣ Install Dependencies
npm install

3️⃣ Firebase Setup

Create a .env file:

API_KEY=your_api_key
AUTH_DOMAIN=your_auth_domain
PROJECT_ID=your_project_id
STORAGE_BUCKET=your_storage_bucket
MESSAGING_SENDER_ID=your_sender_id
APP_ID=your_app_id


Import inside Firebase config file (config.js).

4️⃣ Run the App
npm run android   # for Android
npm run ios       # for iOS

## 📸 Screenshots

### 🔹 Login & Signup
![Login Screen](/assets/screenshots/login%20Screenshot.jpg)  
![Signup Screen](/assets/screenshots/Signup%20Screenshot.jpg)

### 🔹 Home Dashboard 
![Home Screen](/assets/screenshots/Homepage1%20Screenshot.jpg)

![Doctor Search](/assets/screenshots/home2%20screenshot.jpg)

![Appointment](/assets/screenshots/home3%20screenshot.jpg)

![Health Records](/assets/screenshots/home4%20screenshot.jpg)

🚀 Deployment

Since Arogvo is a React Native + Firebase project:

Android Deployment

Generate signed APK / AAB

Upload to Play Console

Add SHA keys to Firebase console

iOS Deployment

Configure Xcode project

Add iOS bundle ID to Firebase

Upload build to TestFlight / App Store

🗺️ Roadmap (Future Enhancements)
📅 Phase 1 — Core Enhancements

 Improved doctor profile UI

 Add Firebase Cloud Messaging (push notifications)

 Offline mode with AsyncStorage

 Skeleton loaders for all pages

📅 Phase 2 — Health Data Improvements

 Integration with Google Fit / Apple HealthKit

 Mood tracking module

 AI-generated daily health score

📅 Phase 3 — Telemedicine Features

 In-app video consultation using WebRTC

 Live doctor availability

 Secure document sharing in chat

 Doctor dashboard mobile version

📅 Phase 4 — User Experience Upgrades

 Multi-language support (EN/HI/BN)

 Dark mode

 Family health profiles

 Auto reminders via Cloud Functions

📅 Phase 5 — Security & Compliance

 HIPAA-style enhancements

 End-to-end encrypted chat

 Access logs for records (audit trail)

📅 Phase 6 — Admin & Analytics

 Admin web dashboard

 Real-time analytics (engagement, retention)

 Doctor performance reports

📅 Phase 7 — Monetization

 In-app payments (Razorpay / Stripe)

 Consultation fees system

 Referral system

 Subscription-based premium features

🏷️ GitHub Topics
healthcare
medical-app
react-native
firebase
health-app
telemedicine
doctor-appointment
online-consultation
ehr
emr
digital-health-records
health-tracking
wellness-app
mobile-development
healthtech

✨ Author

Prabor Kar
Full-Stack & Mobile App Developer
GitHub: https://github.com/Praborkar

Portfolio: https://prabor.netlify.app/