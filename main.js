class EnvDetector {
  static containWindow() {
    if (!window) {
      throw new Error("Couldn't find window element!");
    }
  }

  static containNavigator() {
    if (!navigator) {
      throw new Error("Couldn't find navigator element!");
    }
  }

  static getDeviceType() {
    this.containWindow();
    this.containNavigator();

    if (
      window.navigator.userAgent.match(
        /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i
      )
    ) {
      return "tablet";
    } else if (
      window.navigator.userAgent.match(
        /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/
      )
    ) {
      return "mobile";
    } else return "desktop";
  }

  static getBrowserSize() {
    this.containWindow();
    return { width: window.innerWidth, height: window.innerHeight };
  }

  static getWindowSize() {
    this.containWindow();
    return { width: window.outerWidth, height: window.outerHeight };
  }

  static getOS() {
    this.containWindow();
    this.containNavigator();
    const { platform, userAgent } = window.navigator,
      macPlatforms = ["MacIntel", "MacPPC", "Mac68K"],
      windowsPlatforms = ["Win32", "Win16", "Win64", "Windows", "WinCE"],
      iosPlatforms = ["iPhone", "iPad", "iPod"];

    if (macPlatforms.includes(platform)) {
      return "Mac OS";
    } else if (windowsPlatforms.includes(platform)) {
      return "Windows";
    } else if (iosPlatforms.includes(platform)) {
      return "iOS";
    } else if (/Linux/.test(platform)) {
      return "Linux";
    } else if (/Android/.test(userAgent)) {
      return "Android";
    }
  }

  static isTouchable() {
    this.containWindow();
    return "ontouchstart" in window;
  }

  static isOnline() {
    this.containWindow();
    this.containNavigator();
    return window.navigator.onLine;
  }
}
