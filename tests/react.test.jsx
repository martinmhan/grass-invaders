import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../client/src/components/App';
import Score from '../client/src/components/Score';
import Grid from '../client/src/components/grid/Grid';
import ButtonPad from '../client/src/components/ButtonPad';

describe('App', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<App />).contains(<div className="app" />)).toBe(true);
  });
});
