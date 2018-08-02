import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NoData from '../../src/app/components/nodata';
import ModalDialog from '../../src/app/components/modaldialog';

Enzyme.configure({ adapter: new Adapter() });

test('No Data Component works as expected', () => {
    const noData = shallow(<ModalDialog />);

    expect(noData.text()).toEqual('No Data');
});