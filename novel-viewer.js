/* --------------------------------------------------
  Template by espace（https://espace.i-ra.site/）
  Copyright: 2020 espace.

  利用規約を遵守の上、ご利用ください。
  二次配布、販売は禁止しています。
  --------------------------------------------------*/

/* ▼ ユーザ設定ここから ▼ */
// const envUserSettings = {
//     menuType: "basic",
//     mode: "basic",
//     colorType: "default",
//     fontFamily: "default",
//     writingMode: "horizontal",
//     fontSize: "sm",
//     lineHeight: "md",
//     letterSpacing: "sm",
//     // 以下6項目はmode="detail"の場合にのみ影響
//     fontSizeMin: 10,
//     fontSizeMax: 30,
//     lineHeightMin: 1.0,
//     lineHeightMax: 5.0,
//     letterSpacingMin: 0,
//     letterSpacingMax: 30,
// };
/* ▲ ユーザ設定ここまで ▲ */

const isWindows = (() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return userAgent.indexOf("windows nt") !== -1 ? true : false;
})();

class envViewer {
    constructor() {
        this.isUserSettings = typeof envUserSettings === "object";
        this.bodyElement = document.querySelector("body");
        this.envBaseElements = Array.from(document.getElementsByClassName("env-base"));
        this.colorType = {
            default: {
                label: "デフォルト",
                class: "env-color-type-default",
            },
            light: {
                label: "ライト",
                class: "env-color-type-light",
            },
            dark: {
                label: "ダーク",
                class: "env-color-type-dark",
            },
            gray: {
                label: "グレー",
                class: "env-color-type-gray",
            },
            cream: {
                label: "クリーム",
                class: "env-color-type-cream",
            },
            sky: {
                label: "スカイ",
                class: "env-color-type-sky",
            },
        };
        this.fontFamily = {
            gothic: {
                label: "ゴシック体",
                class: "env-font-family-gothic",
            },
            mincho: {
                label: "明朝体",
                class: "env-font-family-mincho",
            },
            udGothic: {
                label: "UDP ゴシック体",
                class: "env-font-family-udGothic",
            },
            udMincho: {
                label: "UDP 明朝体",
                class: "env-font-family-udMincho",
            },
            udKyokasho: {
                label: "UD教科書体",
                class: "env-font-family-udKyokasho",
            },
            default: {
                label: "デフォルト",
                class: null,
            },
        };
        this.writingMode = {
            horizontal: {
                label: "横書き",
                class: null,
            },
            vertical: {
                label: "縦書き",
                class: "env-writing-mode-vertical",
            },
        };
        this.basicUserSettings = {
            colorType: "default",
            fontFamily: "default",
            writingMode: "horizontal",
            basic: {
                fontSize: "sm",
                lineHeight: "md",
                letterSpacing: "sm",
            },
            detail: {
                fontSize: 5,
                lineHeight: 16,
                letterSpacing: 0,
            },
        };
        this.basicSettings = {
            mode: "basic",
            fontSizeMin: 10,
            fontSizeMax: 30,
            fontSizeUnit: "px",
            lineHeightMin: 10,
            lineHeightMax: 50,
            letterSpacingMin: 0,
            letterSpacingMax: 30,
            sizes: {
                sm: {
                    label: "小",
                    class: "env-font-size-sm",
                },
                md: {
                    label: "中",
                    class: "env-font-size-md",
                },
                lg: {
                    label: "大",
                    class: "env-font-size-lg",
                },
                xl: {
                    label: "特大",
                    class: "env-font-size-xl",
                },
            },
        };
        this.menuType =
            this.isUserSettings && envUserSettings.menuType
                ? `env-menu-${envUserSettings.menuType}`
                : "env-menu-basic";

        this.settings = this.getSettings();
        this.styles = this.getDefaultStyles();

        this.switchStyle();
        this.makeViewer();
    }

