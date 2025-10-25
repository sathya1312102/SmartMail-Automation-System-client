# SmartMail-Automation-System-client

SmartMail Automation with React, Node.js, Express and Nodemailer

A full-stack application designed to send personalized promotional and notification emails to multiple recipients. Features include dynamic email templates, drag-and-drop Excel uploads, attachment support, and a modern, responsive UI.

🛠️ Tech Stack

Frontend: React, TailwindCSS

Backend: Node.js, Express

Database: MongoDB

Email Service: Nodemailer

Deployment: Render

⚙️ Features

Bulk Email Sending: Efficiently send emails to multiple recipients using Nodemailer.

Dynamic Templates: Personalize emails with dynamic content.

Excel Upload: Upload recipient lists via drag-and-drop Excel files.

Attachment Support: Include attachments in your emails.

Modern UI: Responsive design with a dark theme and smooth animations.

Progress Tracking: Real-time progress bar during email sending.

📥 Installation

Clone the repository:
git clone https://github.com/sathya1312102/SmartMail-Automation-System-client.git
cd smartmail-automation

Backend
cd server
npm install

Create a .env file with your email credentials:

EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

Start the backend server:
npm start

Frontend
cd client
npm install
npm start

The frontend will run on http://localhost:3000, and the backend on http://localhost:5000.

🧪 Usage

Enter the email subject and message.

Upload an Excel file with recipient emails in Column A.

Optionally, upload attachments.

Click Send Emails to dispatch the emails.

🧩 Contributing

Contributions are welcome! Please fork the repository, create a new branch, make your changes, and submit a pull request.


