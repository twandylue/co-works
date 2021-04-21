import BaseView from './BaseView.js';

class ProfileView extends BaseView {
  constructor() {
    super();

    this.member = this.getElement('#member');
    this.logoutButton = undefined;
  }

  renderProfile(profile) {
    this.logoutButton = this.createElement('button', { children: ['登出'] });
    this.createElement('img', {
      attributes: {
        src: profile.picture,
      },
      parent: this.member,
    });
    this.createElement('div', {
      classList: ['member__detail'],
      attributes: {
        src: profile.picture,
      },
      parent: this.member,
      children: [
        this.createElement('h3', { children: [profile.name] }),
        this.createElement('h3', { children: [profile.email] }),
        this.logoutButton,
      ],
    });
  }

  bindClickLogoutButton(logout) {
    this.logoutButton.addEventListener('click', () => {
      logout();
    });
  }
}

export default ProfileView;