    getSettings = () => {
        if (this.isUserSettings) {
            const mode = envUserSettings.mode ?? this.basicSettings.mode;
            if (mode === "basic") {
                return {
                    mode: "basic",
                };
            } else {
                return {
                    mode: "detail",
                    fontSizeMin: envUserSettings.fontSizeMin ?? this.basicSettings.fontSizeMin,
                    fontSizeMax: envUserSettings.fontSizeMax ?? this.basicSettings.fontSizeMax,
                    fontSizeUnit: this.basicSettings.fontSizeUnit,
                    lineHeightMin: envUserSettings.lineHeightMin
                        ? envUserSettings.lineHeightMin * 10
                        : this.basicSettings.lineHeightMin,
                    lineHeightMax: envUserSettings.lineHeightMax
                        ? envUserSettings.lineHeightMax * 10
                        : this.basicSettings.lineHeightMax,
                    letterSpacingMin:
                        envUserSettings.letterSpacingMin ?? this.basicSettings.letterSpacingMin,
                    letterSpacingMax:
                        envUserSettings.letterSpacingMax ?? this.basicSettings.letterSpacingMax,
                };
            }
        } else {
            return this.basicSettings;
        }
    };

    getDefaultStyles = (isReset = false) => {
        if (isReset) {
            const defaultStyles = (() => {
                if (this.settings.mode === "basic") {
                    return {
                        colorType:
                            this.isUserSettings && envUserSettings.colorType
                                ? envUserSettings.colorType
                                : this.basicUserSettings.colorType,
                        fontFamily:
                            this.isUserSettings && envUserSettings.fontFamily
                                ? envUserSettings.fontFamily
                                : this.basicUserSettings.fontFamily,
                        writingMode:
                            this.isUserSettings && envUserSettings.writingMode
                                ? envUserSettings.writingMode
                                : this.basicUserSettings.writingMode,
                        fontSize:
                            this.isUserSettings && envUserSettings.fontSize
                                ? envUserSettings.fontSize
                                : this.basicUserSettings.basic.fontSize,
                        lineHeight:
                            this.isUserSettings && envUserSettings.lineHeight
                                ? envUserSettings.lineHeight
                                : this.basicUserSettings.basic.lineHeight,
                        letterSpacing:
                            this.isUserSettings && envUserSettings.letterSpacing
                                ? envUserSettings.letterSpacing
                                : this.basicUserSettings.basic.letterSpacing,
                    };
                } else {
                    return {
                        colorType:
                            this.isUserSettings && envUserSettings.colorType
                                ? envUserSettings.colorType
                                : this.basicUserSettings.colorType,
                        fontFamily:
                            this.isUserSettings && envUserSettings.fontFamily
                                ? envUserSettings.fontFamily
                                : this.basicUserSettings.fontFamily,
                        writingMode:
                            this.isUserSettings && envUserSettings.writingMode
                                ? envUserSettings.writingMode
                                : this.basicUserSettings.writingMode,
                        fontSize:
                            this.isUserSettings && envUserSettings.fontSize
                                ? envUserSettings.fontSize
                                : this.basicUserSettings.detail.fontSize,
                        lineHeight:
                            this.isUserSettings && envUserSettings.lineHeight
                                ? envUserSettings.lineHeight
                                : this.basicUserSettings.detail.lineHeight,
                        letterSpacing:
                            this.isUserSettings && envUserSettings.letterSpacing
                                ? envUserSettings.letterSpacing
                                : this.basicUserSettings.detail.letterSpacing,
                    };
                }
            })();

            this.styles = defaultStyles;
            return defaultStyles;
        }

        const cookieData = this.getCookie();
        if (cookieData) {
            return cookieData;
        } else {
            if (this.settings.mode === "basic") {
                return {
                    colorType:
                        this.isUserSettings && envUserSettings.colorType
                            ? envUserSettings.colorType
                            : this.basicUserSettings.colorType,
                    fontFamily:
                        this.isUserSettings && envUserSettings.fontFamily
                            ? envUserSettings.fontFamily
                            : this.basicUserSettings.fontFamily,
                    writingMode:
                        this.isUserSettings && envUserSettings.writingMode
                            ? envUserSettings.writingMode
                            : this.basicUserSettings.writingMode,
                    fontSize:
                        this.isUserSettings && envUserSettings.fontSize
                            ? envUserSettings.fontSize
                            : this.basicUserSettings.basic.fontSize,
                    lineHeight:
                        this.isUserSettings && envUserSettings.lineHeight
                            ? envUserSettings.lineHeight
                            : this.basicUserSettings.basic.lineHeight,
                    letterSpacing:
                        this.isUserSettings && envUserSettings.letterSpacing
                            ? envUserSettings.letterSpacing
                            : this.basicUserSettings.basic.letterSpacing,
                };
            } else {
                if (this.isUserSettings) {
                    return {
                        colorType:
                            this.isUserSettings && envUserSettings.colorType
                                ? envUserSettings.colorType
                                : this.basicUserSettings.colorType,
                        fontFamily:
                            this.isUserSettings && envUserSettings.fontFamily
                                ? envUserSettings.fontFamily
                                : this.basicUserSettings.fontFamily,
                        writingMode:
                            this.isUserSettings && envUserSettings.writingMode
                                ? envUserSettings.writingMode
                                : this.basicUserSettings.writingMode,
                        fontSize:
                            this.isUserSettings && envUserSettings.fontSize
                                ? envUserSettings.fontSize
                                : this.basicUserSettings.detail.fontSize,
                        lineHeight:
                            this.isUserSettings && envUserSettings.lineHeight
                                ? envUserSettings.lineHeight * 10
                                : this.basicUserSettings.detail.lineHeight,
                        letterSpacing:
                            this.isUserSettings && envUserSettings.letterSpacing
                                ? envUserSettings.letterSpacing
                                : this.basicUserSettings.detail.letterSpacing,
                    };
                } else {
                    return this.basicUserSettings.detail;
                }
            }
        }
    };

