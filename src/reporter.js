/* eslint-disable no-console */
import { format } from 'util';

const startTime = new Date();

export function error(err) {
  console.error(err.toString());
}

export function success(result) {
  console.log(result);
}

export const check = {};

check.success = function checkSuccess(result) {
  const summary = {
    stats: {
      tests: 0,
      passes: 0,
      failures: 0,
      duration: Date.now() - startTime,
      start: startTime,
      end: new Date(),
    },
    failures: [],
    passes: [],
    skipped: [],
  };
  result.data.forEach((validationFailure) => {
    summary.failures.push({
      title: validationFailure.title,
      fullTitle: `${validationFailure.module} v${validationFailure.version} ${validationFailure.title}`,
      duration: 0,
      errorCount: 1,
      error: format(
        'Module %s has a known vulnerability: "%s" (vulnerable: %s, patched: %s, yours: %s), see %s',
        validationFailure.module, validationFailure.title, validationFailure.vulnerable_versions,
        validationFailure.patched_versions, validationFailure.version, validationFailure.advisory,
      ),
    });
    summary.stats.tests += 1;
    summary.stats.failures += 1;

    console.log(JSON.stringify(summary, null, 2));
  });
};
