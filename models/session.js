const mongoose = require('mongoose');

const { Schema } = mongoose;

const SessionSchema = new Schema({
  session: { type: String },
  initTime: { type: Date, default: Date.now() },
  endTime: { type: Date },
  user: [{
    ip: { type: String },
    initTime: { type: Date, default: Date.now() },
    endTime: { type: Date },
  }],
  machine: [{
    ip: { type: String },
    initTime: { type: Date, default: Date.now() },
    endTime: { type: Date },
    buttonClicks: {
      closeSession: { type: Number, default: 0 },
      addMachine: { type: Number, default: 0 },
      build: { type: Number, default: 0 },
      buildCompose: { type: Number, default: 0 },
      run: { type: Number, default: 0 },
      stop: { type: Number, default: 0 },
      deleteDocker: { type: Number, default: 0 },
      list: { type: Number, default: 0 },
      deleteMachine: { type: Number, default: 0 },
      editor: { type: Number, default: 0 },
      share: { type: Number, default: 0 },
      updateDir: { type: Number, default: 0 },
      settings: { type: Number, default: 0 },
    },
    terminal: [{
      value: { type: String },
      type: { type: Number }, // 1 - Req; 2 - Res;
      time: { type: Date, default: Date.now() },
    }],
    editor: {
      history: [{
        path: { type: String },
        time: { type: Date, default: Date.now() },
        buttonSave: [{
          clickedTime: { type: Date, default: Date.now() },
          file: { type: String },
        }],
      }],
    },
  }],
}, { timestamps: true });

const Session = mongoose.model('Session', SessionSchema, 'Sessions');

module.exports = Session;

module.exports.getAllSessions = (callback) => {
  Session.find(callback);
};

module.exports.addSession = (session, callback) => {
  const newSession = new Session();

  newSession.session = session.session;

  const user = [];
  user.push({
    ip: session.ipUser,
  });
  newSession.user = user;

  const machine = [];
  machine.push({
    ip: session.ipMachine,
  });
  newSession.machine = machine;

  newSession.save(callback);
};

module.exports.clickButton = (req, callback) => {
  Session.findOne({ _id: req.idSession }, function (err, session) {
    const index = session.machine.map(e => e.ip).indexOf(req.ipMachine);

    session.machine[index].buttonClicks[req.button] = session.machine[index].buttonClicks[req.button] + 1;

    session.save(callback);
  });
};

module.exports.addMachine = (req, callback) => {
  Session.findOne({ _id: req.idSession }, function (err, session) {
    session.machine.push({
      ip: req.ipMachine
    });

    session.save(callback);
  });
};

module.exports.closeMachine = (req, callback) => {
  Session.findOne({ _id: req.idSession }, function (err, session) {
    const index = session.machine.map(e => e.ip).indexOf(req.ipMachine);

    session.machine[index].endTime = Date.now();

    session.save(callback);
  });
};

module.exports.closeSession = (req, callback) => {
  Session.findOne({ _id: req.idSession }, function (err, session) {
    session.endTime = Date.now();

    session.save(callback);
  });
};

module.exports.addUser = (req, callback) => {
  Session.findOne({ _id: req.idSession }, function (err, session) {
    session.user.push({
      ip: req.ipUser,
    });

    session.save(callback);
  });
};

module.exports.closeUser = (req, callback) => {
  Session.findOne({ _id: req.idSession }, function (err, session) {
    const index = session.user.map(e => e._id).indexOf(req.idUser);

    session.user[index].endTime = Date.now();

    session.save(callback);
  });
};

module.exports.addCommand = (req, callback) => {
  Session.findOne({ _id: req.idSession }, function (err, session) {
    const index = session.machine.map(e => e.ip).indexOf(req.ipMachine);

    session.machine[index].terminal.push({
      value: req.value,
      type: req.type,
    });

    session.save(callback);
  });
};

module.exports.pushEditorHistory = (req, callback) => {
  Session.findOne({ _id: req.idSession }, function (err, session) {
    const index = session.machine.map(e => e.ip).indexOf(req.ipMachine);

    session.machine[index].editor.history.push({
      path: req.path,
    });

    session.save(callback);
  });
};

module.exports.pushEditorSave = (req, callback) => {
  Session.findOne({ _id: req.idSession }, function (err, session) {
    const index = session.machine.map(e => e.ip).indexOf(req.ipMachine);
    const i = session.machine[index].editor.history.map(e => e.path).lastIndexOf(req.path);

    session.machine[index].editor.history[i].buttonSave.push({
      file: req.file,
    });

    session.save(callback);
  });
};