    getStyles = () => {
        const newStyle = {
            fontSize: `${this.styles.fontSize}${this.settings.fontSizeUnit}`,
            lineHeight: this.styles.lineHeight / 10,
            letterSpacing: this.styles.letterSpacing + this.settings.fontSizeUnit,
        };
        return newStyle;
    };

    setClass = (element, type) => {
        const keyword = (() => {
            switch (type) {
                case "colorType":
                    return "env-color-type";
                case "fontFamily":
                    return "env-font-family";
                case "writingMode":
                    return "env-writing-mode";
                case "fontSize":
                    return "env-font-size";
                case "lineHeight":
                    return "env-line-height";
                case "letterSpacing":
                    return "env-letter-spacing";
            }
        })();
        const newClass = (() => {
            switch (type) {
                case "colorType":
                    return (
                        this.colorType[this.styles.colorType].class ?? this.colorType.default.class
                    );
                case "fontFamily":
                    return (
                        this.fontFamily[this.styles.fontFamily].class ??
                        this.fontFamily.default.class
                    );
                case "writingMode":
                    return (
                        this.writingMode[this.styles.writingMode].class ??
                        this.writingMode.horizontal.class
                    );
                case "fontSize":
                    return `env-font-size-${this.styles.fontSize ?? "md"}`;
                case "lineHeight":
                    return `env-line-height-${this.styles.lineHeight ?? "md"}`;
                case "letterSpacing":
                    return `env-letter-spacing-${this.styles.letterSpacing ?? "md"}`;
            }
        })();
        const currentClass = (() => {
            let className = null;
            [...element.classList].map((value) => {
                if (value.indexOf(keyword) === 0) {
                    className = value;
                }
            });
            return className;
        })();
        currentClass && element.classList.remove(currentClass);
        newClass !== null && element.classList.add(newClass);
    };

    setStyle = (element, styles) => {
        Object.assign(element.style, styles);
    };

    switchStyle = () => {
        this.envBaseElements.forEach((element) => {
            this.setClass(element, "colorType");
            this.setClass(element, "fontFamily");
            this.setClass(element, "writingMode");
            if (this.settings.mode === "basic") {
                this.setClass(element, "fontSize");
                this.setClass(element, "lineHeight");
                this.setClass(element, "letterSpacing");
            } else {
                this.setStyle(element, this.getStyles());
            }
        });
        this.setCookie();
    };

