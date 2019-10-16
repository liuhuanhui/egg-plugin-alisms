import mm from 'egg-mock';
import assert = require('assert');

describe('测试短信发送', async () => {
  afterEach(mm.restore);

  it('should work', async () => {
    const app = mm.app({ baseDir: 'app' });
    await app.ready();
    const ctx = app.mockContext();
    // assert(app.alisms);
    assert(app.config.alisms);
  });
});
