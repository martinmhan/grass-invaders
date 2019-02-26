import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../client/src/components/App';
import Grid from '../client/src/components/grid/Grid';
import ButtonPad from '../client/src/components/ButtonPad';

let AppWrapper;

beforeAll(async () => { AppWrapper = await mount(<App />); });

describe('<App />', () => {
  it('should render without throwing an error', async () => {
    await AppWrapper;

    expect(AppWrapper).toMatchSnapshot();
    expect(AppWrapper.find('.app').length).toBe(1);
  });

  it('should render the gamecontainer and titleheader divs', async () => {
    await AppWrapper;

    expect(AppWrapper.find('.gamecontainer').length).toBe(1);
    expect(AppWrapper.find('.titleheader').length).toBe(1);
  });
});

describe('<Grid />', () => {
  let GridWrapper;

  beforeAll(async () => {
    await AppWrapper;
    GridWrapper = AppWrapper.find('.grid');
  });

  it('should render without throwing an error', async () => {
    expect(GridWrapper).toMatchSnapshot();
    expect((GridWrapper).find('.grid').length).toBe(1);
  });

  it('should render the intro modal on initial gameState render of intro', async () => {
    expect(GridWrapper.find('.intromodal').length).toBe(1);
  });

  it('should unmount the intro modal upon entering a username and clicking Let\'s play', async () => {
    GridWrapper.find('.usernameinput').instance().value = 'testusername';
    GridWrapper.find('.letsplaybtn').simulate('click');
    expect(AppWrapper.state('gameState')).toBe('pre-game');
  });
});
