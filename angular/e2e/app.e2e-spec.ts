import { poc003TemplatePage } from './app.po';

describe('poc003 App', function() {
  let page: poc003TemplatePage;

  beforeEach(() => {
    page = new poc003TemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