    switchMenu = () => {
        if (this.envViewerMenuElement.classList.contains("open")) {
            this.envViewerMenuElement.classList.remove("open");
            this.envViewerButtonElement.classList.remove("open");
            this.bodyElement.classList.remove("env-no-scroll");
        } else {
            this.envViewerMenuElement.classList.add("open");
            this.envViewerButtonElement.classList.add("open");
            this.bodyElement.classList.add("env-no-scroll");
        }
    };

    makeViewer = () => {
        this.bodyElement.append(this.settingMenuGenerator());
        this.bodyElement.append(this.buttonGenerator());
        this.envViewerMenuElement = document.getElementById("envViewerMenu");
        this.envViewerButtonElement = document.getElementById("envViewerButton");
    };

    settingMenuGenerator = () => {
        const newElement = document.createElement("div");
        newElement.classList.add("env-menu");
        newElement.classList.add(this.menuType);
        newElement.id = "envViewerMenu";
        newElement.onclick = (e) => {
            if (e.target.classList.contains("env-menu")) {
                this.switchMenu();
            }
        };
        const newElementInner = (() => {
            let createElement =
                '<div class="env-menu-inner">' +
                '<div class="env-menu-title"></div>' +
                "<dl>" +
                "<dt>カラー</dt>" +
                '<dd class="env-menu-color">' +
                this.colorRadioGenerator() +
                "</dd>" +
                "<dt>フォント</dt>" +
                '<dd class="env-menu-font">' +
                this.fontFamilyRadioGenerator() +
                "</dd>" +
                "<dt>文字方向</dt>" +
                '<dd class="env-menu-writing-mode">' +
                this.writingModeRadioGenerator() +
                "</dd>";
            if (this.settings.mode === "basic") {
                createElement =
                    createElement +
                    "<dt>文字サイズ</dt>" +
                    '<dd class="env-menu-size">' +
                    this.sizeRadioGenerator("envFontSize") +
                    "</dd>" +
                    "<dt>行間</dt>" +
                    '<dd class="env-menu-size">' +
                    this.sizeRadioGenerator("envLineHeight") +
                    "</dd>" +
                    "<dt>文字間隔</dt>" +
                    '<dd class="env-menu-size">' +
                    this.sizeRadioGenerator("envLetterSpacing") +
                    "</dd>";
            } else {
                createElement =
                    createElement +
                    "<dt>文字サイズ</dt>" +
                    "<dd>" +
                    `<input id="envFontSize" type="range" name="envFontSize" min="${this.settings.fontSizeMin}" max="${this.settings.fontSizeMax}" value="${this.styles.fontSize}">` +
                    `<label for="envFontSize">${this.styles.fontSize}${this.settings.fontSizeUnit}</label>` +
                    "</dd>" +
                    "<dt>行間</dt>" +
                    "<dd>" +
                    `<input id="envLineHeight" type="range" name="envLineHeight" min="${this.settings.lineHeightMin}" max="${this.settings.lineHeightMax}" value="${this.styles.lineHeight}">` +
                    `<label for="envLineHeight">${this.styles.lineHeight / 10}</label>` +
                    "</dd>" +
                    "<dt>文字間隔</dt>" +
                    "<dd>" +
                    `<input id="envLetterSpacing" type="range" name="envLetterSpacing" min="${this.settings.letterSpacingMin}" max="${this.settings.letterSpacingMax}" value="${this.styles.letterSpacing}">` +
                    `<label for="envLetterSpacing">${this.styles.letterSpacing}${this.settings.fontSizeUnit}</label>` +
                    "</dd>";
            }

            createElement =
                createElement +
                "</dl>" +
                '<div class="env-menu-button-area"><button id="envReset" type="button"></button></div>' +
                "</div>";
            return createElement;
        })();
        newElement.innerHTML = newElementInner;
        return newElement;
    };

    radioGenerator = (name, id, value, isChecked, label, className = null) => {
        return (
            `<input id="${id}" type="radio" name="${name}" value="${value}"${
                isChecked ? " checked" : ""
            }>` + `<label for="${id}" ${className ? `class=${className}` : ""}>${label}</label>`
        );
    };

