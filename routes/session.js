const express = require('express'); // first of all import express

const Session = require('../models/session'); // link route in the models

const router = express.Router(); // express tool for make the route 'requires'

router.get('/:id', (req, res) => {
  Session.getSession(req.params.id, (err, session) => {
    if(err) res.status(400).json(err);
    else res.status(200).json(session);
  });
});

router.get('/', (req, res) => {
  Session.getAllSessions((err, sessions) => {
    if(err) res.status(400).json(err);
    else res.status(200).json(sessions);
  });
});

router.post('/', (req, res) => {
  //  session, ipMachine
  Session.getSession(req.body.session, (err, session) => {
    if(err) res.status(400).json(err);
    else {
      if (!session) {
        Session.addSession(req.body, (errSession, sessionSession) => {
          if(errSession) res.status(400).json(errSession);
          else res.status(200).json(sessionSession);
        });
      }
    }
  });
});

router.put('/button', (req, res) => {
  //   button, ipMachine, idSession
  Session.clickButton(req.body, (err, session) => {
    if(err) res.status(400).json(err);
    else res.status(200).json(session);
  });
});

router.put('/addMachine', (req, res) => {
  //   ipMachine, idSession
  Session.addMachine(req.body, (err, session) => {
    if(err) res.status(400).json(err);
    else res.status(200).json(session);
  });
});

router.put('/closeMachine', (req, res) => {
  //   ipMachine, idSession
  Session.closeMachine(req.body, (err, session) => {
    if(err) res.status(400).json(err);
    else res.status(200).json(session);
  });
});

router.put('/closeSession', (req, res) => {
  //   idSession
  Session.closeSession(req.body, (err, session) => {
    if(err) res.status(400).json(err);
    else res.status(200).json(session);
  });
});

router.put('/addCommand', (req, res) => {
  //   idSession, ipMachine, value, type
  Session.addCommand(req.body, (err, session) => {
    if(err) res.status(400).json(err);
    else res.status(200).json(session);
  });
});

router.put('/pushEditorHistory', (req, res) => {
  //   idSession, ipMachine, path
  Session.pushEditorHistory(req.body, (err, session) => {
    if(err) res.status(400).json(err);
    else res.status(200).json(session);
  });
});

router.put('/pushEditorSave', (req, res) => {
  //   idSession, ipMachine, path, file
  Session.pushEditorSave(req.body, (err, session) => {
    if(err) res.status(400).json(err);
    else res.status(200).json(session);
  });
});


module.exports = router;
