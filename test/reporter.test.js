import { expect } from 'chai';
import sinon from 'sinon';

import * as reporter from '../src/reporter';

const sandbox = sinon.createSandbox();

context('reporter', () => {
  const stdout = {
    write: function write() {
      // do nothing
    },
  };
  const stderr = {
    write: function write() {
      // do nothing
    },
  };
  before(() => {
    reporter.setOutputStream(stdout);
    reporter.setErrorStream(stderr);
  });

  beforeEach(() => {
    sandbox.spy(stdout, 'write');
    sandbox.spy(stderr, 'write');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#error', () => {
    it('writes the error to the error stream', () => {
      reporter.error(new Error('Error Message'));
      expect(stdout.write.notCalled).to.equal(true, 'stderr should not have been used');
      expect(stderr.write.called).to.equal(true, 'should have been written to stderr');
      expect(stderr.write.firstCall.args[0]).to.include('Error Message', 'message should have been written to stderr');
    });
  });
  describe('#success', () => {
    it('writes the result to the output stream', () => {
      reporter.success('Some sort of result');
      expect(stderr.write.notCalled).to.equal(true, 'stderr should not have been used');
      expect(stdout.write.called).to.equal(true, 'should have been written to stdout');
      expect(stdout.write.firstCall.args[0]).to.include('Some sort of result', 'message should have been written to stdout');
    });
  });
  describe('#check.success', () => {
    const results = {
      data: [
        {
          cvss_score: '1.2',
          title: 'Some unimportant problem',
          module: 'a_module',
          version: '1.2.3',
          overview: 'This is an overview of the problem reported to nodesecurity.',
          vulnerable_versions: '<=1.2.5',
          patched_versions: '1.2.6',
          advisory: 'https://nodesecurity.io/123',
        },
        {
          cvss_score: '9.5',
          title: 'Some critical problem',
          module: 'another_module',
          version: '4.0.0',
          overview: 'This is an overview of the problem reported to nodesecurity.',
          vulnerable_versions: '<=4.0.1',
          patched_versions: '4.1.0',
          advisory: 'https://nodesecurity.io/732',
        },
      ],
    };
    it('sets the tests and failures to the length of the data array', () => {
      const result = reporter.check.success(results);
      expect(result.stats.tests).to.equal(2);
      expect(result.stats.failures).to.equal(2);
    });
    it('pushes an element into the failures array for each issue', () => {
      const result = reporter.check.success(results);
      expect(result.failures.length).to.equal(2);
      expect(result.failures[0].title).to.include('Some unimportant problem');
      expect(result.failures[1].title).to.include('Some critical problem');
    });
    it('writes the result to the output stream in JSON format', () => {
      const result = reporter.check.success(results);
      expect(stderr.write.notCalled).to.equal(true, 'stderr should not have been used');
      expect(stdout.write.called).to.equal(true, 'should have been written to stdout');
      const jsonOutput = stdout.write.firstCall.args[0];
      expect(() => JSON.parse(jsonOutput)).to.not.throw();
      expect(jsonOutput).to.equal(JSON.stringify(result, null, 2));
      // expect(JSON.parse(jsonOutput)).to.deep.equal(result);
    });
  });
});
