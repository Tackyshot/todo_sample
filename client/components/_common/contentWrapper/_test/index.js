//empty test folder
import React          from 'react';
import {shallow}      from 'enzyme'
import Code           from 'code';   // assertion library
//component to test
import ContentWrapper from '../../client/components/_common/contentWrapper';

describe('<ContentWrapper />', () => {

  it('should render children when passed in', ()=>{
    const wrapper = shallow(
      <ContentWrapper>
        <div className="unique"></div>
      </ ContentWrapper>
    );

    Code.expect(wrapper.contains(<div className="unique"></div>)).to.equal(true);
  });

});