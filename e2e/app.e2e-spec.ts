import { RoadtripPage } from './app.po';

describe('roadtrip App', () => {
  let page: RoadtripPage;

  beforeEach(() => {
    page = new RoadtripPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
