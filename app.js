import express from 'express';
import nodemailer from 'nodemailer';
import session from "express-session";
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;;
dotenv.config();

app.use(session({
  secret: process.env.SECRET_KEY || "default_secret",
  resave: false,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.render("home.ejs")
})
app.get("/Aboutus", (req, res) => {
  res.render("Aboutus.ejs")
})
app.get("/Contact", (req, res) => {
  res.render("Contact.ejs", { status: req.query.status });
});
app.get("/OurApproach", (req, res) => {
  res.render("OurApproach.ejs")
})
app.get("/Activities", (req, res) => {
  res.render("Activities.ejs")
})
app.get("/Partnerships", (req, res) => {
  res.render("Partnerships.ejs")
})
app.get("/Volunteer", (req, res) => {
  res.render("Volunteer.ejs", { status: req.query.status });
});
app.get("/News", (req, res) => {
  res.render("News.ejs")
})





app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: "aiocam237@gmail.com",
      subject: "New Contact Message - AIOCAM Website",
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    });

    
    res.redirect("/Contact?status=success");

  } catch (error) {
    console.error(error);

    
    res.redirect("/Contact?status=error");
  }
});


app.post("/volunteer", async (req, res) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    let emailContent = "";

    Object.keys(req.body).forEach(key => {
      emailContent += `${key}: ${req.body[key]}\n`;
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "aiocam237@gmail.com",
      subject: "New Volunteer Sign Up - AIOCAM Website",
      text: emailContent
    });

   res.redirect("/Volunteer?status=success");

  } catch (error) {
    console.log(error);
    res.redirect("/Volunteer?status=error");
  }
});
















app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});