import { test } from '../fixtures/hrmsFixtures.js';
import { buildLeaveRequest, uniqueId } from '../utils/testData.js';

test.describe('Profile and Leave Management', () => {
  let profileSeed;

  test.beforeAll(() => {
    profileSeed = uniqueId('profile-suite');
  });

  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.goto('/dashboard/index');
    await dashboardPage.expectLoaded();
  });

  test('updates employee profile details', async ({ dashboardPage, profilePage }) => {
    const nickname = `${profileSeed}-${uniqueId('nick')}`;

    await dashboardPage.openMyInfo();
    await profilePage.updateNickname(nickname);
    await profilePage.expectNickname(nickname);
  });

  test('applies leave and verifies it in my leave list', async ({ dashboardPage, leavePage }) => {
    const leaveRequest = buildLeaveRequest();

    await dashboardPage.openLeave();
    await leavePage.applyLeave(leaveRequest);
    await leavePage.expectLeaveRequestVisible(leaveRequest);
  });
});
