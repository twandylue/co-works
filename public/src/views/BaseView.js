class BaseView {
  constructor() {
    this.tagMen = this.getElement('.tag-men');
    this.tagWomen = this.getElement('.tag-women');
    this.tagAccessories = this.getElement('.tag-accessories');
    this.inputSearch = this.getElement('input#search');
    this.profile = this.getElement('#profile');
    this.count = this.getElement('.count');
  }

  createElement(tagName, props) {
    const node = document.createElement(tagName);
    if (props.classList) {
      node.classList.add(...props.classList);
    }
    if (props.attributes) {
      Object.entries(props.attributes).forEach(([key, value]) => {
        node.setAttribute(key, value);
      });
    }
    if (props.styles) {
      Object.entries(props.styles).forEach(([key, value]) => {
        node.style[key] = value;
      });
    }
    if (props.children) {
      node.append(...props.children);
    }
    if (props.parent) {
      props.parent.append(node);
    }
    return node;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  handleTag(tag) {
    switch (tag) {
      case 'men':
        this.tagMen.classList.add('tag--active');
        break;
      case 'women':
        this.tagWomen.classList.add('tag--active');
        break;
      case 'accessories':
        this.tagAccessories.classList.add('tag--active');
        break;
      case 'all':
        break;
      default:
        this.inputSearch.value = tag;
    }
  }

  bindInputSearchPressEnter(handle) {
    this.inputSearch.addEventListener('keydown', (e) => {
      const isEnter = e.keyCode === 13;
      if (isEnter) {
        handle(e.currentTarget.value);
      }
    });
  }

  bindClickProfile(handle) {
    this.profile.addEventListener('click', () => {
      handle();
    });
  }

  renderCount(count) {
    this.count.textContent = count;
  }
}

export default BaseView;
