

exports.renderLoginPage = async (req, res) => {
    try {
        res.render('login', { layout: 'auth' });
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while rendering login page',
            details: error.message,
        });
    }
};

function generateMagicToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '60m' });
}

async function sendMagicLinkEmail(email, link) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Your Magic Login Link',
    html: `<a href="${link}">Click here to sign in</a>`
  });
}

exports.sendMagicLink = async (req, res) => {
    try {
        const { email: emailProvided } = req.body;

        const email = emailProvided.toLowerCase();

        if (!isValidEmail(email)) {
            res.status(400).send(`${email} is an invalid email.`);
            return false;
        }

        let user = await User.findOne({ email });

        if (!user) {
            res.status(404).send(`No account found for ${email}.`);
            return false;
        }

        const token = generateMagicToken(email);
        const link = `${process.env.DOMAIN_URL}/auth/magic-login?token=${token}`;
        await sendMagicLinkEmail(email, link);
        res.json({ success: true });

    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while sending magic link',
            details: error.message,
        });
    }
};

exports.testMagicLink = async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.send('Magic link verified for ' + decoded.email);
  } catch (e) {
    res.status(400).send('Invalid or expired link');
  }
};