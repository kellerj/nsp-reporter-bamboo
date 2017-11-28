const startTime = new Date();

let outputStream = process.stdout;
let errorStream = process.stderr;

export function setOutputStream(writable) {
  outputStream = writable;
}

export function setErrorStream(writable) {
  errorStream = writable;
}

export function error(err) {
  errorStream.write(err.toString());
  errorStream.write('\n');
}

export function success(result) {
  outputStream.write(result);
  outputStream.write('\n');
}

export const check = {};

check.success = function checkSuccess(result) {
  // console.log(JSON.stringify(result, null, 2));
  const summary = {
    stats: {
      tests: result.data.length,
      passes: 0,
      failures: result.data.length,
      start: startTime,
      end: new Date(),
      duration: Date.now() - startTime,
    },
    failures: [],
    passes: [],
    skipped: [],
  };
  result.data.forEach((validationFailure) => {
    summary.failures.push({
      title: `CVSS: ${validationFailure.cvss_score} ${validationFailure.title}`,
      fullTitle: `${validationFailure.module} v${validationFailure.version} ${validationFailure.title}`,
      duration: 0,
      errorCount: 1,
      error: `${validationFailure.overview}
      (vulnerable: ${validationFailure.vulnerable_versions}, patched: ${validationFailure.patched_versions}, yours: ${validationFailure.version})
      see ${validationFailure.advisory}`,
    });
  });
  outputStream.write(JSON.stringify(summary, null, 2));
  outputStream.write('\n');
  return summary;
};