    colorRadioGenerator = () => {
        let htmlString = "";
        Object.keys(this.colorType).forEach((key) => {
            if (key === "default" && this.styles.colorType !== "default") return;
            htmlString += this.radioGenerator(
                "envColorType",
                `envColorType${key}`,
                key,
                (this.styles.colorType == null && key == "default") || key == this.styles.colorType,
                this.colorType[key].label,
                this.colorType[key].class
            );
        });
        return htmlString;
    };

    fontFamilyRadioGenerator = () => {
        let htmlString = "";
        Object.keys(this.fontFamily).forEach((key) => {
            if (key === "default" && this.styles.fontFamily !== "default") return;
            if (key === "udKyokasho" && !isWindows) return;
            htmlString += this.radioGenerator(
                "envFontFamily",
                `envFontFamily${key}`,
                key,
                (this.styles.fontFamily == null && key == "default") ||
                    key == this.styles.fontFamily,
                this.fontFamily[key].label,
                this.fontFamily[key].class
            );
        });
        return htmlString;
    };

    writingModeRadioGenerator = () => {
        let htmlString = "";
        Object.keys(this.writingMode).forEach((key) => {
            htmlString += this.radioGenerator(
                "envWritingMode",
                `envWritingMode${key}`,
                key,
                (this.styles.writingMode == null && key == "default") ||
                    key == this.styles.writingMode,
                this.writingMode[key].label
            );
        });
        return htmlString;
    };

    sizeRadioGenerator = (id) => {
        let htmlString = "";

        Object.keys(this.basicSettings.sizes).forEach((key) => {
            const isChecked = (() => {
                switch (id) {
                    case "envFontSize":
                        return (
                            (this.styles.fontSize == null && key == "md") ||
                            key == this.styles.fontSize
                        );
                    case "envLineHeight":
                        return (
                            (this.styles.lineHeight == null && key == "md") ||
                            key == this.styles.lineHeight
                        );
                    case "envLetterSpacing":
                        return (
                            (this.styles.letterSpacing == null && key == "md") ||
                            key == this.styles.letterSpacing
                        );
                }
            })();
            const className = id === "envFontSize" ? `env-font-size-${key}` : null;
            htmlString += this.radioGenerator(
                id,
                `${id}${key}`,
                key,
                isChecked,
                this.basicSettings.sizes[key].label,
                className
            );
        });
        return htmlString;
    };

    buttonGenerator = () => {
        const newButton = document.createElement("button");
        newButton.type = "button";
        newButton.id = "envViewerButton";
        newButton.classList.add("env-button");
        newButton.onclick = this.switchMenu;
        return newButton;
    };

    changeColorType(colorTypeKey) {
        this.styles.colorType = colorTypeKey;
        this.switchStyle();
    }

    changeFontFamily(fontFamilyKey) {
        this.styles.fontFamily = fontFamilyKey;
        this.switchStyle();
    }

    changeWritingMode(writingModeKey) {
        this.styles.writingMode = writingModeKey;
        this.switchStyle();
    }

    changeSize(input) {
        switch (input.name) {
            case "envFontSize":
                this.styles.fontSize = input.value;
                break;
            case "envLineHeight":
                this.styles.lineHeight = input.value;
                break;
            case "envLetterSpacing":
                this.styles.letterSpacing = input.value;
                break;
        }
        this.switchStyle();
    }

    changeValueLabel(input) {
        if (this.settings.mode === "detail") {
            const value = (() => {
                switch (input.name) {
                    case "envFontSize":
                    case "envLetterSpacing":
                        return input.value + this.settings.fontSizeUnit;
                    case "envLineHeight":
                        return input.value / 10;
                }
            })();
            input.nextElementSibling.textContent = value;
        }
    }

    setCookie() {
        document.cookie = `envMode=${this.settings.mode};SameSite=Lax`;
        document.cookie = `envStyles=${encodeURIComponent(
            JSON.stringify(this.styles)
        )};SameSite=Lax`;
    }

