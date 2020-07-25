const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

describe('Fulfillment value assertions:', () => {
  let promise = null;

  describe('Direct tests of fulfilled promises:', () => {
    describe('Basics:', () => {
      it('.eventually.equal(42)', (done) => {
        Promise.resolve(42).should.eventually.equal(42).notify(done);
      });
      it('.eventually.be.arguments', function (done) {
        Promise.resolve(arguments).should.eventually.be.arguments.notify(done);
      });
      it('.eventually.be.empty', (done) => {
        Promise.resolve([]).should.eventually.be.empty.notify(done);
      });
      it('.eventually.exist', (done) => {
        Promise.resolve(true).should.eventually.exist.notify(done);
      });
      it('.eventually.be.false', (done) => {
        Promise.resolve(false).should.eventually.be.false.notify(done);
      });
      it('.eventually.be.ok', (done) => {
        Promise.resolve({}).should.eventually.be.ok.notify(done);
      });
      it('.eventually.be.true', (done) => {
        Promise.resolve(true).should.eventually.be.true.notify(done);
      });
      it('.become(true)', (done) => {
        Promise.resolve(true).should.become(true).notify(done);
      });
    });

    describe('With flags and chainable methods involved:', () => {
      it('.not.eventually.be.ok', (done) => {
        Promise.resolve(false).should.not.eventually.be.ok.notify(done);
      });
      it('.eventually.not.be.ok', (done) => {
        Promise.resolve(false).should.eventually.not.be.ok.notify(done);
      });
      it(".eventually.deep.equal({ foo: 'bar' })", (done) => {
        Promise.resolve({ foo: 'bar' })
          .should.eventually.deep.equal({ foo: 'bar' })
          .notify(done);
      });
      it(".not.eventually.deep.equal({ foo: 'bar' })", (done) => {
        Promise.resolve({ foo: 'baz' })
          .should.not.eventually.deep.equal({ foo: 'bar' })
          .notify(done);
      });
      it(".eventually.not.deep.equal({ foo: 'bar' })", (done) => {
        Promise.resolve({ foo: 'baz' })
          .should.eventually.not.deep.equal({ foo: 'bar' })
          .notify(done);
      });
      it(".eventually.contain('foo')", (done) => {
        Promise.resolve(['foo', 'bar'])
          .should.eventually.contain('foo')
          .notify(done);
      });
      it(".not.eventually.contain('foo')", (done) => {
        Promise.resolve(['bar', 'baz'])
          .should.not.eventually.contain('foo')
          .notify(done);
      });
      it(".eventually.not.contain('foo')", (done) => {
        Promise.resolve(['bar', 'baz'])
          .should.eventually.not.contain('foo')
          .notify(done);
      });
      it(".eventually.contain.keys('foo')", (done) => {
        Promise.resolve({ foo: 'bar', baz: 'quux' })
          .should.eventually.contain.keys('foo')
          .notify(done);
      });
      it(".not.eventually.contain.keys('foo')", (done) => {
        Promise.resolve({ baz: 'quux' })
          .should.not.eventually.contain.keys('foo')
          .notify(done);
      });
      it(".eventually.not.contain.keys('foo')", (done) => {
        Promise.resolve({ baz: 'quux' })
          .should.eventually.not.contain.keys('foo')
          .notify(done);
      });
      it('.eventually.be.an.instanceOf(Array)', (done) => {
        Promise.resolve([])
          .should.eventually.be.an.instanceOf(Array)
          .notify(done);
      });

      if (Object.prototype.should.nested) {
        it(".eventually.have.nested.property('foo.bar')", (done) => {
          Promise.resolve({ foo: { bar: 'baz' } })
            .should.eventually.have.nested.property('foo.bar', 'baz')
            .notify(done);
        });
      }
    });
  });

  describe('Chaining:', () => {
    it('.eventually.be.ok.and.equal(42)', (done) => {
      Promise.resolve(42).should.eventually.be.ok.and.equal(42).notify(done);
    });
    it('.rejected.and.notify(done)', (done) => {
      Promise.reject().should.be.rejected.and.notify(done);
    });
    it('.fulfilled.and.notify(done)', (done) => {
      Promise.resolve().should.be.fulfilled.and.notify(done);
    });
  });
});
