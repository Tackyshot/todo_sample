//empty test folder
const Code = require('code');   // assertion library


describe('math', () => {
  it('returns true when 1 + 2 equals 3', ()=>{
    Code.expect(1 + 2).to.equal(3);
  });
});
