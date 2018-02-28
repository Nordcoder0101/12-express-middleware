'use strict';

const request = require('superagent');
const Note = require('../model/note.js');
const url = 'http://localhost:3000';

require('jest');
require('../server.js');

const exampleNote = {
  name: 'example name',
  content: 'example content'
};

describe('Note routes', function() {
  describe('GET: /api/note', function() {
    beforeEach( done => {
      Note.createNote(exampleNote)
        .then ( note => {
          this.tempNote = note;
          done();
        })
        .catch( err => done(err));
    });
    afterAll( done => {
      Note.deleteNote(this.tempNote.id)
        .then( () => done())
        .catch( err => done(err));
    });
    it('should return a note', done => {
      request.get(`${url}/api/note/${this.tempNote.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.id).toEqual(this.tempNote.id);
          expect(res.body.name).toEqual(this.tempNote.name);
          expect(res.body.content).toEqual(this.tempNote.content);
          done();
        });
    });
    describe('with a invalid id', function() {
      it('should respond with a 404', done => {
        request.get(`${url}/api/note/123456789`)
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });
});