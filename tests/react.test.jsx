import React from 'react';
import { mount } from 'enzyme';
import App from '../client/src/components/App';

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
    GridWrapper = AppWrapper.find('Grid');
  });

  it('should render without throwing an error', async () => {
    expect(GridWrapper).toMatchSnapshot();
    expect((GridWrapper).find('.grid').length).toBe(1);
  });

  it('should render the intro modal on initial gameState render of intro', async () => {
    expect(GridWrapper.find('.intromodal').length).toBe(1);
  });

  it('should unmount the intro modal upon invoking letsPlay', async () => {
    GridWrapper.props().letsPlay('testusername');
    AppWrapper.update();
    expect(AppWrapper.state('gameState')).toBe('pre-game');
    expect(AppWrapper.find('.intromodal').length).toBe(0);
  });
});
