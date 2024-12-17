# Express Nodemailer API

A lightweight and efficient **contact form email service** built with **Node.js** and **Express.js**, utilizing **Nodemailer** to send emails and **Handlebars** for dynamic email templates. User input is validated using **Joi** to ensure secure and structured data handling.

---

## Live Demo

You can access the live demo of the contact form email service at:

[https://contact-form-emailer.onrender.com/api/get-in-touch](https://contact-form-emailer.onrender.com/api/api/get-in-touch)

---

## Features

- **API Endpoint**: Accepts `POST` requests for sending emails via `/api/get-in-touch`.
- **Input Validation**: Ensures required fields (`fullName`, `email`, `message`) are present and valid.
- **Custom Email Templates**: Leverages Handlebars for flexible, dynamic email content.
- **Secure Credentials**: Configuration is managed using environment variables.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **Nodemailer**
- **Handlebars**
- **Joi**

---

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org) (v14+)
- [npm](https://www.npmjs.com/)

---

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/official-commandcodes/express-nodemailer-api.git
   cd express-nodemailer-api
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the project root and add your email service credentials:

   ```env
   EMAIL_SERVICE=gmail
   EMAIL_HOST=smtp.gmail.com
   EMAIL=your-email@example.com
   EMAIL_PASSWORD=your-app-password
   ```

   - Replace `your-email@example.com` with your actual email address.
   - Replace `your-app-password` with an App Password or SMTP password (specific to your email provider).

4. **Create Email Templates**:
   Add a Handlebars email template named `message-template.handlebars` in the root directory:

   ```handlebars
   <p>{{message}}</p>
   ```

5. **Run the Server**:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:4000`.

---

## API Documentation

### Endpoint: Send Email

**URL**: `/api/get-in-touch`  
**Method**: `POST`  
**Content-Type**: `application/json`

#### Request Body:

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "message": "Hello, this is a test message!"
}
```

#### Response:

**Success**:

```json
{
  "message": "Email sent successfully"
}
```

**Validation Error**:

```json
{
  "status": "fail",
  "error": "fullName is required, email must be valid"
}
```

**Server Error**:

```json
{
  "error": "An internal server error occurred"
}
```

---

## Usage

You can integrate this service as a backend API to handle contact forms or automated email notifications for your website or application.

1. Start the server:
   ```bash
   npm start
   ```
2. Send a `POST` request to `http://localhost:4000/api/get-in-touch` with the required JSON data.

---

## Example Request with Fetch API

```javascript
fetch("http://localhost:4000/api/get-in-touch", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    message: "This is a test message!",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

---

## Troubleshooting

- Ensure the **email credentials** in `.env` are correct.
- If using Gmail, make sure:
  - 2-Step Verification is enabled.
  - An App Password is generated and used as `EMAIL_PASSWORD`.
- Verify your email provider's SMTP settings (host, service).
- Check server logs for errors.

---

## License

This project is licensed under the MIT License.

---

## Author

[Your Name](Musa Abdulkabir)  
[Your GitHub Profile](https://github.com/official-commandcodes)

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Commit your changes.
4. Submit a pull request.
