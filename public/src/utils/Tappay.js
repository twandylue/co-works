class Tappay {
  constructor() {
    this.appId = '12348';
    this.appKey =
      'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF';
    this.serverType = 'sandbox';
  }

  setupSdk() {
    window.TPDirect.setupSDK(this.appId, this.appKey, this.serverType);
  }

  setupCard() {
    window.TPDirect.card.setup({
      fields: {
        number: {
          element: '#card-number',
          placeholder: '**** **** **** ****',
        },
        expirationDate: {
          element: '#card-expiration-date',
          placeholder: 'MM / YY',
        },
        ccv: {
          element: '#card-ccv',
          placeholder: '後三碼',
        },
      },
      styles: {
        '.valid': {
          color: 'green',
        },
        '.invalid': {
          color: 'red',
        },
      },
    });
  }

  init() {
    this.setupSdk();
    this.setupCard();
  }

  getPrime() {
    return new Promise((resolve) => {
      window.TPDirect.card.getPrime((result) => {
        if (result.status === 0) {
          resolve(result.card.prime);
        }
      });
    });
  }

  get canGetPrime() {
    return window.TPDirect.card.getTappayFieldsStatus().canGetPrime;
  }

  get cannotGetPrimeReason() {
    const tappayStatus = window.TPDirect.card.getTappayFieldsStatus();
    if (tappayStatus.status.number === 1) {
      return '請輸入信用卡號碼';
    }
    if (tappayStatus.status.number === 2) {
      return '信用卡號碼有誤';
    }
    if (tappayStatus.status.expiry === 1) {
      return '請輸入有效期限';
    }
    if (tappayStatus.status.expiry === 2) {
      return '有效期限有誤';
    }
    if (tappayStatus.status.ccv === 1) {
      return '請輸入安全碼';
    }
    if (tappayStatus.status.ccv === 2) {
      return '安全碼有誤';
    }
    return undefined;
  }
}

export default Tappay;
