import Enzyme, { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import React from 'react';
import App from '../components/App';
import renderer from 'react-test-renderer'
import Login from '../layouts/Login';
import Default from '../layouts/Default';

// mock session for testing
global.window = {}
import localStorage from 'mock-local-storage'
window.localStorage = global.localStorage

// Reference yo the adapter package
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

// describe what we are testing
describe('App startup', () => {
  it('should render without throwing an error', () => {
    const render = renderer.create(<App />).toJSON();
    expect(render).toMatchSnapshot();
  })

  it('Login is initialised', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/search' ]}>
        <App />
      </MemoryRouter>
    );
    expect(wrapper.find(Default)).toHaveLength(0);
    expect(wrapper.find(Login)).toHaveLength(1);
  });
})