    getCookie() {
        const cookieData = (() => {
            const cookie = [];
            document.cookie
                .replace(" ", "")
                .split(";")
                .map((cookieRow) => {
                    const cookieArr = cookieRow.split("=");
                    if (cookieArr[0] !== "") {
                        cookie.push(cookieArr);
                    }
                });
            return cookie.length > 0 ? cookie : null;
        })();

        const cookieDataMode = (() => {
            if (cookieData) {
                let mode = null;
                cookieData.map((cookie) => {
                    if (cookie[0] === "envMode") {
                        mode = cookie[1];
                    }
                });
                return mode;
            } else {
                return null;
            }
        })();

        if (typeof this.settings !== "undefined" && cookieDataMode === this.settings.mode) {
            if (cookieData) {
                return (() => {
                    let styles = null;
                    cookieData.map((cookie) => {
                        if (cookie[0] === "envStyles") {
                            styles = JSON.parse(decodeURIComponent(cookie[1]));
                        }
                    });
                    return styles;
                })();
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

window.onload = () => {
    const envViewerClass = new envViewer();

    document.getElementById("envReset").addEventListener("click", () => {
        const defaultStyles = envViewerClass.getDefaultStyles(true);
        document
            .querySelectorAll(
                "input[name='envColorType'],input[name='envFontFamily'],input[name='envWritingMode'],input[name='envFontSize'],input[name='envLineHeight'],input[name='envLetterSpacing']"
            )
            .forEach((input) => {
                switch (input.name) {
                    case "envColorType":
                        if (input.value == defaultStyles.colorType) {
                            input.checked = true;
                            envViewerClass.changeColorType(defaultStyles.colorType);
                        } else {
                            input.checked = false;
                        }
                        break;
                    case "envFontFamily":
                        if (input.value == defaultStyles.fontFamily) {
                            input.checked = true;
                            envViewerClass.changeFontFamily(defaultStyles.fontFamily);
                        } else {
                            input.checked = false;
                        }
                        break;
                    case "envWritingMode":
                        if (input.value == defaultStyles.writingMode) {
                            input.checked = true;
                            envViewerClass.changeWritingMode(defaultStyles.writingMode);
                        } else {
                            input.checked = false;
                        }
                        break;
                    case "envFontSize":
                    case "envLineHeight":
                    case "envLetterSpacing":
                        const defaultValue = (() => {
                            switch (input.name) {
                                case "envFontSize":
                                    return defaultStyles.fontSize;
                                case "envLineHeight":
                                    return defaultStyles.lineHeight;
                                case "envLetterSpacing":
                                    return defaultStyles.letterSpacing;
                            }
                        })();
                        if (input.type === "radio") {
                            if (input.value === defaultValue) {
                                input.checked = true;
                            }
                        } else {
                            input.value = defaultValue;
                            envViewerClass.changeValueLabel(input);
                            envViewerClass.changeSize(input);
                        }
                        break;
                }
            });
    });

    document
        .querySelectorAll(
            "input[name='envColorType'],input[name='envFontFamily'],input[name='envWritingMode'],input[name='envFontSize'],input[name='envLineHeight'],input[name='envLetterSpacing']"
        )
        .forEach((input) => {
            input.addEventListener("change", () => {
                switch (input.name) {
                    case "envColorType":
                        envViewerClass.changeColorType(input.value);
                        break;
                    case "envFontFamily":
                        envViewerClass.changeFontFamily(input.value);
                        break;
                    case "envWritingMode":
                        envViewerClass.changeWritingMode(input.value);
                        break;
                    case "envFontSize":
                    case "envLineHeight":
                    case "envLetterSpacing":
                        envViewerClass.changeSize(input);
                        break;
                }
            });
            switch (input.name) {
                case "envFontSize":
                case "envLineHeight":
                case "envLetterSpacing":
                    input.addEventListener("input", () => envViewerClass.changeValueLabel(input));
                    break;
            }
        });

    const scrollReg = 1.4;
    document.querySelectorAll(".env-base").forEach((element) => {
        element.addEventListener("wheel", (e) => {
            if (element.classList.contains("env-writing-mode-vertical")) {
                e.preventDefault();
                if (e.deltaX === 0) {
                    element.scrollLeft = element.scrollLeft - e.deltaY * scrollReg;
                }
            }
            return;
        });
    });
};
