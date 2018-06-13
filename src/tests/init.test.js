import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

jest.unmock('../components/App');

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('State is initialised', () => {
    const wrapper = shallow(<App />);
    
    expect(wrapper.state().noRooms).toBe(false);
  });
});