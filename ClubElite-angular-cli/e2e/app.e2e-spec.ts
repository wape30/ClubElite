import { ClubEliteAngularCliPage } from './app.po';

describe('club-elite-angular-cli App', function() {
  let page: ClubEliteAngularCliPage;

  beforeEach(() => {
    page = new ClubEliteAngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
