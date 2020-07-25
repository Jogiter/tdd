const chai = require('chai');
const { expect, assert } = chai;
const timeout = 5000;
const delay = 1000;

const p = (status, timeout = 1000) =>
  new Promise((resolve, reject) => {
    const test = () => {
      if (status === 'fulfilled') {
        resolve(status);
      } else {
        reject(status);
      }
    };

    setTimeout(test, timeout);
  });

describe('demo', function () {
  it('promise', (done) => {
    p('fulfilled').then((res) => {
      expect(res).to.equal('fulfilled');
      done();
    });
  });

  it('promise multi', function (done) {
    // 重新设置超时时间，如果不设置，则报错
    // 'Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called;if returning a Promise, ensure it resolves'
    this.timeout(timeout);

    // done 会在 2200 后执行。超过了默认 2000
    p('fulfilled').then((res) => {
      expect(res).to.equal('fulfilled');

      p('fulfilled').then((res) => {
        expect(res).to.equal('fulfilled');
        done();
      });
    });
  });

  it('promise multi with delayed', function (done) {
    // 重新设置超时时间
    this.timeout(timeout);

    // done 会在 2200 后执行。超过了默认 2000
    const test = () =>
      p('fulfilled').then((res) => {
        expect(res).to.equal('fulfilled');

        p('fulfilled').then((res) => {
          expect(res).to.equal('fulfilled');
          done();
        });
      });

    setTimeout(test, delay);
  });

  it('timeout', () => {
    this.timeout(1000);
    assert.ok(true);
  });

  it('timeout demo', function (done) {
    this.timeout(500);
    setTimeout(done, 300);
  });

  it('timeout with done', function (done) {
    this.timeout(timeout);
    const test = () => {
      assert.ok(true);
      done();
    };
    setTimeout(test, delay);
  });

  it('timeout with async done', function (done) {
    this.timeout(timeout);

    const test = async () => {
      const res = await p('fulfilled');
      expect(res).to.equal('fulfilled');
      done();
    };

    setTimeout(test, delay);
  });

  it('timeout with promise done', function (done) {
    this.timeout(timeout);

    const test = () => {
      p('rejected').catch((e) => {
        expect(e).to.equal('rejected');
        done();
      });
    };
    setTimeout(test, delay);
  });

  it('timeout with promise catch done', function (done) {
    this.timeout(timeout);

    const test = () => {
      p('rejected').catch((e) => {
        expect(e).to.equal('rejected');
        done();
      });
    };
    setTimeout(test, delay);
  });

  it('timeout with async catch done', function (done) {
    this.timeout(timeout);

    const test = async () => {
      try {
        const multiPromise = [
          await p('fulfilled'),
          await p('fulfilled'),
          await p('fulfilled'),

        ];
        for (let p of multiPromise) {
          expect(p).to.equal('fulfilled');
        }

        done();
      } catch (e) {
        done(e);
      }
    };

    setTimeout(test, delay);
  });
});
