# Taranga Speech & Hearing Centre — Admin & Marketing Kit

This guide serves as a digital operations handbook and marketing collateral repository for the administration staff of **Taranga Speech & Hearing Centre** in Tenali.

---

## 1. Automated Email Templates

### Template A: Appointment Confirmation (In-Person Clinic Visit)
**Subject:** Confirmed: Your Consultation with Taranga Clinic on {{Appointment_Date}}

```text
Dear {{Patient_Name}},

Thank you for choosing Taranga Speech & Hearing Centre. We have reserved your clinical consultation slot.

Here are your booking details:
- Service: {{Service_Name}}
- Specialist: {{Doctor_Name}}
- Date & Time: {{Appointment_Date}} at {{Appointment_Time}}
- Format: In-Person Clinic Visit

Clinic Address:
Taranga Speech & Hearing Aid Centre, Tenali, Andhra Pradesh, India.
Phone: +91 92473 46680

Clinic Visit Instructions:
1. Please bring any previous audiograms, diagnostic reports, or details of existing hearing devices.
2. If this is a child pediatric speech assessment, we recommend arriving 10 minutes early to fill out pre-assessment history questionnaires.

If you need to reschedule or have questions, please call us at +91 92473 46680.

Warm regards,
Taranga Clinic Administration Team
```

---

### Template B: Newsletter Welcome Email
**Subject:** Welcome to Taranga Clinic Hearing Health News!

```text
Dear {{Subscriber_Email}},

Thank you for subscribing to the Taranga Speech & Hearing Centre newsletter!

We are excited to share hearing health guides, pediatric speech development tips, battery maintenance checklists, and early hearing health alerts directly to your inbox.

In the meantime, you can explore our resources library and download home training guides anytime at:
https://tarangaclinic.com/resources

If you ever wish to schedule a diagnostic visit for yourself or a loved one at our Tenali clinic, you can book online at:
https://tarangaclinic.com/booking

To healthy communication,
Dr. Elena R. & Team
Taranga Speech & Hearing Centre
```

---

### Template C: Post-Fitting & Articulation Care Check-in
**Subject:** Hearing Aid Care Checklist & Speech Milestones

```text
Dear {{Patient_Name}},

We hope your recent fitting session at Taranga Clinic went well. To help you adjust to your new device, we have attached our premium patient guides:
1. Hearing Aid Daily Maintenance & Battery Care Checklist
2. Active Speech Exercises Checklist (vowel placement & phonetic drills)

You can download these anytime under the "Resources" tab of our website.

If you experience any physical discomfort or sound level imbalances (ringing, excessive volume, or whistling), please book a tune-up session immediately at:
https://tarangaclinic.com/booking

Sincerely,
Dr. Elena R. & Team
Taranga Speech & Hearing Centre
```

---

## 2. Social Media Announcement Copy

### Post A: Facebook & Instagram (Consumer Focus)
**Visual Idea:** A high-res photo of the premium hearing aids (`hearing_aid_premium.png`) or a warm clinic session photo.

```text
At Taranga Speech & Hearing Centre, we believe that clear communication is the foundation of connection. 💙

We are thrilled to launch our new digital platform! 
Now you can:
🏥 Book in-person diagnostic assessments in Tenali easily online.
🛒 Browse premium rechargeable hearing aids with direct clinic warranty setup.
📚 Download speech development worksheets and resources for home exercises.

👉 Experience the difference today: https://tarangaclinic.com
📞 Questions? Call us at +91 92473 46680

#TarangaClinic #HearingHealth #SpeechTherapy #Tenali #Audiology #BetterHearing #SpeechPathology
```

---

### Post B: LinkedIn (Professional & B2B Focus)
**Visual Idea:** Professional shot of the clinical facility.

