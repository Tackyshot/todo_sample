//empty test folder
const Code = require('code');   // assertion library

describe('math', () => {
  it('returns true when 1 + 1 equals 2', ()=>{
    Code.expect(1 + 1).to.equal(2);
  });

});

