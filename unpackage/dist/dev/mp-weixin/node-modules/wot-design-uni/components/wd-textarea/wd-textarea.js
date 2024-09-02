"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  _easycom_wd_icon2();
}
const _easycom_wd_icon = () => "../wd-icon/wd-icon.js";
if (!Math) {
  _easycom_wd_icon();
}
const __default__ = {
  name: "wd-textarea",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: common_vendor.textareaProps,
  emits: [
    "update:modelValue",
    "clear",
    "change",
    "blur",
    "focus",
    "input",
    "keyboardheightchange",
    "confirm",
    "linechange",
    "clickprefixicon",
    "click"
  ],
  setup(__props, { emit: __emit }) {
    const { translate } = common_vendor.useTranslate("textarea");
    const props = __props;
    const emit = __emit;
    const placeholderValue = common_vendor.computed(() => {
      return common_vendor.isDef(props.placeholder) ? props.placeholder : translate("placeholder");
    });
    const clearing = common_vendor.ref(false);
    const focused = common_vendor.ref(false);
    const focusing = common_vendor.ref(false);
    const inputValue = common_vendor.ref("");
    const cell = common_vendor.useCell();
    common_vendor.watch(
      () => props.focus,
      (newValue) => {
        focused.value = newValue;
      },
      { immediate: true, deep: true }
    );
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        inputValue.value = common_vendor.isDef(newValue) ? String(newValue) : "";
      },
      { immediate: true, deep: true }
    );
    const { parent: form } = common_vendor.useParent(common_vendor.FORM_KEY);
    const showClear = common_vendor.computed(() => {
      const { disabled, readonly, clearable, clearTrigger } = props;
      if (clearable && !readonly && !disabled && inputValue.value && (clearTrigger === "always" || props.clearTrigger === "focus" && focusing.value)) {
        return true;
      } else {
        return false;
      }
    });
    const showWordCount = common_vendor.computed(() => {
      const { disabled, readonly, maxlength, showWordLimit } = props;
      return Boolean(!disabled && !readonly && common_vendor.isDef(maxlength) && maxlength > -1 && showWordLimit);
    });
    const errorMessage = common_vendor.computed(() => {
      if (form && props.prop && form.errorMessages && form.errorMessages[props.prop]) {
        return form.errorMessages[props.prop];
      } else {
        return "";
      }
    });
    const isRequired = common_vendor.computed(() => {
      let formRequired = false;
      if (form && form.props.rules) {
        const rules = form.props.rules;
        for (const key in rules) {
          if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key])) {
            formRequired = rules[key].some((rule) => rule.required);
          }
        }
      }
      return props.required || props.rules.some((rule) => rule.required) || formRequired;
    });
    const currentLength = common_vendor.computed(() => {
      return String(props.modelValue || "").length;
    });
    const rootClass = common_vendor.computed(() => {
      return `wd-textarea   ${props.label || props.useLabelSlot ? "is-cell" : ""} ${props.center ? "is-center" : ""} ${cell.border.value ? "is-border" : ""} ${props.size ? "is-" + props.size : ""} ${props.error ? "is-error" : ""} ${props.disabled ? "is-disabled" : ""} ${props.autoHeight ? "is-auto-height" : ""} ${currentLength.value > 0 ? "is-not-empty" : ""}  ${props.noBorder ? "is-no-border" : ""} ${props.customClass}`;
    });
    const labelClass = common_vendor.computed(() => {
      return `wd-textarea__label ${props.customLabelClass} ${isRequired.value ? "is-required" : ""}`;
    });
    const inputPlaceholderClass = common_vendor.computed(() => {
      return `wd-textarea__placeholder  ${props.placeholderClass}`;
    });
    const countClass = common_vendor.computed(() => {
      return `${currentLength.value > 0 ? "wd-textarea__count-current" : ""} ${currentLength.value > props.maxlength ? "is-error" : ""}`;
    });
    const labelStyle = common_vendor.computed(() => {
      return props.labelWidth ? common_vendor.objToStyle({
        "min-width": props.labelWidth,
        "max-width": props.labelWidth
      }) : "";
    });
    common_vendor.onBeforeMount(() => {
      initState();
    });
    function initState() {
      inputValue.value = formatValue(inputValue.value);
      emit("update:modelValue", inputValue.value);
    }
    function formatValue(value) {
      const { maxlength, showWordLimit } = props;
      if (showWordLimit && maxlength !== -1 && String(value).length > maxlength) {
        return value.toString().substring(0, maxlength);
      }
      return value;
    }
    function handleClear() {
      clearing.value = true;
      focusing.value = false;
      inputValue.value = "";
      if (props.focusWhenClear) {
        focused.value = false;
      }
      common_vendor.requestAnimationFrame(() => {
        if (props.focusWhenClear) {
          focused.value = true;
          focusing.value = true;
        }
        emit("change", {
          value: ""
        });
        emit("update:modelValue", inputValue.value);
        emit("clear");
      });
    }
    async function handleBlur({ detail }) {
      await common_vendor.pause(150);
      if (clearing.value) {
        clearing.value = false;
        return;
      }
      focusing.value = false;
      emit("blur", {
        value: inputValue.value,
        cursor: detail.cursor ? detail.cursor : null
      });
    }
    function handleFocus({ detail }) {
      focusing.value = true;
      emit("focus", detail);
    }
    function handleInput({ detail }) {
      inputValue.value = formatValue(inputValue.value);
      emit("update:modelValue", inputValue.value);
      emit("input", detail);
    }
    function handleKeyboardheightchange({ detail }) {
      emit("keyboardheightchange", detail);
    }
    function handleConfirm({ detail }) {
      emit("confirm", detail);
    }
    function handleLineChange({ detail }) {
      emit("linechange", detail);
    }
    function onClickPrefixIcon() {
      emit("clickprefixicon");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.label || _ctx.useLabelSlot
      }, _ctx.label || _ctx.useLabelSlot ? common_vendor.e({
        b: _ctx.prefixIcon || _ctx.usePrefixSlot
      }, _ctx.prefixIcon || _ctx.usePrefixSlot ? common_vendor.e({
        c: _ctx.prefixIcon && !_ctx.usePrefixSlot
      }, _ctx.prefixIcon && !_ctx.usePrefixSlot ? {
        d: common_vendor.o(onClickPrefixIcon),
        e: common_vendor.p({
          ["custom-class"]: "wd-textarea__icon",
          name: _ctx.prefixIcon
        })
      } : {}) : {}, {
        f: _ctx.label
      }, _ctx.label ? {
        g: common_vendor.t(_ctx.label)
      } : {}, {
        h: common_vendor.n(labelClass.value),
        i: common_vendor.s(labelStyle.value)
      }) : {}, {
        j: common_vendor.n(`wd-textarea__inner ${_ctx.customTextareaClass}`),
        k: placeholderValue.value,
        l: _ctx.disabled,
        m: _ctx.maxlength,
        n: focused.value,
        o: _ctx.autoFocus,
        p: _ctx.placeholderStyle,
        q: inputPlaceholderClass.value,
        r: _ctx.autoHeight,
        s: _ctx.cursorSpacing,
        t: _ctx.fixed,
        v: _ctx.cursor,
        w: _ctx.showConfirmBar,
        x: _ctx.selectionStart,
        y: _ctx.selectionEnd,
        z: _ctx.adjustPosition,
        A: _ctx.holdKeyboard,
        B: _ctx.confirmType,
        C: _ctx.confirmHold,
        D: _ctx.disableDefaultPadding,
        E: common_vendor.o([($event) => inputValue.value = $event.detail.value, handleInput]),
        F: common_vendor.o(handleFocus),
        G: common_vendor.o(handleBlur),
        H: common_vendor.o(handleConfirm),
        I: common_vendor.o(handleLineChange),
        J: common_vendor.o(handleKeyboardheightchange),
        K: inputValue.value,
        L: errorMessage.value
      }, errorMessage.value ? {
        M: common_vendor.t(errorMessage.value)
      } : {}, {
        N: _ctx.readonly
      }, _ctx.readonly ? {} : {}, {
        O: showClear.value
      }, showClear.value ? {
        P: common_vendor.o(handleClear),
        Q: common_vendor.p({
          ["custom-class"]: "wd-textarea__clear",
          name: "error-fill"
        })
      } : {}, {
        R: showWordCount.value
      }, showWordCount.value ? {
        S: common_vendor.t(currentLength.value),
        T: common_vendor.n(countClass.value),
        U: common_vendor.t(_ctx.maxlength)
      } : {}, {
        V: common_vendor.n(`wd-textarea__value ${showClear.value ? "is-suffix" : ""} ${_ctx.customTextareaContainerClass} ${showWordCount.value ? "is-show-limit" : ""}`),
        W: common_vendor.n(rootClass.value),
        X: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-324b46d3"]]);
wx.createComponent(Component);
