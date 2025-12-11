const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

const { isValidEmail } = require('../modules/checkValidForm');

exports.testMagicLink = async (req, res) => {

};