```text
We are proud to announce the digital transformation of Taranga Speech & Hearing Centre. 

To expand access to clinical audiology and speech-language pathology in Tenali, we have launched our modern online portal:
- **Easy Online Booking Wizard**: Streamlining patient check-in for diagnostic and diagnostic therapy.
- **Accredited Resources Center**: Speech therapy worksheets and tools designed for caregiver-led home training.
- **WCAG 2.1 AAA Accessibility Widget**: In-browser text-to-speech, high contrast modes, and custom font scaling to serve patients with varying sensory challenges.

Our commitment remains: offering cutting-edge digital diagnostics with empathetic care.

Explore the platform: https://tarangaclinic.com

#DigitalHealth #AudiologyDiagnostics #Accessibility #SpeechRehabilitation #HealthcareTech #Tenali
```

---

## 3. Clinic Admin Site-Management Instructions

### A. How to Update E-Commerce Hearing Aid Catalog
To change products, prices, or specifications:
1. Open the file `src/Shop.jsx` in the code editor.
2. Locate the `products` array starting around **line 14**.
3. Add or modify a product object using the following JSON format:
   ```json
   {
     "id": 7,
     "name": "New Hearing Aid Model X",
     "type": "Hearing Aid",
     "price": "$2,299",
     "description": "Short description of the new digital hearing aid.",
     "image": "/hearing_aid_premium.png",
     "rating": 4.9,
     "specs": ["Feature 1", "Feature 2", "Feature 3"]
   }
   ```
4. Save the file and run a production build (`npm run build`).

### B. How to Manage Clinic Doctor Lists
To add a new audiologist or therapist to the Booking wizard:
1. Open the file `src/Booking.jsx`.
2. Locate the `doctors` array starting around **line 25**.
3. Add a new therapist block:
   ```javascript
   { "name": "Dr. Name Surname (Title)", "specialty": "Hearing Assessment" }
   ```
   *(Note: The specialty must match either `Hearing Assessment` or `Speech Therapy` to auto-link with the service selected in Step 1).*

### C. How to Add New Resource Blogs / PDFs
To publish a new blog post or attach a download document:
1. Open `src/Resources.jsx`.
2. Locate the `articles` array around **line 11**.
3. Add a new article:
   ```javascript
   {
     id: 5,
     title: "Title of the Article",
     tag: "Hearing Health", // or "Speech Therapy", "Caregivers"
     date: "May 25, 2026",
     summary: "A short 2-sentence summary of the topic.",
     author: "Dr. Author Name"
   }
   ```

### D. Managing Callback & Booking Lead Submissions (Formspree)
1. Patient callback requests and appointment booking wizard entries are routed automatically via Formspree.
2. Current Form ID is `mlgzyjge`.
3. Admin logs: Access the Formspree dashboard at `https://formspree.io` using the clinic email credential to view patient names, phone numbers, requested dates, and descriptions in real time.

### E. Managing Newsletter Subscribers & Sending Newsletters
#### How Subscribers are Collected
Whenever a patient enters their email in the **"Subscribe to Hearing Health News"** newsletter box on the homepage, the application sends a secure POST request to Formspree form ID `mlgzyjge`.
- Subject line: `New Newsletter Subscription Request`
- Fields collected: `email`

#### How to Retrieve Subscriber List
1. Log in to your account at **https://formspree.io**.
2. Click on the form ID **`mlgzyjge`**.
3. Go to the **Submissions** tab.
4. Filter by the subject/field "New Newsletter Subscription Request" or export all submissions to a **CSV / Excel** spreadsheet.

#### How to Send Newsletters to Them
Once you have the list of subscriber email addresses, you can send newsletters using one of the following methods:

1. **Email Marketing Platform (Recommended for beautiful newsletters)**
   - Upload/import the exported CSV file into a platform like **Mailchimp**, **Brevo (formerly Sendinblue)**, or **MailerLite** (these have free tiers).
   - Create a newsletter campaign using their drag-and-drop templates.
   - Use the **Newsletter Welcome Email** template from Section 1 for new signups.

2. **Direct Email (For simple announcements)**
   - Copy the email list from your Formspree submissions.
   - Compose an email in your clinic's primary email client (Gmail, Outlook, etc.).
   - Paste the subscriber emails into the **Bcc (Blind Carbon Copy)** field to protect subscriber privacy (never put subscriber emails in the "To" or "Cc" fields).
   - Write your update and send.

