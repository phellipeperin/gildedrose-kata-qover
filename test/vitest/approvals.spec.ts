import { execSync } from 'node:child_process';

/**
 * Snapshot-based approval checks for a small single-item case and
 * the 30-day golden-master fixture output.
 */

describe('Gilded Rose Approval', () => {
  it('should thirtyDays', () => {
    const consoleOutput = execSync(
      'ts-node test/golden-master-fixture.ts 30',
      { encoding: 'utf-8' }
    );

    expect(consoleOutput).toMatchSnapshot();
  });
});
