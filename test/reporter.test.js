import { expect } from 'chai';
import sinon from 'sinon';

import * as reporter from '../src/reporter';

const sandbox = sinon.createSandbox();

context('reporter', () => {
  let stdout = {
    write: function write() {
      // do nothing
    },
  };
  let stderr = {
    write: function write() {
      // do nothing
    },
  };
  before(() => {
    reporter.setOutputStream(stdout);
    reporter.setErrorStream(stderr);
  });

  beforeEach(() => {
    stdout = sandbox.mock(stdout);
    stderr = sandbox.mock(stderr);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#error', () => {
    it('writes the error to the error stream', () => {
      reporter.error(new Error('Error Message'));
    });
  });
  describe('#success', () => {
    it('writes the result to the output stream', () => {
      reporter.success('Some sort of result');
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
    });
    it('pushes an element into the failures array for each issue', () => {
      reporter.check.success(results);
    });
    it('writes the result to the output stream in JSON format', () => {
    });
  });
});
