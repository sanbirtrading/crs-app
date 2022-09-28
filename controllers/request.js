const db = require('../models');
const Sequelize = require('sequelize');
const moment = require('moment');

exports.getRequests = async (req, res, next) => {
  try {
    const requests = await db.Request.findAll({
      order: [['createdAt', 'DESC']],
      include: db.User,
      raw: true,
    });
    res.render('requests', {
      pageTitle: 'Requests',
      requests,
      moment,
    });
  } catch (err) {
    if ('errors' in err) {
      req.flash('error_message', err.errors[0].message);
    }
    req.flash('error_message', err.message);
    res.redirect(303, '/request');
  }
};

exports.getRequest = async (req, res, next) => {
  try {
    const requests = await db.Request.findAll({
      where: {
        id: req.params.id,
      },
      include: db.User,
      raw: true,
    });
    res.render('requests', {
      pageTitle: 'Requests',
      requests,
      moment,
    });
  } catch (err) {
    if ('errors' in err) {
      req.flash('error_message', err.errors[0].message);
    }
    req.flash('error_message', err.message);
    res.redirect(303, '/request');
  }
};

exports.postWhitelistRequest = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.user_id },
      raw: true,
    });

    const request = await db.Request.create({
      request_type: 'Whitelist IP',
      description: `Whitelist IP - ${user.first_name} ${user.last_name}`,
      request_issuer: user.id,
      resolved: false,
    });
    req.flash(
      'success_alert_message',
      'IP Whitelist Request has been created!'
    );
    res.redirect(303, '/ip');
  } catch (err) {
    if ('errors' in err) {
      req.flash('error_message', err.errors[0].message);
    }
    req.flash('error_message', err.message);
    res.redirect(303, '/ip');
  }
};

exports.postServerRequest = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.user_id },
      raw: true,
    });
    const request = await db.Request.create({
      request_type: 'Server',
      description: `Server IP - ${user.first_name} ${user.last_name}`,
      request_issuer: user.id,
      resolved: false,
    });
    console.log(request);
    req.flash('success_alert_message', 'Server Request has been created!');
    res.redirect(303, '/server');
  } catch (err) {
    if ('errors' in err) {
      req.flash('error_message', err.errors[0].message);
    }
    req.flash('error_message', err.message);
    res.redirect(303, '/server');
  }
};
