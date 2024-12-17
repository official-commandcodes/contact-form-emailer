require("dotenv").config();

const express = require("express");
const Joi = require("joi");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const app = express();

// Parse request has json object
app.use(express.json());

function validateInfo(data) {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  });

  return schema.validate(data);
}

// Send mail class handler
class SendEmail {
  #transporter() {
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async #createEmailTemplateAndSend(subject, templateName, payload) {
    const source = fs.readFileSync(path.join(__dirname, `./${templateName}.handlebars`), "utf8");
    const compiledTemplate = handlebars.compile(source); // Another templating engine could be used

    const data = {
      from: process.env.EMAIL,
      to: payload.email,
      subject: subject,
      html: compiledTemplate(payload),
    };

    this.#transporter().sendMail(data, (error, info) => {
      if (error) {
        throw error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  }

  // Send Mail method
  async messageHandler(data) {
    await this.#createEmailTemplateAndSend(data.fullName, "message-template", data);
  }
}

app.post("/api/get-in-touch", async (req, res) => {
  try {
    // Validate request body data
    const { error } = validateInfo(req.body);

    if (error) {
      res.status(400).json({
        status: "fail",
        error: error.details.map((d) => d.message).join(", "),
      });
      return;
    }

    // Send Mail
    await new SendEmail().messageHandler(req.body);

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

app.listen(4000, () => console.log("Server running on PORT: 4000"));
